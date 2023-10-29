import React from 'react'
import { helpers } from '../../styles';
import PageTitle from '../../components/PageTitle';
import { SafeAreaView } from 'react-native-safe-area-context';

const RecentScans = () => {
	return (
		<SafeAreaView style={{ ...helpers.m10 }}>
			<PageTitle>Recent Scans</PageTitle>
		</SafeAreaView>
	);
}

export default RecentScans;
