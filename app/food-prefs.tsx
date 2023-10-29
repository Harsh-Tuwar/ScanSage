import React, { useEffect } from 'react';
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

const FoodPrefSelection = () => {
	const { user } = useUser();

	useEffect(() => {
		if(!user) {
			router.replace('/');
		}
	}, [user]);

	return (
		<SafeAreaView>
			<ScrollView style={foodPrefStyles.container}>
				<Image source={foodPrefImg} style={{ width: '100%', height: 200, resizeMode: 'contain' }} />
				<Divider style={helpers.mx10} />
				<Text >
					Choose what information about food matters most to you, in order to rank food according to your
					preferences, see the information you care about first, and get a compatibility summary.
				</Text>
				<List.AccordionGroup>
					<AllergensAccordian />
					<NutritionalQualityAccordian />
					<IngredientsAccordian />
					<FoodProcessingAccordian />
				</List.AccordionGroup>
			</ScrollView>
		</SafeAreaView>
	)
}

export default FoodPrefSelection;
