import { useFonts } from 'expo-font';
import { Button } from 'react-native';
import { Stack, useRouter } from 'expo-router'
import { PaperProvider, configureFonts, useTheme } from 'react-native-paper'
import { UserProvider } from '../context/UserContext';

import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const StackLayout = () => {
	const router = useRouter();
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
		bold: {
			...baseVariants.bodyMedium,
			fontFamily: 'PlaypenSans-Bold',
		},
	} as const;

	const fonts = configureFonts({
		config: {
			...baseVariants,
			...customVariants,
		},
	});

	const theme = useTheme();

	return (
		<UserProvider>
			<PaperProvider theme={{ ...theme, fonts }}>
				<Stack screenOptions={{ headerShown: false, animation: 'fade' }} initialRouteName='index'>
					<Stack.Screen name="index" />
					<Stack.Screen
						name="register"
						options={{
							headerTitle: 'Register',
							headerRight: () => <Button title='open' onPress={() => {
								router.push('/modal');
							}} />
						}}
					/>
				</Stack>
			</PaperProvider>
		</UserProvider>
	)
}

export default StackLayout;
