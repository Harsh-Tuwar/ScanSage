import React from 'react';
import { Tabs } from 'expo-router';
import { View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const AppLayout = () => {
	return (
		<Tabs
			initialRouteName='scan'
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
				tabBarStyle: {
					marginVertical: 25,
					marginHorizontal: 15,
					borderRadius: 50,
					position: 'absolute',
				},
			}}
		>
			<Tabs.Screen
				name='recent-scans'
				options={{
					tabBarIcon: ({ color, size, focused }) => <FontAwesome5 name="history" size={size} color={color} />
				}}
			/>
			<Tabs.Screen
				name='scan'
				options={{
					tabBarIcon: ({ color, size, focused }) => {
						return <View>
							<FontAwesome5 name="barcode" size={size} color={color} />
						</View>
					}
				}}
			/>
			<Tabs.Screen
				name='profile'
				options={{
					headerShown: false,
					tabBarIcon: ({ color, size }) => <FontAwesome5 name="user" size={size} color={color} />
				}}
			/>
		</Tabs>
	)
}

export default AppLayout