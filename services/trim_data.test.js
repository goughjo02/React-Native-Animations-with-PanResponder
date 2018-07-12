import React from 'react';
import renderer from 'react-test-renderer';

import { range_selector, zoom_selector, combination_selector } from './trim_data';

// arrays are zero indexed

describe('Data to trim incoming data', () => {
	beforeEach(() => {
		var data = [
		{number: 0},
		{number: 1},
		{number: 2},
		{number: 3},
		{number: 4},
		{number: 5},
		{number: 6},
		{number: 7},
		{number: 8},
		{number: 9}
		];
		let startRange, endRange, startZoom, endZoom;
	});
	xit('range selector works 1', () => {
		var expectation = [0, 1, 2, 3, 4];
		startRange = 0;
		endRange = 5;
		var result = range_selector(startRange, endRange)
		expect(result).toEqual(expectation);
	});
	xit('range selector works 2', () => {
		var expectation = [3, 4, 5, 6];
		startRange = 3;
		endRange = 7;
		var result = range_selector(startRange, endRange)
		expect(result).toEqual(expectation);
	});
	xit('range selector works 3', () => {
		var expectation = [7, 8, 9];
		startRange = 7;
		endRange = 10;
		var result = range_selector(startRange, endRange)
		expect(result).toEqual(expectation);
	});
	xit('zoom selector works 1', () => {
		var expectation = [0, 1, 2, 3, 4];
		startRange = 0;
		endRange = 5;
		var result = zoom_selector(startRange, endRange)
		expect(result).toEqual(expectation);
	});
	xit('zoom selector works 2', () => {
		var expectation = [3, 4, 5, 6];
		startRange = 3;
		endRange = 7;
		var result = zoom_selector(startRange, endRange)
		expect(result).toEqual(expectation);
	});
	xit('zoom selector works 3', () => {
		var expectation = [7, 8, 9];
		startRange = 7;
		endRange = 10;
		var result = zoom_selector(startRange, endRange)
		expect(result).toEqual(expectation);
	});
	xit('combination selector works 1', () => {
		var expectation = [2, 3, 4];
		startRange = 0;
		endRange = 5;
		startZoom = 2;
		endZoom = 5;
		var result = combination_selector(startRange, endRange, startZoom, endZoom)
		expect(result).toEqual(expectation);
	});
	xit('combination selector works 2', () => {
		var expectation = [4, 5];
		startRange = 3;
		endRange = 7;
		startZoom = 1;
		endZoom = 4;
		var result = combination_selector(startRange, endRange, startZoom, endZoom)
		expect(result).toEqual(expectation);
	});
	xit('combination selector works 3', () => {
		var expectation = [7, 8, 9];
		startRange = 7;
		endRange = 10;
		startZoom = 1;
		endZoom = 3;
		var result = combination_selector(startRange, endRange)
		expect(result).toEqual(expectation);
	});
})