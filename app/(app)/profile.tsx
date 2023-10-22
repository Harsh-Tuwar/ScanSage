import { signOut } from 'firebase/auth';
import { Text, View } from 'react-native'
import { Button } from 'react-native-paper';
import { FIREBASE_AUTH } from '../../firebase/FBConfig';
import { router } from 'expo-router';

const Profile = () => {
	return (
		<View style={{ flex: 1, justifyContent: 'center', margin: 5, alignItems: 'center' }}>
			<Text>Profile</Text>
			<Button
				icon="logout"
				mode="contained"
				style={{ marginTop: 30 }}
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
