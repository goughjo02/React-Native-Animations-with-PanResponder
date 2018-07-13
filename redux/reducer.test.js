import React from "react";
import deepFreeze from "deep-freeze";
import renderer from "react-test-renderer";

import { root_reducer } from "./";
import { LOADING, ERROR, SUCCESS } from "./";

describe("HTTP Reducer", () => {
	it("should return the initial state", () => {
		expect(root_reducer(undefined, {})).toEqual(
			{
				data: [],
				errorState: false,
				loadingState: false
			}
		);
	});
	it("should handle LOADING", () => {
		expect(
			root_reducer([], {
				type: LOADING,
				loadingState: true
			})
		).toEqual(
			{
				data: [],
				errorState: false,
				loadingState: true
			}
		);
		expect(
			root_reducer(
				
					{
						data: [],
						errorState: false,
						loadingState: true
					}
				,
				{
					type: LOADING,
					loadingState: false
				}
			)
		).toEqual(
			{
				data: [],
				errorState: false,
				loadingState: false
			}
		);
	});
	it("should handle ERROR", () => {
		expect(
			root_reducer([], {
				type: ERROR,
				errorState: true
			})
		).toEqual(
			{
				data: [],
				errorState: true,
				loadingState: false
			}
		);
		expect(
			root_reducer(
				
					{
						data: [],
						errorState: true,
						loadingState: false
					}
				,
				{
					type: ERROR,
					errorState: false
				}
			)
		).toEqual(
			{
				data: [],
				errorState: false,
				loadingState: false
			}
		);
	});
	it("should handle SUCCESS", () => {
		expect(
			root_reducer([], {
				type: SUCCESS,
				data: ["test"]
			})
		).toEqual(
			{
				data: ["test"],
				errorState: false,
				loadingState: false
			}
		);
		expect(
			root_reducer(
				
					{
						data: ["test"],
						errorState: false,
						loadingState: false
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
				errorState: false,
				loadingState: false
			}
		);
	});
});
