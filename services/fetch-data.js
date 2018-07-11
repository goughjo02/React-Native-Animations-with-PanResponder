import { dataHasErrored, dataIsLoading, fetchDataSuccess } from '../redux/actions';

export function fetchData(url) {
    return (dispatch) => {
        dispatch(dataIsLoading(true));
        fetch(url)
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