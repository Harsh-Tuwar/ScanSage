import { useEffect, useState } from 'react';
import { Tabs } from 'expo-router';
import { View, Animated, Easing, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
  
const AppLayout = () => {
	const [tapped, setTapped] = useState(false);

	const [translateY, setTranslateY] = useState(
		new Animated.Value(0),
	);

	const [translateYDown, setTranslateYDown] = useState(
		new Animated.Value(-40),
	)

	useEffect(() => {
		animate();
	}, [tapped]);

	const animate = () => {
		Animated.sequence([
			Animated.timing(translateY, {
				toValue: -40, // Desired Y-axis translation value
				duration: 2000, // Animation duration in milliseconds
				easing: Easing.linear, // You can use other easing functions like Easing.ease, Easing.bounce, etc.
				useNativeDriver: false, // Set to false when working with the transform property
			}),
		
			Animated.timing(translateYDown, {
				toValue: 0, // Desired Y-axis translation value
				duration: 2000, // Animation duration in milliseconds
				easing: Easing.linear, // You can use other easing functions like Easing.ease, Easing.bounce, etc.
				useNativeDriver: false, // Set to false when working with the transform property
			})
		]).start();
	};

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
					position: 'absolute'
				},
			}}
		>
			<Tabs.Screen
				name='recent-scans'
				options={{
					tabBarIcon: ({ color, size, focused }) => {
						return (
							<TouchableOpacity onPress={() => setTapped(!tapped)}>
								<Animated.View style={[
									styles(focused).tabbarIcon,
									{
										transform: [
											{
												translateY: focused ? translateY : translateYDown
											}
										]
									}
								]}>
									<FontAwesome5 name="history" size={size} color={color} />
								</Animated.View>
							</TouchableOpacity>
						)
					}
				}}
			/>
			<Tabs.Screen
				name='scan'
				options={{
					headerBackgroundContainerStyle: {
						paddingBottom: 100
					},
					tabBarIcon: ({ color, size, focused }) => {
						return (
							<TouchableOpacity onPress={() => console.log('pressed')}>
								<Animated.View style={[
									styles(focused).tabbarIcon,
									{
										transform: [
											{
												translateY: focused ? translateY : translateYDown
											}
										]
									}
								]}>
									<FontAwesome5 name="barcode" size={size} color={color} />
								</Animated.View>
							</TouchableOpacity>
						)
					}
				}}
			/>
			<Tabs.Screen
				name='profile'
				options={{
					tabBarIcon: ({ color, size, focused }) => {
						return (
							<TouchableOpacity onPress={() => setTapped(!tapped)}>
								<Animated.View style={[
									styles(focused).tabbarIcon,
									{
										transform: [
											{
												translateY: focused ? translateY : translateYDown
											}
										]
									}
								]}>
									<FontAwesome5 name="user" size={size} color={color} />
								</Animated.View>
							</TouchableOpacity>
						)
					}
				}}
			/>
		</Tabs>
	)
}

const styles = ({ focused }: any) => StyleSheet.create({
	tabbarIcon: {
		position: 'relative',
		backgroundColor: focused ? 'white' : 'inherited',
		padding: 10,
		borderTopEndRadius: 30,
		borderTopLeftRadius: 30,
	}
})

export default AppLayout