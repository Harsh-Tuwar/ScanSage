import { FIREBASE_AUTH } from '../firebase/FBConfig';
import { User, onAuthStateChanged } from 'firebase/auth';
import { createContext, PropsWithChildren, useState, useEffect, useContext } from 'react';

interface UserProps {
	user?: User | null;
	initialized?: boolean;
}

export const UserContext = createContext<UserProps>({});

export const UserProvider = ({ children }: PropsWithChildren) => {
	const [user, setUser] = useState<User | null>(null);
	const [initialized, setInitialized] = useState<boolean>(false);

	useEffect(() => {
		onAuthStateChanged(FIREBASE_AUTH, (fbUser) => {
			console.log('AUTHENTICATED: ', fbUser && fbUser.email);
			setUser(fbUser);
			setInitialized(true);
		});
	}, []);

	const value = {
		user,
		initialized,
	};

	return (
		<UserContext.Provider value={value}>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => useContext(UserContext);
