import React from "react";
import deepFreeze from "deep-freeze";
import renderer from "react-test-renderer";

import {
	loginError,
	loginLoading,
	loginSuccess,
	dataHasErrored,
	dataIsLoading,
	fetchDataSuccess,
	setStartRange,
	setEndRange,
	setStartZoom,
	setEndZoom,
	login_reducer,
	http_data_reducer,
	range_reducer,
	zoom_reducer
} from "../redux";
import { AuthConstants } from '../config';


describe("login Reducer", () => {
	it("produces default state", () => {
		const expected_result = {
			[AuthConstants.localStateKey()]: "",
			isloading: false,
			iserror: false
		};
		expect(login_reducer(undefined, {})).toEqual(expected_result);
	});

	it("adds jwt when successful", () => {
		const state_before = {
			[AuthConstants.localStateKey()]: "",
			isloading: false,
			iserror: false
		};
		const expected_result = {
			[AuthConstants.localStateKey()]: "test",
			isloading: false,
			iserror: false
		};
		deepFreeze(state_before);
		expect(
			login_reducer(state_before, loginSuccess("test"))
		).toEqual(expected_result);
	});

	it("toggle is loading true", () => {
		const state_before = {
			[AuthConstants.localStateKey()]: "",
			isloading: false,
			iserror: false
		};
		const expected_result = {
			[AuthConstants.localStateKey()]: "",
			isloading: true,
			iserror: false
		};
		deepFreeze(state_before);
		expect(login_reducer(state_before, loginLoading(true))).toEqual(
			expected_result
		);
	});

	it("toggle is loading false", () => {
		const state_before = {
			[AuthConstants.localStateKey()]: "",
			isloading: true,
			iserror: false
		};
		const expected_result = {
			[AuthConstants.localStateKey()]: "",
			isloading: false,
			iserror: false
		};
		deepFreeze(state_before);
		expect(login_reducer(state_before, loginLoading(false))).toEqual(
			expected_result
		);
	});

	it("toggle is error true", () => {
		const state_before = {
			[AuthConstants.localStateKey()]: "",
			isloading: false,
			iserror: false
		};
		const expected_result = {
			[AuthConstants.localStateKey()]: "",
			isloading: false,
			iserror: true
		};
		deepFreeze(state_before);
		expect(login_reducer(state_before, loginError(true))).toEqual(
			expected_result
		);
	});

	it("toggle is error false", () => {
		const state_before = {
			[AuthConstants.localStateKey()]: "",
			isloading: false,
			iserror: true
		};
		const expected_result = {
			[AuthConstants.localStateKey()]: "",
			isloading: false,
			iserror: false
		};
		deepFreeze(state_before);
		expect(login_reducer(state_before, loginError(false))).toEqual(
			expected_result
		);
	});
});

describe("HTTP Reducer", () => {
	it("produces default state", () => {
		const expected_result = {
			data: [],
			isloading: false,
			iserror: false
		};
		expect(http_data_reducer(undefined, {})).toEqual(expected_result);
	});

	it("adds data when successful", () => {
		const state_before = {
			data: [],
			isloading: false,
			iserror: false
		};
		const expected_result = {
			data: ["test"],
			isloading: false,
			iserror: false
		};
		deepFreeze(state_before);
		expect(
			http_data_reducer(state_before, fetchDataSuccess(["test"]))
		).toEqual(expected_result);
	});

	it("toggle is loading true", () => {
		const state_before = {
			data: [],
			isloading: false,
			iserror: false
		};
		const expected_result = {
			data: [],
			isloading: true,
			iserror: false
		};
		deepFreeze(state_before);
		expect(http_data_reducer(state_before, dataIsLoading(true))).toEqual(
			expected_result
		);
	});

	it("toggle is loading false", () => {
		const state_before = {
			data: [],
			isloading: true,
			iserror: false
		};
		const expected_result = {
			data: [],
			isloading: false,
			iserror: false
		};
		deepFreeze(state_before);
		expect(http_data_reducer(state_before, dataIsLoading(false))).toEqual(
			expected_result
		);
	});

	it("toggle is error true", () => {
		const state_before = {
			data: [],
			isloading: false,
			iserror: false
		};
		const expected_result = {
			data: [],
			isloading: false,
			iserror: true
		};
		deepFreeze(state_before);
		expect(http_data_reducer(state_before, dataHasErrored(true))).toEqual(
			expected_result
		);
	});

	it("toggle is error false", () => {
		const state_before = {
			data: [],
			isloading: false,
			iserror: true
		};
		const expected_result = {
			data: [],
			isloading: false,
			iserror: false
		};
		deepFreeze(state_before);
		expect(http_data_reducer(state_before, dataHasErrored(false))).toEqual(
			expected_result
		);
	});
});

describe("range selectors", () => {
	it("returns initial state", () => {
		const expectation = {
			start: 0,
			end: 1
		};
		expect(range_reducer(undefined, {})).toEqual(expectation);
	});
	it("can set start range", () => {
		const choice = 50;
		const initial_state = {
			start: 0,
			end: 1
		};
		const expectation = {
			start: choice,
			end: 1
		};
		expect(range_reducer(initial_state, setStartRange(choice))).toEqual(
			expectation
		);
	});
	it("can set end range", () => {
		const choice = 50;
		const initial_state = {
			start: 0,
			end: 0
		};
		const expectation = {
			start: 0,
			end: choice
		};
		expect(range_reducer(initial_state, setEndRange(choice))).toEqual(
			expectation
		);
	});
});
describe("zoom selectors", () => {
	it("returns initial state", () => {
		const expectation = {
			start: 0,
			end: 100
		};
		expect(zoom_reducer(undefined, {})).toEqual(expectation);
	});
	it("can set start zoom", () => {
		const choice = 50;
		const initial_state = {
			start: 0,
			end: 100
		};
		const expectation = {
			start: choice,
			end: 100
		};
		expect(zoom_reducer(initial_state, setStartZoom(choice))).toEqual(
			expectation
		);
	});
	it("can set end zoom", () => {
		const choice = 50;
		const initial_state = {
			start: 0,
			end: 100
		};
		const expectation = {
			start: 0,
			end: choice
		};
		expect(zoom_reducer(initial_state, setEndZoom(choice))).toEqual(
			expectation
		);
	});
});
