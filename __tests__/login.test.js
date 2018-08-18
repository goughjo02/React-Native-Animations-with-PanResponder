import "react-native";
import React from "react";

import { login } from "../services";
import { AuthApi, AuthConstants } from "../config";
import { LOGIN_ERROR, LOGIN_LOADING, LOGIN_SUCCESS } from "../redux";
import MockAsyncStorage from "mock-async-storage";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
const mockApi = new MockAdapter(axios);


import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";

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
	let store;

	beforeEach(() => {
		store = mockStore({ isloading: [], data: [] });
	});

	afterEach(() => {
		storage.removeItem(AuthConstants.localStateKey());
	});

	it("Mock Async Storage working", async () => {
		expect.assertions(1);
		await storage.setItem(AuthConstants.localStateKey(), token);
		const value = await storage.getItem(AuthConstants.localStateKey());
		expect(value).toBe(token);
	});

	it("sets JWT on status 200", async () => {
		expect.assertions(1);
		mockApi.onPost(AuthApi.loginUrl()).reply(config => {
			return [200, { [AuthConstants.localStateKey()]: token }];
		});
		store.dispatch(login(user, password)).then(() => {
			storage.getItem(AuthConstants.localStateKey()).then(res => {
				expect(res).toEqual(token)
			})
		})
	});

	it("creates SUCCESS when login is successful", () => {
		expect.assertions(1);
		mockApi.onPost(AuthApi.loginUrl()).reply(config => {
			return [200, { [AuthConstants.localStateKey()]: token, username: "test" }];
		});
		const expectations = [
			{ type: LOGIN_LOADING, isloading: true },
			{ type: LOGIN_LOADING, isloading: false },
			{
				type: LOGIN_SUCCESS,
				user: "test"
			}
		];
		const store = mockStore({ isloading: [], user: [] });
		return store.dispatch(login("test", "password")).then(() => {
			expect(store.getActions()).toEqual(expectations);
		});
	});

	it("creates ERROR when login errs", () => {
		expect.assertions(1);
		mockApi.onPost(AuthApi.loginUrl()).reply(config => {
			return [401, { body: "test" }];
		});
		const expectations = [
			{ type: LOGIN_LOADING, isloading: true },
			{ type: LOGIN_ERROR, iserror: true }
		];
		const store = mockStore({ isloading: [], iserror: [] });
		return store.dispatch(login("http_json", "password")).then(() => {
			expect(store.getActions()).toEqual(expectations);
		});
	});
});
