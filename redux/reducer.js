import React from "react";
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from 'redux-thunk';

import { LOADING, ERROR, SUCCESS } from "./";


const initialState = [{
	data: [],
    iserror: false,
    isloading: false
}]
export function http_reducer(state = initialState, action) {
	switch (action.type) {
		case LOADING:
		return [...state, {
			isloading: action.isloading
		}]
		case ERROR:
		return Object.assign({}, state, {
			iserror: action.iserror
		})
		case SUCCESS:
		return Object.assign({}, state, {
			data: action.data
		})
		default: return payload
	}
}

const root_reducer = combineReducers({
	http_reducer
});

export default function configureStore(initialState) {
	return createStore(
		rootReducer,
		initialState,
		applyMiddleware(thunk)
		);
}
