import { uppercaseFirstLetter } from '.';
import { Nutriments } from '../api/api-types';

export const getKeyValue_FromNutriLevel = (
	item: string,
	qnty: string,
	nutriment: Nutriments
) => {
	let finalString = uppercaseFirstLetter(item).replace('-', ' ');

	finalString += ` in ${qnty} quantity`;

	const nutriValue = nutriment[item.replace('-', '_') as keyof typeof nutriment];

	return finalString + ` (${parseFloat(nutriValue as string).toFixed(2)}%)`;
};

export const getNutrilevelColor = (qnty: string) => {
	switch (qnty) {
		case 'high':
			return 'red';
		
		case 'moderate':
			return 'yellow';
		
		case 'low':
			return 'lightgreen';
		
		default:
			return 'grey';
	}
};
