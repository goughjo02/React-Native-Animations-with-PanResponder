import React from "react";
import deepFreeze from "deep-freeze";
import renderer from "react-test-renderer";

import { data_reducer } from "./";
import { LOADING, ERROR, SUCCESS } from "./";

describe("HTTP Reducer", () => {
	it("should return the initial state", () => {
		expect(data_reducer(undefined, {})).toEqual(
			{
				data: [],
				iserror: false,
				isloading: false
			}
		);
	});
	it("should handle LOADING", () => {
		expect(
			data_reducer([], {
				type: LOADING,
				isloading: true
			})
		).toEqual(
			{
				data: [],
				iserror: false,
				isloading: true
			}
		);
		expect(
			data_reducer(
				
					{
						data: [],
						iserror: false,
						isloading: true
					}
				,
				{
					type: LOADING,
					isloading: false
				}
			)
		).toEqual(
			{
				data: [],
				iserror: false,
				isloading: false
			}
		);
	});
	xit("should handle ERROR", () => {
		expect(
			data_reducer([], {
				type: ERROR,
				iserror: true
			})
		).toEqual(
			{
				data: [],
				iserror: true,
				isloading: false
			}
		);
		expect(
			data_reducer(
				
					{
						data: [],
						iserror: true,
						isloading: false
					}
				,
				{
					type: ERROR,
					iserror: false
				}
			)
		).toEqual(
			{
				data: [],
				iserror: false,
				isloading: false
			}
		);
	});
	xit("should handle SUCCESS", () => {
		expect(
			data_reducer([], {
				type: SUCCESS,
				data: ["test"]
			})
		).toEqual(
			{
				data: ["test"],
				iserror: false,
				isloading: false
			}
		);
		expect(
			data_reducer(
				
					{
						data: ["test"],
						iserror: false,
						isloading: false
					}
				,
				{
					type: SUCCESS,
					data: ["test 2"]
				}
			)
		).toEqual(
			{
				data: ["test 2"],
				iserror: false,
				isloading: false
			}
		);
	});
});
