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
		storage.removeItem(JWTTOKEN);
	});

	it("Mock Async Storage working", async () => {
		expect.assertions(1);
		await storage.setItem(JWTTOKEN, token);
		const value = await storage.getItem(JWTTOKEN);
		expect(value).toBe(token);
	});

	it("sets JWT on status 200", async () => {
		expect.assertions(1);
		mockApi.onPost(loginUrl).reply(config => {
			return [200, { JWTTOKEN: token }];
		});
		await login(user, password);
		const test = await storage.getItem(JWTTOKEN);
		expect(test).toEqual(token);
	});
});
