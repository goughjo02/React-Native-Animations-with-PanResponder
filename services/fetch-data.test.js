import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import renderer from 'react-test-renderer';

import { dataHasErrored, dataIsLoading, dataFetchDataSuccess } from './actions';
import { ERROR, LOADING, SUCCESS } from './constants';
import { fetchData } from './fetch-data';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
​
describe('async actions', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })
​
  it('creates LOADING when fetching todos has been done', () => {
    fetchMock
      .getOnce('/http_json', { body: { data: ['hello'] }, headers: { 'content-type': 'application/json' } })
​
​
    const expectations = [
      { type: LOADING },
      { type: SUCCESS, body: { data: ['hello'] } }
    ]
    const store = mockStore({ data: [] })
​
    return store.dispatch(fetchData()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectations)
    })

  it('creates ERROR when data mismatch', () => {
    fetchMock
      .getOnce('/http_json', { body: { data: ['not here'] }, headers: { 'content-type': 'application/json' } })
​
​
    const expectations = [
      { type: LOADING },
      { type: ERROR, iserror: true }
    ]
    const store = mockStore({ data: [] })
​
    return store.dispatch(fetchData()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })