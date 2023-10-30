import { FIREBASE_AUTH, FIREBASE_DB } from '../firebase/FBConfig';
import { User, onAuthStateChanged } from 'firebase/auth';
import { DocumentData, doc, onSnapshot } from 'firebase/firestore';
import { createContext, PropsWithChildren, useState, useEffect, useContext } from 'react';
import { FB_USER_COLLECTION_STRING } from '../constants';

interface UserProps {
	user?: User | null;
	initialized?: boolean;
	fbUser?: DocumentData | undefined;
}

export const UserContext = createContext<UserProps>({});

export const UserProvider = ({ children }: PropsWithChildren) => {
	const [user, setUser] = useState<User | null>(null);
	const [fbUser, setFbUser] = useState<DocumentData | undefined>();
	const [initialized, setInitialized] = useState<boolean>(false);

	useEffect(() => {
		onAuthStateChanged(FIREBASE_AUTH, (authUser) => {
			console.log('AUTHENTICATED: ', authUser && authUser.email);
			setUser(authUser);
		});
	}, []);

	useEffect(() => {
		if (user) {
			onSnapshot(doc(FIREBASE_DB, FB_USER_COLLECTION_STRING, user.uid), (doc) => {
				const fbData = doc.data();
				setFbUser(fbData);
				setInitialized(true);
			});
		} else {
			setInitialized(true);
		}
	}, [user]);

	const value = {
		user,
		initialized,
		fbUser
	};

	return (
		<UserContext.Provider value={value}>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => useContext(UserContext);
