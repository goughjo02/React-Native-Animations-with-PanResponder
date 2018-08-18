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
			.then(response => {
				const jwt = response.data[AuthConstants.localStateKey()];
				saveJwt(jwt);
				dispatch(loginLoading(false));
				dispatch(loginSuccess(jwt));
			})
			.catch(error => {
				// console.log("error: ", error);
				dispatch(loginError(true));
			});
	};
};
