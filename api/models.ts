import { Nutriments, FoodFactsProduct, SelectedImages, UnknownIngredientsAnalysis } from './api-types';

type NutrimentHashmap = { [key: string]: string };

export const HUMAN_READABLE_NUTRIMENT_HASHMAP: NutrimentHashmap = {
	calcium_100g: 'Calcium (100g)',
	calcium_unit: 'Calcium (unit)',
	carbohydrates_100g: 'Carbohydrates (100g)',
	carbohydrates_unit: 'Carbohydrates (unit)',
	cholesterol_100g: 'Cholesterol (100g)',
	cholesterol_unit: 'Cholesterol (unit)',
	energy_kcal_100g: 'Energy (kCal/100g)',
	energy_kcal_unit: 'Energy (unit)',
	energy_100g: 'Energy (100g)',
	energy_unit: 'Energy (unit)',
	fat_100g: 'Fat (100g)',
	fat_unit: 'Fat (unit)',
	fiber_100g: 'Fiber (100g)',
	fiber_unit: 'Fiber (unit)',
	fruits_vegetables_legumes_estimate_from_ingredients_100g: 'Fruits Vegetables Legumes Estimate (per 100g)',
	fruits_vegetables_legumes_estimate_from_ingredients_serving: 'Fruits Vegetables Legumes Estimate (per serving)',
	fruits_vegetables_nuts_estimate_from_ingredients_100g: 'Fruits Vegetables Nuts Estimate (per 100g)',
	fruits_vegetables_nuts_estimate_from_ingredients_serving: 'Fruits Vegetables Nuts Estimate (per serving)',
	iron_100g: 'Iron (100g)',
	iron_unit: 'Iron (unit)',
	nova_group_100g: 'Nova Group (100g)',
	nutrition_score_fr_100g: 'Nutrition Score (100g)',
	proteins_100g: 'Proteins (100g)',
	proteins_unit: 'Proteins (unit)',
	salt_100g: 'Salt (100g)',
	salt_unit: 'Salt (unit)',
	saturated_fat_100g: 'Saturated Fat (100g)',
	saturated_fat_unit: 'Saturated Fat (unit)',
	sodium_100g: 'Sodium (100g)',
	sodium_unit: 'Sodium (unit)',
	sugars_100g: 'Sugars (100g)',
	sugars_unit: 'Sugars (unit)',
	trans_fat_100g: 'Trans Fat (100g)',
	trans_fat_unit: 'Trans Fat (unit)',
	vitamin_a_100g: 'Vitamin A (100g)',
	vitamin_a_unit: 'Vitamin A (unit)',
	vitamin_c_100g: 'Vitamin C (100g)',
	vitamin_c_unit: 'Vitamin C (unit)',
	// calcium: 'Calcium',
	// calcium_serving: 'Calcium Serving',
	// calcium_value: 'Calcium (value)',
	// carbohydrates: 'Carbohydrates',
	// carbohydrates_value: 'Carbohydrates (value)',
	// cholesterol: 'Cholesterol',
	// cholesterol_serving: 'Cholesterol (serving)',
	// cholesterol_value: 'Cholesterol (value)',
	// energy: 'Energy',
	// energy_kcal: 'Energy (kCal)',
	// energy_kcal_value: 'Energy (value)',
	// energy_kcal_value_computed: 'Energy kCal Value Computed',
	// energy_value: 'Energy (value)',
	// fat: 'Fat',
	// fat_value: 'Fat (value)',
	// fiber: 'Fiber',
	// fiber_value: 'Fiber (value)',
	// iron: 'Iron',
	// iron_serving: 'Iron (serving)',
	// iron_value: 'Iron (value)',
	// nova_group: 'Nova Group',
	// nova_group_serving: 'Nova Group (serving)',
	// nutrition_score_fr: 'Nutrition Score',
	// proteins: 'Proteins',
	// proteins_value: 'Proteins (value)',
	// salt: 'Salt',
	// salt_value: 'Salt (value)',
	// saturated_fat: 'Saturated Fat',
	// saturated_fat_value: 'Saturated Fat (value)',
	// sodium: 'Sodium',
	// sodium_value: 'Sodium (value)',
	// sugars: 'Sugars',
	// sugars_value: 'Sugars (value)',
	// trans_fat: 'Trans Fat',
	// trans_fat_serving: 'Trans Fat (serving)',
	// trans_fat_value: 'Trans Fat (value)',
	// vitamin_a: 'Vitamin A',
	// vitamin_a_serving: 'Vitamin A (serving)',
	// vitamin_a_value: 'Vitamin A (value)',
	// vitamin_c: 'Vitamin C',
	// vitamin_c_serving: 'Vitamin C (serving)',
	// vitamin_c_value: 'Vitamin C (value)'
}

