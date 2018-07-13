import { ERROR, LOADING, SUCCESS } from './constants';

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