import { signOut } from 'firebase/auth';
import { List, Divider, useTheme } from 'react-native-paper';
import { FIREBASE_AUTH } from '../../firebase/FBConfig';
import { router } from 'expo-router';
import { SCREEN_HEIGHT, helpers } from '../../styles';
import { useUser } from '../../context/UserContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import PageTitle from '../../components/PageTitle';
import { ScrollView } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native';
import packageJson from '../../package.json';

const Settings = () => {
	const theme = useTheme();
	const { fbUser } = useUser();

	const logout = async () => {
		await signOut(FIREBASE_AUTH);
		router.replace('/');
	};

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
					<TouchableOpacity onPress={() => console.log('show update theme modal')}>
						<List.Item title="Theme" description="Light" left={() => <List.Icon icon="theme-light-dark" />} />
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
		</SafeAreaView>
	);
}

export default Settings;
