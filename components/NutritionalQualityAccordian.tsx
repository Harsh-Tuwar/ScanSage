import React, { PropsWithChildren } from 'react';
import FoodPrefItem from './FoodPrefItem';
import FoodPrefAccordianItem from './FoodPrefAccordianItem';

interface NutritionalQualityAccordian extends PropsWithChildren {
	nutriQuality: {
		goodNutri: string;
		lowSalt: string;
		lowSugar: string;
		lowFat: string;
		saturatedFat: string;
	},
	setNutriQuality: (value: any) => void;
}

const NutritionalQualityAccordian = ({
	nutriQuality,
	setNutriQuality
}: NutritionalQualityAccordian) => {
	return (
		<FoodPrefAccordianItem title='Nutritional Quality' id='1'>
			<FoodPrefItem
				title='Good nutritional quality (Nutri-Score)'
				modalContent='The Nutri-Score is computed and can be taken into account for all products, even if is not displayed on the packageing'
				selectedValue={nutriQuality.goodNutri}
				setValue={(newValue) => { setNutriQuality({ 'goodNutri': newValue }) }}
			/>
			<FoodPrefItem
				title='Salt in low quantity'
				modalContent='The salt level is taken into account by the Nutri-Score. Use this setting only if you are specifically on a low salt diet.'
				selectedValue={nutriQuality.lowSalt}
				setValue={(newValue) => { setNutriQuality({ 'lowSalt': newValue }) }}
			/>
			<FoodPrefItem
				title='Sugars in low quanity'
				modalContent='The sugars level is taken into account by the Nutri-Score. Use this settings only if you are specifically on a low sugars diet.'
				selectedValue={nutriQuality.lowSugar}
				setValue={(newValue) => { setNutriQuality({ 'lowSugar': newValue }) }}
			/>
			<FoodPrefItem
				title='Fat in low quantity'
				modalContent='The fat level is taken into account by the Nutri-Score. Use this setting only if you are specifically on a low fat diet.'
				selectedValue={nutriQuality.lowFat}
				setValue={(newValue) => { setNutriQuality({ 'lowFat': newValue }) }}
			/>
			<FoodPrefItem
				title='Saturated fat in low quantity'
				modalContent='The saturated fat level is taken into account by the Nutri-Score. Use this setting only if you are specifically on a low saturated fat diet.'
				selectedValue={nutriQuality.saturatedFat}
				setValue={(newValue) => { setNutriQuality({ 'saturatedFat': newValue }) }}
			/>
		</FoodPrefAccordianItem>
	)
}

export default NutritionalQualityAccordian;
