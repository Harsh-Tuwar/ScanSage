import Scan from './scan';
import Settings from './settings';
import RecentScans from './recent-scans';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();

const AppLayout = () => {
	return (
		<Tab.Navigator
			initialRouteName='Scan'
			shifting={true}
			barStyle={{
				backgroundColor: 'tomato'
			}}
		>
			<Tab.Screen
				name="RecentScans"
				component={RecentScans}
				options={{
					tabBarLabel: 'Recent Scans',
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons name="format-list-bulleted" color={color} size={26} />
					),
				}}
			/>
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
				name="Settings"
				component={Settings}
				options={{
					tabBarLabel: 'Settings',
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons name="cog" color={color} size={26} />
					),
				}}
			/>
		</Tab.Navigator>
	)
}

export default AppLayout;
