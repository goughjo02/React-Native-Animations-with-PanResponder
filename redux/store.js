import React from "react";
import { compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web and AsyncStorage for react-native
import { root_reducer } from "./reducer";

export const configureStore = () => {
	let persistConfig = {
		key: "root",
		storage,
		stateReconciler: autoMergeLevel2
	};
	let persistedReducer = persistReducer(persistConfig, root_reducer);
	let store = createStore(persistedReducer, applyMiddleware(thunk));
	let persistor = persistStore(store);
	return { store, persistor };
};
export const configureBasicStore = () => {
    return createStore(
        root_reducer,
        applyMiddleware(thunk)
    );
} 