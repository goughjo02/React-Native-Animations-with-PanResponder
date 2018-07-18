import React from 'react';
import renderer from 'react-test-renderer';

import { start_percentage_to_slice, end_percentage_to_slice } from './percentage_to_slice';

describe('convert from percentages and slices', () => {
	it('can convert from percentage to start slice 1', () => {
		percentage = 50;
		datalength = 100
		expectation = 50;
		var start_slice = start_percentage_to_slice(datalength, percentage)
		expect(start_slice).toEqual(expectation);
	});
	it('can convert from percentage to start slice 2', () => {
		percentage = 25;
		datalength = 160
		expectation = 40;
		var start_slice = start_percentage_to_slice(datalength, percentage)
		expect(start_slice).toEqual(expectation);
	});
	it('can convert from percentage to start slice 3', () => {
		percentage = 10;
		datalength = 900
		expectation = 90;
		var start_slice = start_percentage_to_slice(datalength, percentage)
		expect(start_slice).toEqual(expectation);
	});
	it('can convert from percentage to end slice 1', () => {
		percentage = 50;
		datalength = 100
		expectation = 51;
		var end_slice = end_percentage_to_slice(datalength, percentage)
		expect(end_slice).toEqual(expectation);
	});
	it('can convert from percentage to end slice 1', () => {
		percentage = 25;
		datalength = 160
		expectation = 41;
		var end_slice = end_percentage_to_slice(datalength, percentage)
		expect(end_slice).toEqual(expectation);
	});
	it('can convert from percentage to end slice 1', () => {
		percentage = 10;
		datalength = 900
		expectation = 91;
		var end_slice = end_percentage_to_slice(datalength, percentage)
		expect(end_slice).toEqual(expectation);
	});
})