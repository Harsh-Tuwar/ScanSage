import { User } from 'firebase/auth';
import { FIREBASE_DB } from './FBConfig';
import { setDoc, doc, updateDoc } from 'firebase/firestore';
import { FB_USER_COLLECTION_STRING } from '../constants';

export const createUserInformation = async (userInfo: User) => {
	try {
		await setDoc(doc(FIREBASE_DB, FB_USER_COLLECTION_STRING, userInfo.uid), {
			name: userInfo.displayName,
			email: userInfo.email,
			foodPrefs: {
				allergens: {
					withoutGluten: '0',
					withoutMilk: '0',
					withoutEggs: '0',
					withoutNuts: '0',
					withoutPeanuts: '0',
					withoutSesameSeeds: '0',
					withoutSoyabeans: '0',
					withoutCelery: '0',
					withoutMustard: '0',
					withoutLupin: '0',
					withoutFish: '0',
					withoutCrusteceans: '0',
					withoutMolluscs: '0',
					withoutSulpharDioxideNdSulphites: '0'
				},
				nutriQuality: {
					goodNutri: '2',
					lowSalt: '0',
					lowSugar: '0',
					lowFat: '0',
					saturatedFat: '0',
				},
				ingredients: {
					vegan: '0',
					vegetarian: '0',
					palmOilFree: '0'
				},
				foodPrecessing: {
					noOrLittleProcessing: '1',
					noOrFewAdditives: '0'
				}
			}
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
