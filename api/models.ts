import { Nutriments, Product, SelectedImages } from './api-types';


const _rawNutrimentsToNutriment = (_rawNutriment: any): Nutriments => {
	const nutriments = _getEmptyNutriment();
	
	nutriments.carbohydrates = _rawNutriment.carbohydrates;
	nutriments.carbohydrates_100g = _rawNutriment.carbohydrates_100g;
	nutriments.carbohydrates_unit = _rawNutriment.carbohydrates_unit;
	nutriments.carbohydrates_value = _rawNutriment.carbohydrates_value;

	nutriments.energy = _rawNutriment['energy'];
	nutriments.energyKcal = _rawNutriment['energy-kcal'];
	nutriments.energyKcal_100g = _rawNutriment['energy-kcal_100g'];
	nutriments.energyKcal_unit = _rawNutriment['energy-kcal_unit'];
	nutriments.energyKcal_value = _rawNutriment['energy-kcal_value'];
	nutriments.energyKcal_value_computed = _rawNutriment['energy-kcal_value_computed'];
	nutriments.energy_100g = _rawNutriment['energy_100g'];
	nutriments.energy_unit = _rawNutriment['energy_unit'];
	nutriments.energy_value = _rawNutriment['energy_value'];

	nutriments.fat = _rawNutriment['fat'];
	nutriments.fat_100g = _rawNutriment['fat_100g'];
	nutriments.fat_unit = _rawNutriment['fat_unit'];
	nutriments.fat_value = _rawNutriment['fat_value'];

	nutriments.fiber = _rawNutriment['fiber'];
	nutriments.fiber_100g = _rawNutriment['fiber_100g']
	nutriments.fiber_unit = _rawNutriment['fiber_unit'];
	nutriments.fiber_value = _rawNutriment['fiber_value'];

	nutriments.proteins = _rawNutriment['proteins'];
	nutriments.proteins_100g = _rawNutriment['proteins_100g'];
	nutriments.proteins_unit = _rawNutriment['proteins_unit'];
	nutriments.proteins_value = _rawNutriment['proteins_value'];

	nutriments.salt = _rawNutriment['salt'];
	nutriments.salt_100g = _rawNutriment['salt_100g'];
	nutriments.salt_unit = _rawNutriment['salt_unit'];
	nutriments.salt_value = _rawNutriment['salt_value'];

	nutriments.saturatedFat = _rawNutriment['saturated-fat'];
	nutriments.saturatedFat_100g = _rawNutriment['saturated-fat_100g'];
	nutriments.saturatedFat_unit = _rawNutriment['saturated-fat_unit'];
	nutriments.saturatedFat_value = _rawNutriment['saturated-fat_value'];

	nutriments.sodium = _rawNutriment['sodium'];
	nutriments.sodium_100g = _rawNutriment['sodium_100g'];
	nutriments.sodium_unit = _rawNutriment['sodium_unit'];
	nutriments.sodium_value = _rawNutriment['sodium_value'];

	nutriments.sugars = _rawNutriment['sugars'];
	nutriments.sugars_100g = _rawNutriment['sugars_100g'];
	nutriments.sugars_unit = _rawNutriment['sugars_unit'];
	nutriments.sugars_value = _rawNutriment['sugars_value'];

	return nutriments;
}

const _rawProdImagesToImages = (_rawProdImages: any): SelectedImages => {
	const images = _getEmptyImages();

	images.front.display.fr = _rawProdImages.front.display.fr;
	images.front.small.fr = _rawProdImages.front.small.fr;
	images.front.thumb.fr = _rawProdImages.front.thumb.fr;

	images.nutrition.display.fr = _rawProdImages.nutrition.display.fr;
	images.nutrition.small.fr = _rawProdImages.nutrition.small.fr;
	images.nutrition.thumb.fr = _rawProdImages.nutrition.thumb.fr;

	return images;
}

export const _getEmptyNutriment = (): Nutriments => {
	return {
		carbohydrates: 0,
		carbohydrates_100g: 0,
		carbohydrates_unit: '',
		carbohydrates_value: 0,
		energy: 0,
		energyKcal: 0,
		energyKcal_100g: 0,
		energyKcal_unit: '',
		energyKcal_value: 0,
		energyKcal_value_computed: 0,
		energy_100g: 0,
		energy_unit: '',
		energy_value: 0,
		fat: 0,
		fat_100g: 0,
		fat_unit: '',
		fat_value: 0,
		fiber: 0,
		fiber_100g: 0,
		fiber_unit: '',
		fiber_value: 0,
		proteins: 0,
		proteins_100g: 0,
		proteins_unit: '',
		proteins_value: 0,
		salt: 0,
		salt_100g: 0,
		salt_unit: '',
		salt_value: 0,
		saturatedFat: 0,
		saturatedFat_100g: 0,
		saturatedFat_unit: '',
		saturatedFat_value: 0,
		sodium: 0,
		sodium_100g: 0,
		sodium_unit: '',
		sodium_value: 0,
		sugars: 0,
		sugars_100g: 0,
		sugars_unit: '',
		sugars_value: 0
	}
}

export const _getEmptyImages = (): SelectedImages => {
	return {
		front: {
			display: {
				fr: ''
			},
			small: {
				fr: ''
			},
			thumb: {
				fr: ''
			}
		},
		nutrition: {
			display: {
				fr: ''
			},
			small: {
				fr: ''
			},
			thumb: {
				fr: ''
			}
		}
	}
}

export const _getEmptyProduct = (): Product => {
	return {
		code: '',
		name: '',
		images: _getEmptyImages(),
		nutriments: _getEmptyNutriment()
	};
};

export const _rawProductToProduct = (_rawResponse: any): Product => {
	const product = _getEmptyProduct();
	const rawRespProductData = _rawResponse.product;

	product.code = _rawResponse.code;
	product.name = rawRespProductData.product_name;
	product.nutriments = _rawNutrimentsToNutriment(rawRespProductData.nutriments);
	product.images = _rawProdImagesToImages(rawRespProductData.selected_images);
	
	return product;
};
