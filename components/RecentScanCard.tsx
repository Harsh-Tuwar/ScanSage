import { Image } from 'expo-image';
import { helpers } from '../styles';
import { View } from 'react-native';
import { Text, Card, useTheme } from 'react-native-paper';
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
	const theme = useTheme();
	const getTimestring = (utcTimestamp: string) => {
		const dt = moment(utcTimestamp).local(true).fromNow();

		return dt;
	}

	return (
		<Card mode='elevated' style={helpers.m5}>
			<TouchableOpacity onPress={() => onProdSelect(barcode)}>
				<View style={{ elevation: 2, borderRadius: 10, flexDirection: 'row', backgroundColor: theme.colors.inverseOnSurface, padding: 10 }}>
					<View style={{ marginRight: 15 }}>
						<Image source={{ uri: imgUrl }} style={{
							height: 75,
							width: 75,
							borderRadius: 10
						}} />
					</View>
					<View>
						<View>
							<Text style={{ marginBottom: 5, fontSize: 16 }}>{title}</Text>
							<Text style={{ marginBottom: 6, fontSize: 12 }}>{getTimestring(lastScanned)}</Text>
							<Text style={{ fontSize: 8 }}>Good Match</Text>
						</View>
					</View>
				</View>
			</TouchableOpacity>
		</Card>
	)
}

export default RecentScanCard;
