import { get_no_x_points, get_x_points } from '../services/axes_points';

import renderer from 'react-test-renderer';

describe('get_x_points', () => {
	let maxDist;
	let width;
	let dataArray;
	let noPoints;
	let result;
	let expectation;
	it('can get total number of x points', () => {
		maxDist = 10;
		width = 99;
		expectation = 10;
		noPoints = get_no_x_points(maxDist, width);
		expect(noPoints).toEqual(expectation);
		maxDist = 20;
		width = 70;
		expectation = 4;
		noPoints = get_no_x_points(maxDist, width);
		expect(noPoints).toEqual(expectation);
	});
	it('can extract set of points', () => {
		dataArray = [0,1,2,3,4,5,6,7,8,9];
		noPoints = 10
		expectation = [0,1,2,3,4,5,6,7,8,9];
		result = get_x_points(dataArray, noPoints);
		expect(result).toEqual(expectation);
		dataArray = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];
		noPoints = 6;
		expectation = [1,4,7,10,13,16,19];
		result = get_x_points(dataArray, noPoints);
		expect(result).toEqual(expectation);
	})
})