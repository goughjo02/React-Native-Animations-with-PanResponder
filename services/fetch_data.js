import redux from 'redux';
import axios from "axios";
import { dataHasErrored, dataIsLoading, fetchDataSuccess } from '../redux';
import { DataApi } from '../config';

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
    var result = new Date(yyyy, mm, dd, h, m, s);
    return result;
}

export function fetchData(url = DataApi.timeSeries()) {
    return (dispatch) => {
        dispatch(dataIsLoading(true));
        return axios.get(url)
            .then((response) => {
                if (!(response.status === 200)) {
                    console.log("ERROR FETCH DATA")
                    throw Error(response.statusText);
                }
                dispatch(dataIsLoading(false));
                return response.data;
            })
            .then((items) => {
                let date = new Date(1)
                items.forEach((e) => {
                    if (typeof e.date !== typeof date) {
                        e.date = convertDateTime(e.date)
                    }
                })
                return items
            })
            .then((items) => dispatch(fetchDataSuccess(items)))
            .catch(() => dispatch(dataHasErrored(true)));
    };
}