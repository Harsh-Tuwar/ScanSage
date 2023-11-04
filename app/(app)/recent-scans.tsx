import React from 'react'
import { helpers } from '../../styles';
import PageTitle from '../../components/PageTitle';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from '../../context/UserContext';
import { ScrollView } from 'react-native-gesture-handler';
import RecentScanCard from '../../components/RecentScanCard';

interface FBRecentScannedItem {
	barcode: string;
	title: string;
};

const RecentScans = () => {
	const { fbUser } = useUser();

	return (
		<SafeAreaView style={{ ...helpers.m10 }}>
			<PageTitle>Recent Scans</PageTitle>
			<ScrollView>
				{fbUser?.recentScans && Object.values(fbUser.recentScans).map((scannedItem: any) => {
					return (
						<RecentScanCard
							key={scannedItem.barcode}
							title={scannedItem.name}
							barcode={scannedItem.barcode}
							lastScanned={scannedItem.lastScanned}
							imgUrl={scannedItem.img}
						></RecentScanCard>
					);
				})}
			</ScrollView>
		</SafeAreaView>
	);
}

export default RecentScans;
