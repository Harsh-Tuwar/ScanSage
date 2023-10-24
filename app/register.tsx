import { KeyboardAvoidingView, Text, View } from 'react-native';
import { registerStyles, helpers } from '../styles';
import { HelperText, Portal, Snackbar, TextInput } from 'react-native-paper';
import { Formik, FormikHelpers } from 'formik';
import { Button } from 'react-native-paper';
import { router } from 'expo-router';
import { useState } from 'react';
import { SNACK_DURATION } from '../constants';
import * as yup from 'yup';
import * as fbAuth from '../firebase/auth';
import * as fbDb from '../firebase/db';
import CenterLoader from '../components/CenterLoader';

const registerValidationSchema = yup.object().shape({
	name: yup
		.string()
		.matches(/(\w.+\s).+/, 'Enter at least 2 names')
		.required('Full name is required'),
	email: yup
		.string()
		.email("Please enter valid email")
		.required('Email is required'),
	password: yup
		.string()
		.matches(/\w*[a-z]\w*/, "Password must have a small letter")
		.matches(/\w*[A-Z]\w*/, "Password must have a capital letter")
		.matches(/\d/, "Password must have a number")
		.matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, "Password must have a special character")
		.min(8, ({ min }) => `Password must be at least ${min} characters`)
		.required('Password is required'),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password')], 'Passwords do not match')
		.required('Confirm password is required'),
});

interface RegisterFormValues {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
}

const Register = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [snackObj, setSnackObj] = useState({ msg: '', visible: false });
	const [loading, setLoading] = useState(false);

	const handleSignup = async (values: RegisterFormValues) => {
		setLoading(true);
		
		const userCreationResponse = await fbAuth.signUp(
			values.name,
			values.email,
			values.password
		);

		if (typeof userCreationResponse === 'string') {
			setSnackObj({
				visible: true,
				msg: userCreationResponse
			});
			setLoading(false);
			return;
		}

		if (userCreationResponse.hasOwnProperty('displayName')) {
			await fbDb.createUserInformation(userCreationResponse);
		}
		
		setLoading(false);
		router.replace('/food-prefs');
	}

	if (loading) {
		return <CenterLoader />;
	}

	return (
		<View style={{ ...helpers.f1, ...helpers.justifyContentCenter, ...helpers.p20 }}>
			<KeyboardAvoidingView behavior='padding'>
				<Text style={{ ...registerStyles.registerLabel }}>Register</Text>
				<Formik
					initialValues={{
						name: '',
						email: '',
						password: '',
						confirmPassword: ''
					}}
					validationSchema={registerValidationSchema}
					onSubmit={async (
						values: RegisterFormValues,
						{ setSubmitting }: FormikHelpers<RegisterFormValues>
					) => {
						await handleSignup(values);
						setSubmitting(false);
					}}
				>
					{({ handleChange, handleBlur, handleSubmit, values, isValid, errors }) => (
						<View>
							<TextInput
								label="Name"
								mode='outlined'
								style={{ marginVertical: 5, width: '100%' }}
								keyboardType='default'
								onBlur={handleBlur('name')}
								value={values.name}
								onChangeText={handleChange('name')}
								error={Boolean(errors['name'])}
							/>
							{Boolean(errors['name']) && (
								<HelperText type='error' visible={Boolean(errors['name'])}>{errors['name']}</HelperText>
							)}
							<TextInput
								label="Email"
								mode='outlined'
								style={{ marginVertical: 5, width: '100%' }}
								keyboardType='email-address'
								onBlur={handleBlur('email')}
								value={values.email}
								onChangeText={handleChange('email')}
								error={Boolean(errors['email'])}
							/>
							{Boolean(errors['email']) && (
								<HelperText type='error' visible={Boolean(errors['email'])}>{errors['email']}</HelperText>
							)}
							<TextInput
								label="Password"
								mode='outlined'
								style={{ marginVertical: 5, width: '100%' }}
								keyboardType='visible-password'
								onBlur={handleBlur('password')}
								secureTextEntry={showPassword}
								right={<TextInput.Icon icon={showPassword ? 'eye' : 'eye-off'} onPress={() => setShowPassword(!showPassword)} />}
								value={values.password}
								onChangeText={handleChange('password')}
								error={Boolean(errors['password'])}
							/>
							{Boolean(errors['password']) && (
								<HelperText type='error' visible={Boolean(errors['password'])}>{errors['password']}</HelperText>
							)}
							<TextInput
								label="Confirm Password"
								mode='outlined'
								style={{ marginVertical: 5, width: '100%' }}
								keyboardType='visible-password'
								secureTextEntry={showConfirmPassword}
								right={<TextInput.Icon icon={showConfirmPassword ? 'eye' : 'eye-off'} onPress={() => setShowConfirmPassword(!showConfirmPassword)} />}
								onBlur={handleBlur('confirmPassword')}
								value={values.confirmPassword}
								onChangeText={handleChange('confirmPassword')}
								error={Boolean(errors['confirmPassword'])}
							/>
							{Boolean(errors['confirmPassword']) && (
								<HelperText type='error' visible={Boolean(errors['confirmPassword'])}>{errors['confirmPassword']}</HelperText>
							)}
							<Button
								mode='contained'
								style={{ ...helpers.mx5 }}
								onPress={(e: any) => handleSubmit(e)}
								disabled={!isValid}
							>Register</Button>
							<Button
								mode='text'
								style={{ marginTop: 5 }}
								onPress={() => {
									router.push('/');
								}}
							>Already have an account? Sign In</Button>
						</View>
					)}
				</Formik>
			</KeyboardAvoidingView>
			<Portal>
				<Snackbar
					visible={snackObj.visible}
					duration={SNACK_DURATION}
					action={{
						label: 'OK',
						onPress: () => setSnackObj({ visible: false, msg: '' }),
					}}
					onDismiss={() => setSnackObj({ visible: false, msg: '' })}
				>{snackObj.msg}</Snackbar>
			</Portal>
		</View>
	);
}

export default Register;
