import { View, Text } from 'react-native'
import { ActivityIndicator, useTheme } from 'react-native-paper'

const CenterLoader = () => {
	const theme = useTheme();

	return (
		<View style={{ display: 'flex', flex: 1, justifyContent: "center", backgroundColor: theme.colors.background }}>
			<ActivityIndicator size={'large'} shouldRasterizeIOS theme={theme} />
		</View>
	);
}

export default CenterLoader;
