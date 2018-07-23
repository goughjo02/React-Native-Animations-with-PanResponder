import React from 'react';
import { combineReducers, } from 'redux';

import { ERROR, LOADING, SUCCESS, START_RANGE, END_RANGE, START_ZOOM, END_ZOOM } from './constants';


const initial_http_state = {
	data: [],
	isloading: false,
	iserror: false
}

export function http_data_reducer(state = initial_http_state, action) {
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

const initial_range_state = {
  start: 0,
  end: 1
}
export function range_reducer(state=initial_range_state, action) {
  switch(action.type) {
    case (START_RANGE):
        return {
          start: action.index,
          end: state.end
        }
      case(END_RANGE): 
        return {
          start: state.start,
          end: action.index
        }
      default: return state
  }
}

const initial_zoom_state = {
  start: 0,
  end: 100
}
export function zoom_reducer(state=initial_zoom_state, action) {
  switch(action.type) {
    case(START_ZOOM):
    return {
      start: action.percent,
      end: state.end
    }
    case(END_ZOOM):
    return {
      start: state.start,
      end: action.percent
    }
    default: return state
  }
}

export const root_reducer = combineReducers({
  data: http_data_reducer,
  range: range_reducer,
  zoom: zoom_reducer
})