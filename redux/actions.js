import {
    LOGIN_ERROR,
    LOGIN_SUCCESS,
    LOGIN_LOADING,
    ERROR,
    LOADING,
    SUCCESS,
    START_RANGE,
    END_RANGE,
    START_ZOOM,
    END_ZOOM,
    SCALES
} from "./constants";
import { AuthConstants } from "../config";

export function setScales(xScale, yScale, minTime, maxTime, minValue, maxValue) {
    return {
        type: SCALES,
        xScale: xScale,
        yScale: yScale,
        minTime: minTime,
        maxTime: maxTime,
        minValue: minValue,
        maxValue: maxValue
    };
}

export function loginLoading(bool) {
    return {
        type: LOGIN_LOADING,
        isloading: bool
    };
}
export function loginError(bool) {
    return {
        type: LOGIN_ERROR,
        iserror: bool
    };
}
export function loginSuccess(data) {
    return {
        type: LOGIN_SUCCESS,
        [AuthConstants.localStateKey()]: data
    };
}

export function dataIsLoading(bool) {
    return {
        type: LOADING,
        isloading: bool
    };
}
export function dataHasErrored(bool) {
    return {
        type: ERROR,
        iserror: bool
    };
}
export function fetchDataSuccess(data) {
    return {
        type: SUCCESS,
        data: data
    };
}

export function setStartRange(index) {
    return {
        type: START_RANGE,
        index: index
    };
}

export function setEndRange(index) {
    return {
        type: END_RANGE,
        index: index
    };
}

export function setStartZoom(percent) {
    return {
        type: START_ZOOM,
        percent: percent
    };
}

export function setEndZoom(percent) {
    return {
        type: END_ZOOM,
        percent: percent
    };
}
