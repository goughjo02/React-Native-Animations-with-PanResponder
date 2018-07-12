import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import renderer from 'react-test-renderer';

import { dataHasErrored, dataIsLoading, dataFetchDataSuccess } from '../redux/actions';
import { ERROR, LOADING, SUCCESS } from '../redux/constants';
import { fetchData } from './fetch-data';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  })

  it('creates SUCCESS when fetching data is successful', () => {
    fetchMock.getOnce('http_json', { 
      status: 200,
      body: ['expect'], 
      headers: { 'content-type': 'application/json' } 
    });
    const expectations = [
    { type: LOADING, isloading: true },
    { type: LOADING, isloading: false },
    { type: SUCCESS, data: ['expect'] }
    ]
    const store = mockStore({ isloading: [], data: [] });
    return store.dispatch(fetchData('http_json')).then(() => {
      expect(store.getActions()).toEqual(expectations)
    })
  })

  xit('creates ERROR when fetching data errs', () => {
    fetchMock.getOnce('http_json', { 
      status: 401, 
      body: { data: ['hello'] }, 
      headers: { 'content-type': 'application/json' } 
    });
    const expectations = [
    { type: LOADING, isloading: true },
    { type: ERROR, iserror: true }
    ]
    const store = mockStore({ isloading: [], iserror: [] })
    return store.dispatch(fetchData('http_json')).then(() => {
      expect(store.getActions()).toEqual(expectations);
    })
  })
})