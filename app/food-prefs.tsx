import React, { useEffect, useState } from 'react';
import { Text, List, Button, Portal, Snackbar, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { helpers, foodPrefStyles, SCREEN_HEIGHT } from '../styles';
import { ScrollView } from 'react-native-gesture-handler';
import * as fbDb from '../firebase/db';

import NutritionalQualityAccordian from '../components/NutritionalQualityAccordian';
import FoodProcessingAccordian from '../components/FoodProcessingAccordian';
import IngredientsAccordian from '../components/IngredientsAccordian';
import AllergensAccordian from '../components/AllergensAccordian';
import { router, useLocalSearchParams } from 'expo-router';
import { useUser } from '../context/UserContext';
import PageTitle from '../components/PageTitle';
import { View } from 'react-native';

interface PrefSelection {
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
		withoutMolluscs: string;
		withoutSulpharDioxideNdSulphites: string;
	};
	nutriQuality: {
		goodNutri: string;
		lowSalt: string;
		lowSugar: string;
		lowFat: string;
		saturatedFat: string;
	};
	ingredients: {
		vegan: string;
		vegetarian: string;
		palmOilFree: string;
	};
	foodPrecessing: {
		noOrLittleProcessing: string;
		noOrFewAdditives: string;
	};
}

const defaultSelection: PrefSelection = {
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
	const theme = useTheme();
	const { user, fbUser } = useUser();
	const [snackObj, setSnackObj] = useState({ visible: false, msg: '' });
	const [prefSelection, setPrefSelection] = useState(defaultSelection);
	const { newUser } = useLocalSearchParams<{ newUser?: string }>();

	useEffect(() => {
		if (!user) {
			router.replace('/');
		}
	}, [user]);

	useEffect(() => {
		if (fbUser && fbUser.foodPrefs) {
			setPrefSelection(fbUser.foodPrefs);
		}
	}, [fbUser]);

	const resetPreferences = async () => {
		let message = 'We are having hard time resetting the preferences, please try again later!';

		if (user?.uid) {
			await fbDb.upsertFoodPreferences(user.uid, defaultSelection);
			message = 'Preferences resetted!';
		}

		setSnackObj({ visible: true, msg: message });
	};

	const savePreferences = async (prefData: PrefSelection) => {
		if (user?.uid) {
			fbDb.upsertFoodPreferences(user?.uid, prefData)
				.then(() => {
					setSnackObj({
						visible: true,
						msg: 'Preferences Updated!'
					});
				}).catch((err) => {
					setSnackObj({
						visible: true,
						msg: err
					});
				});
		} else {
			setSnackObj({
				visible: true,
				msg: 'Error saving preferences, please try again later!'
			});
		}
	};

	return (
		<SafeAreaView style={{ ...helpers.p10, backgroundColor: theme.colors.background }}>
			<PageTitle>Food Prefs.</PageTitle>
			<ScrollView style={foodPrefStyles.container}>
				{!newUser && (
					<Button onPress={resetPreferences} mode='text' icon='restart' style={{
						...helpers.mx10,
						justifyContent: 'flex-start'
					}}>Reset Preferences</Button>
				)}
				<Text >
					Choose what information about food matters most to you, in order to rank food according to your
					preferences, see the information you care about first, and get a compatibility summary.
				</Text>
				<View style={foodPrefStyles.accordianContainer}>
					<List.AccordionGroup>
						<AllergensAccordian
							allergens={prefSelection.allergens}
							setAllergenSelection={async (userSelection) => {
								const newPrefSelection = {
									...prefSelection.allergens,
									...userSelection
								};

								const prefData = {
									allergens: newPrefSelection,
									foodPrecessing: prefSelection?.foodPrecessing ?? {},
									ingredients: prefSelection?.ingredients ?? {},
									nutriQuality: prefSelection?.nutriQuality ?? {}
								};

								await savePreferences(prefData);
								setPrefSelection(prefData);
							}}
						/>
						<NutritionalQualityAccordian
							nutriQuality={prefSelection.nutriQuality}
							setNutriQuality={async (userSelection) => {
								const newPrefSelection = {
									...prefSelection.nutriQuality,
									...userSelection
								};

								const prefData = {
									allergens: prefSelection?.allergens ?? {},
									foodPrecessing: prefSelection?.foodPrecessing ?? {},
									ingredients: prefSelection?.ingredients ?? {},
									nutriQuality: newPrefSelection
								};

								await savePreferences(prefData);

								setPrefSelection(prefData);
							}}
						/>
						<IngredientsAccordian
							ingredients={prefSelection.ingredients}
							setIngredientSelection={async (userSelection) => {
								const newPrefSelection = {
									...prefSelection.ingredients,
									...userSelection
								};

								const prefData = {
									ingredients: newPrefSelection,
									allergens: prefSelection?.allergens ?? {},
									foodPrecessing: prefSelection?.foodPrecessing ?? {},
									nutriQuality: prefSelection?.nutriQuality ?? {}
								};

								await savePreferences(prefData);

								setPrefSelection(prefData);
							}}
						/>
						<FoodProcessingAccordian
							foodProcessing={prefSelection.foodPrecessing}
							setFoodProcessingSelection={async (userSelection) => {
								const newPrefSelection = {
									...prefSelection.foodPrecessing,
									...userSelection
								};

								const prefData = {
									ingredients: prefSelection?.ingredients ?? {},
									allergens: prefSelection?.allergens ?? {},
									foodPrecessing: newPrefSelection,
									nutriQuality: prefSelection?.nutriQuality ?? {}
								};

								await savePreferences(prefData);

								setPrefSelection(prefData);
							}}
						/>
					</List.AccordionGroup>
				</View>
			</ScrollView>
			<Portal>
				<Snackbar
					theme={theme}
					visible={snackObj.visible}
					duration={1000}
					action={{
						label: 'OK',
						onPress: () => setSnackObj({ visible: false, msg: '' }),
					}}
					onDismiss={() => setSnackObj({ visible: false, msg: '' })}
				>
					{snackObj.msg}
				</Snackbar>
			</Portal>
			<View style={{ marginBottom: 10 }}>
				<View style={{ backgroundColor: theme.colors.background }}>
					{!newUser && (
						<Button
							icon="chevron-left"
							mode="contained"
							onPress={() => router.back()}
							labelStyle={foodPrefStyles.bottomBarButtonLabel}
						>
							Back
						</Button>
					)}
				</View>
				<View>
					{newUser && (
						<Button
							mode="contained"
							onPress={() => router.replace('/(app)/recent-scans')}
							labelStyle={{  ...foodPrefStyles.bottomBarButtonLabel, alignSelf: 'flex-end' }}
							icon="chevron-right"
							contentStyle={{ flexDirection: 'row-reverse' }}
						>
							Next
						</Button>
					)}
				</View>
			</View>
		</SafeAreaView>
	)
}

export default FoodPrefSelection;
