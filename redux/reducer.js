import React from 'react';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { merge } from 'lodash';

import { LOADING, ERROR, SUCCESS } from "./";


const initial_state = {
	isloading: false,
	iserror: false,
	data: []
}

function loadingState(state = initial_state, action) {
  switch (action.type) {
    case LOADING:
      return action.isloading
    case ERROR:
      return action.iserror
    case SUCCESS:
      return action.data
    default:
      return state
  }
}

export const root_reducer = combineReducers({
	loadingState
});

export default function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk)
    );
}
