import { general, helpers } from '../../styles';
import { useState, useEffect } from 'react'
import { captureNotFoundProd, modifyRecentScans } from '../../firebase/db';
import { useUser } from '../../context/UserContext';
import { View, StyleSheet } from 'react-native'
import * as API from '../../api/openFoodFactsService';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { FoodFactsProduct } from '../../api/api-types';
import CenterLoader from '../../components/CenterLoader';
import ScannedItemInfoSheet from '../../components/ScannedItemInfoSheet';
import BarcodeScannerOverlay from '../../components/BarcodeScannerOverlay';
import { Button, Modal, Portal, useTheme, Text } from 'react-native-paper';
import moment from 'moment';

enum CAMERA_FACING_ENUM {
	FRONT = 1,
	BACK = 2
};


const Scan = () => {
	const theme = useTheme();
	const { user } = useUser();
	const [scanned, setScanned] = useState(false);
	const [fetchingData, setFetchingData] = useState(false);
	const [hasPermission, setHasPermission] = useState(false);
	const [product, setProduct] = useState<null | FoodFactsProduct>(null);
	const [cameraType, setCameraType] = useState(CAMERA_FACING_ENUM.BACK);
	const [showModal, setShowModal] = useState(false);

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
			ingredients: prod.ingredients_tags,
			lastScanned: moment().utc().toISOString(),
			img: prod.mainImg.image_front_thumb_url,
			name: prod.title
		};
		
		setProduct(prod);

		if (prod.title !== '') {
			void modifyRecentScans(user?.uid ?? '', recentScanPayload, true);
		} else {
			void captureNotFoundProd(barcode);
			setShowModal(true);
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
					{scanned && product?.title  && <ScannedItemInfoSheet product={product} />}
				</View>
				<Portal>
					<Modal
						visible={showModal}
						onDismiss={() => setShowModal(false)}
						contentContainerStyle={{ ...helpers.p20, backgroundColor: 'black', margin: 20, borderRadius: 10 }}
					>
						<Text style={{ color: theme.colors.onBackground }}>No Product Found for the given Barcode! We'll find this product for you and will update the information soon! </Text>
						<Text style={helpers.mx10}>Thanks for supporting.</Text>
						<Button mode='contained' onPress={() => setShowModal(false)} style={{ marginTop: 20, marginHorizontal: 10 }}>Ok!</Button>
					</Modal>
				</Portal>
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
