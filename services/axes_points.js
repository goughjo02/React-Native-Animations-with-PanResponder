export const get_no_x_points = (maxDist, width) => {
	var noPoints = Math.floor(width / maxDist) + 1;
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
	for (var i = 0; i <= slicedArray.length - 1; i++) {
		if (i % avgDist == 0) {
			newArray.push(slicedArray[i]);
		}
	}
	return newArray;
};
