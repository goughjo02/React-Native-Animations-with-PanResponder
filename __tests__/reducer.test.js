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
	setScales,
	setDataColor,
	setThemeColor,
	setChartColor,
	setDuration,
	setScreen,
	login_reducer,
	http_data_reducer,
	range_reducer,
	zoom_reducer,
	scales_reducer,
	color_chart_reducer,
	color_data_reducer,
	color_theme_reducer,
	color_reducer,
	animation_duration_reducer,
	screen_dimensions_reducer
} from "../redux";
import { AuthConstants } from "../config";

describe("screen dimensions reducer", () => {
	it("sets default state", () => {
		expect.assertions(1);
		const expected_result = {
			portrait: true,
			height: 500,
			width: 270
		};
		expect(screen_dimensions_reducer(undefined, {})).toEqual(expected_result)
	});
	it('sets screen dimensions', () => {
		expect.assertions(1);
		const width = 800;
		const height = 200;
		const expected_result = {
			portrait: false,
			height: height,
			width: width
		};
		expect(screen_dimensions_reducer(undefined, setScreen(width, height))).toEqual(expected_result)
	})
});

describe("animation duration reducer", () => {
	it("sets default state", () => {
		expect.assertions(1);
		const expected_result = {
			duration: 2000
		};
		expect(animation_duration_reducer(undefined, {})).toEqual(
			expected_result
		);
	});
	it("sets animation duration", () => {
		expect.assertions(1);
		const duration = 1000;
		const expected_result = {
			duration: duration
		};
		expect(
			animation_duration_reducer(undefined, setDuration(duration))
		).toEqual(expected_result);
	});
});

describe("color reducers", () => {
	it("sets default chart color scheme", () => {
		expect.assertions(1);
		const expected_result = {
			margins: "#bbb",
			background: "#666",
			primaryFrame: "#000",
			secondaryFrame: "#444"
		};
		expect(color_chart_reducer(undefined, {})).toEqual(expected_result);
	});
	it("sets default data color scheme", () => {
		expect.assertions(1);
		const expected_result = {
			one: "#f00",
			two: "#0f0",
			three: "#00f",
			four: "#070f1a",
			five: "#61a376"
		};
		expect(color_data_reducer(undefined, {})).toEqual(expected_result);
	});
	it("sets default theme color scheme", () => {
		expect.assertions(1);
		const expected_result = {
			one: "#f11100",
			two: "#0f2220",
			three: "#00f333",
			four: "#070444",
			five: "#61f376"
		};
		expect(color_theme_reducer(undefined, {})).toEqual(expected_result);
	});
	it("sets default state for full color palette", () => {
		expect.assertions(1);
		const expected_result = {
			chart: {
				margins: "#bbb",
				background: "#666",
				primaryFrame: "#000",
				secondaryFrame: "#444"
			},
			data: {
				one: "#f00",
				two: "#0f0",
				three: "#00f",
				four: "#070f1a",
				five: "#61a376"
			},
			theme: {
				one: "#f11100",
				two: "#0f2220",
				three: "#00f333",
				four: "#070444",
				five: "#61f376"
			}
		};
		expect(color_reducer(undefined, {})).toEqual(expected_result);
	});
	it("changes chart color scheme", () => {
		expect.assertions(1);
		const margins = "#222222";
		const background = "#333333";
		const primaryFrame = "#444444";
		const secondaryFrame = "#555555";
		const expected_result = {
			chart: {
				margins: margins,
				background: background,
				primaryFrame: primaryFrame,
				secondaryFrame: secondaryFrame
			},
			data: {
				one: "#f00",
				two: "#0f0",
				three: "#00f",
				four: "#070f1a",
				five: "#61a376"
			},
			theme: {
				one: "#f11100",
				two: "#0f2220",
				three: "#00f333",
				four: "#070444",
				five: "#61f376"
			}
		};
		expect(
			color_reducer(
				undefined,
				setChartColor(margins, background, primaryFrame, secondaryFrame)
			)
		).toEqual(expected_result);
	});
	it("changes data color scheme", () => {
		expect.assertions(1);
		const one = "#222222";
		const two = "#333333";
		const three = "#444444";
		const four = "#555555";
		const five = "#666666";
		const expected_result = {
			chart: {
				margins: "#bbb",
				background: "#666",
				primaryFrame: "#000",
				secondaryFrame: "#444"
			},
			data: {
				one: one,
				two: two,
				three: three,
				four: four,
				five: five
			},
			theme: {
				one: "#f11100",
				two: "#0f2220",
				three: "#00f333",
				four: "#070444",
				five: "#61f376"
			}
		};
		expect(
			color_reducer(undefined, setDataColor(one, two, three, four, five))
		).toEqual(expected_result);
	});
	it("changes theme color scheme", () => {
		expect.assertions(1);
		const one = "#222222";
		const two = "#333333";
		const three = "#444444";
		const four = "#555555";
		const five = "#666666";
		const expected_result = {
			chart: {
				margins: "#bbb",
				background: "#666",
				primaryFrame: "#000",
				secondaryFrame: "#444"
			},
			data: {
				one: "#f00",
				two: "#0f0",
				three: "#00f",
				four: "#070f1a",
				five: "#61a376"
			},
			theme: {
				one: one,
				two: two,
				three: three,
				four: four,
				five: five
			}
		};
		expect(
			color_reducer(undefined, setThemeColor(one, two, three, four, five))
		).toEqual(expected_result);
	});
});

describe("scaes reducer", () => {
	it("produces default state", () => {
		expect.assertions(1);
		const expected_result = {
			xScale: 0,
			yScale: 0,
			minTime: 0,
			maxTime: 0,
			minValue: 0,
			maxValue: 0
		};
		expect(scales_reducer(undefined, {})).toEqual(expected_result);
	});
	it("sets all variables", () => {
		expect.assertions(1);
		const state_before = {
			xScale: 0,
			yScale: 0,
			minTime: 0,
			maxTime: 0,
			minValue: 0,
			maxValue: 0
		};
		const expected_result = {
			xScale: 10,
			yScale: 20,
			minTime: 30,
			maxTime: 40,
			minValue: 50,
			maxValue: 60
		};
		deepFreeze(state_before);
		expect(
			scales_reducer(
				state_before,
				setScales(
					expected_result.xScale,
					expected_result.yScale,
					expected_result.minTime,
					expected_result.maxTime,
					expected_result.minValue,
					expected_result.maxValue
				)
			)
		).toEqual(expected_result);
	});
});
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
		expect(login_reducer(state_before, loginSuccess("test"))).toEqual(
			expected_result
		);
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
