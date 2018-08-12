import { cloneDeep } from "lodash";

function isPrime(num) {
	if (num <= 1) return false;
	if (num === 2) return true;
	var sqrt = Math.sqrt(num);
	for (var i = 2; i <= sqrt; i++) {
		if (num % i === 0) return false;
	}
	return true;
}

export const get_no_points = (minDist, totalDist) => {
	var divider = Math.floor(totalDist / minDist);
	var noPoints = divider + 1;
	return noPoints;
};

export const get_x_points = (dataArray, noPoints) => {
	let newArray = [];
	var clonedArray = cloneDeep(dataArray);
	if (isPrime(clonedArray.length - 1)) {
		clonedArray.splice(0, 1);
	}
	for (var i = noPoints; i >= 0; i--) {
		if ((clonedArray.length - 1) % (i - 1) == 0) {
			var pointDist = (clonedArray.length - 1) / (i - 1);
			for (var j = 0; j <= i - 1; j++) {
				newArray.push(clonedArray[pointDist * j]);
			}
			break;
		}
	}
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
	if (isPrime(clonedArray.length)) {
		clonedArray.splice(0, 1);
	}
	for (var i = noPoints; i >= 0; i--) {
		if (clonedArray.length % i == 0) {
			var pointDist = clonedArray.length / i;
			for (var j = 0; j <= i - 1; j++) {
				newArray.push(clonedArray[pointDist * j]);
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
