import { View } from 'react-native';
import { helpers } from '../styles';
import React, { PropsWithChildren, useState } from 'react';
import { Text, Divider, RadioButton, Portal, Modal, Icon, Button } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface FoodPrepItemProps extends PropsWithChildren {
	title: string;
	modalContent?: string;
}

const FoodPrefItem = ({ title, modalContent }: FoodPrepItemProps) => {
	const [showModal, setShowModal] = useState(false);

	return (
		<View style={{ ...helpers.p5 }}>
			<View style={{ flex: 1, flexDirection: 'row' }}>
				<Text variant='titleMedium' style={{ flex: 2 }}>{title}</Text>
				{modalContent && <TouchableOpacity onPress={() => setShowModal(true)}>
					<Icon source={'information'} size={26} />
				</TouchableOpacity>}
			</View>
			<Divider style={helpers.mx5} />
			<RadioButton.Group onValueChange={value => { }} value={'2'}>
				<RadioButton.Item label="Not Important" labelVariant='bodyMedium' value="1" />
				<RadioButton.Item label="Important" labelVariant='bodyMedium' value="2" />
				<RadioButton.Item label="Very Important" labelVariant='bodyMedium' value="3" />
				<RadioButton.Item label="Mandatory" labelVariant='bodyMedium' value="4" />
			</RadioButton.Group>
			<Portal>
				<Modal
					visible={showModal}
					onDismiss={() => setShowModal(false)}
					contentContainerStyle={{ ...helpers.p20, backgroundColor: 'white', margin: 20, borderRadius: 10 }}
				>
					<Text>{modalContent}</Text>
					<Button mode='contained' onPress={() => setShowModal(false)} style={{ marginTop: 20, marginHorizontal: 10 }}>Got it</Button>
				</Modal>
			</Portal>
		</View>
	)
}

export default FoodPrefItem