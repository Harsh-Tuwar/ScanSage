import { signOut } from 'firebase/auth';
import { Text, View } from 'react-native'
import { Button } from 'react-native-paper';
import { FIREBASE_AUTH } from '../../firebase/FBConfig';
import { router } from 'expo-router';
import { general, helpers } from '../../styles';

const Profile = () => {
	return (
		<View style={{ ...general.center, ...helpers.m5 }}>
			<Text style={general.font2}>Profile</Text>
			<Button
				icon="logout"
				mode="contained"
				style={{ ...general.font2, ...helpers.mt30 }}
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
