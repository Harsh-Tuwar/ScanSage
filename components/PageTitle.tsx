import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import React, { PropsWithChildren } from 'react';

const PageTitle = ({ children }: PropsWithChildren) => {
	return (
		<View style={{ position: 'fixed' }}>
			<Text style={styles.text}>{children}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	text: {
		fontSize: 26,
		fontWeight: 'bold'
	},
});

export default PageTitle;
