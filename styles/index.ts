import { Dimensions, StyleSheet } from 'react-native';

export const SCREEN_WIDTH = Dimensions.get('screen').width;
export const SCREEN_HEIGHT = Dimensions.get('screen').height;

export const general = StyleSheet.create({
	center: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
});

export const helpers = StyleSheet.create({
	mb5: {
		marginBottom: 5
	},
	mb10: {
		marginBottom: 10
	},
	mb30: {
		marginBottom: 30
	},
	mt30: {
		marginTop: 30
	},
	m5: {
		margin: 5
	},
	m10: {
		margin: 10
	},
	mx5: {
		marginVertical: 5
	},
	mx10: {
		marginVertical: 10
	},
	my10: {
		marginHorizontal: 10
	},
	p5: {
		padding: 5
	},
	mb20: {
		marginBottom: 10
	},
	pt15: {
		paddingTop: 15
	},
	p10: {
		padding: 10
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

export const foodPrefStyles = StyleSheet.create({
	container: {
		marginHorizontal: 10,
		height: SCREEN_HEIGHT - 150
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold'
	},
	accordianContainer: {
		marginBottom: 100
	},
	bottomBar: {
		bottom: 20,
		height: 70,
		width: SCREEN_WIDTH,
		paddingVertical: 10,
		position: 'absolute',
		flexDirection: 'row',
		paddingHorizontal: 10,
		marginHorizontal: -10,
		justifyContent: 'space-between'
	},
	bottomBarButtonLabel: {
		fontSize: 16
	}
});
