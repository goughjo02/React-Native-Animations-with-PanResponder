export function getSum(array, key) {
	var result = 0;
	array.forEach((e) => {
		result = result + e[key];
	})
	return result;
}

export function getMinMax(array, key) {
	
}