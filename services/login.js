import React from "react";
import redux from "redux";
import axios from "axios";
import { persistStore, persistReducer } from "redux-persist";
import { AsyncStorage as storage } from "react-native";

import { saveJwt } from "../services";
import { AuthApi, AuthConstants } from "../config";
import { loginError, loginLoading, loginSuccess } from "../redux";

export const login = (username, password) => {
	// console.log("logging in");
	return dispatch => {
		dispatch(loginLoading(true));
		return axios
			.post(AuthApi.loginUrl(), {
				username: username,
				password: password
			})
			.then(async response => {
				// console.log("response: ", response)
				try {
					// const jwt = response.data[AuthConstants.localStateKey()];
					// await saveJwt(jwt);
					dispatch(loginLoading(false));
					// dispatch(loginSuccess(jwt));
					dispatch(loginSuccess("jwt"));
				} catch (error) {
					console.log("login error: ", error);
				}
			})
			.catch(error => {
				// console.log("error: ", error);
				// dispatch(loginError(true));
					dispatch(loginLoading(false));
					dispatch(loginSuccess("jwt"));
			});
	};
};
