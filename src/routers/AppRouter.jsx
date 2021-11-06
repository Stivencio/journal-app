import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";

import { auth, onAuthStateChanged } from "../firebase/firebase-config";

import { login } from "../actions/auth";
import { AuthRouter } from "./AuthRouter";
import { JournalScreen } from "../components/journal/JournalScreen";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";

export const AppRouter = () => {
	const dispatch = useDispatch();

	const [checking, setChecking] = useState(true);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user?.uid) {
				dispatch(login(user.uid, user.displayName));
				setIsLoggedIn(true);
			} else {
				setIsLoggedIn(false);
			}

			setChecking(false);
		});
	}, [dispatch, setChecking, setIsLoggedIn]);

	if (checking) {
		return <h1>Espere...</h1>;
	}

	return (
		<Router>
			<div>
				<Switch>
					<PublicRoute
						path="/auth"
						component={AuthRouter}
						isAuth={isLoggedIn}
					/>
					<PrivateRoute
						exact
						path="/"
						isAuth={isLoggedIn}
						component={JournalScreen}
					/>

					<Redirect to="/auth/login" />
				</Switch>
			</div>
		</Router>
	);
};
