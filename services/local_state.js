import { AsyncStorage as storage } from "react-native";

import { AuthConstants } from "../config";

export const loadJwt = async () => {
	try {
		return await storage
			.getItem(AuthConstants.localStateKey())
			.then(serializedState => {
				if (serializedState !== undefined) {
					return JSON.parse(serializedState);
				} else {
					console.log("local JWT is undefined");
					return undefined;
				}
			});
	} catch (error) {
		console.log("Load State ERROR", error);
		return undefined;
	}
};

export const saveJwt = async state => {
	try {
		const serializedState = JSON.stringify(state);
		await storage.setItem(AuthConstants.localStateKey(), serializedState);
	} catch (err) {}
};
