import React from 'react';
import PropTypes from 'prop-types';


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
	return result;
} 

range_selector.propTypes = {
  data: PropTypes.array.isRequired,
  startRange: PropTypes.number.isRequired,
  endRange: PropTypes.number.isRequired
};

range_selector.propTypes = {
  data: PropTypes.array.isRequired,
  startZoon: PropTypes.number.isRequired,
  endZoom: PropTypes.number.isRequired
};

combination_selector.propTypes = {
  data: PropTypes.array.isRequired,
  startRange: PropTypes.number.isRequired,
  endRange: PropTypes.number.isRequired,
  startZoon: PropTypes.number.isRequired,
  endZoom: PropTypes.number.isRequired
}

export { range_selector, zoom_selector, combination_selector }