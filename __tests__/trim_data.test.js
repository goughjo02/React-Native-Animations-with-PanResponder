import React from 'react';
import renderer from 'react-test-renderer';

import { range_selector, zoom_selector, combination_selector } from '../services/trim_data';

// arrays are zero indexed

describe('Data to trim incoming data', () => {
	const data = [
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
	it('range selector works 1', () => {
		var expectation = [
		{number: 0},
		{number: 1},
		{number: 2},
		{number: 3},
		{number: 4}
		];
		startRange = 0;
		endRange = 5;
		var result = range_selector(data, startRange, endRange)
		expect(result).toEqual(expectation);
	});
	it('range selector works 2', () => {
		var expectation = [
		{number: 3},
		{number: 4},
		{number: 5},
		{number: 6}
		];
		startRange = 3;
		endRange = 7;
		var result = range_selector(data, startRange, endRange)
		expect(result).toEqual(expectation);
	});
	it('range selector works 3', () => {
		var expectation = [
		{number: 7},
		{number: 8},
		{number: 9}
		];
		startRange = 7;
		endRange = 10;
		var result = range_selector(data, startRange, endRange)
		expect(result).toEqual(expectation);
	});
	it('zoom selector works 1', () => {
		var expectation = [
		{number: 0},
		{number: 1},
		{number: 2},
		{number: 3},
		{number: 4}
		];
		startRange = 0;
		endRange = 5;
		var result = zoom_selector(data, startRange, endRange)
		expect(result).toEqual(expectation);
	});
	it('zoom selector works 2', () => {
		var expectation = [
		{number: 3},
		{number: 4},
		{number: 5},
		{number: 6}
		];
		startRange = 3;
		endRange = 7;
		var result = zoom_selector(data, startRange, endRange)
		expect(result).toEqual(expectation);
	});
	it('zoom selector works 3', () => {
		var expectation = [
		{number: 7},
		{number: 8},
		{number: 9}
		];
		startRange = 7;
		endRange = 10;
		var result = zoom_selector(data, startRange, endRange)
		expect(result).toEqual(expectation);
	});
	it('combination selector works 1', () => {
		var expectation = [
		{number: 2},
		{number: 3},
		{number: 4}
		];
		startRange = 0;
		endRange = 5;
		startZoom = 2;
		endZoom = 5;
		var result = combination_selector(data, startRange, endRange, startZoom, endZoom)
		expect(result).toEqual(expectation);
	});
	it('combination selector works 2', () => {
		var expectation = [
		{number: 4},
		{number: 5}
		];
		startRange = 3;
		endRange = 7;
		startZoom = 1;
		endZoom = 3;
		var result = combination_selector(data, startRange, endRange, startZoom, endZoom)
		expect(result).toEqual(expectation);
	});
	it('combination selector works 3', () => {
		var expectation = [
		{number: 7},
		{number: 8},
		{number: 9}
		];
		startRange = 6;
		endRange = 10;
		startZoom = 1;
		endZoom = 4;
		var result = combination_selector(data, startRange, endRange, startZoom, endZoom)
		expect(result).toEqual(expectation);
	});
})