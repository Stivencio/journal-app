/*
El state va a estar vacio cuando no esté autenticado y tendra un UUID cuando se inicie

{
    uid: u85tyr4i1r8,
    name: 'Esteban'
}


*/

import { types } from "../types/types";

export const authReducer = (state = {}, action) => {
	switch (action.type) {
		case types.login:
			return {
				uid: action.payload.uid,
				name: action.payload.displayName,
			};

		case types.logout:
			return {};

		default:
			return state;
	}
};
