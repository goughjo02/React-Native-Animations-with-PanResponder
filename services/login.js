import React from 'react';
import axios from 'axios';
import { AsyncStorage as storage } from "react-native";

import { JWTTOKEN, loginUrl } from '../config';

export const login = (user, password, api = loginUrl) => {
	return axios.post(loginUrl,{
      user: {
        user: user,
        password: password
      }
    },)
    .then((response) => {
    	console.log("RESOPNSE")
    	console.log(response)
    	return response
    })
    .catch((error) => {
    	console.log("ERROR in Login Function.")
    	console.log(error)
    });
}