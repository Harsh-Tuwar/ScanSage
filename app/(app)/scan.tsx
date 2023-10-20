import * as API from '../../api/service';
import { View, Text, Button } from 'react-native'
import { useState, useEffect } from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner';
import CenterLoader from '../../components/CenterLoader';

const Scan = () => {
	const [scanned, setScanned] = useState(false);
	const [fetchingData, setFetchingData] = useState(false);
	const [hasPermission, setHasPermission] = useState(false);

	useEffect(() => {
		const getBarCodeScannerPermissions = async () => {
			const { status } = await BarCodeScanner.requestPermissionsAsync();
			setHasPermission(status === 'granted');
		};

		getBarCodeScannerPermissions();
	}, []);

	const handleBarCodeScanned = async ({ type, data }: any) => {
		setScanned(true);

		setFetchingData(true);

		const product = await API.getProductData(data);

		setFetchingData(false);
	};

	if (hasPermission === null) {
		return <Text>Requesting for camera permission</Text>;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}

	return (
			fetchingData ? <CenterLoader /> : (
				<>
					<BarCodeScanner
					onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
					style={{
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						position: 'absolute',
						margin: -300
					}}
				/>
				<View style={{ flex: 1, justifyContent: 'center', alignItems: "center" }}>
					{scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
				</View>
				</>
			)
	);
}

export default Scan;
