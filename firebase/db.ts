import moment from 'moment';
import { User } from 'firebase/auth';
import { FIREBASE_DB } from './FBConfig';
import { updateUserProfile } from './auth';
import { setDoc, doc, updateDoc, getDoc, increment } from 'firebase/firestore';
import { FB_USER_COLLECTION_STRING, NOT_FOUND_PRODUCTS_STRING } from '../constants';

export const createUserInformation = async (userInfo: User) => {
	try {
		await setDoc(doc(FIREBASE_DB, FB_USER_COLLECTION_STRING, userInfo.uid), {
			name: userInfo.displayName,
			email: userInfo.email,
			recentScans: {},
			foodPrefs: []
			// foodPrefs: {
			// 	allergens: {
			// 		withoutGluten: '0',
			// 		withoutMilk: '0',
			// 		withoutEggs: '0',
			// 		withoutNuts: '0',
			// 		withoutPeanuts: '0',
			// 		withoutSesameSeeds: '0',
			// 		withoutSoyabeans: '0',
			// 		withoutCelery: '0',
			// 		withoutMustard: '0',
			// 		withoutLupin: '0',
			// 		withoutFish: '0',
			// 		withoutCrusteceans: '0',
			// 		withoutMolluscs: '0',
			// 		withoutSulpharDioxideNdSulphites: '0'
			// 	},
			// 	nutriQuality: {
			// 		goodNutri: '2',
			// 		lowSalt: '0',
			// 		lowSugar: '0',
			// 		lowFat: '0',
			// 		saturatedFat: '0',
			// 	},
			// 	ingredients: {
			// 		vegan: '0',
			// 		vegetarian: '0',
			// 		palmOilFree: '0'
			// 	},
			// 	foodPrecessing: {
			// 		noOrLittleProcessing: '1',
			// 		noOrFewAdditives: '0'
			// 	}
			// }
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

export const modifyRecentScans = async (userId: string, barcodeData: any, merge?: boolean) => {
	try {
		await setDoc(doc(FIREBASE_DB, FB_USER_COLLECTION_STRING, userId), {
			recentScans: barcodeData
		}, { merge: merge });
	} catch (err) {
		console.log('Error in firebase/db/modifyRecentScans: ', err);
	}
};

export const updateRecentScans = async (userId: string, recentScans: any) => {
	try {
		await updateDoc(doc(FIREBASE_DB, FB_USER_COLLECTION_STRING, userId), {
			recentScans: recentScans
		});
	} catch (err) {
		console.log('Error in firebase/db/modifyRecentScans: ', err);
	}
};

export const modifyUserInfo = async (user: User, userData: any) => {
	try {
		const updateObj: any = {};

		if (userData.hasOwnProperty('name')) {
			updateObj['name'] = userData.name
		};

		await updateDoc(doc(FIREBASE_DB, FB_USER_COLLECTION_STRING, user.uid), updateObj);
		await updateUserProfile(user, {
			displayName: userData.name
		});
	} catch (err) {
		console.log('Error in firebase/db/modifyUserInfo: ', err);
	}
};

export const captureNotFoundProd = async (barcode: string) => {
	try {
		const docRef = doc(FIREBASE_DB, NOT_FOUND_PRODUCTS_STRING, barcode);
		const docToCreate = await getDoc(docRef);

		if (docToCreate.exists()) {
			await updateDoc(docRef, {
				requestedCount: increment(1),
				lastRequested: moment().utc().toISOString()
			});
		} else {
			await setDoc(docRef, {
				barcode,
				requestedCount: 1,
				lastRequested: moment().utc().toISOString()
			});
		}
	} catch (err) {
		console.log('Error in firebase/db/captureNotFoundProd: ', err);
	}
};

export const refetchFbUserData = upsertFoodPreferences;