const _rawNutrimentsToNutriment = (_rawNutriment: any): Nutriments => {
	const nutriments = _getEmptyNutriment();

	nutriments.calcium = _rawNutriment['calcium'];
	nutriments.calcium_100g = _rawNutriment['calcium_100g'];
	nutriments.calcium_serving = _rawNutriment['calcium_serving'];
	nutriments.calcium_unit = _rawNutriment['calcium_unit'];
	nutriments.calcium_value = _rawNutriment['calcium_value'];
	
	nutriments.carbohydrates = _rawNutriment['carbohydrates'];
	nutriments.carbohydrates_100g = _rawNutriment['carbohydrates_100g'];
	nutriments.carbohydrates_unit = _rawNutriment['carbohydrates_unit'];
	nutriments.carbohydrates_value = _rawNutriment['carbohydrates_value'];

	nutriments.cholesterol = _rawNutriment['cholesterol'];
	nutriments.cholesterol_100g = _rawNutriment['cholesterol_100g'];
	nutriments.cholesterol_serving = _rawNutriment['cholesterol_serving'];
	nutriments.cholesterol_unit = _rawNutriment['cholesterol_unit'];
	nutriments.cholesterol_value = _rawNutriment['cholesterol_value'];

	nutriments.energy = _rawNutriment['energy'];
	nutriments.energy_kcal = _rawNutriment['energy-kcal'];
	nutriments.energy_kcal_100g = _rawNutriment['energy-kcal_100g'];
	nutriments.energy_kcal_unit = _rawNutriment['energy-kcal_unit'];
	nutriments.energy_kcal_value = _rawNutriment['energy-kcal_value'];
	nutriments.energy_kcal_value_computed = _rawNutriment['energy-kcal_value_computed'];
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

	nutriments.fruits_vegetables_legumes_estimate_from_ingredients_100g = _rawNutriment['fruits-vegetables-legumes-estimate-from-ingredients_100g'];
	nutriments.fruits_vegetables_legumes_estimate_from_ingredients_serving = _rawNutriment['fruits-vegetables-legumes-estimate-from-ingredients_serving'];
	nutriments.fruits_vegetables_nuts_estimate_from_ingredients_100g = _rawNutriment['fruits-vegetables-nuts-estimate-from-ingredients_100g'];
	nutriments.fruits_vegetables_nuts_estimate_from_ingredients_serving = _rawNutriment['fruits-vegetables-nuts-estimate-from-ingredients_serving'];

	nutriments.iron = _rawNutriment['iron'];
	nutriments.iron_100g = _rawNutriment['iron_100g'];
	nutriments.iron_serving = _rawNutriment['iron_serving'];
	nutriments.iron_unit = _rawNutriment['iron_unit'];
	nutriments.iron_value = _rawNutriment['iron_value'];

	nutriments.nova_group = _rawNutriment['nova_group'];
	nutriments.nova_group_100g = _rawNutriment['nova_group_100g'];
	nutriments.nova_group_serving = _rawNutriment['nova_group_serving'];
	nutriments.nutrition_score_fr = _rawNutriment['nutrition_score_fr'];
	nutriments.nutrition_score_fr_100g = _rawNutriment['nutrition_score_fr_100g'];

	nutriments.proteins = _rawNutriment['proteins'];
	nutriments.proteins_100g = _rawNutriment['proteins_100g'];
	nutriments.proteins_unit = _rawNutriment['proteins_unit'];
	nutriments.proteins_value = _rawNutriment['proteins_value'];

	nutriments.salt = _rawNutriment['salt'];
	nutriments.salt_100g = _rawNutriment['salt_100g'];
	nutriments.salt_unit = _rawNutriment['salt_unit'];
	nutriments.salt_value = _rawNutriment['salt_value'];

	nutriments.saturated_fat = _rawNutriment['saturated-fat'];
	nutriments.saturated_fat_100g = _rawNutriment['saturated-fat_100g'];
	nutriments.saturated_fat_unit = _rawNutriment['saturated-fat_unit'];
	nutriments.saturated_fat_value = _rawNutriment['saturated-fat_value'];

	nutriments.sodium = _rawNutriment['sodium'];
	nutriments.sodium_100g = _rawNutriment['sodium_100g'];
	nutriments.sodium_unit = _rawNutriment['sodium_unit'];
	nutriments.sodium_value = _rawNutriment['sodium_value'];

	nutriments.sugars = _rawNutriment['sugars'];
	nutriments.sugars_100g = _rawNutriment['sugars_100g'];
	nutriments.sugars_unit = _rawNutriment['sugars_unit'];
	nutriments.sugars_value = _rawNutriment['sugars_value'];

	nutriments.trans_fat =  _rawNutriment['trans_fat'];
	nutriments.trans_fat_100g =  _rawNutriment['trans_fat_100g'];
	nutriments.trans_fat_serving =  _rawNutriment['trans_fat_serving'];
	nutriments.trans_fat_unit =  _rawNutriment['trans_fat_unit'];
	nutriments.trans_fat_value =  _rawNutriment['trans_fat_value'];

	nutriments.vitamin_a =  _rawNutriment['vitamin_a'];
	nutriments.vitamin_a_100g =  _rawNutriment['vitamin_a_100g'];
	nutriments.vitamin_a_serving =  _rawNutriment['vitamin_a_serving'];
	nutriments.vitamin_a_unit =  _rawNutriment['vitamin_a_unit'];
	nutriments.vitamin_a_value =  _rawNutriment['vitamin_a_value'];

	nutriments.vitamin_c =  _rawNutriment['vitamin_c'];
	nutriments.vitamin_c_100g =  _rawNutriment['vitamin_c_100g'];
	nutriments.vitamin_c_serving =  _rawNutriment['vitamin_c_serving'];
	nutriments.vitamin_c_unit =  _rawNutriment['vitamin_c_unit'];
	nutriments.vitamin_c_value =  _rawNutriment['vitamin_c_value'];

	return nutriments;
}

