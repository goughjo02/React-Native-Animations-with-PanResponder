import React from 'react';
import { applyMiddleware, } from 'redux';
import thunk from 'redux-thunk';
import { merge } from 'lodash';

import { LOADING, ERROR, SUCCESS } from "./";


const initial_state = {
	data: [],
	isloading: false,
	iserror: false
}

export function data_reducer(state = initial_state, action) {
	console.log("state")
	console.log(state)
	console.log("action")
	console.log(action)
	console.log("action.isloading")
	console.log(action.isloading)
	console.log("result")
	console.log({ ...state, isloading: action.isloading })
  switch (action.type) {
    case LOADING:
      return { ...state, isloading: action.isloading }
    case ERROR:
      return { ...state, iserror: action.iserror }
    case SUCCESS:
      return { ...state, data: action.data }
    default:
      return state
  }
}

