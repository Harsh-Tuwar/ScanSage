import React from 'react';
import { View } from 'react-native'
import * as utils from '../../utils';
import { helpers } from '../../styles';
import { Ingredient } from '../../api/api-types';
import { ADDITIVES_MAP } from '../../constants/additives';
import { Card, Chip, Divider, Icon, Text as RNPText } from 'react-native-paper';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { BANNER_AD_UNIT_ID } from '../../constants';

interface ProductIngredientsProps {
	ingredients: Ingredient[];
	allergens: string[];
	additives: string[];
}

const ProductIngredients = ({
	ingredients,
	allergens,
	additives
}: ProductIngredientsProps) => {
	const getSanitizedString = (allergenString: string) => {
		const allergen = allergenString.split(':')[1];
		const sanitizedString = allergen.replaceAll(/[&\/\\#, +()$~%.'":*?<>{}]/g, '_');

		return utils.uppercaseFirstLetter(sanitizedString);
	};

	return (
		<>
			<Card style={{ margin: 10 }}>
				<Card.Content>
					<RNPText variant="titleMedium">🍯 Ingredients</RNPText>
					<Divider style={{ marginVertical: 10 }} bold />
					<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
						<Icon source="pot-mix" size={32} />
						<RNPText variant='bodyLarge'>&nbsp; {ingredients.length} ingredients</RNPText>
					</View>
					<View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', ...helpers.mx5 }}>
						{ingredients.map((ings, index) => {
							return <RNPText key={`${ings.id}-${index}`}>{utils.uppercaseFirstLetter(ings.text)}{ingredients.length - 1 === index ? '' : ', '}</RNPText>
						})}
					</View>
					{allergens.length > 0 && (
						<View style={{ ...helpers.mt20 }}>
							<RNPText variant='bodyLarge'>😵 Allergens:</RNPText>
							<Divider style={{...helpers.mx10 }} />
							<View style={{ flexDirection: 'row' }}>
								{allergens.map((item, index) => <RNPText key={item}>{getSanitizedString(item)}{index === allergens.length - 1 ? '' : ', '}</RNPText>)}
							</View>
						</View>
					)}
					{additives.length > 0 && (
						<View style={{ ...helpers.mt20 }}>
							<RNPText variant='bodyLarge'>⚗️ Additives:</RNPText>
							<Divider style={{...helpers.mx10 }} />
							<View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
								{additives.map((item) => (
									<Chip compact style={helpers.m5} key={item}>
										<RNPText style={{ flexWrap: 'wrap' }}>{getSanitizedString(item)} - {ADDITIVES_MAP[`${getSanitizedString(item)}`]}</RNPText>
									</Chip>
								))}
							</View>
						</View>
					)}
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
	);
};

export default ProductIngredients;
