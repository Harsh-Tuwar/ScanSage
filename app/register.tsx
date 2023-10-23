import { KeyboardAvoidingView, Text, View } from 'react-native';
import { registerStyles, helpers, general } from '../styles';
import { TextInput } from 'react-native-paper';
import { Formik, FormikHelpers } from 'formik';
import { Button } from 'react-native-paper';
import { router } from 'expo-router';
import { useState } from 'react';

interface RegisterFormValues {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
  }

const Register = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	return (
		<View style={{ ...helpers.f1, ...helpers.justifyContentCenter, ...helpers.p20 }}>
			<KeyboardAvoidingView behavior='padding'>
				<Text style={{ ...registerStyles.registerLabel, ...general.font2 }}>Register</Text>
				<Formik
					initialValues={{
						name: '',
						email: '',
						password: '',
						confirmPassword: ''
					}}
					onSubmit={(
						values: RegisterFormValues,
						{ setSubmitting }: FormikHelpers<RegisterFormValues>
					) => {
						setTimeout(() => {
							alert(JSON.stringify(values, null, 2));
							setSubmitting(false);
						}, 500);
					}}
				>
					{({ handleChange, handleBlur, handleSubmit, values }) => (
						<View>
							<TextInput
								label="Name"
								mode='outlined'
								style={{ marginVertical: 5, width: '100%', ...general.font2 }}
								keyboardType='default'
								onBlur={handleBlur('name')}
								value={values.name}
								onChangeText={handleChange('name')}
							/>
							<TextInput
								label="Email"
								mode='outlined'
								style={{ marginVertical: 5, width: '100%', ...general.font2 }}
								keyboardType='email-address'
								onBlur={handleBlur('email')}
								value={values.email}
								onChangeText={handleChange('email')}
							/>
							<TextInput
								label="Password"
								mode='outlined'
								style={{ marginVertical: 5, width: '100%', ...general.font2 }}
								keyboardType='visible-password'
								onBlur={handleBlur('password')}
								secureTextEntry={showPassword}
								right={<TextInput.Icon icon={showPassword ? 'eye' : 'eye-off'} onPress={() => setShowPassword(!showPassword)} />}
								value={values.password}
								onChangeText={handleChange('password')}
							/>
							<TextInput
								label="Confirm Password"
								mode='outlined'
								style={{ marginVertical: 5, width: '100%', ...general.font2 }}
								keyboardType='visible-password'
								secureTextEntry={showConfirmPassword}
								right={<TextInput.Icon icon={showConfirmPassword ? 'eye' : 'eye-off'} onPress={() => setShowConfirmPassword(!showConfirmPassword)} />}
								onBlur={handleBlur('confirmPassword')}
								value={values.confirmPassword}
								onChangeText={handleChange('confirmPassword')}
							/>
							<Button
								mode='contained'
								style={{ ...helpers.mx5, ...general.font2 }}
								onPress={(e: any) => handleSubmit(e)}
							>Register</Button>
							<Button
								mode='text'
								style={{ marginTop: 5, ...general.font2 }}
								onPress={() => {
									router.push('/');
								}}
							>Already have an account? Sign In</Button>
						</View>
					)}
				</Formik>
			</KeyboardAvoidingView>
		</View>
	);
}

export default Register;
