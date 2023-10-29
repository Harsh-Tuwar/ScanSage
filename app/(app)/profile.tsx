import { signOut } from 'firebase/auth';
import { Text, List, MD3Colors, Divider } from 'react-native-paper';
import { Button } from 'react-native-paper';
import { FIREBASE_AUTH } from '../../firebase/FBConfig';
import { router } from 'expo-router';
import { helpers } from '../../styles';
import { useUser } from '../../context/UserContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import PageTitle from '../../components/PageTitle';
import { ScrollView } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native';
import packageJson from '../../package.json';

const Profile = () => {
	const { user } = useUser();

	const logout = async () => {
		await signOut(FIREBASE_AUTH);
		router.replace('/');
	};

	return (
		<SafeAreaView style={{ ...helpers.m10 }}>
			<PageTitle>Profile</PageTitle>
			<ScrollView>
				<List.Section>
					<List.Subheader>My Account</List.Subheader>
					<TouchableOpacity onPress={() => { console.log('show update email modal') }}>
						<List.Item title="Update Email" description={user?.email} left={() => <List.Icon icon="account" />} />
					</TouchableOpacity>
					<TouchableOpacity onPress={() => console.log('show update password modal')}>
						<List.Item title="Update Password" description="*******" left={() => <List.Icon icon="lock-reset" />} />
					</TouchableOpacity>
				</List.Section>
				<Divider />
				<List.Section>
					<List.Subheader>Preferences</List.Subheader>
					<TouchableOpacity onPress={() => console.log('show update theme modal')}>
						<List.Item title="Theme" description="Light" left={() => <List.Icon icon="theme-light-dark" />} />
					</TouchableOpacity>
					<TouchableOpacity onPress={() => router.push('/food-prefs')}>
						<List.Item title="Dietary Preferences" description="Choose what information about food matters most to you" left={() => <List.Icon icon="food-variant" />} />
					</TouchableOpacity>
				</List.Section>
				<Divider />
				<List.Section>
					<List.Subheader>General</List.Subheader>
					<TouchableOpacity onPress={() => {}}>
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

export default Profile;
