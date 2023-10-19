import React from 'react';
import { Tabs } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';

const AppLayout = () => {
	return (
		<Tabs
			screenOptions={{ 
				headerShown: false
			}}
			initialRouteName='index'
		>
			<Tabs.Screen
				name='index'
				options={{
					tabBarLabel: 'List',
					headerTitle: 'Home Screen',
					tabBarIcon: ({ color, size }) => <FontAwesome5 name="home" size={size} color={color} />
				}}
			/>
			<Tabs.Screen
				name='settings'
				options={{
					tabBarLabel: 'List',
					headerTitle: 'Settings',
					tabBarIcon: ({ color, size }) => <FontAwesome5 name="cog" size={size} color={color} />
				}}
			/>
		</Tabs>
	)
}

export default AppLayout