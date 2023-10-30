import { User } from 'firebase/auth';
import { FIREBASE_DB } from './FBConfig';
import { setDoc, doc, updateDoc } from 'firebase/firestore';
import { FB_USER_COLLECTION_STRING } from '../constants';

export const createUserInformation = async (userInfo: User) => {
	try {
		await setDoc(doc(FIREBASE_DB, FB_USER_COLLECTION_STRING, userInfo.uid), {
			name: userInfo.displayName,
			email: userInfo.email,
			foodPrefs: {}
		});
	} catch (err) {
		console.log('Error in firebase/db/createUserInformation: ', err);
	}
};

export const upsertFoodPreferences = async (userId: string, data: any) => {
	try {
		await updateDoc(doc(FIREBASE_DB, FB_USER_COLLECTION_STRING, userId), {
			foodPrefs: data
		});
	} catch (err) {
		console.log('Error in firebase/db/upsertFoodPreferences: ', err);
	}
};
