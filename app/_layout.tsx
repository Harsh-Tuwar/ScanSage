import { Stack, useRouter } from 'expo-router'
import { Button } from 'react-native';
import { PaperProvider } from 'react-native-paper'
import { UserProvider } from '../context/UserContext';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const StackLayout = () => {
	const router = useRouter();
	const [fontsLoaded, fontError] = useFonts({
		'Bubblegum Sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
		'Futura': require('../assets/fonts/futur.ttf')
	});

	return (
		<UserProvider>
			<PaperProvider>
				<Stack screenOptions={{ headerShown: false, animation: 'fade' }} initialRouteName='index'>
					<Stack.Screen name="index" />
					<Stack.Screen
						name="register"
						options={{
							headerTitle: 'Register',
							headerRight: () => <Button title='open' onPress={() => {
								router.push('/modal');
							}} />,
						}}
					/>
					<Stack.Screen
						name='modal'
						options={{
							presentation: 'modal',
							headerLeft: () => {
								return <Button title='Close' onPress={() => router.back()}></Button>
							}
						}}
					/>
				</Stack>
			</PaperProvider>
		</UserProvider>
	)
}

export default StackLayout;
