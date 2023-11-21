import { Animated, View } from 'react-native'

const RenderRight = (progress: any, dragX: any) => {
	const scale = dragX.interpolate({
		inputRange: [-50, 0.5],
		outputRange: [1, 0.1]
	})

	const Style = {
		transform: [
			{
				scale
			}
		]
	}

	return (
		<View style={{ width: 80, backgroundColor: 'red', alignItems: "center", justifyContent: 'center' }}>
			<Animated.Text style={[Style, { color: '#fff', fontWeight: "600" }]}>Delete</Animated.Text>
		</View>
	);
}

export default RenderRight;
