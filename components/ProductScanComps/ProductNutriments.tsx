import React from 'react';
import { View } from 'react-native';
import { Nutriments } from '../../api/api-types';
import { Card, Text, Divider } from 'react-native-paper';
import { HUMAN_READABLE_NUTRIMENT_HASHMAP } from '../../api/models';

interface ProductNutrimentsProps {
	nutriments: Nutriments;
}

const ProductNutriments = ({
	nutriments
}: ProductNutrimentsProps) => {
	return (
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
						<View style={{ flexDirection: 'row', justifyContent: 'space-between' }} key={key}>
							<Text variant="bodyMedium" style={{ fontWeight: 'bold' }}>{label}</Text>
							<Text variant="bodyMedium">{itemValue}</Text>
						</View>
					)
				})}
			</Card.Content>
		</Card>
	)
}

export default ProductNutriments;
