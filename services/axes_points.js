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

export const get_y_points = (minValue, maxValue, noPoints) => {
	let newArray = [];
	var difference = maxValue - minValue;
	for (var i = 0; i <= noPoints - 1; i++) {
		newArray.push(minValue + ((difference / (noPoints - 1) * i)))
	}
	return newArray;
};

export const get_y_axes_points = (minValue, maxValue, tickDist, height) => {
	let noPoints = get_no_points(tickDist, height);
	let y_points = get_y_points(minValue, maxValue, noPoints);
	return y_points;
};
