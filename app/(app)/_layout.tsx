import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Profile from './profile';
import RecentScans from './recent-scans';
import Scan from './scan';

const Tab = createMaterialBottomTabNavigator();

const AppLayout = () => {
	return (
		<Tab.Navigator
			initialRouteName='Scan'
			barStyle={{
				backgroundColor: 'tomato'
			}}
		>
			<Tab.Screen
				name="Scan"
				component={Scan}
				options={{
					tabBarLabel: 'Scan',
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons name="barcode-scan" color={color} size={26} />
					),
				}}
			/>
			<Tab.Screen
				name="Recent Scans"
				component={RecentScans}
				options={{
					tabBarLabel: 'Recent Scans',
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons name="format-list-bulleted" color={color} size={26} />
					),
				}}
			/>
			<Tab.Screen
				name="Profile"
				component={Profile}
				options={{
					tabBarLabel: 'Profile',
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons name="account" color={color} size={26} />
					),
				}}
			/>
		</Tab.Navigator>
	)
}

export default AppLayout;
