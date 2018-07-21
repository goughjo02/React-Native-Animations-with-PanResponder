export function getSum(array, key) {
	var result = 0;
	array.forEach(e => {
		result = result + e[key];
	});
	return result;
}

export function getMinMax(array, key) {
	var min;
	var max;
	max = array.reduce((prev, curr) => {
		return prev[key] > curr[key] ? prev : curr;
	})[key];
	min = array.reduce((prev, curr) => {
		return prev[key] < curr[key] ? prev : curr;
	})[key];
	return { min, max };
}
