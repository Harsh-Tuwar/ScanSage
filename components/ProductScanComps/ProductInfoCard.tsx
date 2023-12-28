import React from 'react';
import { Image } from 'expo-image';
import { SCREEN_WIDTH } from '../../styles';
import { StyleSheet, View } from 'react-native';
import { FoodFactsProduct } from '../../api/api-types';
import { Chip, Icon, useTheme, Text } from 'react-native-paper';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { BANNER_AD_UNIT_ID } from '../../constants';

interface ProductInfoCardProps {
	product: FoodFactsProduct;
	productMatchState: {
		state: string,
		color: string
	};
};

const ProductInfoCard = ({ product, productMatchState }: ProductInfoCardProps) => {
	const theme = useTheme();

	return (
		<>
			<View style={{
				elevation: 2,
				borderRadius: 10,
				flexDirection: 'row',
				backgroundColor: theme.colors.inverseOnSurface,
				padding: 10,
				margin: 10
			}}>
				<View style={{ marginRight: 15 }}>
					<Image source={{ uri: product.mainImg.image_front_url }} style={styles.productImage} />
				</View>
				<View>
					<View style={{ width: SCREEN_WIDTH - 150 }}>
						<Text style={styles.productTitle} numberOfLines={1}>{product.title}</Text>
					</View>
					<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
						<Chip
							compact
							textStyle={{ fontSize: 12 }}
							icon={() => (
								<Icon source="circle" size={16} color={productMatchState.color} />
							)}
						>{productMatchState.state}</Chip>
					</View>
				</View>
			</View>
			<BannerAd
				size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
				unitId={BANNER_AD_UNIT_ID}
				onAdLoaded={() => { }}
				onAdFailedToLoad={error => {
					console.error('Advert failed to load: ', error);
				}}
			/>
		</>
	)
};

const styles = StyleSheet.create({
	productTitle: {
		marginTop: 5,
		marginBottom: 15,
		fontSize: 20,
		fontWeight: 'bold'
	},
	productImage: {
		height: 90,
		width: 90,
		borderRadius: 10,
		borderWidth: 1,
	},
});

export default ProductInfoCard;
