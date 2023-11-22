import React from 'react';
import { KeyboardAvoidingView, SafeAreaView, StyleSheet, View, Image } from 'react-native';
import { Link, router } from 'expo-router';
import { Button, IconButton, Text, TextInput, useTheme } from 'react-native-paper';
import { SCREEN_HEIGHT, helpers, general } from '../styles';
import PageTitle from '../components/PageTitle';
import { useUser } from '../context/UserContext';

// TODO: Finish this component

const ModifyUserModal = () => {
	const theme = useTheme();
	const { user } = useUser();

	return (
		<SafeAreaView style={{ ...helpers.p10, backgroundColor: theme.colors.background, height: SCREEN_HEIGHT - 40 }}>
			<PageTitle>Update Profile</PageTitle>
			<KeyboardAvoidingView behavior='padding' style={{ padding: 10, ...helpers.f1, ...helpers.mt20 }}>
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
			<View style={{ flexDirection: 'row' }}>
				<Button
					style={{ ...helpers.my10, flex: 1 }}
					mode="outlined"
					onPress={() => router.back()}
					labelStyle={{ alignSelf: 'flex-end' }}
					icon="arrow-left-thick"
				>
					Back
				</Button>
				<Button
					style={{ ...helpers.my10, flex: 1 }}
					mode="contained"
					onPress={() => router.replace('/(app)/recent-scans')}
					labelStyle={{ alignSelf: 'flex-end' }}
					icon="check"
				>
					Save
				</Button>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	textfield: {
		marginVertical: 5
	},
});

export default ModifyUserModal;
