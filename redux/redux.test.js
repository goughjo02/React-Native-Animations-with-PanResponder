import React from 'react';

import renderer from 'react-test-renderer';

import { dataHasErrored, dataIsLoading, fetchDataSuccess } from './actions';
import { ERROR, LOADING, SUCCESS } from './constants';


describe('actions', () => {
	it('should create an action to deliver an error', () => {
		const error = true;
		const expectedResult = {
			type: ERROR,
			iserror: error
		}
		expect(dataHasErrored(error)).toEqual(expectedResult);
	})
	it('should create an action to indicate laoding', () => {
		const isloading = true;
		const expectedResult = {
			type: LOADING,
			isloading: isloading
		}
		expect(dataIsLoading(isloading)).toEqual(expectedResult);
	})
	it('should create an action to deliver data', () => {
		const data = ['hello', 'there'];
		const expectedResult = {
			type: SUCCESS,
			data: data
		}
		expect(fetchDataSuccess(data)).toEqual(expectedResult);
	})
})