import { View } from 'react-native';
import { helpers } from '../styles';
import { Card, List } from 'react-native-paper';
import React, { PropsWithChildren } from 'react';

interface FoodPrefAccordianItemProps extends PropsWithChildren {
	id: string;
	title: string;
}

const FoodPrefAccordianItem = ({
	title,
	id,
	children
}: FoodPrefAccordianItemProps) => {
	return (
		<View style={{ ...helpers.mx10 }}>
			<Card mode='outlined'>
				<Card.Content>
					<List.Accordion title={title} id={id}>
						{children}
					</List.Accordion>
				</Card.Content>
			</Card>
		</View>
	)
}

export default FoodPrefAccordianItem;
