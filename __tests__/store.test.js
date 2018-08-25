import React from "react";
import renderer from "react-test-renderer";
import deepFreeze from "deep-freeze";

import {
	configureBasicStore,
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
} from "../redux";
import { AuthConstants } from "../config";

describe("store", () => {
	var store = configureBasicStore();

	var default_state = {
		color: {
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
		},
		data: {
			data: [],
			isloading: false,
			iserror: false
		},
		duration: {
			duration: 2000
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
		scale: {
			maxTime: 0,
			maxValue: 0,
			minTime: 0,
			minValue: 0,
			xScale: 0,
			yScale: 0
		},
		screen: {
			height: 500,
			portrait: true,
			width: 270
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
			color: {
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
			},
			data: {
				data: [],
				isloading: false,
				iserror: false
			},
			duration: {
				duration: 2000
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
			scale: {
				maxTime: 0,
				maxValue: 0,
				minTime: 0,
				minValue: 0,
				xScale: 0,
				yScale: 0
			},
			screen: {
				height: 500,
				portrait: true,
				width: 270
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
			color: {
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
			},
			data: {
				data: [],
				isloading: false,
				iserror: false
			},
			duration: {
				duration: 2000
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
			scale: {
				maxTime: 0,
				maxValue: 0,
				minTime: 0,
				minValue: 0,
				xScale: 0,
				yScale: 0
			},
			screen: {
				height: 500,
				portrait: true,
				width: 270
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
			color: {
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
			},
			data: {
				data: [],
				isloading: false,
				iserror: false
			},
			duration: {
				duration: 2000
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
			scale: {
				maxTime: 0,
				maxValue: 0,
				minTime: 0,
				minValue: 0,
				xScale: 0,
				yScale: 0
			},
			screen: {
				height: 500,
				portrait: true,
				width: 270
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
			color: {
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
			},
			data: {
				data: ["test"],
				isloading: false,
				iserror: false
			},
			duration: {
				duration: 2000
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
			scale: {
				maxTime: 0,
				maxValue: 0,
				minTime: 0,
				minValue: 0,
				xScale: 0,
				yScale: 0
			},
			screen: {
				height: 500,
				portrait: true,
				width: 270
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
			color: {
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
			},
			data: {
				data: [],
				isloading: true,
				iserror: false
			},
			duration: {
				duration: 2000
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
			scale: {
				maxTime: 0,
				maxValue: 0,
				minTime: 0,
				minValue: 0,
				xScale: 0,
				yScale: 0
			},
			screen: {
				height: 500,
				portrait: true,
				width: 270
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
			color: {
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
			},
			data: {
				data: [],
				isloading: false,
				iserror: true
			},
			duration: {
				duration: 2000
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
			scale: {
				maxTime: 0,
				maxValue: 0,
				minTime: 0,
				minValue: 0,
				xScale: 0,
				yScale: 0
			},
			screen: {
				height: 500,
				portrait: true,
				width: 270
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
			color: {
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
			},
			data: {
				data: [],
				isloading: false,
				iserror: false
			},
			duration: {
				duration: 2000
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
			scale: {
				maxTime: 0,
				maxValue: 0,
				minTime: 0,
				minValue: 0,
				xScale: 0,
				yScale: 0
			},
			screen: {
				height: 500,
				portrait: true,
				width: 270
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
			color: {
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
			},
			data: {
				data: [],
				isloading: false,
				iserror: false
			},
			duration: {
				duration: 2000
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
			scale: {
				maxTime: 0,
				maxValue: 0,
				minTime: 0,
				minValue: 0,
				xScale: 0,
				yScale: 0
			},
			screen: {
				height: 500,
				portrait: true,
				width: 270
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
			color: {
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
			},
			data: {
				data: [],
				isloading: false,
				iserror: false
			},
			duration: {
				duration: 2000
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
			scale: {
				maxTime: 0,
				maxValue: 0,
				minTime: 0,
				minValue: 0,
				xScale: 0,
				yScale: 0
			},
			screen: {
				height: 500,
				portrait: true,
				width: 270
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
			color: {
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
			},
			data: {
				data: [],
				isloading: false,
				iserror: false
			},
			duration: {
				duration: 2000
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
			scale: {
				maxTime: 0,
				maxValue: 0,
				minTime: 0,
				minValue: 0,
				xScale: 0,
				yScale: 0
			},
			screen: {
				height: 500,
				portrait: true,
				width: 270
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
	it("sets scale data", () => {
		const xScale = 100;
		const yScale = 100;
		const minTime = 50;
		const maxTime = 100;
		const minValue = 20;
		const maxValue = 80;
		const expected_state = {
			color: {
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
			},
			data: {
				data: [],
				isloading: false,
				iserror: false
			},
			duration: {
				duration: 2000
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
			scale: {
				maxTime: maxTime,
				maxValue: maxValue,
				minTime: minTime,
				minValue: minValue,
				xScale: xScale,
				yScale: yScale
			},
			screen: {
				height: 500,
				portrait: true,
				width: 270
			},
			zoom: {
				start: 0,
				end: 0
			}
		};
		store.dispatch(
			setScales(xScale, yScale, minTime, maxTime, minValue, maxValue)
		);
		expect(store.getState()).toEqual(expected_state);
		store.dispatch(setScales(0, 0, 0, 0, 0, 0));
	});
	it("sets chart color", () => {
		expect.assertions(1);
		var margins = "#ffffff";
		var background = "#eeeeee";
		var primaryFrame = "#dddddd";
		var secondaryFrame = "#cccccc";
		var expected_state = {
			color: {
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
			},
			data: {
				data: [],
				isloading: false,
				iserror: false
			},
			duration: {
				duration: 2000
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
			scale: {
				maxTime: 0,
				maxValue: 0,
				minTime: 0,
				minValue: 0,
				xScale: 0,
				yScale: 0
			},
			screen: {
				height: 500,
				portrait: true,
				width: 270
			},
			zoom: {
				start: 0,
				end: 0
			}
		};
		store.dispatch(
			setChartColor(margins, background, primaryFrame, secondaryFrame)
		);
		expect(store.getState()).toEqual(expected_state);
		store.dispatch(setChartColor("#bbb", "#666", "#000", "#444"));
	});
	it("sets data color", () => {
		expect.assertions(1);
		var one = "#ffffff";
		var two = "#eeeeee";
		var three = "#dddddd";
		var four = "#cccccc";
		var five = "#bbbbbb";
		var expected_state = {
			color: {
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
			},
			data: {
				data: [],
				isloading: false,
				iserror: false
			},
			duration: {
				duration: 2000
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
			scale: {
				maxTime: 0,
				maxValue: 0,
				minTime: 0,
				minValue: 0,
				xScale: 0,
				yScale: 0
			},
			screen: {
				height: 500,
				portrait: true,
				width: 270
			},
			zoom: {
				start: 0,
				end: 0
			}
		};
		store.dispatch(setDataColor(one, two, three, four, five));
		expect(store.getState()).toEqual(expected_state);
		store.dispatch(
			setDataColor("#f00", "#0f0", "#00f", "#070f1a", "#61a376")
		);
	});
	it("sets theme color", () => {
		expect.assertions(1);
		var one = "#ffffff";
		var two = "#eeeeee";
		var three = "#dddddd";
		var four = "#cccccc";
		var five = "#bbbbbb";
		var expected_state = {
			color: {
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
			},
			data: {
				data: [],
				isloading: false,
				iserror: false
			},
			duration: {
				duration: 2000
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
			scale: {
				maxTime: 0,
				maxValue: 0,
				minTime: 0,
				minValue: 0,
				xScale: 0,
				yScale: 0
			},
			screen: {
				height: 500,
				portrait: true,
				width: 270
			},
			zoom: {
				start: 0,
				end: 0
			}
		};
		store.dispatch(setThemeColor(one, two, three, four, five));
		expect(store.getState()).toEqual(expected_state);
		store.dispatch(
			setThemeColor("#f11100", "#0f2220", "#00f333", "#070444", "#61f376")
		);
	});
	it('sets duration', () => {
		expect.assertions(1);
		var duration = 1000;
		var expected_state = {
			color: {
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
			},
			data: {
				data: [],
				isloading: false,
				iserror: false
			},
			duration: {
				duration: duration
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
			scale: {
				maxTime: 0,
				maxValue: 0,
				minTime: 0,
				minValue: 0,
				xScale: 0,
				yScale: 0
			},
			screen: {
				height: 500,
				portrait: true,
				width: 270
			},
			zoom: {
				start: 0,
				end: 0
			}
		};
		store.dispatch(setDuration(duration));
		expect(store.getState()).toEqual(expected_state);
		store.dispatch(setDuration(2000));
	})
	it('sets screen parameters', () => {
		expect.assertions(1);
		var width = 500;
		var height = 200;
		var expected_state = {
			color: {
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
			},
			data: {
				data: [],
				isloading: false,
				iserror: false
			},
			duration: {
				duration: 2000
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
			scale: {
				maxTime: 0,
				maxValue: 0,
				minTime: 0,
				minValue: 0,
				xScale: 0,
				yScale: 0
			},
			screen: {
				height: height,
				portrait: false,
				width: width
			},
			zoom: {
				start: 0,
				end: 0
			}
		};
		store.dispatch(setScreen(width, height));
		expect(store.getState()).toEqual(expected_state);
		store.dispatch(setScreen(270, 500));
	})
});
