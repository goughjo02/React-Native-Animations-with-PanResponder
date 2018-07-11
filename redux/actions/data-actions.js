import { ERROR, LOADING, SUCCESS } from '../constants';

export function dataHasErrored(bool) {
    return {
        type: ERROR,
        error: bool
    };
}
export function dataIsLoading(bool) {
    return {
        type: LOADING,
        isloading: bool
    };
}
export function dataFetchDataSuccess(data) {
    return {
        type: SUCCESS,
        data
    };
}