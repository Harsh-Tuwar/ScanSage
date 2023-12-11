import moment from 'moment';
import { router } from 'expo-router';
import * as db from '../../firebase/db';
import { useEffect, useState } from 'react';
import packageJson from '../../package.json';
import { User, signOut } from 'firebase/auth';
import PageTitle from '../../components/PageTitle';
import { useUser } from '../../context/UserContext';
import { BANNER_AD_UNIT_ID } from '../../constants';
import { SCREEN_HEIGHT, helpers } from '../../styles';
import { TouchableOpacity, View } from 'react-native';
import { FIREBASE_AUTH } from '../../firebase/FBConfig';
import CenterLoader from '../../components/CenterLoader';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { List, Divider, useTheme, Portal, Text, Modal, TextInput, Button, Snackbar } from 'react-native-paper';

enum MODAL_TYPE {
	NONE = 0,
	USER_MODAL = 1,
	FEEDBACK_MODAL = 2
};

const Settings = () => {
	const [loadingAction, setLoadingAction] = useState(true);
	const theme = useTheme();
	const [showModalObj, setShowModalObj] = useState<{ type: MODAL_TYPE, vis: boolean }>({ type: MODAL_TYPE.NONE, vis: false });
	const [userDN, setUserDn] = useState('');
	const { fbUser, user } = useUser();
	const [feature, setFeature] = useState('');
	const [snackObj, setSnackObj] = useState({ vis: false, msg: '' });

	useEffect(() => {
		setLoadingAction(true);

		if (user && showModalObj.type === MODAL_TYPE.USER_MODAL) {
			setUserDn(user.displayName ?? 'Unknown User');
		}

		setLoadingAction(false);
	}, [showModalObj]);

	const logout = async () => {
		await signOut(FIREBASE_AUTH);
		router.replace('/');
	};

	const updateDisplayName = async () => {
		setLoadingAction(true);
		await db.modifyUserInfo(user as User, { name: userDN });
		setLoadingAction(false);
		setShowModalObj({
			vis: false,
			type: MODAL_TYPE.NONE
		});

		setSnackObj({
			vis: true,
			msg: 'Wohoo 🥳! User information updated!'
		});
	};

	const handleFeatureRequest = async () => {
		setLoadingAction(true);
		await db.submitNewFeatureRequest({
			featureRequest: feature,
			submittedOn: moment().utc().toISOString(),
			submittedBy: user?.email ?? 'unknown'
		});

		setLoadingAction(false);

		setShowModalObj({
			vis: false,
			type: MODAL_TYPE.NONE
		});

		setSnackObj({
			vis: true,
			msg: 'Wohoo 🥳! Thanks for making this app better!'
		});
	};

	return (
		<SafeAreaView style={{ ...helpers.p10, backgroundColor: theme.colors.background }}>
			<PageTitle>Settings</PageTitle>
			<ScrollView style={{ ...helpers.mb20, height: SCREEN_HEIGHT - 180 }}>
				{loadingAction ? <CenterLoader /> : (
					<>
						<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
							<BannerAd
								size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
								unitId={BANNER_AD_UNIT_ID}
								onAdLoaded={() => {}}
								onAdFailedToLoad={error => {
									console.error('Advert failed to load: ', error);
								}}
							/>
						</View>
						<List.Section>
							<List.Subheader>Profile</List.Subheader>
							<Divider bold />
							<TouchableOpacity onPress={() => { setShowModalObj({ type: MODAL_TYPE.USER_MODAL, vis: true }) }}>
								<List.Item title="Account" description={fbUser?.name ?? 'Unknown User'} left={() => <List.Icon icon="account" />} />
							</TouchableOpacity>
						</List.Section>
						<List.Section>
							<List.Subheader>Preferences</List.Subheader>
							<Divider bold />
							<TouchableOpacity onPress={() => {
								router.push('/user-food-prefs');
							}}>
								<List.Item title="Food Preferences" description="Choose what information about food matters most to you" left={() => <List.Icon icon="food-variant" />} />
							</TouchableOpacity>
							{/* TODO: Make this work */}
							{/* <TouchableOpacity onPress={() => console.log('show update theme modal')}>
								<List.Item title="Theme" description="Light" left={() => <List.Icon icon="theme-light-dark" />} />
							</TouchableOpacity> */}
						</List.Section>
						<List.Section>
							<List.Subheader>General</List.Subheader>
							<Divider bold />
							<TouchableOpacity onPress={() => { setShowModalObj({ type: MODAL_TYPE.FEEDBACK_MODAL, vis: true }) }}>
								<List.Item title="Submit a feedback" description="We'd love to hear your thougts..." left={() => <List.Icon icon="comment-text" />} />
							</TouchableOpacity>
							<TouchableOpacity onPress={logout}>
								<List.Item title="Logout" description="Sorry to see you go 🥲" left={() => <List.Icon icon="logout" />} />
							</TouchableOpacity>
						</List.Section>
						<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: 30, marginTop: 40 }}>
							<Text variant='bodySmall'>V. {packageJson.version}</Text>
						</View>
					</>
				)}
			</ScrollView>
			<Portal>
				<Modal
					visible={showModalObj.vis}
					onDismiss={() => setShowModalObj({ vis: false, type: MODAL_TYPE.NONE })}
					contentContainerStyle={{ ...helpers.p20, backgroundColor: 'black', margin: 20, borderRadius: 10 }}
				>
					{showModalObj.type === MODAL_TYPE.USER_MODAL ? (
						<>
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
								loading={loadingAction}
								disabled={loadingAction}
								onPress={updateDisplayName}
								icon={'check-circle'}
								style={{ marginTop: 20, marginHorizontal: 10 }}
							>Update</Button>
							<Button
								theme={theme}
								mode='outlined'
								loading={loadingAction}
								disabled={loadingAction}
								onPress={() => setShowModalObj({ vis: false, type: MODAL_TYPE.NONE })}
								style={{ marginTop: 20, marginHorizontal: 10 }}
							>Cancel</Button>
						</>
					) : (
						<>
							<Text variant='titleMedium'>💬 Submit a feedback</Text>
							<Divider style={helpers.mx10} />
							<TextInput
								label="I'd like to request..."
								placeholder="I want to see Elon musk on Mars 🥹"
								multiline
								numberOfLines={5}
								value={feature}
								mode='outlined'
								onChangeText={text => setFeature(text)}
							></TextInput>
							<Button
								theme={theme}
								mode='contained'
								loading={loadingAction}
								disabled={loadingAction}
								onPress={handleFeatureRequest}
								icon={'check-circle'}
								style={{ marginTop: 20, marginHorizontal: 10 }}
							>Submit</Button>
							<Button
								theme={theme}
								loading={loadingAction}
								disabled={loadingAction}
								mode='outlined'
								onPress={() => setShowModalObj({ vis: false, type: MODAL_TYPE.NONE })}
								style={{ marginTop: 20, marginHorizontal: 10 }}
							>Cancel</Button>
						</>
					)}
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
