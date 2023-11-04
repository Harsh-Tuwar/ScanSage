import * as API from '../../api/openFoodFactsService';
import { View, Text, StyleSheet } from 'react-native'
import { Image } from 'expo-image';
import { useState, useEffect, useRef, useMemo } from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner';
import CenterLoader from '../../components/CenterLoader';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Button, Card, Chip, Divider, Icon, Modal, Portal, Text as RNPText } from 'react-native-paper';
import { FoodFactsProduct } from '../../api/api-types';
import BarcodeScannerOverlay from '../../components/BarcodeScannerOverlay';
import * as utils from '../../utils';
import { HUMAN_READABLE_NUTRIMENT_HASHMAP } from '../../api/models';
import { general, helpers } from '../../styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getKeyValue_FromNutriLevel, getNutrilevelColor } from '../../utils/scan';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { addRecentScan } from '../../firebase/db';
import { useUser } from '../../context/UserContext';

enum CAMERA_FACING_ENUM {
	FRONT = 1,
	BACK = 2
};

const INGREDIENT_TAG_ICONS_MAP = {
	'palm': 'palm-tree',
	'vegan': 'leaf-circle',
	'vegetarian': 'food-drumstick-off',
	'non': 'leaf-off'
};

const Scan = () => {
	const { user } = useUser();
	const [scanned, setScanned] = useState(false);
	const [fetchingData, setFetchingData] = useState(false);
	const [hasPermission, setHasPermission] = useState(false);
	const [product, setProduct] = useState<null | FoodFactsProduct>(null);
	const [cameraType, setCameraType] = useState(CAMERA_FACING_ENUM.BACK);
	const [showIngModal, setShowIngModal] = useState(false);
	const [selectedModalTag, setSelectedModalTag] = useState('');

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

		const test = async () => {
			setScanned(true);
			setFetchingData(true);

			const haldiramSev = '8904004400069';
			const karachiBuscuit = '8908004010822';
			const nutella = '3017620422003';
			const coffee = '89006702'
			const veganStuff = '850126007120';

			const prod = await API.getProductData(haldiramSev);

			setProduct(prod);
	
			setFetchingData(false);
	
			setTimeout(() => {
				bottomSheetRef?.current?.expand();
			}, 1000);
		}

		// test();
	}, []);

	const handleBarCodeScanned = async ({ type, data: barcode }: any) => {
		setScanned(true);
		setFetchingData(true);

		const prod = await API.getProductData(barcode);

		setProduct(prod);

		setFetchingData(false);

		// TODO: type this
		const recentScanPayload = {} as any;
		recentScanPayload[barcode] = {
			barcode: barcode,
			lastScanned: new Date().toUTCString(),
			img: prod.mainImg.image_front_thumb_url,
			name: prod.title
		};
		
		// recentScanPayload.set(barcode, {
		// 	barcode: barcode,
		// 	lastScanned: new Date().toUTCString(),
		// 	img: prod.mainImg.image_front_thumb_url,
		// 	name: prod.title
		// })

		void addRecentScan(user?.uid ?? '', recentScanPayload);

		setTimeout(() => {
			bottomSheetRef?.current?.expand();
		}, 1000);
	};

	if (hasPermission === null) {
		return <Text>Requesting for camera permission</Text>;
	}

	if (hasPermission === false) {
		return <View style={general.center}><Text>No access to camera</Text></View>;
	}

	const _getIngreAnalysisModalContent = (tag: string) => {
		const modalContentObj = {
			title: '',
			content: '',
			showWarning: false,
			unrecognizedStr: ''
		};

		const noBadIngre = selectedModalTag.includes('free');

		if (product && product.ingredients_analysis_tags) {
			if (!selectedModalTag.includes('unknown')) { // not unknown

				// block for palm oil
				if (selectedModalTag.includes('palm-oil')) {
					modalContentObj.title = !noBadIngre ? '🌴 Contains Palm oil!' : '🌴 No Palm oil!';

					if (noBadIngre) {
						modalContentObj.content = 'No ingredients containing palm oil detected';
					} else {
						modalContentObj.content = `Ingredients that containes palm oil: ${product.unknownIngredients.palmOilContent.map((item) => {
							const newItem = item.split(':')[1].replaceAll('-', ' ');
	
							return utils.uppercaseFirstLetter(newItem);
						})}`
					}

					if (product.unknownIngredients.unknownContentPalmOil) {
						modalContentObj.unrecognizedStr = `Unrecognized ingredients: ${product.unknownIngredients.unknownContentVeg.map((item) => {
							const newItem = item.split(':')[1].replaceAll('-', ' ');
	
							return utils.uppercaseFirstLetter(newItem);
						})}`;
					}
				}

				// block for vegan
				if (selectedModalTag.includes('vegan')) {
					const isNonVeganTag = selectedModalTag.includes('non');

					modalContentObj.title = isNonVeganTag ? '🍖 Non Vegan' : '🌱 Vegan';

					if (isNonVeganTag) {
						modalContentObj.content = `Non-vegan ingredients: ${product.unknownIngredients.nonVeganContent.map((item) => {
							const newItem = item.split(':')[1].replaceAll('-', ' ');
	
							return utils.uppercaseFirstLetter(newItem);
						})}`;
					} else {
						modalContentObj.content = 'No non-vegan ingredients detected';

						if (product.unknownIngredients.unknownContentVegan) {
							modalContentObj.unrecognizedStr = `Unrecognized ingredients: ${product.unknownIngredients.unknownContentVegan.map((item) => {
								const newItem = item.split(':')[1].replaceAll('-', ' ');
		
								return utils.uppercaseFirstLetter(newItem);
							})}`;
						}
					}

				}

				// block for vegetarian
				if (selectedModalTag.includes('vegetarian')) {
					modalContentObj.title = '🥦 Vegeterian';

					modalContentObj.content = `No non-vegetarian ingredients detected`;

					if (product.unknownIngredients.unknownContentVeg.length) {
						modalContentObj.unrecognizedStr = `Unrecognized ingredients: ${product.unknownIngredients.unknownContentVeg.map((item) => {
							const newItem = item.split(':')[1].replaceAll('-', ' ');
	
							return utils.uppercaseFirstLetter(newItem);
						})}`;
					}
				}
			} else {
				modalContentObj.content = 'Unrecognized ingredients: ';

				if (selectedModalTag.includes('vegetarian')) {
					modalContentObj.title = '🥦 Vegetarian Status Unknown!';
					
					modalContentObj.content += `${product.unknownIngredients.unknownContentVeg.map((item, index) => {
						const newItem = item.split(':')[1].replaceAll('-', ' ');

						return utils.uppercaseFirstLetter(newItem) + `${product.unknownIngredients.unknownContentVeg.length - 1 === index ? '' : ', '}`;
					})}`;
				}

				if (selectedModalTag.includes('palm-oil')) {
					modalContentObj.title = '🌴 Palm oil Status Unknown!';

					modalContentObj.unrecognizedStr += `${product.unknownIngredients.unknownContentPalmOil.map((item, index) => {
						const newItem = item.split(':')[1].replaceAll('-', ' ');

						return utils.uppercaseFirstLetter(newItem) + `${product.unknownIngredients.unknownContentPalmOil.length - 1 === index ? '' : ', '}`;
					})}`;
				}

				if (selectedModalTag.includes('vegan')) {
					modalContentObj.title = '🌱 Vegan Status Unknown!';

					modalContentObj.unrecognizedStr += `${product.unknownIngredients.unknownContentVegan.map((item, index) => {
						const newItem = item.split(':')[1].replaceAll('-', ' ');

						return utils.uppercaseFirstLetter(newItem) + `${product.unknownIngredients.unknownContentVegan.length - 1 === index ? '' : ', '}`;
					})}`;
				}
			}
		}

		return modalContentObj;
	};

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
					{scanned && <Portal>
						<View style={styles.container}>
							<BottomSheet
								enablePanDownToClose
								ref={bottomSheetRef}
								style={helpers.p10}
								index={-1}
								snapPoints={snapPoints}
							>
								{product && (
									<BottomSheetScrollView stickyHeaderHiddenOnScroll style={{ marginBottom: 30 }}>
										{/* Item Title and Image */}
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
										{Object.keys(product.nutrient_levels).length > 0 && (
											<Card style={{ margin: 10 }}>
												<Card.Content>
													<RNPText variant="titleMedium">⚕️ Health</RNPText>
													<Divider style={{ marginVertical: 10 }} bold />
													<View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
														{Object.keys(product.nutrient_levels).map((nutriItem) => {
															const nutriLevelItem = product.nutrient_levels[nutriItem as keyof typeof product.nutrient_levels];
															const nutriLevelItemStr = getKeyValue_FromNutriLevel(nutriItem, nutriLevelItem, product.nutriments);

															return (
																<TouchableOpacity style={helpers.m5} key={nutriItem}>
																	<Chip
																		icon={() => <MaterialCommunityIcons name="circle" color={getNutrilevelColor(nutriLevelItem)} size={26} />}
																		compact
																	>{nutriLevelItemStr}</Chip>
																</TouchableOpacity>
															)
														})}
													</View>
												</Card.Content>
											</Card>
										)}
										{/* Ingredients */}
										{product.ingredients.length > 0 && (
											<Card style={{ margin: 10 }}>
												<Card.Content>
													<RNPText variant="titleMedium">🍯 Ingredients</RNPText>
													<Divider style={{ marginVertical: 10 }} bold />
													<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
														<Icon source="pot-mix" size={32} />
														<RNPText variant='bodyLarge'>&nbsp; {product.ingredients.length} ingredients</RNPText>
													</View>
													<View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', ...helpers.mx5 }}>
														{product.ingredients.map((ings, index) => {
															return <RNPText key={ings.id}>{utils.uppercaseFirstLetter(ings.text)}{product.ingredients.length - 1 === index ? '' : ', '}</RNPText>
														})}
													</View>
												</Card.Content>
											</Card>
										)}
										{/* Ingredients Analysis */}
										{product.ingredients_analysis_tags && product.ingredients_analysis_tags.length > 0 && (
											<Card style={{ margin: 10 }}>
												<Card.Content>
													<RNPText variant="titleMedium">🧐 Ingredients Analysis</RNPText>
													<Divider style={{ marginVertical: 10 }} bold />
													<View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
														{product.ingredients_analysis_tags.map((tag) => {
															const tagString = tag.split(':')[1].replaceAll('-', ' ');
															const tagIcon = INGREDIENT_TAG_ICONS_MAP[tagString.split(' ')[0] as keyof typeof INGREDIENT_TAG_ICONS_MAP] as any;
															const finalizedTagString = utils.uppercaseFirstLetter(tagString);

															return (
																<Chip
																	key={tag}
																	icon={() => <MaterialCommunityIcons name={tagIcon} size={24} />}
																	compact
																	onPress={() => {
																		setSelectedModalTag(tag);
																		setShowIngModal(true);
																	}}
																	style={helpers.m5}
																>{finalizedTagString}</Chip>
															);
														})}
													</View>
													<RNPText style={helpers.mx10}>The analysis is based solely on the ingredients listed and does not take into account processing methods</RNPText>
												</Card.Content>
											</Card>
										)}
										{/* Allergens */}
										{product.allergens_tags.length > 0 && (
											<Card style={{ margin: 10 }}>
												<Card.Content>
													{product.allergens_tags.map((allergenTag) => {
														return <RNPText key={allergenTag}>{allergenTag}</RNPText>
													})}
												</Card.Content>
											</Card>
										)}
										{/* Item Nutriments */}
										<Card style={{ margin: 10 }}>
											<Card.Content>
												<RNPText variant="titleMedium">💪 Nutrition facts</RNPText>
												<Divider style={{ marginVertical: 10 }} bold />
												{Object.keys(product.nutriments).map((key) => {
													const itemValue = product.nutriments[key as keyof typeof product.nutriments];
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
					<Portal>
						<Modal
							visible={showIngModal}
							onDismiss={() => {
								setSelectedModalTag('');
								setShowIngModal(false);
							}}
							contentContainerStyle={styles.modalContainer}
						>
							<RNPText style={{ fontWeight: 'bold' }} variant='headlineSmall'>{_getIngreAnalysisModalContent(selectedModalTag).title}</RNPText> 
							<Divider style={helpers.mx10} />
							<RNPText style={helpers.mb20}>{_getIngreAnalysisModalContent(selectedModalTag).content}</RNPText>
							{_getIngreAnalysisModalContent(selectedModalTag).unrecognizedStr.length > 0 && (
								<>
									<RNPText style={helpers.mb10}>{_getIngreAnalysisModalContent(selectedModalTag).unrecognizedStr}</RNPText>
									<RNPText
										style={{ ...helpers.mb10, fontStyle: 'italic' }}
									>Some ingredients could not be recognized.</RNPText>
								</>
							)}
							<Button mode='contained-tonal' onPress={() => setShowIngModal(false)}>Ok</Button>
						</Modal>
					</Portal>
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
