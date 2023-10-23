import { signOut } from 'firebase/auth';
import { Text } from 'react-native-paper';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { FIREBASE_AUTH } from '../../firebase/FBConfig';
import { router } from 'expo-router';
import { general, helpers } from '../../styles';
import { useUser } from '../../context/UserContext';

const Profile = () => {
	const { user } = useUser();

	return (
		<View style={{ ...general.center, ...helpers.m5 }}>
			<Text>Profile</Text>
			<Text>Welcome {user?.displayName}!</Text>
			<Button
				icon="logout"
				mode="contained"
				style={{ ...helpers.mt30 }}
				onPress={async () => {
					await signOut(FIREBASE_AUTH);
					router.replace('/');
				}}
			>
				Logout
			</Button>
		</View>
	);
}

export default Profile;
