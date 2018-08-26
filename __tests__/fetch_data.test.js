import configureMockStore from "redux-mock-store";
import MockAdapter from "axios-mock-adapter";
import renderer from "react-test-renderer";
import thunk from "redux-thunk";
import axios from "axios";
import { fetchData, convertDateTime } from "../services";
import { DataApi } from "../config";
import {
  dataHasErrored,
  dataIsLoading,
  dataFetchDataSuccess,
  ERROR,
  LOADING,
  SUCCESS
} from "../redux";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockApi = new MockAdapter(axios);
const dummyData = [
  {
    bought: 0,
    date: "2012-05-01 00:00:00+00:00",
    produced: 65,
    sold: 28,
    used: 37
  },
  {
    bought: 6,
    date: "2012-05-01 01:00:00+00:00",
    produced: 4,
    sold: 0,
    used: 10
  },
  {
    bought: 2,
    date: "2012-05-01 02:00:00+00:00",
    produced: 8,
    sold: 0,
    used: 10
  }
];
const expectData = [
  {
    bought: 0,
    date: convertDateTime("2012-05-01 00:00:00+00:00"),
    produced: 65,
    sold: 28,
    used: 37
  },
  {
    bought: 6,
    date: convertDateTime("2012-05-01 01:00:00+00:00"),
    produced: 4,
    sold: 0,
    used: 10
  },
  {
    bought: 2,
    date: convertDateTime("2012-05-01 02:00:00+00:00"),
    produced: 8,
    sold: 0,
    used: 10
  }
];

describe("fecth data", () => {
  it("creates SUCCESS when fetching data is successful", () => {
    expect.assertions(1);
    mockApi.onGet(DataApi.timeSeries()).replyOnce(function(config) {
      return [200, dummyData];
    });
    const expectations = [
      { type: LOADING, isloading: true },
      { type: LOADING, isloading: false },
      {
        type: SUCCESS,
        data: dummyData
      }
    ];
    const store = mockStore({ isloading: [], data: [] });
    return store.dispatch(fetchData()).then(res => {
      expect(store.getActions()).toEqual(expectations);
    });
  });

  it("creates ERROR when fetching data errs", () => {
    expect.assertions(1);
    mockApi.onGet(DataApi.timeSeries()).replyOnce({
      status: 401,
      headers: { "content-type": "application/json" },
      body: ["hello"]
    });
    const expectations = [
      { type: LOADING, isloading: true },
      { type: ERROR, iserror: true }
    ];
    const store = mockStore({ isloading: [], iserror: [] });
    return store.dispatch(fetchData()).then(() => {
      expect(store.getActions()).toEqual(expectations);
    });
  });

  it("convertDateTime() produces Date object", () => {
    const arguement = "2012-05-01 00:00:00+00:00";
    expect(typeof convertDateTime(arguement)).toEqual(typeof new Date());
  });

  it("parses incoming datetime strings into Date objects", () => {
    expect.assertions(1);
    mockApi.onGet(DataApi.timeSeries()).replyOnce(function(config) {
      return [200, dummyData];
    });
    const expectations = [
      { type: LOADING, isloading: true },
      { type: LOADING, isloading: false },
      {
        type: SUCCESS,
        data: dummyData
      }
    ];
    const store = mockStore({ isloading: [], data: [] });
    return store.dispatch(fetchData()).then(() => {
      expect(store.getActions()).toEqual(expectations);
    });
  });
});
