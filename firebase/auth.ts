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
	} catch (err: any) {
		console.log('firebase/auth.ts/login Error:-', err);

		const errCode = err.code;
		let errorMsg = errCode;

		if (errCode === 'auth/invalid-login-credentials') {
			errorMsg = 'Email or password is incorrect!';
		} else if (errCode === 'auth/too-many-requests') {
			errorMsg = 'Your account is locked! You can immediately restore it by resetting your password!';
		}

		return errorMsg as string;
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

export const updateUserProfile = FbAuth.updateProfile;
