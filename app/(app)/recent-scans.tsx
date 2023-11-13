import React, { useState } from 'react';
import { helpers } from '../../styles';
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

const RecentScans = () => {
	const { fbUser } = useUser();
	const [fetchingData, setFetchingData] = useState(false);
	const [prod, setProd] = useState<null | FoodFactsProduct>(null);

	const handleProdSelect = async (barcode: string) => {
		setFetchingData(true);

		const prodData = await API.getProductData(barcode);

		setProd(prodData);

		setFetchingData(false);
	};

	return (
		fetchingData ? <CenterLoader /> : (
			<SafeAreaView style={{ ...helpers.m10 }}>
				<PageTitle>Recent Scans</PageTitle>
				<ScrollView>
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
				{prod && <ScannedItemInfoSheet product={prod} />}
			</SafeAreaView>
		)
	);
};

export default RecentScans;
