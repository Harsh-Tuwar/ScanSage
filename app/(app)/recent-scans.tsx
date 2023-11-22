import React, { useState } from 'react';
import { SCREEN_HEIGHT, general, helpers } from '../../styles';
import PageTitle from '../../components/PageTitle';
import { useUser } from '../../context/UserContext';
import { ScrollView } from 'react-native-gesture-handler';
import RecentScanCard from '../../components/RecentScanCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { FoodFactsProduct } from '../../api/api-types';
import * as API from '../../api/openFoodFactsService';
import CenterLoader from '../../components/CenterLoader';
import ScannedItemInfoSheet from '../../components/ScannedItemInfoSheet';
import { sortHelpers } from '../../utils';
import { Button, Modal, Portal, Text, useTheme } from 'react-native-paper';
import RenderRight from '../../components/AnimatedRightButton';
import { refetchFbUserData, updateRecentScans } from '../../firebase/db';
import { View, RefreshControl } from 'react-native';

const RecentScans = () => {
	const theme = useTheme();
	const [refreshing, setRefreshing] = React.useState(false);
	const { fbUser, user} = useUser();
	const [fetchingData, setFetchingData] = useState(false);
	const [prod, setProd] = useState<null | FoodFactsProduct>(null);
	const [showModal, setShowModal] = useState(false);

	const handleProdSelect = async (barcode: string) => {
		setFetchingData(true);

		const prodData = await API.getProductData(barcode);

		if (prodData.title === '') {
			setShowModal(true);
		}

		setProd(prodData);

		setFetchingData(false);
	};

	const onRefresh = React.useCallback(async () => {
		setRefreshing(true);

		// method to refresh recent scans
		await refetchFbUserData(user?.uid ?? '', fbUser?.foodPrefs ?? {});

		setRefreshing(false);
	}, []);

	return (
		fetchingData ? <CenterLoader /> : (
			<SafeAreaView style={{ ...helpers.p10, backgroundColor: theme.colors.background }}>
				<PageTitle>Recent Scans</PageTitle>
				<ScrollView
					style={{ ...helpers.mb20, height: SCREEN_HEIGHT }}
					refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
				>
					{fbUser?.recentScans && (Object.values(fbUser.recentScans).length > 0 ? Object.values(fbUser.recentScans).sort(sortHelpers.last_scanned_sort).map((scannedItem: any) => {
						return (
							<Swipeable
								key={scannedItem.name}
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
									title={scannedItem.name}
									barcode={scannedItem.barcode}
									lastScanned={scannedItem.lastScanned}
									imgUrl={scannedItem.img}
									onProdSelect={handleProdSelect}
								></RecentScanCard>
							</Swipeable>
						);
					}) : <View style={{ ...general.center, alignItems: 'center', height: SCREEN_HEIGHT - 150 }}><Text>Use the 'Scanner tab' to start your scanning journie!</Text></View>)}
				</ScrollView>
				{prod?.title && <ScannedItemInfoSheet product={prod} />}
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
