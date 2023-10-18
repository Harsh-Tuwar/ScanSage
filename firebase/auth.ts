import * as FbAuth from 'firebase/auth';
import { FIREBASE_AUTH } from './FBConfig';

export const login = async (email: string, password: string) => {
	try {
		const user = await FbAuth.signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
		
		return user.user;
	} catch (err) {
		console.log(err);
		return null;
	}
}