import React from "react";
import redux from "redux";
import axios from "axios";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native

import { AuthApi, AuthConstants } from "../config";
import { loginError, loginLoading, loginSuccess } from "../redux";


export const login = (username, password) => {
	return dispatch => {
		dispatch(loginLoading(true));
		return axios
			.post(AuthApi.loginUrl(), {
				body: {
					username: username,
					password: password
				}
			})
			.then(response => {
				// console.log("reponse: ", response);
				storage.setItem(AuthConstants.localStateKey(), response.data[AuthConstants.localStateKey()]);
				dispatch(loginLoading(false));
				dispatch(loginSuccess(response.data.username));
				return response;
			})
			.catch(error => {
				// console.log("error: ", error);
				dispatch(loginError(true));
			});
	};
};
