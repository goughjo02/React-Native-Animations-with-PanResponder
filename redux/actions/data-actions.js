import { ERROR, LOADING, SUCCESS } from '../constants';

export function dataHasErrored(bool) {
    return {
        type: ERROR,
        hasErrored: bool
    };
}
export function dataIsLoading(bool) {
    return {
        type: LOADING,
        isLoading: bool
    };
}
export function dataFetchDataSuccess(items) {
    return {
        type: SUCCESS,
        data
    };
}