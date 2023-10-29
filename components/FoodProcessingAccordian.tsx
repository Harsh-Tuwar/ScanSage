import React from 'react';
import FoodPrefItem from './FoodPrefItem';
import FoodPrefAccordianItem from './FoodPrefAccordianItem';

const FoodProcessingAccordian = () => {
	return (
		<FoodPrefAccordianItem title='Food Processing' id='5'>
			<FoodPrefItem title='No or little food processing (NOVA group)' />
			<FoodPrefItem title='No or fea additives' />
		</FoodPrefAccordianItem>
	);
}

export default FoodProcessingAccordian;
