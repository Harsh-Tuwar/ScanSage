import React from 'react';
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { Link, router } from 'expo-router';
import { IconButton, Text, TextInput } from 'react-native-paper';
import { helpers } from '../styles';
import PageTitle from '../components/PageTitle';
import { useUser } from '../context/UserContext';

// TODO: Finish this component

const ModifyUserModal = () => {
	const { user } = useUser();

	return (
		<View style={helpers.m10}>
			<View style={{ flexDirection: 'row' }}>
				<PageTitle>Update Profile</PageTitle>
				<View style={{ flexGrow: 1 }}></View>
				<IconButton
					icon="close-circle"
					size={32}
					onPress={() => router.back()}
				/>
			</View>
			<KeyboardAvoidingView behavior='padding' style={{ padding: 10 }}>
				<TextInput
					label="Name"
					mode='outlined'
					style={styles.textfield}
					keyboardType='default'
					value={user?.displayName ?? ''}
					// onChangeText={text => setEmail(text)}
				/>
				<TextInput
					label="Username"
					mode='outlined'
					style={styles.textfield}
					keyboardType='email-address'
					value={user?.email ?? ''}
					// onChangeText={text => setEmail(text)}
				/>
			</KeyboardAvoidingView>
		</View>
	);
}

const styles = StyleSheet.create({
	textfield: {
		marginVertical: 5
	},
});

export default ModifyUserModal;
