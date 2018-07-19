import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import renderer from "react-test-renderer";

import { fetchData } from "../services/fetch_data";
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
      body: ["expect me"]
    });
    const expectations = [
      { type: LOADING, isloading: true },
      { type: LOADING, isloading: false },
      { type: SUCCESS, data: ["expect me"] }
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
});