const _rawProdImagesToImages = (_rawProdImages: any): SelectedImages => {
	const images = _getEmptyImages();

	images.front.display.fr = _rawProdImages.front.display.fr;
	images.front.small.fr = _rawProdImages.front.small.fr;
	images.front.thumb.fr = _rawProdImages.front.thumb.fr;

	images.front.display.en = _rawProdImages.front.display.en;
	images.front.small.en = _rawProdImages.front.small.en;
	images.front.thumb.en = _rawProdImages.front.thumb.en;

	images.nutrition.display.fr = _rawProdImages.nutrition.display.fr;
	images.nutrition.small.fr = _rawProdImages.nutrition.small.fr;
	images.nutrition.thumb.fr = _rawProdImages.nutrition.thumb.fr;

	images.nutrition.display.en = _rawProdImages.nutrition.display.en;
	images.nutrition.small.en = _rawProdImages.nutrition.small.en;
	images.nutrition.thumb.en = _rawProdImages.nutrition.thumb.en;

	return images;
}

export const _getEmptyNutriment = (): Nutriments => {
	return {
		calcium: 0,
		calcium_100g: 0,
		calcium_serving: 0,
		calcium_unit: '',
		calcium_value: 0,
		carbohydrates: 0,
		carbohydrates_100g: 0,
		carbohydrates_unit: '',
		carbohydrates_value: 0,
		cholesterol: 0,
		cholesterol_100g: 0,
		cholesterol_serving: 0,
		cholesterol_unit: '',
		cholesterol_value: 0,
		energy: 0,
		energy_kcal: 0,
		energy_kcal_100g: 0,
		energy_kcal_unit: '',
		energy_kcal_value: 0,
		energy_kcal_value_computed: 0,
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
		fruits_vegetables_legumes_estimate_from_ingredients_100g: 0,
		fruits_vegetables_legumes_estimate_from_ingredients_serving: 0,
		fruits_vegetables_nuts_estimate_from_ingredients_100g: 0,
		fruits_vegetables_nuts_estimate_from_ingredients_serving: 0,
		iron: 0,
		iron_100g: 0,
		iron_serving: 0,
		iron_unit: '',
		iron_value: 0,
		nova_group: 0,
		nova_group_100g: 0,
		nova_group_serving: 0,
		nutrition_score_fr: 0,
		nutrition_score_fr_100g: 0,
		proteins: 0,
		proteins_100g: 0,
		proteins_unit: '',
		proteins_value: 0,
		salt: 0,
		salt_100g: 0,
		salt_unit: '',
		salt_value: 0,
		saturated_fat: 0,
		saturated_fat_100g: 0,
		saturated_fat_unit: '',
		saturated_fat_value: 0,
		sodium: 0,
		sodium_100g: 0,
		sodium_unit: '',
		sodium_value: 0,
		sugars: 0,
		sugars_100g: 0,
		sugars_unit: '',
		sugars_value: 0,
		trans_fat: 0,
		trans_fat_100g: 0,
		trans_fat_serving: 0,
		trans_fat_unit: '',
		trans_fat_value: 0,
		vitamin_a: 0,
		vitamin_a_100g: 0,
		vitamin_a_serving: 0,
		vitamin_a_unit: '',
		vitamin_a_value: 0,
		vitamin_c: 0,
		vitamin_c_100g: 0,
		vitamin_c_serving: 0,
		vitamin_c_unit: '',
		vitamin_c_value: 0
	}
}

