import React from "react";
import renderer from "react-test-renderer";

import {
	dataHasErrored,
	dataIsLoading,
	fetchDataSuccess,
	setStartRange,
	setEndRange,
	setStartZoom,
	setEndZoom
} from "./actions";
import { ERROR, LOADING, SUCCESS, START_RANGE, END_RANGE, START_ZOOM, END_ZOOM } from './constants';

describe("actions", () => {
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
		}
		expect(setStartRange(data)).toEqual(expectedResult)
	});
	it("should create an action to set end range", () => {
		const data = 200;
		const expectedResult = {
			type: END_RANGE,
			index: 200
		}
		expect(setEndRange(data)).toEqual(expectedResult)
	});
	it("should create an action to set start zoom", () => {
		const data = 25;
		const expectedResult = {
			type: START_ZOOM,
			percent: 25
		}
		expect(setStartZoom(data)).toEqual(expectedResult)
	});
	it("should create an action to set end zoom", () => {
		const data = 75;
		const expectedResult = {
			type: END_ZOOM,
			percent: 75
		}
		expect(setEndZoom(data)).toEqual(expectedResult)
	});
});
