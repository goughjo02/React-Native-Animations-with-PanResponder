import "react-native";
import React from "react";
import MockAsyncStorage from "mock-async-storage";

import { AuthApi, AuthConstants } from "../config";
import { loadJwt, saveJwt } from "../services";

const mock = () => {
	const mockImpl = new MockAsyncStorage();
	jest.mock("AsyncStorage", () => mockImpl);
};

mock();

import { AsyncStorage as storage } from "react-native";

describe("local state JWT", () => {
	it("loads state", async done => {
		var test = "test";
		expect.assertions(1);
		await storage
			.setItem(AuthConstants.localStateKey(), JSON.stringify(test))
			.then(
				async res => {
					let result = await loadJwt();
					expect(result).toEqual(test);
					done();
				},
				err => console.log(err)
			)
			.catch(err => console.log("err: ", err));
	});
	it('saves state', async () => {
		var test = "test";
		expect.assertions(1);
		await saveJwt(test);
		const result = await storage.getItem(AuthConstants.localStateKey());
		const parsed = JSON.parse(result)
		expect(parsed).toEqual(test);
	})
});
