import React from 'react';

import renderer from 'react-test-renderer';

import { dataHasErrored, dataIsLoading, dataFetchDataSuccess } from 'redux/actions';
import { ERROR, LOADING, SUCCESS } from 'redux/constants';


describe('actions', () => {
	it('should create an action to deliver an error', () => {
		const message = "oops, error";
		const expectedResult = {
			type: ERROR,
			message: message
		}
		expect(dataHasErrored(message)).toEqual(expectedResult);
	})
	it('should create an action to indicate laoding', () => {
		const message = "loading";
		const expectedResult = {
			type: LOADING,
			message: message
		}
		expect(dataIsLoading(message)).toEqual(expectedResult);
	})
	it('should create an action to manage success', () => {
		const message = "oops, error";
		const expectedResult = {
			type: SUCCESS,
			message: message
		}
		expect(dataFetchDataSuccess(message)).toEqual(expectedResult);
	})
})