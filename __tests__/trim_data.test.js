import React from "react";
import renderer from "react-test-renderer";

import {
	range_selector,
	percent_selector,
	combination_selector
} from "../services/trim_data";

// arrays are zero indexed

describe("Data to trim incoming data", () => {
	const data = [
		{ number: 0 },
		{ number: 1 },
		{ number: 2 },
		{ number: 3 },
		{ number: 4 },
		{ number: 5 },
		{ number: 6 },
		{ number: 7 },
		{ number: 8 },
		{ number: 9 }
	];
	let startRange, endRange, startZoom, endZoom;
	it("percent selector works 1", () => {
		var expectation = [
			{ number: 0 },
			{ number: 1 },
			{ number: 2 },
			{ number: 3 },
			{ number: 4 }
		];
		startRange = 0;
		endRange = 50;
		var result = percent_selector(data, startRange, endRange);
		expect(result).toEqual(expectation);
		var expectation = [{ number: 0 }];
		startRange = 0;
		endRange = 10;
		var result = percent_selector(data, startRange, endRange);
		expect(result).toEqual(expectation);
	});
	it("percent selector works 2", () => {
		var expectation = [
			{ number: 3 },
			{ number: 4 },
			{ number: 5 },
			{ number: 6 }
		];
		startRange = 30;
		endRange = 70;
		var result = percent_selector(data, startRange, endRange);
		expect(result).toEqual(expectation);
		var data2 = [];
		for (var i = 6000; i >= 0; i--) {
			data2.push({ number: i });
		}
		expect(data2.length).toEqual(6001);
		result = percent_selector(data2, 0, 100);
		expect(result.length).toEqual(6001);
	});
	it("percent selector works 3", () => {
		var expectation = [{ number: 7 }, { number: 8 }, { number: 9 }];
		startRange = 70;
		endRange = 100;
		var result = percent_selector(data, startRange, endRange);
		expect(result).toEqual(expectation);
	});
	it("combination selector works 1", () => {
		var expectation = [{ number: 2 }, { number: 3 }, { number: 4 }];
		startRange = 0;
		endRange = 50;
		startZoom = 30;
		endZoom = 100;
		var result = combination_selector(
			data,
			startRange,
			endRange,
			startZoom,
			endZoom
		);
		expect(result).toEqual(expectation);
		expect(data.length).toEqual(10);
	});
	it("combination selector works 2", () => {
		var expectation = [{ number: 3 }];
		startRange = 30;
		endRange = 70;
		startZoom = 0;
		endZoom = 25;
		var result = combination_selector(
			data,
			startRange,
			endRange,
			startZoom,
			endZoom
		);
		expect(result).toEqual(expectation);
	});
	it("combination selector works 3", () => {
		var expectation = [
			{ number: 6 },
			{ number: 7 },
			{ number: 8 },
			{ number: 9 }
		];
		startRange = 60;
		endRange = 100;
		startZoom = 10;
		endZoom = 100;
		var result = combination_selector(
			data,
			startRange,
			endRange,
			startZoom,
			endZoom
		);
		expect(result).toEqual(expectation);
	});
});
