import * as FbAuth from 'firebase/auth';
import { FIREBASE_AUTH } from './FBConfig';

export const login = async (email: string, password: string) => {
	try {
		const user = await FbAuth.signInWithEmailAndPassword(
			FIREBASE_AUTH,
			email,
			password
		);

		return user.user;
	} catch (err) {
		console.log('firebase/auth.ts/login Error:-', err);
		return null;
	}
}

export const signUp = async (name: string, email: string, password: string): Promise<FbAuth.User | string> => {
	try {
		const newUser = await FbAuth.createUserWithEmailAndPassword(
			FIREBASE_AUTH,
			email,
			password
		);

		if (newUser) {
			await FbAuth.updateProfile(newUser.user, {
				displayName: name
			});
		}

		return {
			...newUser.user,
			displayName: name
		}
	} catch (err) {
		console.log('firebase/auth.ts/signUp Error:-', err);
		return err as string;
	}
}
