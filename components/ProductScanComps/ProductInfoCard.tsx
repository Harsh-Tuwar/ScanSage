import React from 'react';
import { Image } from 'expo-image';
import { StyleSheet} from 'react-native';
import { Card } from 'react-native-paper';
import { FoodFactsProduct } from '../../api/api-types';

interface ProductInfoCardProps {
	product: FoodFactsProduct;
}

const ProductInfoCard = ({ product }: ProductInfoCardProps) => {
	return (
		<Card style={{ margin: 10, paddingVertical: 40 }} >
			<Card.Title
				title={product.title}
				titleNumberOfLines={3}
				titleStyle={styles.productTitle}
				left={() => <Image
					source={product.mainImg.image_front_url}
					style={styles.productImage}
				/>}
			/>
		</Card>
	)
};

const styles = StyleSheet.create({
	productTitle: {
		marginLeft: 50,
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
