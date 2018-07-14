import React from 'react';
import renderer from 'react-test-renderer';
import deepFreeze from 'deep-freeze';

import { configureStore } from './store';
import {
	dataHasErrored,
	dataIsLoading,
	fetchDataSuccess,
	setStartRange,
	setEndRange,
	setStartZoom,
	setEndZoom
} from "./actions";


describe('store', () => {

	var store = configureStore()

	var default_state = {
		data: {
			data: [],
			isloading: false,
			iserror: false
		},
		range: {
			start: 0,
			end: 0
		},
		zoom: {
			start: 0,
			end: 100
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
			},
		range: {
			start: 0,
			end: 0
		},
		zoom: {
			start: 0,
			end: 100
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
			},
		range: {
			start: 0,
			end: 0
		},
		zoom: {
			start: 0,
			end: 100
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
			},
		range: {
			start: 0,
			end: 0
		},
		zoom: {
			start: 0,
			end: 100
		}
		}
		store.dispatch(dataHasErrored(true))
		expect(store.getState()).toEqual(expected_state)
	})
})