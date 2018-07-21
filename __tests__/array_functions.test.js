import React from "react";
import renderer from "react-test-renderer";

import { convertDateTime } from "../services";
import { getSum, getMinMax } from "../services";

let input;
let key;
let expectation;

describe("array functions", () => {
	beforeEach(() => {
		input = [
			{
				bought: 0,
				date: convertDateTime("2012-05-01 00:00:00+00:00"),
				produced: 65,
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
	it('can get minmax values of keys', () => {
		key = "sold";
		expectation = { "min": 0, "max": 28};
		expect(getMinMax(input, key)).toEqual(expectation);
		key = "produced";
		expectation = {"min": 4, "max": 65};
		expect(getMinMax(input, key)).toEqual(expectation);
		key = "used";
		expectation = {"min": 10, "max": 37};
		expect(getMinMax(input, key)).toEqual(expectation);
		key = "date";
		expectation = {"min": convertDateTime("2012-05-01 00:00:00+00:00"), "max": convertDateTime("2012-05-01 02:00:00+00:00")};
		expect(getMinMax(input, key)).toEqual(expectation);
	})
	it("can get sum of key in array", () => {
		key = "sold";
		expectation = 28;
		expect(getSum(input, key)).toEqual(expectation);
		key = "produced";
		expectation = 77;
		expect(getSum(input, key)).toEqual(expectation);
		key = "used";
		expectation = 57;
		expect(getSum(input, key)).toEqual(expectation);
	});
});
