import { cloneDeep } from "lodash";

export const get_no_points = (minDist, totalDist) => {
	var divider = Math.floor(totalDist / minDist);
	var noPoints = divider + 1;
	return noPoints;
};

export const get_x_points = (dataArray, noPoints) => {
	let newArray = [];
	var clonedArray = cloneDeep(dataArray);
	newArray.push(clonedArray[0]);
	for (var i = noPoints; i >= 0; i--) {
		if (dataArray.length % i == 0) {
			var pointDist = dataArray.length / i;
			for (var j = 1; j <= i - 2; j++) {
				newArray.push(dataArray[pointDist * j]);
			}
			break;
		}
	}
	newArray.push(clonedArray[clonedArray.length - 1]);
	return newArray;
};

export const get_x_axes_points = (maxDist, width, dataArray) => {
	let noPoints = get_no_points(maxDist, width);
	let x_points = get_x_points(dataArray, noPoints);
	return x_points;
};

export const get_y_points = (dataArray, noPoints) => {
	let newArray = [];
	var clonedArray = cloneDeep(dataArray);
	newArray.push(clonedArray[0]);
	for (var i = noPoints; i >= 0; i--) {
		if (dataArray.length % i == 0) {
			var pointDist = dataArray.length / i;
			for (var j = 1; j <= i - 2; j++) {
				newArray.push(dataArray[pointDist * j]);
			}
			break;
		}
	}
	newArray.push(clonedArray[clonedArray.length - 1]);
	return newArray;
};

export const get_y_axes_points = (maxDist, height, dataArray) => {
	let noPoints = get_no_points(maxDist, height);
	let y_points = get_y_points(dataArray, noPoints);
	return y_points;
};
