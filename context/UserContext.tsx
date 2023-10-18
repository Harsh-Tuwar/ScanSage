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
		const subscriber = onAuthStateChanged(FIREBASE_AUTH, (user) => {
			setUser(user);
			setInitialized(true);
		});

		return subscriber;
	}, []);

	return (
		<UserContext.Provider value={{
			user,
			initialized
		}}>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => useContext(UserContext);
