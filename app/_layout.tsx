import { Stack, useRouter } from 'expo-router'
import { Button } from 'react-native';
import { PaperProvider } from 'react-native-paper'
import { UserProvider } from '../context/UserContext';

const StackLayout = () => {
	const router = useRouter();

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
