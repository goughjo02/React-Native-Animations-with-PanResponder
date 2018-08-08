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
		minDist = 10;
		width = 99;
		expectation = 10;
		noPoints = get_no_points(minDist, width);
		expect(noPoints).toEqual(expectation);
		minDist = 20;
		width = 70;
		expectation = 4;
		noPoints = get_no_points(minDist, width);
		expect(noPoints).toEqual(expectation);
	});
	describe("x axis", () => {
		it('always gets head and tail', () => {
			noPoints = 10;
			head = 0;
			tail = 50;
			dataArray = [head, 1, 2, 3, 4, 5, 6, 7, 8, tail];
			result = get_x_points(dataArray, noPoints);
			expect(result[0]).toEqual(head);
			expect(result[result.length - 1]).toEqual(tail);
			dataArray = [head, 1, 7, 2, 3, 4, 5, 6, 7, 8, tail];
			result = get_x_points(dataArray, noPoints);
			expect(result[0]).toEqual(head);
			expect(result[result.length - 1]).toEqual(tail);
			dataArray = [head, 1, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 4, 5, 6, 7, 8, tail];
			result = get_x_points(dataArray, noPoints);
			expect(result[0]).toEqual(head);
			expect(result[result.length - 1]).toEqual(tail);
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
			expectation = [0, 4, 8, 12, 19];
			result = get_x_points(dataArray, noPoints);
			expect(result).toEqual(expectation);
		});
	});
	xit("can get array of y points", () => {
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
		expectation = [1, 6, 9, 14, 19];
		result = get_y_points(dataArray, noPoints);
		expect(result).toEqual(expectation);
	});
});
