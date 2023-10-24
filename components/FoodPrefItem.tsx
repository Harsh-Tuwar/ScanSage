import React, { PropsWithChildren } from 'react';
import { View } from 'react-native';
import { Text, Divider, RadioButton } from 'react-native-paper';
import { helpers } from '../styles';

interface FoodPrepItemProps extends PropsWithChildren {
	title: string;
}

const FoodPrefItem = ({ title }: FoodPrepItemProps) => {
  return (
	  <View style={{ ...helpers.p5 }}>
		  <Text variant='titleMedium'>{title}</Text>
		  <Divider style={helpers.mx5} />
		  <RadioButton.Group onValueChange={value => { }} value={'2'}>
			  <RadioButton.Item label="Not Important" labelVariant='bodyMedium' value="1" />
			  <RadioButton.Item label="Important" labelVariant='bodyMedium' value="2" />
			  <RadioButton.Item label="Very Important" labelVariant='bodyMedium' value="3" />
			  <RadioButton.Item label="Mandatory" labelVariant='bodyMedium' value="4" />
		  </RadioButton.Group>
	  </View>
  )
}

export default FoodPrefItem