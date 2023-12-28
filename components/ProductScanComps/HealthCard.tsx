import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import * as scan from '../../utils/scan';
import { Card, Text, Divider, Chip } from 'react-native-paper';
import { NutrientLevels, Nutriments } from '../../api/api-types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { helpers } from '../../styles';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { BANNER_AD_UNIT_ID } from '../../constants';

interface NutrientLevelsProps {
	nutrientLevels: NutrientLevels,
	nutriments: Nutriments
};

const HealthCard = ({
	nutrientLevels,
	nutriments
}: NutrientLevelsProps) => {
	return (
		<>
			<Card style={{ margin: 10 }}>
				<Card.Content>
					<Text variant="titleMedium">⚕️ Health</Text>
					<Divider style={{ marginVertical: 10 }} bold />
					<View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
						{Object.keys(nutrientLevels).map((nutriItem) => {
							const nutriLevelItem = nutrientLevels[nutriItem as keyof typeof nutrientLevels];
							const nutriLevelItemStr = scan.getKeyValue_FromNutriLevel(nutriItem, nutriLevelItem, nutriments);

							return (
								<TouchableOpacity style={{ ...helpers.m5 }} key={nutriItem}>
									<Chip
										icon={() => <MaterialCommunityIcons name="circle" color={scan.getNutrilevelColor(nutriLevelItem)} size={26} />}
										compact
									>{nutriLevelItemStr}</Chip>
								</TouchableOpacity>
							)
						})}
					</View>
				</Card.Content>
			</Card>
		</>
	)
}

export default HealthCard;
