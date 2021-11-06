// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
	GoogleAuthProvider,
	getAuth,
	signInWithPopup,
	createUserWithEmailAndPassword,
	updateProfile,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyAa_IIU5fWS3QmUc1a0W9i8vaPeDmSt2MY",
	authDomain: "react-app-cursos-6031a.firebaseapp.com",
	projectId: "react-app-cursos-6031a",
	storageBucket: "react-app-cursos-6031a.appspot.com",
	messagingSenderId: "187075260221",
	appId: "1:187075260221:web:a47e2d48032e089c185f54",
};

// Initialize Firebase
initializeApp(firebaseConfig);

const db = getFirestore();

const googleAuthProvider = new GoogleAuthProvider();

const auth = getAuth();

export {
	db,
	googleAuthProvider,
	auth,
	signInWithPopup,
	createUserWithEmailAndPassword,
	updateProfile,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
};
