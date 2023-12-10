import { useFonts } from 'expo-font';
import { Stack } from 'expo-router'
import { PaperProvider, configureFonts } from 'react-native-paper'
import { UserProvider } from '../context/UserContext';

import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';
import CustomDarkTheme from '../themes/DarkTheme';
import CustomLightTheme from '../themes/LightTheme';
import { useEffect } from 'react';
SplashScreen.preventAutoHideAsync();
import mobileAds from 'react-native-google-mobile-ads';


const StackLayout = () => {
	const colorScheme = useColorScheme();
	// const paperTheme =
	// 	colorScheme === 'dark'
	// 		? CustomDarkTheme
	// 		: CustomLightTheme;
	const paperTheme = CustomDarkTheme;

	const [fontsLoaded, fontError] = useFonts({
		'PlaypenSans-Bold': require('../assets/fonts/PlaypenSans-Bold.ttf'),
		'PlaypenSans-ExtraBold': require('../assets/fonts/PlaypenSans-ExtraBold.ttf'),
		'PlaypenSans-ExtraLight': require('../assets/fonts/PlaypenSans-ExtraLight.ttf'),
		'PlaypenSans-Light': require('../assets/fonts/PlaypenSans-Light.ttf'),
		'PlaypenSans-Medium': require('../assets/fonts/PlaypenSans-Medium.ttf'),
		'PlaypenSans-Regular': require('../assets/fonts/PlaypenSans-Regular.ttf'),
		'PlaypenSans-SemiBold': require('../assets/fonts/PlaypenSans-SemiBold.ttf'),
		'PlaypenSans-Thin': require('../assets/fonts/PlaypenSans-Thin.ttf'),
	});

	const baseFont = {
		fontFamily: 'PlaypenSans-Regular',
	} as const;

	const baseVariants = configureFonts({ config: baseFont });

	const customVariants = {
		displayMedium: {
			...baseVariants.displayMedium,
			fontFamily: 'PlaypenSans-Bold',
		},
	} as const;

	const fonts = configureFonts({
		config: {
			...baseVariants,
			...customVariants,
		},
	});

	if (!fontsLoaded && !fontError) {
		return null;
	}

	return (
		<UserProvider>
			<PaperProvider theme={{ ...paperTheme, fonts }}>
				<Stack screenOptions={{ animation: 'fade', headerShown: false, statusBarColor: 'black' }} initialRouteName='index'>
					<Stack.Screen name="index" />
					<Stack.Screen name="user-food-prefs" />
					<Stack.Screen name="register" />
					<Stack.Screen
						name="modify-user-modal"
						options={{
							presentation: 'modal',
						}}
					/>
				</Stack>
			</PaperProvider>
		</UserProvider>
	)
}

export default StackLayout;
