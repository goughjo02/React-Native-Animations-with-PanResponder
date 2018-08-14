import React from "react";
import redux from "redux";
import axios from "axios";
import { AsyncStorage as storage } from "react-native";

import { JWTTOKEN, loginUrl } from "../config";
import { loginError, loginLoading, loginSuccess } from "../redux";

export const login = (user, password, api = loginUrl) => {
	return dispatch => {
		dispatch(loginLoading(true));
		return axios
			.post(loginUrl, {
				user: {
					user: user,
					password: password
				}
			})
			.then(response => {
				storage.setItem(JWTTOKEN, response.data.JWTTOKEN);
				dispatch(loginLoading(false));
				dispatch(loginSuccess(response.data.user));
				return response;
			})
			.catch(error => {
				dispatch(loginError(true));
			});
	};
};
