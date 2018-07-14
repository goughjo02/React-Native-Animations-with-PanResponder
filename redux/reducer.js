import React from 'react';
import { combineReducers, } from 'redux';

import { LOADING, ERROR, SUCCESS } from "./";


const initial_state = {
	data: [],
	isloading: false,
	iserror: false
}

export function http_data_reducer(state = initial_state, action) {
  switch (action.type) {
    case SUCCESS:
      return {
      	data: action.data,
      	isloading: false,
      	iserror: false
      }
	case LOADING:
		return {
        data: [],
        isloading: action.isloading,
        iserror: false
    }
	case ERROR:
		return {
			data: [],
			isloading: false,
			iserror: action.iserror
		}
    default:
      return state
  }
}

export const root_reducer = combineReducers({
  data: http_data_reducer
})