import { useFonts } from 'expo-font';
import { Stack } from 'expo-router'
import { PaperProvider, configureFonts, useTheme as useThemeRnP } from 'react-native-paper'
import { UserProvider } from '../context/UserContext';

import * as SplashScreen from 'expo-splash-screen';
import CustomDarkTheme from '../themes/DarkTheme';
import CustomLightTheme from '../themes/LightTheme';
import CenterLoader from '../components/CenterLoader';
import { useContext, useEffect, useState } from 'react';
import storage from '../utils/storage';
import { STORAGE_THEME_KEY } from '../constants';
import { ThemeContext, ThemeProvider, useTheme } from '../context/ThemeContext';

SplashScreen.preventAutoHideAsync();

const StackLayout = () => {
	const [paperTheme, setPaperTheme] = useState(CustomLightTheme);
	const themeCntxt = useContext(ThemeContext);

	// let paperTheme =
	// 	colorScheme === 'dark'
	// 		? CustomDarkTheme
	// 		: CustomLightTheme;
	
	// const [fontsLoaded, fontError] = useFonts({
	// 	'PlaypenSans-Bold': require('../assets/fonts/PlaypenSans-Bold.ttf'),
	// 	'PlaypenSans-ExtraBold': require('../assets/fonts/PlaypenSans-ExtraBold.ttf'),
	// 	'PlaypenSans-ExtraLight': require('../assets/fonts/PlaypenSans-ExtraLight.ttf'),
	// 	'PlaypenSans-Light': require('../assets/fonts/PlaypenSans-Light.ttf'),
	// 	'PlaypenSans-Medium': require('../assets/fonts/PlaypenSans-Medium.ttf'),
	// 	'PlaypenSans-Regular': require('../assets/fonts/PlaypenSans-Regular.ttf'),
	// 	'PlaypenSans-SemiBold': require('../assets/fonts/PlaypenSans-SemiBold.ttf'),
	// 	'PlaypenSans-Thin': require('../assets/fonts/PlaypenSans-Thin.ttf'),
	// });

	// const baseFont = {
	// 	fontFamily: 'PlaypenSans-Regular',
	// } as const;

	// const baseVariants = configureFonts({ config: baseFont });

	// const customVariants = {
	// 	displayMedium: {
	// 		...baseVariants.displayMedium,
	// 		fontFamily: 'PlaypenSans-Bold',
	// 	},
	// } as const;

	// const fonts = configureFonts({
	// 	config: {
	// 		...baseVariants,
	// 		...customVariants,
	// 	},
	// });

	// if (!fontsLoaded && !fontError) {
	// 	return <CenterLoader />;
	// }

	useEffect(() => {
		const themeFunc = async () => {
			const savedThemePref = await storage.get(STORAGE_THEME_KEY);

			if (savedThemePref) {
				setPaperTheme(savedThemePref === 'dark'
					? CustomDarkTheme
					: CustomLightTheme
				);
			}
		}

		themeFunc();
	}, [themeCntxt.isDark]);

	return (
		<ThemeProvider>
			<UserProvider>
				{/* <PaperProvider theme={{ ...paperTheme, fonts }}> */}
				<PaperProvider theme={{ ...paperTheme }}>
					<Stack
						screenOptions={{
							animation: 'fade',
							headerShown: false,
							statusBarColor: paperTheme.colors.onBackground
						}}
						initialRouteName='index'
					>
						<Stack.Screen name="index" />
						<Stack.Screen name="food-prefs" />
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
		</ThemeProvider>
	)
}

export default StackLayout;
