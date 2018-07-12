import React from 'react';
import PropTypes from 'prop-types';    


const range_selector = (data, startRange, endRange) => {
	return data.splice(startRange, endRange);
}

const zoom_selector = (data, startZoon, endZoom) => {
	return data.splice(startZoon, endZoom)
} 

const combination_selector = (data, startRange, endRange, startZoon, endZoom) => {
	var ranged = range_selector(data, startRange, endRange);
	var zoomed = zoom_selector(ranged, startZoon, endZoom)
	return result = zoomed;
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