import React from 'react';
import FoodPrefItem from './FoodPrefItem';
import FoodPrefAccordianItem from './FoodPrefAccordianItem';

const NutritionalQualityAccordian = () => {
	return (
		<FoodPrefAccordianItem title='Nutritional Quality' id='1'>
			<FoodPrefItem title='Good nutritional quality (Nutri-Score)' modalContent='The Nutri-Score is computed and can be taken into account for all products, even if is not displayed on the packageing' />
			<FoodPrefItem title='Salt in low quantity' modalContent='The salt level is taken into account by the Nutri-Score. Use this setting only if you are specifically on a low salt diet.' />
			<FoodPrefItem title='Sugars in low quanity' modalContent='The sugars level is taken into account by the Nutri-Score. Use this settings only if you are specifically on a low sugars diet.' />
			<FoodPrefItem title='Fat in low quantity'  modalContent='The fat level is taken into account by the Nutri-Score. Use this setting only if you are specifically on a low fat diet.'/>
			<FoodPrefItem title='Saturated fat in low quantity' modalContent='The saturated fat level is taken into account by the Nutri-Score. Use this setting only if you are specifically on a low saturated fat diet.' />
		</FoodPrefAccordianItem>
	)
}

export default NutritionalQualityAccordian;
