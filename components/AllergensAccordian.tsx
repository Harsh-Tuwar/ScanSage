import React, { PropsWithChildren } from 'react';
import FoodPrefItem from './FoodPrefItem';
import { Banner, Text, useTheme } from 'react-native-paper';
import FoodPrefAccordianItem from './FoodPrefAccordianItem';

interface AllergensAccordianPros extends PropsWithChildren {
	setAllergenSelection: (value: any) => void;
	allergens: {
		withoutGluten: string;
		withoutMilk: string;
		withoutEggs: string;
		withoutNuts: string;
		withoutPeanuts: string;
		withoutSesameSeeds: string;
		withoutSoyabeans: string;
		withoutCelery: string;
		withoutMustard: string;
		withoutLupin: string;
		withoutFish: string;
		withoutCrusteceans: string;
		withoutSulpharDioxideNdSulphites: string;
	};
}

// const allergenItems = [
// 	{ title: 'Without Gluten', key: 'withoutGluten' },
// 	{ title: 'Without Milk', key: 'withoutMilk' },
// 	{ title: 'Without Eggs', key: 'withoutEggs' },
// 	{ title: 'Without Nuts', key: 'withoutNuts' },
// 	{ title: 'Without Peanuts', key: 'withoutPeanuts' },
// 	{ title: 'Without Sesame Seeds', key: 'withoutSesameSeeds' },
// 	{ title: 'Without Soyabeans', key: 'withoutSoyabeans' },
// 	{ title: 'Without Celery', key: 'withoutCelery' },
// 	{ title: 'Without Mustard', key: 'withoutMustard' },
// 	{ title: 'Without Lupin', key: 'withoutLupin' },
// 	{ title: 'Without Fish', key: 'withoutFish' },
// 	{ title: 'Without Crustaceans', key: 'withoutCrusteceans' },
// 	{ title: 'Without Sulphur dioxide and sulphites', key: 'withoutSulpharDioxideNdSulphites' },
// ]

const AllergensAccordian = ({ allergens, setAllergenSelection }: AllergensAccordianPros) => {
	const theme = useTheme();

	return (
		<FoodPrefAccordianItem title='Allergens' id='2'>
			<Banner visible={true} collapsable={true} style={{
				backgroundColor: theme.colors.background,
				borderColor: theme.colors.onSurface,
				borderWidth: 1,
				marginBottom: 10,
				borderRadius: 5
			}}>
				<Text>There is always a possibility that data about allergens may be missing,
					incomplete, incorrect or that product's composition has changed. If you are
					allergic, always check the information on the actual product packaging.</Text>
			</Banner>
			<FoodPrefItem
				title='Without Gluten'
				selectedValue={allergens?.withoutGluten ?? '0'}
				setValue={(newValue) => { setAllergenSelection({ 'withoutGluten': newValue }) }}
			/>
			<FoodPrefItem
				title='Without Milk'
				selectedValue={allergens?.withoutMilk ?? '0'}
				setValue={(newValue) => { setAllergenSelection({ 'withoutMilk': newValue }) }}
			/>
			<FoodPrefItem
				title='Without Eggs'
				selectedValue={allergens?.withoutEggs ?? '0'}
				setValue={(newValue) => { setAllergenSelection({ 'withoutEggs': newValue }) }}
			/>
			<FoodPrefItem
				title='Without Nuts'
				selectedValue={allergens?.withoutNuts ?? '0'}
				setValue={(newValue) => { setAllergenSelection({ 'withoutNuts': newValue }) }}
			/>
			<FoodPrefItem
				title='Without Peanuts'
				selectedValue={allergens?.withoutPeanuts ?? '0'}
				setValue={(newValue) => { setAllergenSelection({ 'withoutPeanuts': newValue }) }}
			/>
			<FoodPrefItem
				title='Without Sesame Seeds'
				selectedValue={allergens?.withoutSesameSeeds ?? '0'}
				setValue={(newValue) => { setAllergenSelection({ 'withoutSesameSeeds': newValue }) }}
			/>
			<FoodPrefItem
				title='Without Soybeans'
				selectedValue={allergens?.withoutSoyabeans ?? '0'}
				setValue={(newValue) => { setAllergenSelection({ 'withoutSoyabeans': newValue }) }}
			/>
			<FoodPrefItem
				title='Without Celery'
				selectedValue={allergens?.withoutCelery ?? '0'}
				setValue={(newValue) => { setAllergenSelection({ 'withoutCelery': newValue }) }}
			/>
			<FoodPrefItem
				title='Without Mustard'
				selectedValue={allergens?.withoutMustard ?? '0'}
				setValue={(newValue) => { setAllergenSelection({ 'withoutMustard': newValue }) }}
			/>
			<FoodPrefItem
				title='Without Lupin'
				selectedValue={allergens?.withoutLupin ?? '0'}
				setValue={(newValue) => { setAllergenSelection({ 'withoutLupin': newValue }) }}
			/>
			<FoodPrefItem
				title='Without Fish'
				selectedValue={allergens?.withoutFish ?? '0'}
				setValue={(newValue) => { setAllergenSelection({ 'withoutFish': newValue }) }}
			/>
			<FoodPrefItem
				title='Without Crustaceans'
				selectedValue={allergens?.withoutCrusteceans ?? '0'}
				setValue={(newValue) => { setAllergenSelection({ 'withoutCrusteceans': newValue }) }}
			/>
			<FoodPrefItem
				title='Without Sulphur dioxide and sulphites'
				selectedValue={allergens?.withoutSulpharDioxideNdSulphites ?? '0'}
				setValue={(newValue) => { setAllergenSelection({ 'withoutSulpharDioxideNdSulphites': newValue }) }}
			/>
		</FoodPrefAccordianItem>
	);
}

export default AllergensAccordian;
