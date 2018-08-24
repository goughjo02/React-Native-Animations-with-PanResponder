import React from "react";
import renderer from "react-test-renderer";

import { convertDateTime } from "../services";
import { getSum, getMinMax, getXScale, getYScale } from "../services";

let input;
let key;
let expectation;

describe("array functions", () => {
	beforeEach(() => {
		input = [
			{
				bought: 0,
				date: convertDateTime("2012-05-01 00:00:00+00:00"),
				produced: 66,
				sold: 28,
				used: 37
			},
			{
				bought: 6,
				date: convertDateTime("2012-05-01 01:00:00+00:00"),
				produced: 4,
				sold: 0,
				used: 10
			},
			{
				bought: 2,
				date: convertDateTime("2012-05-01 02:00:00+00:00"),
				produced: 8,
				sold: 0,
				used: 10
			}
		];
	});
	it("can get minmax values of keys", () => {
		key = "sold";
		expectation = { min: 0, max: 28 };
		expect(getMinMax(input, key)).toEqual(expectation);
		key = "produced";
		expectation = { min: 4, max: 66 };
		expect(getMinMax(input, key)).toEqual(expectation);
		key = "used";
		expectation = { min: 10, max: 37 };
		expect(getMinMax(input, key)).toEqual(expectation);
		key = "date";
		expectation = {
			min: convertDateTime("2012-05-01 00:00:00+00:00"),
			max: convertDateTime("2012-05-01 02:00:00+00:00")
		};
		expect(getMinMax(input, key)).toEqual(expectation);
	});
	it("can get sum of key in array", () => {
		key = "sold";
		expectation = 28;
		expect(getSum(input, key)).toEqual(expectation);
		key = "produced";
		expectation = 78;
		expect(getSum(input, key)).toEqual(expectation);
		key = "used";
		expectation = 57;
		expect(getSum(input, key)).toEqual(expectation);
	});
	it("can get x scale", () => {
		var width = 500;
		var expectation = 250;
		var midTime = convertDateTime("2012-05-01 01:00:00+00:00");
		var time = getMinMax(input, "date");
		expect(getXScale(time.min, time.max, width)(midTime)).toEqual(
			expectation
		);
	});
	it("can get y scale", () => {
		var height = 500;
		var expectation = 250;
		var midValue = 33;
		var minValue = Math.min(
			getMinMax(input, "produced").min,
			getMinMax(input, "used").min,
			getMinMax(input, "sold").min
		);
		var maxValue = Math.max(
			getMinMax(input, "produced").max,
			getMinMax(input, "used").max,
			getMinMax(input, "sold").max
		);
		expect(getYScale(minValue, maxValue, height)(midValue)).toEqual(
			expectation
		);
	});
});
