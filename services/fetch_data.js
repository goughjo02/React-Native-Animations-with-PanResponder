import redux from 'redux';
import { dataHasErrored, dataIsLoading, fetchDataSuccess } from '../redux';

export function convertDateTime(dateString) {
    var datetime = dateString.split(" ");
    var date = datetime[0].split("-");
    var yyyy = date[0];
    var mm = date[1] - 1;
    var dd = date[2];
    var time = datetime[1].split(":");
    var h = time[0];
    var m = time[1];
    var s = parseInt(time[2]);
    return new Date(yyyy, mm, dd, h, m, s);
}

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