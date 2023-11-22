import { User, signOut } from 'firebase/auth';
import { List, Divider, useTheme, Portal, Text, Modal, TextInput, Button, Snackbar } from 'react-native-paper';
import { FIREBASE_AUTH } from '../../firebase/FBConfig';
import { router } from 'expo-router';
import { SCREEN_HEIGHT, helpers } from '../../styles';
import { useUser } from '../../context/UserContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import PageTitle from '../../components/PageTitle';
import { ScrollView } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native';
import packageJson from '../../package.json';
import { useEffect, useState } from 'react';
import CenterLoader from '../../components/CenterLoader';
import * as db from '../../firebase/db';

const Settings = () => {
	const [loadingAction, setLoadingAction] = useState(true);
	const theme = useTheme();
	const [showModal, setShowModal] = useState(false);
	const [userDN, setUserDn] = useState('');
	const { fbUser, user } = useUser();
	const [snackObj, setSnackObj] = useState({ vis: false, msg: '' });

	useEffect(() => {
		setLoadingAction(true);

		if (user) {
			setUserDn(user.displayName ?? 'Unknown User');
		}

		setLoadingAction(false);
	}, [showModal]);

	const logout = async () => {
		await signOut(FIREBASE_AUTH);
		router.replace('/');
	};

	const updateDisplayName = async () => {
		setShowModal(false);
		setLoadingAction(true);
		await db.modifyUserInfo(user as User, { name: userDN });
		setLoadingAction(false);
		setSnackObj({
			vis: true,
			msg: 'Wohoo 🥳! User information updated!'
		});
	};

	return (
		<SafeAreaView style={{ ...helpers.p10, backgroundColor: theme.colors.background }}>
			<PageTitle>Settings</PageTitle>
			<ScrollView style={{ ...helpers.mb20, height: SCREEN_HEIGHT }}>
				{loadingAction ? <CenterLoader /> : (
					<>
						<List.Section>
							<List.Subheader>Preferences</List.Subheader>
							<Divider bold />
							<TouchableOpacity onPress={() => {
								router.push('/food-prefs');
							}}>
								<List.Item title="Dietary Preferences" description="Choose what information about food matters most to you" left={() => <List.Icon icon="food-variant" />} />
							</TouchableOpacity>
							{/* TODO: Make this work */}
							{/* <TouchableOpacity onPress={() => console.log('show update theme modal')}>
							<List.Item title="Theme" description="Light" left={() => <List.Icon icon="theme-light-dark" />} />
						</TouchableOpacity> */}
						</List.Section>
						<List.Section>
							<List.Subheader>General</List.Subheader>
							<Divider bold />
							<TouchableOpacity onPress={() => { setShowModal(true); }}>
								<List.Item title="Account" description={fbUser?.name ?? 'Unknown User'} left={() => <List.Icon icon="account" />} />
							</TouchableOpacity>
							<TouchableOpacity onPress={() => { }}>
								<List.Item title="Version" description={packageJson.version} left={() => <List.Icon icon="code-tags" />} />
							</TouchableOpacity>
							<TouchableOpacity onPress={logout}>
								<List.Item title="Logout" description="Sorry to see you go 🥲" left={() => <List.Icon icon="logout" />} />
							</TouchableOpacity>
						</List.Section>
					</>
				)}
			</ScrollView>
			<Portal>
				<Modal
					visible={showModal}
					onDismiss={() => setShowModal(false)}
					contentContainerStyle={{ ...helpers.p20, backgroundColor: 'black', margin: 20, borderRadius: 10 }}
				>
					<Text variant='titleMedium'>👤 Update Details</Text>
					<Divider style={helpers.mx10} />
					<TextInput
						label="Name"
						value={userDN}
						mode='outlined'
						onChangeText={text => setUserDn(text)}
					></TextInput>
					<Button
						theme={theme}
						mode='contained'
						onPress={updateDisplayName}
						icon={'check-circle'}
						style={{ marginTop: 20, marginHorizontal: 10 }}
					>Update</Button>
				</Modal>
			</Portal>
			<Portal>
				<Snackbar
					style={{ backgroundColor: 'black' }}
					visible={snackObj.vis}
					duration={1000}
					action={{
						label: 'OK!',
						labelStyle: {
							color: 'white'
						},
						onPress: () => setSnackObj({ vis: false, msg: '' }),
					}}
					onDismiss={() => setSnackObj({ msg: '', vis: false })}
				>
					<Text>{snackObj.msg}</Text>
				</Snackbar>
			</Portal>
		</SafeAreaView>
	);
}

export default Settings;
