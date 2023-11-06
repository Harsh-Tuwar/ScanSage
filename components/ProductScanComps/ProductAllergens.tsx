import React from 'react';
import { Card, Text as RNPText } from 'react-native-paper';

interface ProductAllergensProps {
	allergenTags: string[];
}

const ProductAllergens = ({
	allergenTags
}: ProductAllergensProps) => {
	return (
		<Card style={{ margin: 10 }}>
			<Card.Content>
				{allergenTags.map((allergenTag) => {
					return <RNPText key={allergenTag}>{allergenTag}</RNPText>
				})}
			</Card.Content>
		</Card>
	);
};

export default ProductAllergens;
