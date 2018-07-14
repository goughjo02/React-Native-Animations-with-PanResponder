import React from "react";
import deepFreeze from "deep-freeze";
import renderer from "react-test-renderer";

import { http_data_reducer, range_reducer, zoom_reducer } from "./reducer";
import { ERROR, LOADING, SUCCESS, START_RANGE, END_RANGE, START_ZOOM, END_ZOOM } from './constants';
import { dataIsLoading, dataHasErrored, fetchDataSuccess } from './actions'

describe("HTTP Reducer", () => {
	it("produces default state", () => {
		const expected_result = {
			data: [],
			isloading: false,
			iserror: false
		};
		expect(http_data_reducer(undefined, {})).toEqual(expected_result);
	});

	it('adds data when successful', () => {
		const state_before = {
			data: [],
			isloading: false,
			iserror: false
		};
		const expected_result = {
			data: ['test'],
			isloading: false,
			iserror: false
		}
		deepFreeze(state_before)
		expect(http_data_reducer(state_before, fetchDataSuccess(['test']))).toEqual(expected_result)
	})

	it('toggle is loading true', () => {
		const state_before = {
			data: [],
			isloading: false,
			iserror: false
		}
		const expected_result = {
			data: [],
			isloading: true,
			iserror: false
		};
		deepFreeze(state_before);
		expect(http_data_reducer(state_before, dataIsLoading(true))).toEqual(expected_result)
	})

	it('toggle is loading false', () => {
		const state_before = {
			data: [],
			isloading: true,
			iserror: false
		}
		const expected_result = {
			data: [],
			isloading: false,
			iserror: false
		};
		deepFreeze(state_before);
		expect(http_data_reducer(state_before, dataIsLoading(false))).toEqual(expected_result)
	})

	it('toggle is error true', () => {
		const state_before = {
			data: [],
			isloading: false,
			iserror: false
		}
		const expected_result = {
			data: [],
			isloading: false,
			iserror: true
		};
		deepFreeze(state_before);
		expect(http_data_reducer(state_before, dataHasErrored(true))).toEqual(expected_result)
	})

	it('toggle is error false', () => {
		const state_before = {
			data: [],
			isloading: false,
			iserror: true
		}
		const expected_result = {
			data: [],
			isloading: false,
			iserror: false
		};
		deepFreeze(state_before);
		expect(http_data_reducer(state_before, dataHasErrored(false))).toEqual(expected_result)
	})
});

describe('range selectors', () => {
	xit('returns initial state', () => {

	})
	xit('can set start range', () => {

	})
	xit('can set end range', () => {

	})
})
describe('zoom selectors', () => {
	xit('returns initial state', () => {
		
	})
	xit('can set start zoom', () => {

	})
	xit('can set end zoom', () => {

	})
})
