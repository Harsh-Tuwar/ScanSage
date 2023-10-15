import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import * as firebaseAuth from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Initialize Firebase
const firebaseConfig = {
	apiKey: "AIzaSyDm8NKrQ2H4pAaaoJqWk7Jg9Kp9PS-_k9M",
	authDomain: "scansage-f08ea.firebaseapp.com",
	projectId: "scansage-f08ea",
	storageBucket: "scansage-f08ea.appspot.com",
	messagingSenderId: "877156423897",
	appId: "1:877156423897:web:8e321ab957f513aab3c6c8",
	measurementId: "G-50Z6S73BNP"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = firebaseAuth.initializeAuth(FIREBASE_APP, {
	persistence: (firebaseAuth as any).getReactNativePersistence(AsyncStorage)
});

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
