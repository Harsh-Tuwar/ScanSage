import React from 'react';
import { View } from 'react-native';
import { Banner, Card, List, Text } from 'react-native-paper';
import { helpers } from '../styles';
import FoodPrefItem from './FoodPrefItem';

const AllergensAccordian = () => {
	return (
		<View style={{ ...helpers.mx10 }}>
			<Card mode='outlined'>
				<Card.Content>
					<List.Accordion title="Allergens" id="3">
						<Banner visible={true} collapsable={true} style={{ backgroundColor: 'tomato', marginBottom: 10 }}>
							<Text style={{ color: 'white' }}>There is always a possibility that data about allergens may be missing,
							incomplete, incorrect or that product's composition has changed. If you are
							allergic, always check the information on the actual product packaging.</Text>
						</Banner>
						<FoodPrefItem title='Without Gluten' />
						<FoodPrefItem title='Without Milk' />
						<FoodPrefItem title='Without Eggs' />
						<FoodPrefItem title='Without Nuts' />
						<FoodPrefItem title='Without Peanuts' />
						<FoodPrefItem title='Without Sesame Seeds' />
						<FoodPrefItem title='Without Soybeans' />
						<FoodPrefItem title='Without Celery' />
						<FoodPrefItem title='Without Mustard' />
						<FoodPrefItem title='Without Lupin' />
						<FoodPrefItem title='Without Fish' />
						<FoodPrefItem title='Without Crustaceans' />
						<FoodPrefItem title='Without Sulphur dioxide and sulphites' />
					</List.Accordion>
				</Card.Content>
			</Card>
		</View>
	)
}

export default AllergensAccordian;
