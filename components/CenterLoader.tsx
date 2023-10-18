import { View, Text } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'

const CenterLoader = () => {
	return (
		<View style={{ display: 'flex', flex: 1, justifyContent: "center" }}>
			<ActivityIndicator size={'large'} />
		</View>
	);
}

export default CenterLoader;
