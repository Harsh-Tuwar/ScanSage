import React, { useState } from 'react';
import { SCREEN_HEIGHT, helpers } from '../../styles';
import PageTitle from '../../components/PageTitle';
import { useUser } from '../../context/UserContext';
import { ScrollView } from 'react-native-gesture-handler';
import RecentScanCard from '../../components/RecentScanCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import GmailStyleSwipeableRow from '../../components/GmailStyleSwipable';
import { FoodFactsProduct } from '../../api/api-types';
import * as API from '../../api/openFoodFactsService';
import CenterLoader from '../../components/CenterLoader';
import ScannedItemInfoSheet from '../../components/ScannedItemInfoSheet';
import { sortHelpers } from '../../utils';
import { Button, Modal, Portal, Text, useTheme } from 'react-native-paper';

const RecentScans = () => {
	const theme = useTheme();
	const { fbUser } = useUser();
	const [fetchingData, setFetchingData] = useState(false);
	const [prod, setProd] = useState<null | FoodFactsProduct>(null);
	const [showModal, setShowModal] = useState(false);

	const handleProdSelect = async (barcode: string) => {
		setFetchingData(true);

		const prodData = await API.getProductData(barcode);

		if (prodData.title === '') {
			console.log('No product found!');
			setShowModal(true);
		}

		setProd(prodData);

		setFetchingData(false);
	};

	return (
		fetchingData ? <CenterLoader /> : (
			<SafeAreaView style={{ ...helpers.p10, backgroundColor: theme.colors.background }}>
				<PageTitle>Recent Scans</PageTitle>
				<ScrollView style={{ ...helpers.mb20, height: SCREEN_HEIGHT }}>
					{fbUser?.recentScans && Object.values(fbUser.recentScans).sort(sortHelpers.last_scanned_sort).map((scannedItem: any) => {
						return (
							<GmailStyleSwipeableRow key={scannedItem.barcode}>
								<RecentScanCard
									title={scannedItem.name}
									barcode={scannedItem.barcode}
									lastScanned={scannedItem.lastScanned}
									imgUrl={scannedItem.img}
									onProdSelect={handleProdSelect}
								></RecentScanCard>
							</GmailStyleSwipeableRow>
						);
					})}
				</ScrollView>
				{prod?.title && <ScannedItemInfoSheet product={prod} />}
				<Portal>
					<Modal
						visible={showModal}
						onDismiss={() => setShowModal(false)}
						contentContainerStyle={{ ...helpers.p20, backgroundColor: 'white', margin: 20, borderRadius: 10 }}
					>
						<Text>No Product Found!</Text>
						<Button mode='contained' onPress={() => setShowModal(false)} style={{ marginTop: 20, marginHorizontal: 10 }}>Got it</Button>
					</Modal>
				</Portal>
			</SafeAreaView>
		)
	);
};

export default RecentScans;
