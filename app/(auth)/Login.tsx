import { View, Text, StyleSheet, KeyboardAvoidingView } from "react-native";
import React, { useState } from "react";
import { Button, Portal, Snackbar, TextInput } from 'react-native-paper';
import { SNACK_DURATION } from '../../constants';
import * as fbAuth from '../../firebase/auth';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(true);
	const [snackObj, setSnackObj] = useState({ visible: false, message: '' });

	const handleLoginPress = async () => {
		if (!email || !password) {
			setSnackObj({
				visible: true,
				message: 'Username/Password is required'
			});

			return;
		}

		await fbAuth.login(email, password);
	}

	return (
		<View style={styles.centered}> (
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
				<Button mode='contained' style={{ marginTop: 5 }} onPress={handleLoginPress}>Login</Button>
			</KeyboardAvoidingView>
			)
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
};

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
		color: 'black'
	},
	textfield: {
		marginVertical: 5
	},
});

export default Login;