export const _getEmptyImages = (): SelectedImages => {
	return {
		front: {
			display: {
				fr: '',
				en: ''
			},
			small: {
				fr: '',
				en: ''
			},
			thumb: {
				fr: '',
				en: ''
			}
		},
		nutrition: {
			display: {
				fr: '',
				en: ''
			},
			small: {
				fr: '',
				en: ''
			},
			thumb: {
				fr: '',
				en: ''
			}
		}
	}
}

export const _getEmptyProduct = (): FoodFactsProduct => {
	return {
		code: '',
		title: '',
		images: _getEmptyImages(),
		mainImg: {
			image_front_small_url: '',
			image_front_thumb_url: '',
			image_front_url: ''
		},
		nutrient_levels: {
			fat: '',
			salt: '',
			saturated_fat: '',
			sugars: ''
		},
		nutriments: _getEmptyNutriment(),
		ingredients: [],
		nutriscore_grade: '',
		nutriscore_score: '',
		allergens_tags: [],
		additives_tags: [],
		unknownIngredients: {
			unknownContentPalmOil: [],
			unknownContentVeg: [],
			unknownContentVegan: [],
			nonVeganContent: [],
			palmOilContent: [],
			vegContent: []
		}
	};
};

export const _rawUnknownIngresToProdUnknownIngres = (_rawUnknownIngres: any): UnknownIngredientsAnalysis => {
	const unknownIngres: UnknownIngredientsAnalysis = {
		unknownContentPalmOil: [],
		unknownContentVeg: [],
		unknownContentVegan: [],
		nonVeganContent: [],
		palmOilContent: [],
		vegContent: []
	};

	if (_rawUnknownIngres) {
		if (_rawUnknownIngres['en:palm-oil-content-unknown']) {
			unknownIngres.unknownContentPalmOil = _rawUnknownIngres['en:palm-oil-content-unknown'];
		}

		if (_rawUnknownIngres['en:vegan-status-unknown']) {
			unknownIngres.unknownContentVegan = _rawUnknownIngres['en:vegan-status-unknown'];
		}

		if (_rawUnknownIngres['en:vegetarian-status-unknown']) {
			unknownIngres.unknownContentVeg = _rawUnknownIngres['en:vegetarian-status-unknown'];
		}

		if (_rawUnknownIngres['en:non-vegan']) {
			unknownIngres.nonVeganContent = _rawUnknownIngres['en:non-vegan'];
		}

		if (_rawUnknownIngres['en:palm-oil']) {
			unknownIngres.palmOilContent = _rawUnknownIngres['en:palm-oil'];
		}
	}

	return unknownIngres;
};

export const _rawProductToProduct = (_rawResponse: any): FoodFactsProduct => {
	const product = _getEmptyProduct();
	const rawRespProductData = _rawResponse.product;

	product.code = _rawResponse.code;
	product.title = rawRespProductData.product_name;
	product.nutriments = _rawNutrimentsToNutriment(rawRespProductData.nutriments);
	product.images = _rawProdImagesToImages(rawRespProductData.selected_images);
	product.ingredients = rawRespProductData.ingredients ?? [];
	product.ingredients_analysis_tags = rawRespProductData.ingredients_analysis_tags ?? [];
	product.ingredients_tags = rawRespProductData.ingredients_tags ?? [];
	product.allergens_tags = rawRespProductData.allergens_tags ?? [];
	product.additives_tags = rawRespProductData.additives_tags ?? [];
	product.unknownIngredients = _rawUnknownIngresToProdUnknownIngres(rawRespProductData.ingredients_analysis);

	if (rawRespProductData.hasOwnProperty('nutrient_levels')) {
		product.nutrient_levels = rawRespProductData['nutrient_levels'];
	}

	if (rawRespProductData.hasOwnProperty('nutriscore_grade')) {
		product.nutriscore_grade = rawRespProductData['nutriscore_grade'];
	}

	if (rawRespProductData.hasOwnProperty('nutriscore_score')) {
		product.nutriscore_score = rawRespProductData['nutriscore_score'];
	}

	product.mainImg = {
		image_front_small_url: rawRespProductData['image_front_small_url'] ?? '',
		image_front_thumb_url: rawRespProductData['image_front_thumb_url'] ?? '',
		image_front_url: rawRespProductData['image_front_url'] ?? '',
	};
	
	return product;
};
