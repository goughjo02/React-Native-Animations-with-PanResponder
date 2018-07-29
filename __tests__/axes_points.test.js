import {
	get_no_points,
	get_x_points,
	get_y_points
} from "../services/axes_points";

import renderer from "react-test-renderer";

describe("get_points", () => {
	let maxDist;
	let width;
	let dataArray;
	let noPoints;
	let result;
	let expectation;
	it("can get total number of points", () => {
		maxDist = 10;
		width = 99;
		expectation = 10;
		noPoints = get_no_points(maxDist, width);
		expect(noPoints).toEqual(expectation);
		maxDist = 20;
		width = 70;
		expectation = 4;
		noPoints = get_no_points(maxDist, width);
		expect(noPoints).toEqual(expectation);
	});
	it("can extract set of x points", () => {
		dataArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
		noPoints = 10;
		expectation = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
		result = get_x_points(dataArray, noPoints);
		expect(result).toEqual(expectation);
		dataArray = [
			0,
			1,
			2,
			3,
			4,
			5,
			6,
			7,
			8,
			9,
			10,
			11,
			12,
			13,
			14,
			15,
			16,
			17,
			18,
			19
		];
		noPoints = 6;
		expectation = [3, 6, 9, 12, 15, 18];
		result = get_x_points(dataArray, noPoints);
		expect(result).toEqual(expectation);
	});
	it("can get array of y points", () => {
		dataArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
		noPoints = 10;
		expectation = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
		result = get_y_points(dataArray, noPoints);
		expect(result).toEqual(expectation);
		dataArray = [
			0,
			1,
			2,
			3,
			4,
			5,
			6,
			7,
			8,
			9,
			10,
			11,
			12,
			13,
			14,
			15,
			16,
			17,
			18,
			19
		];
		noPoints = 5;
		expectation = [3, 7, 11, 15, 19];
		result = get_y_points(dataArray, noPoints);
		expect(result).toEqual(expectation);
	});
});
