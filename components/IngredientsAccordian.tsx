import React, { PropsWithChildren } from 'react';
import FoodPrefAccordianItem from './FoodPrefAccordianItem';
import FoodPrefItem from './FoodPrefItem';

interface IngredientsAccordianProps extends PropsWithChildren {
	setIngredientSelection: (value: any) => void;
	ingredients: {
		vegan: string;
		vegetarian: string;
		palmOilFree: string;
	};
}

const IngredientsAccordian = ({
	ingredients,
	setIngredientSelection
}: IngredientsAccordianProps) => {
	return (
		<FoodPrefAccordianItem id={'3'} title='Ingredients'>
			<FoodPrefItem
				title='Vegan'
				modalContent='To determine whether a product is vegan, we only rely on the list of ingredients.'
				selectedValue={ingredients?.vegan ?? '0'}
				setValue={(newValue) => { setIngredientSelection({ 'vegan': newValue }) }}
			/>
			<FoodPrefItem
				title='Vegetarian'
				modalContent='To determine whether a product is vegetarian, we only rely on the list of ingredients.'
				selectedValue={ingredients?.vegetarian ?? '0'}
				setValue={(newValue) => { setIngredientSelection({ 'vegetarian': newValue }) }}
			/>
			<FoodPrefItem
				title='Palm oil free'
				selectedValue={ingredients?.palmOilFree ?? '0'}
				setValue={(newValue) => { setIngredientSelection({ 'palmOilFree': newValue }) }}
			/>
		</FoodPrefAccordianItem>
  	);
}

export default IngredientsAccordian