import { StyleSheet } from 'react-native';

export const general = StyleSheet.create({
	center: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
});

export const helpers = StyleSheet.create({
	mb30: {
		marginBottom: 30
	},
	mt30: {
		marginTop: 30
	},
	m5: {
		margin: 5
	},
	mx5: {
		marginVertical: 5
	},
	p20: {
		padding: 20
	},
	f1: {
		flex: 1
	},
	justifyContentCenter: {
		justifyContent: 'center',
	},
	alignItemsCenter: {
		alignItems: 'center'
	}
});

export const registerStyles = StyleSheet.create({
	registerLabel: {
		marginBottom: 10,
		fontSize: 18,
		marginVertical: 2,
		color: 'black',
	}
});
