import Swal from "sweetalert2";

import {
	auth,
	signInWithPopup,
	googleAuthProvider,
	createUserWithEmailAndPassword,
	updateProfile,
	signInWithEmailAndPassword,
	signOut,
} from "../firebase/firebase-config";
import { types } from "../types/types";
import { finishLoading, startLoading } from "./ui";

export const startLoginEmailPassword = (email, password) => {
	return (dispatch) => {
		dispatch(startLoading());
		signInWithEmailAndPassword(auth, email, password)
			.then(({ user }) => {
				dispatch(login(user.uid, user.displayName));
				dispatch(finishLoading());
			})
			.catch((e) => {
				dispatch(finishLoading());
				console.error(e);
				Swal.fire("Error", e.message, "error");
			});
	};
};

export const startGoogleLogin = () => {
	return (dispatch) => {
		signInWithPopup(auth, googleAuthProvider)
			.then(({ user }) => {
				// console.log(`uid: ${user.uid}`);
				// console.log(`name: ${user.displayName}`);
				dispatch(login(user.uid, user.displayName));
			})
			.catch(function (error) {
				console.log(error.message);
			});
	};
};

export const startRegisterWithEmailPassword = (email, password, name) => {
	return (dispatch) => {
		createUserWithEmailAndPassword(auth, email, password)
			.then(async ({ user }) => {
				await updateProfile(user, { displayName: name });

				// console.log(user);
				dispatch(login(user.uid, user.displayName));
			})
			.catch(function (error) {
				console.log(error.message);
			});
	};
};

export const login = (uid, displayName) => ({
	type: types.login,
	payload: {
		uid,
		displayName,
	},
});

export const startLogout = () => {
	return async (dispatch) => {
		await signOut(auth);
		dispatch(logout());
	};
};

export const logout = () => ({
	type: types.logout,
});
