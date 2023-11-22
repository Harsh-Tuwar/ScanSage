export interface Nutriments {
	calcium: number;
	calcium_100g: number;
	calcium_serving: number;
	calcium_unit: string;
	calcium_value: number;
	carbohydrates: number;
	carbohydrates_100g: number;
	carbohydrates_unit: string;
	carbohydrates_value: number;
	cholesterol: number;
	cholesterol_100g: number;
	cholesterol_serving: number,
	cholesterol_unit: string;
	cholesterol_value: number;
	energy: number;
	energy_kcal: number;
	energy_kcal_100g: number;
	energy_kcal_unit: string;
	energy_kcal_value: number;
	energy_kcal_value_computed: number;
	energy_100g: number;
	energy_unit: string;
	energy_value: number;
	fat: number;
	fat_100g: number;
	fat_unit: string;
	fat_value: number;
	fiber: number;
	fiber_100g: number;
	fiber_unit: string;
	fiber_value: number;
	fruits_vegetables_legumes_estimate_from_ingredients_100g: number,
	fruits_vegetables_legumes_estimate_from_ingredients_serving: number,
	fruits_vegetables_nuts_estimate_from_ingredients_100g: number,
	fruits_vegetables_nuts_estimate_from_ingredients_serving: number,
	iron: number;
	iron_100g: number;
	iron_serving: number;
	iron_unit: string;
	iron_value: number;
	nova_group: number;
	nova_group_100g: number;
	nova_group_serving: number;
	nutrition_score_fr: number;
	nutrition_score_fr_100g: number;
	proteins: number;
	proteins_100g: number;
	proteins_unit: string;
	proteins_value: number;
	salt: number;
	salt_100g: number;
	salt_unit: string;
	salt_value: number;
	saturated_fat: number;
	saturated_fat_100g: number;
	saturated_fat_unit: string;
	saturated_fat_value: number;
	sodium: number;
	sodium_100g: number;
	sodium_unit: string;
	sodium_value: number;
	sugars: number;
	sugars_100g: number;
	sugars_unit: string;
	sugars_value: number;
	trans_fat: number;
	trans_fat_100g: number;
	trans_fat_serving: number;
	trans_fat_unit: string;
	trans_fat_value: number;
	vitamin_a: number;
	vitamin_a_100g: number;
	vitamin_a_serving: number;
	vitamin_a_unit: string;
	vitamin_a_value: number;
	vitamin_c: number;
	vitamin_c_100g: number;
	vitamin_c_serving: number;
	vitamin_c_unit: string;
	vitamin_c_value: number;
}

interface SelectedImageProps {
	display: { fr: string, en: string };
	small: { fr: string, en: string };
	thumb: { fr: string, en: string };
}

interface Ingredient {
	id: string;
	percent?: number;
	percent_estimate: number;
	percent_max: number;
	percent_min: number;
	rank: number;
	text: string;
	vegan: boolean;
	vegetarian: boolean;
	ciqual_food_code?: string;
	from_palm_oil?: string;
}

export interface SelectedImages {
	front: SelectedImageProps;
	nutrition: SelectedImageProps;
}

interface FoodFactsProductImages {
	image_front_small_url: string;
	image_front_thumb_url: string;
	image_front_url: string;
}

interface NutrientLevels {
	fat: string;
	salt: string;
	saturated_fat: string;
	sugars: string;
}

// ingredients_analysis
export interface UnknownIngredientsAnalysis {
	unknownContentPalmOil: string[];
	unknownContentVegan: string[];
	unknownContentVeg: string[];
	nonVeganContent: string[];
	palmOilContent: string[];
	vegContent: string[];
}

export interface FoodFactsProduct {
	code: string;
	title: string;
	additives_tags: string[];
	allergens_tags: string[];
	nutriments: Nutriments;
	images: SelectedImages;
	mainImg: FoodFactsProductImages;
	ingredients: Ingredient[];
	ingredients_tags?: string[];
	nutrient_levels: NutrientLevels;
	ingredients_analysis_tags?: string[];
	nutriscore_grade: string;
	nutriscore_score: string;
	unknownIngredients: UnknownIngredientsAnalysis;
}