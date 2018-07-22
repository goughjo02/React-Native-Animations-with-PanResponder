import React from 'react';


const range_selector = (data, startRange, endRange) => {
	var start = startRange > endRange ? endRange : startRange;
	var range = startRange > endRange ? startRange - endRange : endRange - startRange;
	var copy_data = JSON.parse(JSON.stringify(data));
	var result = copy_data.splice(start, range);
	return result;
}

const zoom_selector = (data, startZoon, endZoom) => {
	var start = startZoon > endZoom ? endZoom : startZoon;
	var range = startZoon > endZoom ? startZoon - endZoom : endZoom - startZoon;
	var copy_data = JSON.parse(JSON.stringify(data));
	var result = copy_data.splice(start, range);
	return result
} 

const combination_selector = (data, startRange, endRange, startZoon, endZoom) => {
	var copy_data = JSON.parse(JSON.stringify(data));
	var ranged = range_selector(copy_data, startRange, endRange);
	var result = zoom_selector(ranged, startZoon, endZoom)
	if (!!result[0].data) {
		result.forEach((e) => {
		e.date = new Date(e.date)
	})
	}
	return result;
} 

export { range_selector, zoom_selector, combination_selector }