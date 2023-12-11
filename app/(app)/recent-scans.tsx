import { Button, Modal, Portal, Text, useTheme } from 'react-native-paper';
import { FoodFactsProduct } from '../../api/api-types';
import { refetchFbUserData, updateRecentScans } from '../../firebase/db';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SCREEN_HEIGHT, general, helpers } from '../../styles';
import { ScrollView } from 'react-native-gesture-handler';
import { sortHelpers } from '../../utils';
import { useUser } from '../../context/UserContext';
import { View, RefreshControl } from 'react-native';
import * as API from '../../api/openFoodFactsService';
import CenterLoader from '../../components/CenterLoader';
import PageTitle from '../../components/PageTitle';
import React, { useState } from 'react';
import RecentScanCard from '../../components/RecentScanCard';
import RenderRight from '../../components/AnimatedRightButton';
import ScannedItemInfoSheet from '../../components/ScannedItemInfoSheet';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { BANNER_AD_UNIT_ID } from '../../constants';
import { router } from 'expo-router';

const RecentScans = () => {
	const theme = useTheme();
	const [refreshing, setRefreshing] = React.useState(false);
	const { fbUser, user} = useUser();
	const [fetchingData, setFetchingData] = useState(false);
	const [showModal, setShowModal] = useState(false);

	const handleProdSelect = async (barcode: string) => {
		router.push(`/product/${barcode}`);
	};

	const onRefresh = React.useCallback(async () => {
		setRefreshing(true);

		// method to refresh recent scans
		await refetchFbUserData(user?.uid ?? '', fbUser?.foodPrefs ?? []);

		setRefreshing(false);
	}, []);

	return (
		fetchingData ? <CenterLoader /> : (
			<SafeAreaView style={{ ...helpers.p10, backgroundColor: theme.colors.background }}>
				<PageTitle>Recent Scans</PageTitle>
				<ScrollView
					style={{ ...helpers.mb20, height: SCREEN_HEIGHT - 180 }}
					refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
				>
					{fbUser?.recentScans && (Object.values(fbUser.recentScans).length > 0 ? Object.values(fbUser.recentScans).sort(sortHelpers.last_scanned_sort).map((scannedItem: any, index) => {
						return (
							<React.Fragment key={scannedItem.name}>
								{index % 3 === 1 && <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
									<BannerAd
										size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
										unitId={BANNER_AD_UNIT_ID}
										onAdLoaded={() => {}}
										onAdFailedToLoad={error => {
											console.error('Advert failed to load: ', error);
										}}
									/>
								</View>}
								<Swipeable
									useNativeAnimations
									overshootLeft={false}
									overshootRight={false}
									renderRightActions={RenderRight}
									onSwipeableWillOpen={async () => {
										setFetchingData(true);
										const updatedData = { ...fbUser };

										delete updatedData.recentScans[scannedItem.barcode];

										if (user?.uid) {
											await updateRecentScans(user.uid, updatedData.recentScans);
										} else {
											alert('Error deleting entry!');
										}

										setFetchingData(false);
									}}
								>
									<RecentScanCard
										vegStatus={scannedItem.vegStatus}
										ingredients={scannedItem.ingredients}
										userFoodPrefs={fbUser.foodPrefs}
										title={scannedItem.name}
										barcode={scannedItem.barcode}
										lastScanned={scannedItem.lastScanned}
										imgUrl={scannedItem.img}
										onProdSelect={handleProdSelect}
									></RecentScanCard>
								</Swipeable>
							</React.Fragment>
						);
					}) : <View style={{ ...general.center, alignItems: 'center', height: SCREEN_HEIGHT - 150 }}><Text>Use the 'Scanner tab' to start your scanning journie!</Text></View>)}
				</ScrollView>
				{/* {prod?.title && <ScannedItemInfoSheet product={prod} />} */}
				<Portal>
					<Modal
						visible={showModal}
						onDismiss={() => setShowModal(false)}
						contentContainerStyle={{ ...helpers.p20, backgroundColor: 'black', margin: 20, borderRadius: 10 }}
					>
						<Text style={{ color: theme.colors.onBackground }}>No Product Found for the given Barcode! We'll find this product for you and will update the information soon! </Text>
						<Text style={helpers.mx10}>Thanks for supporting.</Text>
						<Button
							mode='contained'
							onPress={() => setShowModal(false)}
							style={{ marginTop: 20, marginHorizontal: 10 }}
						>Ok!</Button>
					</Modal>
				</Portal>
			</SafeAreaView>
		)
	);
};

export default RecentScans;
