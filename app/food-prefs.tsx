import React from 'react';
import { Divider, Text, List } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { helpers, foodPrefStyles } from '../styles';
import { ScrollView } from 'react-native-gesture-handler';
import { Image } from 'expo-image';
import foodPrefImg from '../assets/images/food-prefs.svg';
import AllergensAccordian from '../components/AllergensAccordian';

const FoodPrefSelection = () => {
	return (
		<SafeAreaView>
			<ScrollView style={foodPrefStyles.container}>
				<Image source={foodPrefImg} style={{ width: '100%', height: 200, resizeMode: 'contain' }} />
				<Divider style={helpers.mx10} />
				<Text >
					Choose what information about food matters most to you, in order to rank food according to your
					preferences, see the information you care about first, and get a compatibility summary. Those food 
					preferences stay on your device, and are not associatedwith your Scan Sage Facts contributor account 
					if you have one.
				</Text>
				<List.AccordionGroup>
					<AllergensAccordian />
				</List.AccordionGroup>
			</ScrollView>
		</SafeAreaView>
	)
}

export default FoodPrefSelection;
