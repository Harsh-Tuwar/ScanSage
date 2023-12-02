import { uppercaseFirstLetter } from '.';
import { FoodFactsProduct, Nutriments } from '../api/api-types';

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

export const getIngreAnalysisModalContent = (
	product: FoodFactsProduct | null,
	selectedModalTag: string
) => {
	const modalContentObj = {
		title: '',
		content: '',
		showWarning: false,
		unrecognizedStr: ''
	};

	if (!product) {
		return modalContentObj;
	}

	const noBadIngre = selectedModalTag.includes('free');

	if (product && product.ingredients_analysis_tags) {
		if (!selectedModalTag.includes('unknown')) { // not unknown

			// block for palm oil
			if (selectedModalTag.includes('palm-oil')) {
				modalContentObj.title = !noBadIngre ? '🌴 Contains Palm oil!' : '🌴 No Palm oil!';

				if (noBadIngre) {
					modalContentObj.content = 'No ingredients containing palm oil detected';
				} else {
					modalContentObj.content = `Ingredients that containes palm oil: ${product.unknownIngredients.palmOilContent.map((item) => {
						const newItem = item.split(':')[1].replaceAll('-', ' ');

						return uppercaseFirstLetter(newItem);
					})}`
				}

				if (product.unknownIngredients.unknownContentPalmOil) {
					modalContentObj.unrecognizedStr = `Unrecognized ingredients: ${product.unknownIngredients.unknownContentVeg.map((item) => {
						const newItem = item.split(':')[1].replaceAll('-', ' ');

						return uppercaseFirstLetter(newItem);
					})}`;
				}
			}

			// block for vegan
			if (selectedModalTag.includes('vegan')) {
				const isNonVeganTag = selectedModalTag.includes('non');

				modalContentObj.title = isNonVeganTag ? '🍖 Non Vegan' : '🌱 Vegan';

				if (isNonVeganTag) {
					modalContentObj.content = `Non-vegan ingredients: ${product.unknownIngredients.nonVeganContent.map((item) => {
						const newItem = item.split(':')[1].replaceAll('-', ' ');

						return uppercaseFirstLetter(newItem);
					})}`;
				} else {
					modalContentObj.content = 'No non-vegan ingredients detected';

					if (product.unknownIngredients.unknownContentVegan) {
						modalContentObj.unrecognizedStr = `Unrecognized ingredients: ${product.unknownIngredients.unknownContentVegan.map((item) => {
							const newItem = item.split(':')[1].replaceAll('-', ' ');
	
							return uppercaseFirstLetter(newItem);
						})}`;
					}
				}

			}

			// block for vegetarian
			if (selectedModalTag.includes('vegetarian')) {
				modalContentObj.title = '🥦 Vegeterian';

				modalContentObj.content = `No vegetarian ingredients detected`;

				if (product.unknownIngredients.unknownContentVeg.length) {
					modalContentObj.unrecognizedStr = `Unrecognized ingredients: ${product.unknownIngredients.unknownContentVeg.map((item) => {
						const newItem = item.split(':')[1].replaceAll('-', ' ');

						return uppercaseFirstLetter(newItem);
					})}`;
				}
			}
		} else {
			modalContentObj.content = 'Unrecognized ingredients: ';

			if (selectedModalTag.includes('vegetarian')) {
				modalContentObj.title = '🥦 Vegetarian Status Unknown!';
				
				modalContentObj.content += `${product.unknownIngredients.unknownContentVeg.map((item, index) => {
					const newItem = item.split(':')[1].replaceAll('-', ' ');

					return uppercaseFirstLetter(newItem) + `${product.unknownIngredients.unknownContentVeg.length - 1 === index ? '' : ', '}`;
				})}`;
			}

			if (selectedModalTag.includes('palm-oil')) {
				modalContentObj.title = '🌴 Palm oil Status Unknown!';

				modalContentObj.unrecognizedStr += `${product.unknownIngredients.unknownContentPalmOil.map((item, index) => {
					const newItem = item.split(':')[1].replaceAll('-', ' ');

					return uppercaseFirstLetter(newItem) + `${product.unknownIngredients.unknownContentPalmOil.length - 1 === index ? '' : ', '}`;
				})}`;
			}

			if (selectedModalTag.includes('vegan')) {
				modalContentObj.title = '🌱 Vegan Status Unknown!';

				modalContentObj.unrecognizedStr += `${product.unknownIngredients.unknownContentVegan.map((item, index) => {
					const newItem = item.split(':')[1].replaceAll('-', ' ');

					return uppercaseFirstLetter(newItem) + `${product.unknownIngredients.unknownContentVegan.length - 1 === index ? '' : ', '}`;
				})}`;
			}
		}
	}

	return modalContentObj;
};