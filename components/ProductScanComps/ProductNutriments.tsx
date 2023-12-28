import React from 'react';
import { View } from 'react-native';
import { Nutriments } from '../../api/api-types';
import { Card, Text, Divider } from 'react-native-paper';
import { HUMAN_READABLE_NUTRIMENT_HASHMAP } from '../../api/models';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { BANNER_AD_UNIT_ID } from '../../constants';

interface ProductNutrimentsProps {
	nutriments: Nutriments;
}

const ProductNutriments = ({
	nutriments
}: ProductNutrimentsProps) => {
	return (
		<>
			<BannerAd
				size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
				unitId={BANNER_AD_UNIT_ID}
				onAdLoaded={() => { }}
				onAdFailedToLoad={error => {
					console.error('Advert failed to load: ', error);
				}}
			/>
			<Card style={{ margin: 10 }}>
				<Card.Content>
					<Text variant="titleMedium">💪 Nutrition facts</Text>
					<Divider style={{ marginVertical: 10 }} bold />
					{Object.keys(nutriments).map((key) => {
						const itemValue = nutriments[key as keyof typeof nutriments];
						const label = HUMAN_READABLE_NUTRIMENT_HASHMAP[`${key}`];

						if (!itemValue || !label) {
							return;
						}

						return (
							<View style={{ flex: 1, flexDirection: 'row', }} key={key}>
								<Text variant="bodyMedium" style={{ fontWeight: 'bold', flex: 4, flexWrap: 'wrap' }}>{label}</Text>
								<Text variant="bodyMedium" style={{ flex: 1, alignItems: 'flex-end' }}>{typeof itemValue === 'number' ? parseFloat(String(itemValue)).toFixed(2) : itemValue}</Text>
							</View>
						)
					})}
				</Card.Content>
			</Card>
		</>
	)
}

export default ProductNutriments;
