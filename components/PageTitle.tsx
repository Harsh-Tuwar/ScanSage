import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import React, { PropsWithChildren } from 'react';

const PageTitle = ({ children }: PropsWithChildren) => {
	const theme = useTheme();

	return (
		<View style={{ ...styles.container }}>
			<Text style={{ ...styles.text, color: theme.colors.onSurface }}>{children}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		margin: -10,
		padding: 15
	},
	text: {
		fontSize: 26,
		fontWeight: 'bold'
	},
});

export default PageTitle;
