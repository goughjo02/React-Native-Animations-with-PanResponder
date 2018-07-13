import redux from 'redux';
import { dataHasErrored, dataIsLoading, fetchDataSuccess } from '../redux';


export function fetchData(url) {
    return (dispatch) => {
        dispatch(dataIsLoading(true));
        return fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(dataIsLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((items) => dispatch(fetchDataSuccess(items)))
            .catch(() => dispatch(dataHasErrored(true)));
    };
}