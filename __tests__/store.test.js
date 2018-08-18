import React from "react";
import renderer from "react-test-renderer";
import deepFreeze from "deep-freeze";

import {
	configureStore,
	loginError,
	loginLoading,
	loginSuccess,
	dataHasErrored,
	dataIsLoading,
	fetchDataSuccess,
	setStartRange,
	setEndRange,
	setStartZoom,
	setEndZoom
} from "../redux";
import { AuthConstants } from '../config';

describe("store", () => {
	var store = configureStore();

	var default_state = {
		data: {
			data: [],
			isloading: false,
			iserror: false
		},
		login: {
			[AuthConstants.localStateKey()]: "",
			isloading: false,
			iserror: false
		},
		range: {
			start: 0,
			end: 1
		},
		zoom: {
			start: 0,
			end: 100
		}
	};
	deepFreeze(default_state);
	it("can get state", () => {
		expect(store.getState()).toBeTruthy();
	});
	it("initialises default state", () => {
		expect(store.getState()).toEqual(default_state);
	});
	it("responds to login success", () => {
		const expected_state = {
			data: {
				data: [],
				isloading: false,
				iserror: false
			},
			login: {
				[AuthConstants.localStateKey()]: "test",
				isloading: false,
				iserror: false
			},
			range: {
				start: 0,
				end: 1
			},
			zoom: {
				start: 0,
				end: 100
			}
		};
		store.dispatch(loginSuccess("test"));
		expect(store.getState()).toEqual(expected_state);
		store.dispatch(loginSuccess(""));
	});
	it("sets login loading to true", () => {
		const expected_state = {
			data: {
				data: [],
				isloading: false,
				iserror: false
			},
			login: {
				[AuthConstants.localStateKey()]: "",
				isloading: true,
				iserror: false
			},
			range: {
				start: 0,
				end: 1
			},
			zoom: {
				start: 0,
				end: 100
			}
		};
		store.dispatch(loginLoading(true));
		expect(store.getState()).toEqual(expected_state);
		store.dispatch(loginSuccess(""));
	});
	it("sets login error to true", () => {
		const expected_state = {
			data: {
				data: [],
				isloading: false,
				iserror: false
			},
			login: {
				[AuthConstants.localStateKey()]: "",
				isloading: false,
				iserror: true
			},
			range: {
				start: 0,
				end: 1
			},
			zoom: {
				start: 0,
				end: 100
			}
		};
		store.dispatch(loginError(true));
		expect(store.getState()).toEqual(expected_state);
		//RESET STATE
		store.dispatch(loginSuccess(""));
	});
	it("responds to data success", () => {
		const expected_state = {
			data: {
				data: ["test"],
				isloading: false,
				iserror: false
			},
			login: {
				[AuthConstants.localStateKey()]: "",
				isloading: false,
				iserror: false
			},
			range: {
				start: 0,
				end: 1
			},
			zoom: {
				start: 0,
				end: 100
			}
		};
		store.dispatch(fetchDataSuccess(["test"]));
		expect(store.getState()).toEqual(expected_state);
	});
	it("sets data loading to true", () => {
		const expected_state = {
			data: {
				data: [],
				isloading: true,
				iserror: false
			},
			login: {
				[AuthConstants.localStateKey()]: "",
				isloading: false,
				iserror: false
			},
			range: {
				start: 0,
				end: 1
			},
			zoom: {
				start: 0,
				end: 100
			}
		};
		store.dispatch(dataIsLoading(true));
		expect(store.getState()).toEqual(expected_state);
	});
	it("sets data error to true", () => {
		const expected_state = {
			data: {
				data: [],
				isloading: false,
				iserror: true
			},
			login: {
				[AuthConstants.localStateKey()]: "",
				isloading: false,
				iserror: false
			},
			range: {
				start: 0,
				end: 1
			},
			zoom: {
				start: 0,
				end: 100
			}
		};
		store.dispatch(dataHasErrored(true));
		expect(store.getState()).toEqual(expected_state);
		//RESET STATE
		store.dispatch(fetchDataSuccess([]));
	});
	it("sets start range", () => {
		const choice = 50;
		const expected_state = {
			data: {
				data: [],
				isloading: false,
				iserror: false
			},
			login: {
				[AuthConstants.localStateKey()]: "",
				isloading: false,
				iserror: false
			},
			range: {
				start: choice,
				end: 1
			},
			zoom: {
				start: 0,
				end: 100
			}
		};
		store.dispatch(setStartRange(choice));
		expect(store.getState()).toEqual(expected_state);
		store.dispatch(setStartRange(0));
	});
	it("sets end range", () => {
		const choice = 50;
		const expected_state = {
			data: {
				data: [],
				isloading: false,
				iserror: false
			},
			login: {
				[AuthConstants.localStateKey()]: "",
				isloading: false,
				iserror: false
			},
			range: {
				start: 0,
				end: choice
			},
			zoom: {
				start: 0,
				end: 100
			}
		};
		store.dispatch(setEndRange(choice));
		expect(store.getState()).toEqual(expected_state);
		store.dispatch(setEndRange(0));
	});
	it("sets start zoom", () => {
		const choice = 50;
		const expected_state = {
			data: {
				data: [],
				isloading: false,
				iserror: false
			},
			login: {
				[AuthConstants.localStateKey()]: "",
				isloading: false,
				iserror: false
			},
			range: {
				start: 0,
				end: 0
			},
			zoom: {
				start: choice,
				end: 100
			}
		};
		store.dispatch(setStartZoom(choice));
		expect(store.getState()).toEqual(expected_state);
		store.dispatch(setStartZoom(0));
	});
	it("sets end zoom", () => {
		const choice = 50;
		const expected_state = {
			data: {
				data: [],
				isloading: false,
				iserror: false
			},
			login: {
				[AuthConstants.localStateKey()]: "",
				isloading: false,
				iserror: false
			},
			range: {
				start: 0,
				end: 0
			},
			zoom: {
				start: 0,
				end: choice
			}
		};
		store.dispatch(setEndZoom(choice));
		expect(store.getState()).toEqual(expected_state);
		store.dispatch(setEndZoom(0));
	});
});
