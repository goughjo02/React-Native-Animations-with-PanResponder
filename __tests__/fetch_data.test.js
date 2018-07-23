import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import renderer from "react-test-renderer";

import { fetchData, convertDateTime } from "../services/fetch_data";
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

describe("async actions", () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it("creates SUCCESS when fetching data is successful", () => {
    fetchMock.getOnce("http_json", {
      status: 200,
      headers: { "content-type": "application/json" },
      body: [
        {
          bought: 2,
          date: "2012-05-01 02:00:00+00:00",
          produced: 8,
          sold: 0,
          used: 10
        }
      ]
    });
    const expectations = [
      { type: LOADING, isloading: true },
      { type: LOADING, isloading: false },
      {
        type: SUCCESS,
        data: [
          {
            bought: 2,
            date: convertDateTime("2012-05-01 02:00:00+00:00"),
            produced: 8,
            sold: 0,
            used: 10
          }
        ]
      }
    ];
    const store = mockStore({ isloading: [], data: [] });
    return store.dispatch(fetchData("http_json")).then(() => {
      expect(store.getActions()).toEqual(expectations);
    });
  });

  it("creates ERROR when fetching data errs", () => {
    fetchMock.getOnce("http_json", {
      status: 401,
      headers: { "content-type": "application/json" },
      body: ["hello"]
    });
    const expectations = [
      { type: LOADING, isloading: true },
      { type: ERROR, iserror: true }
    ];
    const store = mockStore({ isloading: [], iserror: [] });
    return store.dispatch(fetchData("http_json")).then(() => {
      expect(store.getActions()).toEqual(expectations);
    });
  });

  it("convertDateTime() produces Date object", () => {
    const arguement = "2012-05-01 00:00:00+00:00";
    expect(typeof convertDateTime(arguement)).toEqual(typeof new Date());
  });

  it("parses incoming datetime strings into Date objects", () => {
    fetchMock.getOnce("http_json", {
      status: 200,
      headers: { "content-type": "application/json" },
      body: [
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
      ]
    });
    const expectations = [
      { type: LOADING, isloading: true },
      { type: LOADING, isloading: false },
      {
        type: SUCCESS,
        data: [
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
        ]
      }
    ];
    const store = mockStore({ isloading: [], data: [] });
    return store.dispatch(fetchData("http_json")).then(() => {
      expect(store.getActions()).toEqual(expectations);
    });
  });
});
