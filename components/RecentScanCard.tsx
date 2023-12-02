import { Image } from 'expo-image';
import { SCREEN_WIDTH, helpers } from '../styles';
import { View } from 'react-native';
import * as utils from '../utils';
import { Text, Card, useTheme, Icon, Chip } from 'react-native-paper';
import React, { PropsWithChildren } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import moment from 'moment';

interface RecentScanCardProps extends PropsWithChildren {
	barcode: string;
	imgUrl: string;
	title: string;
	lastScanned: string;
	ingredients: string[];
	vegStatus: utils.VEG_STATUS,
	onProdSelect: (barcode: string) => void;
	userFoodPrefs: number[];
}

const RecentScanCard = ({
	barcode,
	imgUrl,
	title,
	lastScanned,
	onProdSelect,
	vegStatus,
	ingredients,
	userFoodPrefs,
}: RecentScanCardProps) => {
	const theme = useTheme();
	const getTimestring = (utcTimestamp: string) => {
		const dt = moment(utcTimestamp).local(true).fromNow();

		return dt;
	};

	const getProductMatchState = (): { state: string, color: string } => {
		let stateToConvert = utils.PRODUCT_MATCH_STATE.UNKNOWN_MATCH;

		if (userFoodPrefs.length) {
			stateToConvert = utils.matchProductToPreferences(ingredients, vegStatus, userFoodPrefs);
		}

		return {
			state: utils.getHumanReadableProductMatchStr(stateToConvert),
			color: utils.getStateColor(stateToConvert)
		};
	};

	return (
		<Card mode='elevated' style={helpers.m5}>
			<TouchableOpacity onPress={() => onProdSelect(barcode)}>
				<View style={{
					elevation: 2,
					borderRadius: 10,
					flexDirection: 'row',
					backgroundColor: theme.colors.inverseOnSurface,
					padding: 10
				}}>
					<View style={{ marginRight: 15 }}>
						<Image source={{ uri: imgUrl }} style={{
							height: 75,
							width: 75,
							borderRadius: 10
						}} />
					</View>
					<View>
						<View style={{ width: SCREEN_WIDTH - 150 }}>
							<Text style={{ marginBottom: 5, fontSize: 16 }} numberOfLines={1}>{title}</Text>
							<Text style={{ marginBottom: 6, fontSize: 12 }}>{getTimestring(lastScanned)}</Text>
						</View>
						<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
							<Chip
								compact
								textStyle={{ fontSize: 12 }}
								icon={() => (
									<Icon source="circle" size={16} color={getProductMatchState().color} />
								)}
							>{getProductMatchState().state}</Chip>
						</View>
					</View>
				</View>
			</TouchableOpacity>
		</Card>
	)
}

export default RecentScanCard;
