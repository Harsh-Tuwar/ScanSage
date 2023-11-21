import { View } from 'react-native';
import { helpers } from '../styles';
import React, { PropsWithChildren, useState } from 'react';
import { Text, Divider, RadioButton, Portal, Modal, Icon, Button, useTheme } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface FoodPrepItemProps extends PropsWithChildren {
	selectedValue: string;
	title: string;
	modalContent?: string;
	setValue: (value: string) => void;
}

const FoodPrefItem = ({ title, modalContent, selectedValue, setValue }: FoodPrepItemProps) => {
	const theme = useTheme();
	const [showModal, setShowModal] = useState(false);

	return (
		<View style={{ ...helpers.p5, backgroundColor: theme.colors.background }}>
			<View style={{ flex: 1, flexDirection: 'row' }}>
				<Text variant='titleMedium' style={{ flex: 2 }}>{title}</Text>
				{modalContent && <TouchableOpacity onPress={() => setShowModal(true)}>
					<Icon source={'information'} size={26} />
				</TouchableOpacity>}
			</View>
			<Divider style={helpers.mx5} />
			<RadioButton.Group onValueChange={(newValue) => {
				setValue(newValue);
			}} value={selectedValue}>
				<RadioButton.Item label="Not Important" labelVariant='bodyMedium' value="0" />
				<RadioButton.Item label="Important" labelVariant='bodyMedium' value="1" />
				<RadioButton.Item label="Very Important" labelVariant='bodyMedium' value="2" />
				<RadioButton.Item label="Mandatory" labelVariant='bodyMedium' value="3" />
			</RadioButton.Group>
			<Portal>
				<Modal
					theme={theme}
					visible={showModal}
					onDismiss={() => setShowModal(false)}
					contentContainerStyle={{ ...helpers.p20, backgroundColor: 'black', margin: 20, borderRadius: 10 }}
				>
					<Text theme={theme}>{modalContent}</Text>
					<Button theme={theme} mode='contained' onPress={() => setShowModal(false)} style={{ marginTop: 20, marginHorizontal: 10 }}>Got it</Button>
				</Modal>
			</Portal>
		</View>
	)
}

export default FoodPrefItem