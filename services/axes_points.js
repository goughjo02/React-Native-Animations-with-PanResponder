export const get_no_x_points = (maxDist, width) => {
	var noPoints = Math.floor(width / maxDist) + Math.ceil((width % maxDist) /maxDist);
	return noPoints;
};

export const get_x_points = (dataArray, noPoints) => {
	let newArray = [];
	var clonedArray = JSON.parse(JSON.stringify(dataArray));
	var avgDist = Math.floor(clonedArray.length / noPoints);
	let modulo = clonedArray.length % noPoints;
	let offset = Math.floor(modulo / 2);
	if (offset > 0 ) {
		var slicedArray = clonedArray.slice(offset)
	} else {
		var slicedArray = clonedArray;
	}
	for (var i = slicedArray.length; i >= 1; i--) {
		if (i % avgDist == 0) {
			newArray.push(slicedArray[i - 1]);
		}
	}
	var reversed = newArray.reverse()
	return reversed;
};

export const get_x_axes_points = (maxDist, width, dataArray) => {
	let noPoints = get_no_x_points(maxDist, width);
	let x_points = get_x_points(dataArray, noPoints);
	return x_points;
}

export const get_no_y_points = (maxDist, height) => {
	var noPoints = Math.floor(height / maxDist) + Math.ceil((height % maxDist) /maxDist);
	return noPoints;
}

export const get_y_points = ( dataArray, noPoints ) => {
	let newArray = [];
	var clonedArray = JSON.parse(JSON.stringify(dataArray));
	var avgDist = Math.floor(clonedArray.length / noPoints);
	let modulo = clonedArray.length % noPoints;
	let offset = Math.ceil(modulo / 2);
	if (offset > 0 ) {
		var slicedArray = clonedArray.slice(0, -offset)
	} else {
		var slicedArray = clonedArray;
	}
	for (var i = slicedArray.length; i >= 1; i--) {
		if (i % avgDist == 0) {
			newArray.push(slicedArray[i - 1]);
		}
	}
	var reversed = newArray.reverse()
	return reversed;
}

export const get_y_axes_points = (maxDist, height, dataArray) => {
	let noPoints = get_no_y_points(maxDist, height);
	let y_points = get_y_points(dataArray, noPoints);
	return y_points;
}