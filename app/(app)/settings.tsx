import { router } from 'expo-router';
import { signOut } from 'firebase/auth';
import packageJson from '../../package.json';
import { TouchableOpacity, View} from 'react-native';
import PageTitle from '../../components/PageTitle';
import { useUser } from '../../context/UserContext';
import { SCREEN_HEIGHT, helpers } from '../../styles';
import { FIREBASE_AUTH } from '../../firebase/FBConfig';
import { ScrollView } from 'react-native-gesture-handler';
import { List, Divider, useTheme, Portal, Modal, Text, RadioButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import storage from '../../utils/storage';
import { STORAGE_THEME_KEY } from '../../constants';
import { uppercaseFirstLetter } from '../../utils';
import { useTheme as useThemeContext } from '../../context/ThemeContext';

const Settings = () => {
	const theme = useTheme();
	const themeContext = useThemeContext();
	const [userSelectedTheme, setUserSelectedTheme] = useState('Default');
	const [showThemeModal, setShowThemeModal] = useState(false);
	const { fbUser } = useUser();

	const logout = async () => {
		await signOut(FIREBASE_AUTH);
		router.replace('/');
	};

	useEffect(() => {
		const themeFunc = async () => {
			const savedThemePref = await storage.get(STORAGE_THEME_KEY);

			if (savedThemePref) {
				setUserSelectedTheme(savedThemePref);
			}
		}

		themeFunc();
	}, []);

	return (
		<SafeAreaView style={{ ...helpers.p10, backgroundColor: theme.colors.background }}>
			<PageTitle>Settings</PageTitle>
			<ScrollView style={{ ...helpers.mb20, height: SCREEN_HEIGHT }}>
				<List.Section>
					<List.Subheader>Preferences</List.Subheader>
					<Divider bold />
					<TouchableOpacity onPress={() => {
						router.push('/food-prefs');
					}}>
						<List.Item title="Dietary Preferences" description="Choose what information about food matters most to you" left={() => <List.Icon icon="food-variant" />} />
					</TouchableOpacity>
					<TouchableOpacity onPress={() => setShowThemeModal(true)}>
						<List.Item title="Theme" description={uppercaseFirstLetter(userSelectedTheme)} left={() => <List.Icon icon="theme-light-dark" />} />
					</TouchableOpacity>
				</List.Section>
				<List.Section>
					<List.Subheader>General</List.Subheader>
					<Divider bold />
					<TouchableOpacity onPress={() => { console.log('wip') }}>
						<List.Item title="Account" description={fbUser?.name ?? 'Unknown User'} left={() => <List.Icon icon="account" />} />
					</TouchableOpacity>
					<TouchableOpacity onPress={() => { }}>
						<List.Item title="Version" description={packageJson.version} left={() => <List.Icon icon="code-tags" />} />
					</TouchableOpacity>
					<TouchableOpacity onPress={logout}>
						<List.Item title="Logout" description="Sorry to see you go 🥲" left={() => <List.Icon icon="logout" />} />
					</TouchableOpacity>
				</List.Section>
			</ScrollView>
			<Portal>
				<Modal
					visible={showThemeModal}
					onDismiss={() => setShowThemeModal(false)}
					contentContainerStyle={{ backgroundColor: theme.dark ? 'black' : 'white', ...helpers.p10, ...helpers.m15, borderRadius: 10 }}
				>
					<Text variant='titleSmall'>Choose a theme</Text>
					<Divider style={helpers.mx10} />
					<RadioButton.Group onValueChange={async (newValue) => {
						setUserSelectedTheme(newValue as 'light' | 'dark');
						await storage.save(STORAGE_THEME_KEY, newValue);
						themeContext.setScheme(newValue);
					}} value={userSelectedTheme ?? 'light'}>
						<RadioButton.Item label="Light" value="light" />
						<RadioButton.Item label="Dark" value="dark" />
					</RadioButton.Group>
				</Modal>
			</Portal>
		</SafeAreaView>
	);
}

export default Settings;
