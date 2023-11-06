import * as API from '../../api/openFoodFactsService';
import { View, Text, StyleSheet } from 'react-native'
import { useState, useEffect, useRef } from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner';
import CenterLoader from '../../components/CenterLoader';
import { Portal } from 'react-native-paper';
import { FoodFactsProduct } from '../../api/api-types';
import BarcodeScannerOverlay from '../../components/BarcodeScannerOverlay';
import { general } from '../../styles';
import { addRecentScan } from '../../firebase/db';
import { useUser } from '../../context/UserContext';
import ScannedItemInfoSheet from '../../components/ScannedItemInfoSheet';

enum CAMERA_FACING_ENUM {
	FRONT = 1,
	BACK = 2
};


const Scan = () => {
	const { user } = useUser();
	const [scanned, setScanned] = useState(false);
	const [fetchingData, setFetchingData] = useState(false);
	const [hasPermission, setHasPermission] = useState(false);
	const [product, setProduct] = useState<null | FoodFactsProduct>(null);
	const [cameraType, setCameraType] = useState(CAMERA_FACING_ENUM.BACK);

	useEffect(() => {
		const getBarCodeScannerPermissions = async () => {
			const { status } = await BarCodeScanner.requestPermissionsAsync();
			setHasPermission(status === 'granted');
		};

		getBarCodeScannerPermissions();
	}, []);

	const handleBarCodeScanned = async ({ type, data: barcode }: any) => {
		setScanned(true);
		setFetchingData(true);

		const prod = await API.getProductData(barcode);

		// TODO: type this
		const recentScanPayload = {} as any;
		recentScanPayload[barcode] = {
			barcode: barcode,
			lastScanned: new Date().toUTCString(),
			img: prod.mainImg.image_front_thumb_url,
			name: prod.title
		};

		void addRecentScan(user?.uid ?? '', recentScanPayload);

		if (prod.title !== '') {
			setProduct(prod);
		}

		setFetchingData(false);
	};

	if (hasPermission === null) {
		return <Text>Requesting for camera permission</Text>;
	}

	if (hasPermission === false) {
		return <View style={general.center}><Text>No access to camera</Text></View>;
	}
	
	return (
		fetchingData ? <CenterLoader /> : (
			<>
				<View style={styles.container}>
					<BarCodeScanner
						type={cameraType}
						onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
						style={styles.barcodeScannerStyle}
					/>
					<BarcodeScannerOverlay
						scanned={scanned}
						setScanned={setScanned}
						setCameraType={setCameraType}
						cameraType={cameraType}
					/>
					{scanned && <Portal><ScannedItemInfoSheet product={product} /></Portal>}
				</View>
			</>
		)
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		position: 'relative',
	},
	contentContainer: {
		flex: 4,
		alignItems: 'center',
	},
	barcodeScannerStyle: {
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		position: 'absolute',
		margin: -300
	},
	productImage: {
		height: 90,
		width: 90,
		borderRadius: 10,
		borderWidth: 1,
	},
	productTitle: {
		marginLeft: 50,
		fontSize: 20,
		fontWeight: 'bold'
	},
	modalContainer: {
		backgroundColor: 'white',
		margin: 20,
		padding: 20,
		borderRadius: 15
	}
});

export default Scan;
