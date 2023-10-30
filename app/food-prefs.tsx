import React, { useEffect, useState } from 'react';
import { Divider, Text, List } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { helpers, foodPrefStyles } from '../styles';
import { ScrollView } from 'react-native-gesture-handler';
import { Image } from 'expo-image';
import foodPrefImg from '../assets/images/food-prefs.svg';

import AllergensAccordian from '../components/AllergensAccordian';
import NutritionalQualityAccordian from '../components/NutritionalQualityAccordian';
import IngredientsAccordian from '../components/IngredientsAccordian';
import FoodProcessingAccordian from '../components/FoodProcessingAccordian';
import { useUser } from '../context/UserContext';
import { router } from 'expo-router';

const defaultSelection = {
	allergens: {
		withoutGluten: '0',
		withoutMilk: '0',
		withoutEggs: '0',
		withoutNuts: '0',
		withoutPeanuts: '0',
		withoutSesameSeeds: '0',
		withoutSoyabeans: '0',
		withoutCelery: '0',
		withoutMustard: '0',
		withoutLupin: '0',
		withoutFish: '0',
		withoutCrusteceans: '0',
		withoutMolluscs: '0',
		withoutSulpharDioxideNdSulphites: '0'
	},
	nutriQuality: {
		goodNutri: '2',
		lowSalt: '0',
		lowSugar: '0',
		lowFat: '0',
		saturatedFat: '0',
	},
	ingredients: {
		vegan: '0',
		vegetarian: '0',
		palmOilFree: '0'
	},
	foodPrecessing: {
		noOrLittleProcessing: '1',
		noOrFewAdditives: '0'
	}
};

const FoodPrefSelection = () => {
	const { user } = useUser();
	const [prefSelection, setPrefSelection] = useState(defaultSelection);

	useEffect(() => {
		if (!user) {
			router.replace('/');
		}
	}, [user]);

	return (
		<ScrollView style={foodPrefStyles.container}>
			<SafeAreaView>
				<Image source={foodPrefImg} style={{ width: '100%', height: 200, resizeMode: 'contain' }} />
				<Divider style={helpers.mx10} />
				<Text >
					Choose what information about food matters most to you, in order to rank food according to your
					preferences, see the information you care about first, and get a compatibility summary.
				</Text>
				<List.AccordionGroup>
					<AllergensAccordian
						allergens={prefSelection.allergens}
						setAllergenSelection={(userSelection) => {
							const newPrefSelection = {
								...prefSelection.allergens,
								...userSelection
							};

							setPrefSelection({
								allergens: newPrefSelection,
								foodPrecessing: prefSelection.foodPrecessing,
								ingredients: prefSelection.ingredients,
								nutriQuality: prefSelection.nutriQuality
							});
						}}
					/>
					<NutritionalQualityAccordian
						nutriQuality={prefSelection.nutriQuality}
						setNutriQuality={(userSelection) => {
							const newPrefSelection = {
								...prefSelection.nutriQuality,
								...userSelection
							};

							setPrefSelection({
								allergens: prefSelection.allergens,
								foodPrecessing: prefSelection.foodPrecessing,
								ingredients: prefSelection.ingredients,
								nutriQuality: newPrefSelection
							});
						}}
					/>
					<IngredientsAccordian
						ingredients={prefSelection.ingredients}
						setIngredientSelection={(userSelection) => {
							const newPrefSelection = {
								...prefSelection.ingredients,
								...userSelection
							};

							setPrefSelection({
								ingredients: newPrefSelection,
								allergens: prefSelection.allergens,
								foodPrecessing: prefSelection.foodPrecessing,
								nutriQuality: prefSelection.nutriQuality
							});
						}}
					/>
					<FoodProcessingAccordian
						foodProcessing={prefSelection.foodPrecessing}
						setFoodProcessingSelection={(userSelection) => {
							const newPrefSelection = {
								...prefSelection.foodPrecessing,
								...userSelection
							};

							setPrefSelection({
								ingredients: prefSelection.ingredients,
								allergens: prefSelection.allergens,
								foodPrecessing: newPrefSelection,
								nutriQuality: prefSelection.nutriQuality
							});
						}}
					/>
				</List.AccordionGroup>
			</SafeAreaView>
		</ScrollView>
	)
}

export default FoodPrefSelection;
