export const getScales = (height, width, data) => {
	var time = getMinMax(data, "date");
	this.minValue = Math.min(
		getMinMax(data, "produced").min,
		getMinMax(data, "used").min,
		getMinMax(data, "sold").min
	);
	this.maxValue = Math.max(
		getMinMax(data, "produced").max,
		getMinMax(data, "used").max,
		getMinMax(data, "sold").max
	);
	this.xScale = getXScale(time.min, time.max, width);
	this.yScale = getYScale(this.minValue, this.maxValue, height);
};
