import React, { PropsWithChildren } from 'react';
import { Card } from 'react-native-paper';
import { Image } from 'expo-image';
import { timeAgoString } from '../utils';
import { helpers } from '../styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
	return (
		<Card mode='elevated' style={helpers.m5}>
			<TouchableOpacity onPress={() => onProdSelect(barcode)}>
				<Card.Title
					subtitleStyle={{ fontSize: 10, marginLeft: 15 }}
					titleStyle={{ marginLeft: 15 }}
					title={title}
					subtitle={timeAgoString(new Date(lastScanned))}
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
