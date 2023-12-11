import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useUser } from '../../context/UserContext';
import { Card, Chip, Divider, useTheme, Text as RNPText, Portal, Button, Modal } from 'react-native-paper';
import { VEG_STATUS } from '../../utils';
import { FoodFactsProduct } from '../../api/api-types';
import * as utils from '../../utils';
import * as API from '../../api/openFoodFactsService';
import { ScrollView } from 'react-native-gesture-handler';
import ProductInfoCard from '../../components/ProductScanComps/ProductInfoCard';
import HealthCard from '../../components/ProductScanComps/HealthCard';
import ProductIngredients from '../../components/ProductScanComps/ProductIngredients';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import ProductNutriments from '../../components/ProductScanComps/ProductNutriments';
import { BANNER_AD_UNIT_ID } from '../../constants';
import { helpers } from '../../styles';
import * as scanUtils from '../../utils/scan';
import PageTitle from '../../components/PageTitle';
import CenterLoader from '../../components/CenterLoader';

const INGREDIENT_TAG_ICONS_MAP = {
	'palm': 'palm-tree',
	'vegan': 'leaf-circle',
	'vegetarian': 'food-drumstick-off',
	'non': 'leaf-off'
};

const ProductInfoPage = () => {
	const theme = useTheme();
	const { fbUser } = useUser();

	const { barcode } = useLocalSearchParams();

	const [showLoading, setShowLoading] = useState(false);
	const [showIngModal, setShowIngModal] = useState(false);
	const [selectedModalTag, setSelectedModalTag] = React.useState('');
	const [product, setProduct] = useState<FoodFactsProduct | null>(null);

	useEffect(() => {
		const fetchProductData = async () => {
			const prodData = await API.getProductData(barcode as string);

			setProduct(prodData);
		};

		fetchProductData();
	}, []);

	const getVegStatusString = (vegAnalysisStatus: string): VEG_STATUS => {
		const trimmedString = vegAnalysisStatus.replace('en:', '');

		if (trimmedString.toLowerCase() === 'non-vegetarian') {
			return VEG_STATUS.NON_VEG;
		} else if (trimmedString.toLowerCase() === 'vegetarian') {
			return VEG_STATUS.VEG;
		} else {
			return VEG_STATUS.UNKNOWN;
		}
	};

	const getVegStatus = () => {
		return (
			(product && product.ingredients_analysis_tags && product?.ingredients_analysis_tags.length) ?
				getVegStatusString(product.ingredients_analysis_tags[2]) :
				utils.VEG_STATUS.UNKNOWN
		);
	};

	const getProductMatchState = (): { state: string, color: string } => {
		let stateToConvert = utils.PRODUCT_MATCH_STATE.UNKNOWN_MATCH;

		if (fbUser?.foodPrefs) {
			stateToConvert = utils.matchProductToPreferences(product?.ingredients_tags ?? [], getVegStatus(), fbUser.foodPrefs);
		}

		return {
			state: utils.getHumanReadableProductMatchStr(stateToConvert),
			color: utils.getStateColor(stateToConvert)
		};
	};

	return (
		<>
			<View style={{ ...styles.container, backgroundColor: theme.colors.background, padding: 10 }}>
				{showLoading ? <CenterLoader /> : (
					product && (
						<ScrollView stickyHeaderHiddenOnScroll>
							<PageTitle showCloseButton>{utils.uppercaseFirstLetter(product.title)}</PageTitle>
							<Divider />
							<ProductInfoCard product={product} productMatchState={getProductMatchState()} />
	
							{Object.keys(product.nutrient_levels).length > 0 && (
								<HealthCard nutrientLevels={product.nutrient_levels} nutriments={product.nutriments} />
							)}
	
							{/* Ingredients */}
							{product.ingredients.length > 0 && (
								<ProductIngredients ingredients={product.ingredients} allergens={product.allergens_tags} additives={product.additives_tags} />
							)}
	
							{/* Ingredients Analysis */}
							{product.ingredients_analysis_tags && product.ingredients_analysis_tags.length > 0 && (
								<>
									<Card style={{ margin: 10 }}>
										<Card.Content>
											<RNPText variant="titleMedium">🧐 Ingredients Analysis</RNPText>
											<Divider style={{ marginVertical: 10 }} bold />
											<View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
												{product.ingredients_analysis_tags.map((tag, index) => {
													const tagString = tag.split(':')[1].replaceAll('-', ' ');
													const tagIcon = INGREDIENT_TAG_ICONS_MAP[tagString.split(' ')[0] as keyof typeof INGREDIENT_TAG_ICONS_MAP] as any;
													const finalizedTagString = utils.uppercaseFirstLetter(tagString);
	
													return (
														<Chip
															key={`${tag}-${index}`}
															icon={() => <MaterialCommunityIcons name={tagIcon} size={24} />}
															compact
															style={helpers.m5}
															onPress={() => {
																setSelectedModalTag(tag);
																setShowIngModal(true);
															}}
														>{finalizedTagString}</Chip>
													);
												})}
											</View>
											<RNPText style={helpers.mx10}>The analysis is based solely on the ingredients listed and does not take into account processing methods</RNPText>
										</Card.Content>
									</Card>
									<BannerAd
										size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
										unitId={BANNER_AD_UNIT_ID}
										onAdLoaded={() => { }}
										onAdFailedToLoad={error => {
											console.error('Advert failed to load: ', error);
										}}
									/>
								</>
							)}
	
							{/* Item Nutriments */}
							<ProductNutriments nutriments={product.nutriments} />
						</ScrollView>
					)
				)}
			</View>
			<Portal>
				<Modal
					visible={showIngModal}
					onDismiss={() => {
						setSelectedModalTag('');
						setShowIngModal(false);
					}}
					contentContainerStyle={styles.modalContainer}
				>
					<RNPText
						style={{ fontWeight: 'bold' }}
						variant='headlineSmall'
					>{scanUtils.getIngreAnalysisModalContent(product, selectedModalTag).title}</RNPText>
					<Divider style={helpers.mx10} />
					<RNPText style={helpers.mb20}>
						{scanUtils.getIngreAnalysisModalContent(product, selectedModalTag).content}
					</RNPText>
					{scanUtils.getIngreAnalysisModalContent(product, selectedModalTag).unrecognizedStr.length > 0 && (
						<>
							<RNPText style={helpers.mb10}>{scanUtils.getIngreAnalysisModalContent(product, selectedModalTag).unrecognizedStr}</RNPText>
							<RNPText
								style={{ ...helpers.mb10, fontStyle: 'italic' }}
							>Some ingredients could not be recognized.</RNPText>
						</>
					)}
					<Button mode='contained-tonal' onPress={() => setShowIngModal(false)}>Ok</Button>
				</Modal>
			</Portal>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		position: 'relative',
	},
	modalContainer: {
		backgroundColor: 'black',
		margin: 20,
		padding: 20,
		borderRadius: 15
	}
});

export default ProductInfoPage;
