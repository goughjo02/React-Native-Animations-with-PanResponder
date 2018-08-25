import React from "react";
import { combineReducers } from "redux";

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
import { AuthApi, AuthConstants } from "../config";

const initial_screen_state = {
  portrait: true,
  height: 500,
  width: 270
}

export function screen_dimensions_reducer(state = initial_screen_state, action) {
  switch (action.type) {
    case SCREEN:
      return {
        portrait: action.portrait,
        height: action.height,
        width: action.width
      };
    default:
      return state;
  }
}

const initial_duration_state = {
  duration: 2000
}

export function animation_duration_reducer(state = initial_duration_state, action) {
  switch (action.type) {
    case DURATION_ANIM:
      return {
        duration: action.duration
      };
    default:
      return state;
  }
}

const initial_chart_color_state = {
  margins: "#bbb",
  background: "#666",
  primaryFrame: "#000",
  secondaryFrame: "#444"
};

export function color_chart_reducer(state = initial_chart_color_state, action) {
  switch (action.type) {
    case COLOR_CHART:
      return {
        margins: action.margins,
        background: action.background,
        primaryFrame: action.primaryFrame,
        secondaryFrame: action.secondaryFrame
      };
    default:
      return state;
  }
}
const initial_data_color_state = {
  one: "#f00",
  two: "#0f0",
  three: "#00f",
  four: "#070f1a",
  five: "#61a376"
};
export function color_data_reducer(state = initial_data_color_state, action) {
  switch (action.type) {
    case COLOR_DATA:
      return {
        one: action.one,
        two: action.two,
        three: action.three,
        four: action.four,
        five: action.five
      };
    default:
      return state;
  }
}
const initial_theme_color_state = {
  one: "#f11100",
  two: "#0f2220",
  three: "#00f333",
  four: "#070444",
  five: "#61f376"
};
export function color_theme_reducer(state = initial_theme_color_state, action) {
  switch (action.type) {
    case COLOR_THEME:
      return {
        one: action.one,
        two: action.two,
        three: action.three,
        four: action.four,
        five: action.five
      };
    default:
      return state;
  }
}

export const color_reducer = combineReducers({
  chart: color_chart_reducer,
  data: color_data_reducer,
  theme: color_theme_reducer
});

const initial_scales_state = {
  xScale: 0,
  yScale: 0,
  minTime: 0,
  maxTime: 0,
  minValue: 0,
  maxValue: 0
};

export function scales_reducer(state = initial_scales_state, action) {
  switch (action.type) {
    case SCALES:
      return {
        xScale: action.xScale,
        yScale: action.yScale,
        minTime: action.minTime,
        maxTime: action.maxTime,
        minValue: action.minValue,
        maxValue: action.maxValue
      };
    default:
      return state;
  }
}

const initial_login_state = {
  [AuthConstants.localStateKey()]: "",
  isloading: false,
  iserror: false
};

export function login_reducer(state = initial_login_state, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        [AuthConstants.localStateKey()]: action[AuthConstants.localStateKey()],
        isloading: false,
        iserror: false
      };
    case LOGIN_LOADING:
      return {
        [AuthConstants.localStateKey()]: "",
        isloading: action.isloading,
        iserror: false
      };
    case LOGIN_ERROR:
      return {
        [AuthConstants.localStateKey()]: "",
        isloading: false,
        iserror: action.iserror
      };
    default:
      return state;
  }
}

const initial_http_state = {
  data: [],
  isloading: false,
  iserror: false
};

export function http_data_reducer(state = initial_http_state, action) {
  switch (action.type) {
    case SUCCESS:
      return {
        data: action.data,
        isloading: false,
        iserror: false
      };
    case LOADING:
      return {
        data: [],
        isloading: action.isloading,
        iserror: false
      };
    case ERROR:
      return {
        data: [],
        isloading: false,
        iserror: action.iserror
      };
    default:
      return state;
  }
}

const initial_range_state = {
  start: 0,
  end: 1
};
export function range_reducer(state = initial_range_state, action) {
  switch (action.type) {
    case START_RANGE:
      return {
        start: action.index,
        end: state.end
      };
    case END_RANGE:
      return {
        start: state.start,
        end: action.index
      };
    default:
      return state;
  }
}

const initial_zoom_state = {
  start: 0,
  end: 100
};
export function zoom_reducer(state = initial_zoom_state, action) {
  switch (action.type) {
    case START_ZOOM:
      return {
        start: action.percent,
        end: state.end
      };
    case END_ZOOM:
      return {
        start: state.start,
        end: action.percent
      };
    default:
      return state;
  }
}

export const root_reducer = combineReducers({
  login: login_reducer,
  data: http_data_reducer,
  scale: scales_reducer,
  range: range_reducer,
  zoom: zoom_reducer,
  color: color_reducer
});
