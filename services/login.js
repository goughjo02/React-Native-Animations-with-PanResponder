import React from "react";
import axios from "axios";
import { AsyncStorage as storage } from "react-native";

import { JWTTOKEN, loginUrl } from "../config";

export const login = (user, password, api = loginUrl) => {
	return axios
		.post(loginUrl, {
			user: {
				user: user,
				password: password
			}
		})
		.then(response => {
			storage.setItem(JWTTOKEN, response.data.JWTTOKEN);
			return response;
		})
		.catch(error => {
			console.log("ERROR in Login Function.");
			console.log(error);
		});
};
