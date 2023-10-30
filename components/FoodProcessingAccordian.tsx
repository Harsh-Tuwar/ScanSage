import React, { PropsWithChildren } from 'react';
import FoodPrefItem from './FoodPrefItem';
import FoodPrefAccordianItem from './FoodPrefAccordianItem';

interface FoodProcessingAccordianProps extends PropsWithChildren {
	setFoodProcessingSelection: (value: any) => void;
	foodProcessing: {
		noOrLittleProcessing: string;
		noOrFewAdditives: string;
	};
}

const FoodProcessingAccordian = ({
	foodProcessing,
	setFoodProcessingSelection
}: FoodProcessingAccordianProps) => {
	return (
		<FoodPrefAccordianItem title='Food Processing' id='5'>
			<FoodPrefItem
				title='No or little food processing (NOVA group)'
				selectedValue={foodProcessing.noOrLittleProcessing}
				setValue={(newValue) => { setFoodProcessingSelection({ 'noOrLittleProcessing': newValue }) }}
			/>
			<FoodPrefItem
				title='No or fea additives'
				selectedValue={foodProcessing.noOrFewAdditives}
				setValue={(newValue) => { setFoodProcessingSelection({ 'noOrFewAdditives': newValue }) }}
			/>
		</FoodPrefAccordianItem>
	);
}

export default FoodProcessingAccordian;
