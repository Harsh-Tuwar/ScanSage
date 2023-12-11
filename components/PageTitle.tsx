import { View } from 'react-native';
import { Button, IconButton, Text, useTheme } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import React, { PropsWithChildren } from 'react';
import { router } from 'expo-router';

interface PageTitleProps extends PropsWithChildren {
	showCloseButton?: boolean;
}

const PageTitle = ({ children, showCloseButton = false }: PageTitleProps) => {
	const theme = useTheme();

	return (
		<View style={{ flex: 1, flexDirection: 'row' }}>
			<View style={{ ...styles.container }}>
				<Text style={{ ...styles.text, color: theme.colors.onSurface }}>
					{children}
				</Text>
			</View>
			{showCloseButton && (
				<IconButton
					icon="close"
					onPress={() => router.back()}
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		margin: -10,
		padding: 15,
		flex: 1
	},
	text: {
		fontSize: 26,
		fontWeight: 'bold'
	},
});

export default PageTitle;
