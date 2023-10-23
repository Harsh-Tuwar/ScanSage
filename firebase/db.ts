import { User } from 'firebase/auth';
import { FIREBASE_DB } from './FBConfig';
import { setDoc, doc } from 'firebase/firestore';

const FB_USER_COLLECTION_STRING = 'users';

export const createUserInformation = async (userInfo: User) => {
	try {
		await setDoc(doc(FIREBASE_DB, FB_USER_COLLECTION_STRING, userInfo.uid), {
			name: userInfo.displayName,
			email: userInfo.email
		});
	} catch (err) {
		console.log('Error in firebase/db/createUserInformation: ', err);
	}
}