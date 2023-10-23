import { Button, Portal, Snackbar, TextInput } from 'react-native-paper';
import { Redirect, useRouter } from 'expo-router';
import { SNACK_DURATION } from '../constants';
import { useUser } from '../context/UserContext';
import { View, Text, StyleSheet, KeyboardAvoidingView } from "react-native";
import * as fbAuth from '../firebase/auth';
import CenterLoader from '../components/CenterLoader';
import React, { useState } from "react";

const LoginPage = () => {
	const { user, initialized } = useUser();
	const router = useRouter();
	const [email, setEmail] = useState('wishw244@gmail.com');
	const [password, setPassword] = useState('123456789');
	const [showPassword, setShowPassword] = useState(true);
	const [snackObj, setSnackObj] = useState({ visible: false, message: '' });
	const [loadingAction, setLoadingAction] = useState(false);

	if (initialized && user) {
		return <Redirect href={'/(app)/scan'} />
	}

	const handleLoginPress = async () => {
		if (!email || !password) {
			setSnackObj({
				visible: true,
				message: 'Username/Password is required'
			});

			return;
		}

		setLoadingAction(true);
		await fbAuth.login(email, password);
		setLoadingAction(false);
	}

	if (!initialized || loadingAction) {
		return <CenterLoader />;
	}

	return (
		<View style={styles.centered}>
			<KeyboardAvoidingView behavior='padding'>
				<Text style={styles.title}>Login</Text>
				<TextInput
					label="Username"
					mode='outlined'
					style={styles.textfield}
					keyboardType='email-address'
					value={email}
					onChangeText={text => setEmail(text)}
				/>
				<TextInput
					label="Password"
					value={password}
					mode='outlined'
					style={styles.textfield}
					secureTextEntry={showPassword}
					right={<TextInput.Icon icon={showPassword ? 'eye' : 'eye-off'} onPress={() => setShowPassword(!showPassword)} />}
					keyboardType='visible-password'
					onChangeText={text => setPassword(text)}
				/>
				<Button
					mode='contained'
					style={{ marginTop: 5 }}
					onPress={handleLoginPress}
				>Login</Button>
				<Button
					mode='text'
					style={{ marginTop: 5 }}
					onPress={() => {
						router.push('/register');
					}}
				>Don't have an account? Register</Button>
			</KeyboardAvoidingView>
			<Portal>
				<Snackbar
					visible={snackObj.visible}
					duration={SNACK_DURATION}
					action={{
						label: 'OK',
						onPress: () => setSnackObj({ visible: false, message: '' }),
					}}
					onDismiss={() => setSnackObj({ visible: false, message: '' })}
				>{snackObj.message}</Snackbar>
			</Portal>
		</View>
	);
}

const styles = StyleSheet.create({
	centered: {
		flex: 1,
		justifyContent: "center",
		padding: 20
	},
	title: {
		marginBottom: 10,
		fontSize: 18,
		marginVertical: 2,
		color: 'black',
		textAlign: 'center',
	},
	textfield: {
		marginVertical: 5
	},
});

export default LoginPage;

