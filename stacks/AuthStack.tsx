import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../app/(auth)/Login';

const Stack = createNativeStackNavigator();

export function AuthStack() {
	return (
		<Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
			<Stack.Screen name='Login' component={Login} />
		</Stack.Navigator>
	);
};
