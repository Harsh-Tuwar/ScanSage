import * as API from '../../api/openFoodFactsService';
import { View, Text, StyleSheet } from 'react-native'
import { Image } from 'expo-image';
import { useState, useEffect, useRef, useMemo } from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner';
import CenterLoader from '../../components/CenterLoader';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Card, Divider, Portal, Text as RNPText } from 'react-native-paper';
import { FoodFactsProduct } from '../../api/api-types';
import BarcodeScannerOverlay from '../../components/BarcodeScannerOverlay';
import * as utils from '../../utils';
import { HUMAN_READABLE_NUTRIMENT_HASHMAP } from '../../api/models';

const Scan = () => {
	const [scanned, setScanned] = useState(false);
	const [fetchingData, setFetchingData] = useState(false);
	const [hasPermission, setHasPermission] = useState(false);
	const [product, setProduct] = useState<null | FoodFactsProduct>(null);

	// ref
	const bottomSheetRef = useRef<BottomSheet>(null);

	// variables
	const snapPoints = useMemo(() => ['30%', '95%'], []);

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

		const prod = await API.getProductData(data);

		setProduct(prod);

		setFetchingData(false);

		setTimeout(() => {
			bottomSheetRef?.current?.expand();
		}, 1000);
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
				<View style={styles.container}>
					<BarCodeScanner
						onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
						style={styles.barcodeScannerStyle}
					/>
					<BarcodeScannerOverlay scanned={scanned} setScanned={setScanned} />
					{scanned && <Portal>
						<View style={styles.container}>
							{/* {console.log(product)} */}
							<BottomSheet
								enablePanDownToClose
								ref={bottomSheetRef}
								index={-1}
								snapPoints={snapPoints}
							>
								{product && (
									<BottomSheetScrollView>
										{/* Item Title and Image */}
										{/* {console.log(product)} */}

										<Card style={{ margin: 10, paddingVertical: 40 }} >
											<Card.Title
												title={product.title}
												titleNumberOfLines={3}
												titleStyle={styles.productTitle}
												left={() => <Image
													source={product.mainImg.image_front_url}
													style={styles.productImage}
												/>}
											/>
										</Card>
										{/* Item General */}
										<Card style={{ margin: 10 }}>
											<Card.Content>
												<RNPText variant="titleMedium">General</RNPText>
												<Divider style={{ marginVertical: 10 }} bold />
												<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
													<RNPText variant='titleMedium'>Nutri Score</RNPText>
													<RNPText variant='bodyMedium'>{product.nutriscore_score === '' ? 'Unknown' : product.nutriscore_score}</RNPText>
												</View>
												<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
													<RNPText variant='titleMedium'>Nutri Grade</RNPText>
													<RNPText variant='bodyMedium'>{utils.uppercaseFirstLetter(product.nutriscore_grade)}</RNPText>
												</View>
											</Card.Content>
										</Card>
										{/* Item Nutriments */}
										<Card style={{ margin: 10 }}>
											<Card.Content>
												<RNPText variant="titleMedium">Nutriments</RNPText>
												<Divider style={{ marginVertical: 10 }} bold />
												{Object.keys(product.nutriments).map((key) => {
													const itemValue = product.nutriments[key];
													const label = HUMAN_READABLE_NUTRIMENT_HASHMAP[`${key}`];

													if (!itemValue || !label) {
														return;
													}

													return (
														<View style={{ flexDirection: 'row', justifyContent: 'space-between' }} key={key}>
															<RNPText variant="bodyMedium" style={{ fontWeight: 'bold' }}>{label}</RNPText>
															<RNPText variant="bodyMedium">{itemValue}</RNPText>
														</View>
													)
												})}
											</Card.Content>
										</Card>
									</BottomSheetScrollView>
								)}
							</BottomSheet>
						</View>
					</Portal>}
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
	}
});

export default Scan;
