import React from "react";
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
	setChartColor,
	setDataColor,
	setThemeColor,
	setDuration,
	setScreen,
	LOGIN_ERROR,
	LOGIN_LOADING,
	LOGIN_SUCCESS,
	ERROR,
	LOADING,
	SUCCESS,
	START_RANGE,
	END_RANGE,
	START_ZOOM,
	END_ZOOM,
	SCALES,
	COLOR_CHART,
	COLOR_DATA,
	COLOR_THEME,
    SCREEN,
    DURATION_ANIM
} from "../redux";
import { AuthConstants } from '../config';

describe("actions", () => {
	it('should create an action to set screen dimensions', () => {
		expect.assertions(1);
		const duration = 2000;
		const expectedResult = {
			type: DURATION_ANIM,
			duration
		}
		expect(setDuration(duration)).toEqual(expectedResult)
	})
	it('should create an action to set screen parameters', () => {
		expect.assertions(2);
		var width = 10;
		var height = 100;
		var expectedResult = {
			type: SCREEN,
			portrait: true,
			width: width,
			height: height
		}
		expect(setScreen(width, height)).toEqual(expectedResult);
		var width = 100;
		var height = 10;
		var expectedResult = {
			type: SCREEN,
			portrait: false,
			width: width,
			height: height
		}
		expect(setScreen(width, height)).toEqual(expectedResult);
	})
	it('should create an action to change theme color', () => {
		expect.assertions(1);
        const one = "#000000";
        const two = "#00ff00";
        const three = "#ff0000";
        const four = "#0000ff";
        const five = "#0ff0ff";
		const expectedResult = {
			type: COLOR_THEME,
			one: one,
			two: two,
			three: three,
			four: four,
			five: five
		};
		expect(setThemeColor(one, two, three, four, five)).toEqual(expectedResult);
	})
	it('should create an action to change data color', () => {
		expect.assertions(1);
        const one = "#000000";
        const two = "#00ff00";
        const three = "#ff0000";
        const four = "#0000ff";
        const five = "#0ff0ff";
		const expectedResult = {
			type: COLOR_DATA,
			one: one,
			two: two,
			three: three,
			four: four,
			five: five
		};
		expect(setDataColor(one, two, three, four, five)).toEqual(expectedResult);
	})
	it('should create an action to change chart color', () => {
		expect.assertions(1);
        const margins = "#000000";
        const background = "#00ff00";
        const primaryFrame = "#ff0000";
        const secondaryFrame = "#0000ff";
		const expectedResult = {
			type: COLOR_CHART,
			margins: margins,
			background: background,
			primaryFrame: primaryFrame,
			secondaryFrame: secondaryFrame
		};
		expect(setChartColor(margins, background, primaryFrame, secondaryFrame)).toEqual(expectedResult);
	})
	it('should create an action to set scales', () => {
		expect.assertions(1);
		const xScale = () => "test x";
		const yScale = () => "test y ";
		const minTime = new Date(1);
		const maxTime = new Date (2);
		const minValue = 10;
		const maxValue = 100;
		const expectedResult = {
			type: SCALES,
			xScale: xScale,
			yScale: yScale,
			minTime: minTime,
			maxTime: maxTime,
			minValue: minValue,
			maxValue: maxValue
		};
		expect(setScales(xScale, yScale, minTime, maxTime, minValue, maxValue)).toEqual(expectedResult);
	})
	it('should create an action to show that login is loading', () => {
		expect.assertions(1);
		const loading = true;
		const expectedResult = {
			type: LOGIN_LOADING,
			isloading: loading
		};
		expect(loginLoading(loading)).toEqual(expectedResult);
	})
	it('should create an action to show that login is successful', () => {
		expect.assertions(1);
		const success = "sam";
		const expectedResult = {
			type: LOGIN_SUCCESS,
			[AuthConstants.localStateKey()]: success
		};
		expect(loginSuccess(success)).toEqual(expectedResult);
	})
	it('should create an action to show that login is error', () => {
		expect.assertions(1);
		const error = true;
		const expectedResult = {
			type: LOGIN_ERROR,
			iserror: error
		};
		expect(loginError(error)).toEqual(expectedResult);
	})
	it("should create an action to deliver an error", () => {
		const error = true;
		const expectedResult = {
			type: ERROR,
			iserror: error
		};
		expect(dataHasErrored(error)).toEqual(expectedResult);
	});
	it("should create an action to indicate laoding", () => {
		const isloading = true;
		const expectedResult = {
			type: LOADING,
			isloading: isloading
		};
		expect(dataIsLoading(isloading)).toEqual(expectedResult);
	});
	it("should create an action to deliver data", () => {
		const data = ["hello", "there"];
		const expectedResult = {
			type: SUCCESS,
			data: data
		};
		expect(fetchDataSuccess(data)).toEqual(expectedResult);
	});
	it("should create an action to set start range", () => {
		const data = 100;
		const expectedResult = {
			type: START_RANGE,
			index: 100
		};
		expect(setStartRange(data)).toEqual(expectedResult);
	});
	it("should create an action to set end range", () => {
		const data = 200;
		const expectedResult = {
			type: END_RANGE,
			index: 200
		};
		expect(setEndRange(data)).toEqual(expectedResult);
	});
	it("should create an action to set start zoom", () => {
		const data = 25;
		const expectedResult = {
			type: START_ZOOM,
			percent: 25
		};
		expect(setStartZoom(data)).toEqual(expectedResult);
	});
	it("should create an action to set end zoom", () => {
		const data = 75;
		const expectedResult = {
			type: END_ZOOM,
			percent: 75
		};
		expect(setEndZoom(data)).toEqual(expectedResult);
	});
});
