import { Image } from 'expo-image';
import { helpers } from '../styles';
import { Card } from 'react-native-paper';
import React, { PropsWithChildren } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import moment from 'moment';

interface RecentScanCardProps extends PropsWithChildren {
	barcode: string;
	imgUrl: string;
	title: string;
	lastScanned: string;
	onProdSelect: (barcode: string) => void
}

const RecentScanCard = ({
	barcode,
	imgUrl,
	title,
	lastScanned,
	onProdSelect
}: RecentScanCardProps) => {
	const getTimestring = (utcTimestamp: string) => {
		const dt = moment(utcTimestamp).local(true).fromNow();

		return dt;
	}

	return (
		<Card mode='elevated' style={helpers.m5}>
			<TouchableOpacity onPress={() => onProdSelect(barcode)}>
				<Card.Title
					subtitleStyle={{ fontSize: 10, marginLeft: 15 }}
					titleStyle={{ marginLeft: 15 }}
					title={title}
					subtitle={getTimestring(lastScanned)}
					left={(props) => <Image source={{ uri: imgUrl }} style={{
						height: 64,
						width: 64,
						marginLeft: -10,
						borderRadius: 10
					}} />}
				/>
			</TouchableOpacity>
		</Card>
	)
}

export default RecentScanCard;
