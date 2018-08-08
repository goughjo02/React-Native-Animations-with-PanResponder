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
		xit("always gets head and tail", () => {
			noPoints = 10;
			head = 0;
			tail = 50;
			dataArray = [head, 1, 2, 3, 4, 5, 6, 7, 8, tail];
			result = get_x_points(dataArray, noPoints);
			expect(result[0]).toEqual(head);
			expect(result[result.length - 1]).toEqual(tail);
			dataArray = [head, 1, 7, 2, 3, 4, 5, 6, 7, tail];
			result = get_x_points(dataArray, noPoints);
			expect(result[0]).toEqual(head);
			expect(result[result.length - 1]).toEqual(tail);
			dataArray = [
				head,
				1,
				2,
				3,
				2,
				2,
				2,
				2,
				2,
				2,
				2,
				2,
				4,
				5,
				6,
				7,
				8,
				tail
			];
			result = get_x_points(dataArray, noPoints);
			expect(result[0]).toEqual(head);
			expect(result[result.length - 1]).toEqual(tail);
		});
		xit('gets exact number points', () => {
			dataArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
			noPoints = 10;
			expectation = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
			result = get_x_points(dataArray, noPoints);
			expect(result).toEqual(expectation);
		})
		xit("can extract set of x points", () => {
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
		it("can extract set of x points", () => {
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
				19,
				20,
				21,
				22,
				23,
				24,
				25,
				26,
				27,
				38,
				39,
				30,
				31,
				32,
				33,
				34,
				35,
				36,
				37,
				38,
				39,
				40
			];
			noPoints = 5;
			expectation = [1, 9, 17, 25, 33, 40];
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
			19,
			20,
			21,
			22,
			23,
			24,
			25,
			26,
			27,
			38,
			39,
			30,
			31,
			32,
			33,
			34,
			35,
			36,
			37,
			38,
			39,
			40
		];
		noPoints = 5;
		expectation = [0, 4, 8, 12, 19];
		result = get_y_points(dataArray, noPoints);
		expect(result).toEqual(expectation);
	});
});
