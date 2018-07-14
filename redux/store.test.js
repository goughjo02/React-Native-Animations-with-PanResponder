import React from 'react';
import renderer from 'react-test-renderer';
import deepFreeze from 'deep-freeze';

import { configureStore } from './store';
import { fetchDataSuccess, dataHasErrored, dataIsLoading } from './actions';


describe('store', () => {

	var store = configureStore()

	var default_state = {
		data: {
			data: [],
			isloading: false,
			iserror: false
		}
	}
	deepFreeze(default_state)
	it('can get state', () => {
		expect(store.getState()).toBeTruthy()
	})
	it('initialises default state', () => {
		expect(store.getState()).toEqual(default_state)
	})
	it('responds to data success', () => {
		const expected_state = {
			data: {
				data: ['test'],
				isloading: false,
				iserror: false
			}
		}
		store.dispatch(fetchDataSuccess(['test']))
		expect(store.getState()).toEqual(expected_state)
	})
	it('sets loading to true', () => {
		const expected_state = {
			data: {
				data: [],
				isloading: true,
				iserror: false
			}
		}
		store.dispatch(dataIsLoading(true))
		expect(store.getState()).toEqual(expected_state)
	})
	it('sets error to true', () => {
		const expected_state = {
			data: {
				data: [],
				isloading: false,
				iserror: true
			}
		}
		store.dispatch(dataHasErrored(true))
		expect(store.getState()).toEqual(expected_state)
	})
})