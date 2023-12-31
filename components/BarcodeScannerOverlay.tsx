import { Image } from 'expo-image';
import retryImage from '../assets/images/retry.png';
import { PropsWithChildren, useEffect, useState } from 'react'
import { View, Animated, StyleSheet, TouchableOpacity } from 'react-native'
import { IconButton, Text } from 'react-native-paper';

enum CAMERA_FACING_ENUM {
	FRONT = 1,
	BACK = 2
}

interface BarcodeScannerOverlayProps extends PropsWithChildren {
	scanned: boolean;
	setScanned: React.Dispatch<React.SetStateAction<boolean>>;
	cameraType: number;
	setCameraType: React.Dispatch<React.SetStateAction<CAMERA_FACING_ENUM>>;
}

const BarcodeScannerOverlay = ({
	scanned,
	setScanned,
	cameraType,
	setCameraType
}: BarcodeScannerOverlayProps) => {
	const [animationLineHeight, setAnimationLineHeight] = useState({
		x: 0,
		y: 0,
		width: 0,
		height: 0,
	});
	const [focusLineAnimation, setFocusLineAnimation] = useState(
		new Animated.Value(0),
	);

	useEffect(() => {
		animateLine();
	}, []);

	const animateLine = () => {
		Animated.sequence([
			Animated.timing(focusLineAnimation, {
				toValue: 1,
				duration: 1000,
				useNativeDriver: false
			}),

			Animated.timing(focusLineAnimation, {
				toValue: 0,
				duration: 1000,
				useNativeDriver: false
			}),
		]).start(animateLine)
	}

	return (
		<View style={styles.overlay}>
			<View style={styles.unfocusedContainer}></View>

			<View style={styles.middleContainer}>
				<View style={styles.unfocusedContainer}></View>
				<View
					onLayout={e =>
						setAnimationLineHeight({
							x: e.nativeEvent.layout.x,
							y: e.nativeEvent.layout.y,
							height: e.nativeEvent.layout.height,
							width: e.nativeEvent.layout.width,
						})
					}
					style={styles.focusedContainer}>
					{!scanned && (
						<Animated.View
							style={[
								styles.animationLineStyle,
								{
									transform: [
										{
											translateY: focusLineAnimation.interpolate({
												inputRange: [0, 1],
												outputRange: [0, animationLineHeight.height],
											}),
										},
									],
								},
							]}
						/>
					)}
					<View style={{ alignItems: 'flex-end', marginRight: 10 }}>
						<IconButton
							icon="camera-flip"
							iconColor={'white'}
							size={32}
							onPress={() => {
								if (cameraType === CAMERA_FACING_ENUM.BACK) {
									setCameraType(CAMERA_FACING_ENUM.FRONT);
								} else {
									setCameraType(CAMERA_FACING_ENUM.BACK);
								}
							}}
						/>
					</View>
					{scanned && (
						<TouchableOpacity
							onPress={() => setScanned(false)}
							style={styles.rescanIconContainer}>
							<Image source={retryImage} style={{ width: 50, height: 50 }} />
						</TouchableOpacity>
					)}
				</View>
				<View style={styles.unfocusedContainer}></View>
			</View>

			<View style={styles.unfocusedContainer}></View>
		</View>
	)
}

const styles = StyleSheet.create({
	unfocusedContainer: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.7)',
	},
	rescanIconContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: -50
	},
	animationLineStyle: {
		height: 3,
		width: '100%',
		backgroundColor: 'red',
	},
	focusedContainer: {
		flex: 6,
		borderWidth: 5,
		borderColor: 'white',
		borderRadius: 20
	},
	overlay: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
	middleContainer: {
		flexDirection: 'row',
		flex: 1.5,
	},
});

export default BarcodeScannerOverlay;