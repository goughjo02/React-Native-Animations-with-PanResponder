import React from 'react';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { assign } from 'lodash';

import { LOADING, ERROR, SUCCESS } from "./";


function loadingState(state = false, action) {
  switch (action.type) {
    case LOADING:
      return action.isloading
    default:
      return state
  }
}

function errorState(state = false, action) {
  switch (action.type) {
    case ERROR:
      return action.iserror
    default:
      return state
  }
}

function successState(state = [], action) {
  switch (action.type) {
    case SUCCESS:
      return action.data
    default:
      return state
  }
}

export const root_reducer = combineReducers({
	isloading: loadingState,
	iserror: errorState,
	data: successState
});
