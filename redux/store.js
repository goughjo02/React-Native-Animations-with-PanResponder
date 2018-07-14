import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { root_reducer } from './reducer';

export const configureStore = () => {
    return createStore(
        root_reducer,
        applyMiddleware(thunk)
    );
}