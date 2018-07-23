import React from "react";

const percent_selector = (data, startPercent, endPercent) => {
	var start = startPercent < endPercent ? startPercent : endPercent;
	var end = endPercent > startPercent ? endPercent : startPercent;
	var copy_data = JSON.parse(JSON.stringify(data));
	var indexStart = Math.round((copy_data.length * start) / 100);
	var indexEnd = Math.round((copy_data.length * end) / 100);
	var result = copy_data.slice(indexStart, indexEnd);
	console.log(copy_data.length, end, indexEnd, copy_data.length*end, copy_data.length*end/100)
	return result;
};

const combination_selector = (
	data,
	startRange,
	endRange,
	startPercent,
	endPercent
) => {
	var copy_data = JSON.parse(JSON.stringify(data));
	var ranged = percent_selector(copy_data, startRange, endRange);
	var result = percent_selector(ranged, startPercent, endPercent);
	if (result.length > 0) {
		if (typeof result[0].date != "undefined") {
			result.forEach(e => {
				e.date = new Date(e.date);
			});
		}
	}
	return result;
};

export { percent_selector, combination_selector };
