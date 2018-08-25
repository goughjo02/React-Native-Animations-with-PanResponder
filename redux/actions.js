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
    SCALES,
    COLOR_CHART,
    COLOR_DATA,
    COLOR_THEME,
    SCREEN,
    DURATION_ANIM
} from "./constants";
import { AuthConstants } from "../config";

export function setDuration(duration) {
    return {
        type: DURATION_ANIM,
        duration: duration
    }
}

export function setScreen(width, height) {
    return {
        type: SCREEN,
        portrait: width < height,
        width: width,
        height: height
    }
}

export function setDataColor(one, two, three, four, five) {
    return {
        type: COLOR_DATA,
        one: one,
        two: two,
        three: three,
        four: four,
        five: five
    };
}

export function setThemeColor(one, two, three, four, five) {
    return {
        type: COLOR_THEME,
        one: one,
        two: two,
        three: three,
        four: four,
        five: five
    };
}

export function setChartColor(margins, background, primaryFrame, secondaryFrame) {
    return {
        type: COLOR_CHART,
        margins: margins,
        background: background,
        primaryFrame: primaryFrame,
        secondaryFrame: secondaryFrame
    };
}

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
