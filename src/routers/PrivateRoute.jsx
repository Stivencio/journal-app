import React from "react";
import PropTypes from "prop-types";
import { Redirect, Route } from "react-router-dom";

export const PrivateRoute = ({ isAuth, component: Component, ...rest }) => {
	console.log(isAuth);
	return (
		<Route
			{...rest}
			component={(props) =>
				//En los componentes, los "..." es el spread
				isAuth ? <Component {...props} /> : <Redirect to="/auth/login" />
			}
		/>
	);
};

PrivateRoute.propTypes = {
	isAuth: PropTypes.bool.isRequired,
	component: PropTypes.func.isRequired,
};
