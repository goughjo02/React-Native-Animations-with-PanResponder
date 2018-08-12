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
		it("gets exact number points", () => {
			dataArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
			noPoints = 10;
			expectation = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
			result = get_x_points(dataArray, noPoints);
			expect(result).toEqual(expectation);
		});
		it("can deal with prime numbers", () => {
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
			expectation = [1, 7, 13, 19];
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
			expectation = [0, 10, 20, 30, 40];
			result = get_x_points(dataArray, noPoints);
			expect(result).toEqual(expectation);
		});
	});
	describe("y axis", () => {
		it("can array of y points 1", () => {
			minValue = 0;
			maxValue = 9;
			noPoints = 10;
			expectation = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
			result = get_y_points(minValue, maxValue, noPoints);
			expect(result).toEqual(expectation);
		});
		it("can array of y points 2", () => {
			minValue = 0;
			maxValue = 40
			noPoints = 5;
			expectation = [0, 10, 20, 30, 40];
			result = get_y_points(minValue, maxValue, noPoints);
			expect(result).toEqual(expectation);
		});
		it("can deal with prime numbers", () => {
			minValue = 0;
			maxValue = 19;
			noPoints = 4;
			expectation = [0, (maxValue / (noPoints - 1)) * 1, (maxValue / (noPoints - 1)) * 2, (maxValue / (noPoints - 3)) * 1];
			result = get_y_points(minValue, maxValue, noPoints);
			expect(result).toEqual(expectation);
		});
	});
});
