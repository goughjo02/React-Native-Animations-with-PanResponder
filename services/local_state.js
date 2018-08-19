import { AsyncStorage as storage } from "react-native";

import { AuthConstants } from "../config";

let getData = async location => {
	// console.log("kicking in get data from location: ", location);
	let data = await storage.getItem(location);
	// console.log("data loaded with value: ", data);
	return data;
};

let gitCallback = (err, success) => {
			console.log("get item callback")
			if (err) {
				console.log("get item err: ", err)
			} else if(success) {
				console.log("get item success: ", success)
			} else {
				console.log("git item natin")
			}
		}

export const loadJwt = async () => {
	// console.log("loadJwt kicking in");
	try {
		// console.log("setting data")
		// await storage.setItem(AuthConstants.localStateKey(), JSON.stringify("hello"))
		// console.log("trying to get data");
		var jwt = await storage.getItem(AuthConstants.localStateKey(), (err, result) => console.log(err, result))
		// console.log("loaded jwt: ", jwt);
		if (jwt !== null) {
			return JSON.parse(jwt);
		}
	} catch (error) {
		console.log("Load jwt ERROR", error);
		return undefined;
	}
};

export const saveJwt = async state => {
	try {
		const serializedState = JSON.stringify(state);
		await storage.setItem(AuthConstants.localStateKey(), serializedState);
		// console.log(storage.getItem(AuthConstants.localStateKey()))
	} catch (err) {
		console.log("save jwt error: ", err);
	}
};

export const deleteJwt = async () => {
	try {
		await storage.removeItem(AuthConstants.localStateKey());
	} catch (err) {
		console.log(err);
	}
};
