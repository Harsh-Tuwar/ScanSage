import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../app/(protected)/Home';

const Stack = createNativeStackNavigator();

export function ProtectedStack() {
	return (
		<Stack.Navigator initialRouteName='Home'>
			<Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
		</Stack.Navigator>
	);
};
