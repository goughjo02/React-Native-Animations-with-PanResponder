import "react-native";
import MockAsyncStorage from "mock-async-storage";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import React from "react";

// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";

import { login } from "../services";
import { JWTTOKEN, loginUrl } from "../config";

const mockApi = new MockAdapter(axios);

const mock = () => {
	const mockImpl = new MockAsyncStorage();
	jest.mock("AsyncStorage", () => mockImpl);
};

mock();

import { AsyncStorage as storage } from "react-native";

describe("Login fetch", () => {
	let user = "joe";
	let password = "password";
	let token = "JWTTOKEN";

	afterEach(() => {
		console.log("aftereach")
		console.log(storage.getItem(JWTTOKEN))
		storage.removeItem(JWTTOKEN);
	})

	it("Mock Async Storage working", async () => {
		await storage.setItem(JWTTOKEN, token);
		const value = await storage.getItem(JWTTOKEN);
		expect(value).toBe(token);
	});

	it("creates a post request", () => {
		mockApi.onPost(loginUrl).reply(config => {
			return [200, {JWTTOKEN: token}]
		});
		login(user, password)
			.then(async response => {
				await storage.getItem(JWTTOKEN)
				return response
			})
			.then(res => {
				console.log("login test")
				console.log(res, token);
				expect(true).toEqual(false);
				expect(res).toEqual(token);
			});
	});
});
