export interface Nutriments {
	carbohydrates: number;
	carbohydrates_100g: number;
	carbohydrates_unit: string;
	carbohydrates_value: number;
	energy: number;
	energyKcal: number;
	energyKcal_100g: number;
	energyKcal_unit: string;
	energyKcal_value: number;
	energyKcal_value_computed: number;
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
	proteins: number;
	proteins_100g: number;
	proteins_unit: string;
	proteins_value: number;
	salt: number;
	salt_100g: number;
	salt_unit: string;
	salt_value: number;
	saturatedFat: number;
	saturatedFat_100g: number;
	saturatedFat_unit: string;
	saturatedFat_value: number;
	sodium: number;
	sodium_100g: number;
	sodium_unit: string;
	sodium_value: number;
	sugars: number;
	sugars_100g: number;
	sugars_unit: string;
	sugars_value: number
}

interface SelectedImageProps {
	display: { fr: string };
	small: { fr: string };
	thumb: { fr: string };
}

export interface SelectedImages {
	front: SelectedImageProps;
	nutrition: SelectedImageProps;
}

export interface Product {
	code: string;
	name: string;
	nutriments: Nutriment;
	images: SelectedImages;
}