import React from 'react';
import FoodPrefAccordianItem from './FoodPrefAccordianItem';
import FoodPrefItem from './FoodPrefItem';

const IngredientsAccordian = () => {
	return (
		<FoodPrefAccordianItem id={'3'} title='Ingredients'>
			<FoodPrefItem title='Vegan' modalContent='To determine whether a product is vegan, we only rely on the list of ingredients.'/>
			<FoodPrefItem title='Vegetarian' modalContent='To determine whether a product is vegetarian, we only rely on the list of ingredients.' />
			<FoodPrefItem title='Palm oil free' />
		</FoodPrefAccordianItem>
  	);
}

export default IngredientsAccordian