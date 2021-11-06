import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import validator from "validator";
import { startRegisterWithEmailPassword } from "../../actions/auth";
import { RemoveError, setError } from "../../actions/ui";

import { useForm } from "../../hooks/useForm";

export const RegisterScreen = () => {
	const dispatch = useDispatch();
	const { msgError, loading } = useSelector((state) => state.ui);

	console.log(loading);

	const [formValues, handleInputChange] = useForm({
		name: "Esteban",
		email: "esteban@gmail.com",
		password: "123456",
		password2: "123456",
	});

	const { name, email, password, password2 } = formValues;

	const handleRegister = (e) => {
		e.preventDefault();
		if (isFormValid()) {
			// console.log("Formulario correcto");
			dispatch(startRegisterWithEmailPassword(email, password, name));
		}
	};

	const isFormValid = () => {
		// dispatch al store de cada uno de los mensajes

		if (name.trim().length === 0) {
			dispatch(setError("Name is required"));
			return false;
		} else if (!validator.isEmail(email)) {
			dispatch(setError("Email is not valid"));
			return false;
		} else if (password !== password2 || password.length < 5) {
			dispatch(
				setError(
					"Password should be at least 6 characters and match each other"
				)
			);
			return false;
		}

		//remover el error
		dispatch(RemoveError());

		return true;
	};

	return (
		<>
			<h3 className="auth__title">Register</h3>

			<form onSubmit={handleRegister}>
				{msgError && <div className="auth__alert-error">{msgError}</div>}

				<input
					type="text"
					placeholder="Name"
					name="name"
					className="auth__input"
					autoComplete="off"
					onChange={handleInputChange}
					value={name}
				/>

				<input
					type="text"
					placeholder="Email"
					name="email"
					className="auth__input"
					autoComplete="off"
					onChange={handleInputChange}
					value={email}
				/>

				<input
					type="password"
					placeholder="Password"
					name="password"
					className="auth__input"
					onChange={handleInputChange}
					value={password}
				/>

				<input
					type="password"
					placeholder="Confirm password"
					name="password2"
					className="auth__input"
					onChange={handleInputChange}
					value={password2}
				/>

				<button type="submit" className="btn btn-primary btn-block mb-5">
					Register
				</button>

				<Link to="/auth/login" className="link">
					Already registered?
				</Link>
			</form>
		</>
	);
};
