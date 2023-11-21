import Scan from './scan';
import Settings from './settings';
import RecentScans from './recent-scans';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useTheme } from 'react-native-paper';

const Tab = createMaterialBottomTabNavigator();

const AppLayout = () => {
	const theme = useTheme();

	return (
		<Tab.Navigator
			theme={theme}
			style={{
				backgroundColor: theme.colors.background
			}}
			initialRouteName='Scan'
			shifting={true}
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
