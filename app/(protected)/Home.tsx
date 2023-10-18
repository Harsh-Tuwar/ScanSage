import React from "react";
import { View, Text } from "react-native";
import { useUser } from '../../context/UserContext';

const Home = () => {
	const { user } = useUser();

	return (
		<View style={{ marginTop: 20 }}>
			<Text>Welcome {user?.displayName ?? 'Unknown User!'}</Text>
		</View>
	);
};

export default Home;
