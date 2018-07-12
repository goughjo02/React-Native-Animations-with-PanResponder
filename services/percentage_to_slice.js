import React from 'react';
import PropTypes from 'prop-types';


const start_percentage_to_slice = (datalength, percentage) => {
	var result = (datalength * (percentage / 100) );
	return result;
}
const end_percentage_to_slice = (datalength, percentage) => {
	var result = (datalength * (percentage / 100) ) + 1;
	return result;
}

start_percentage_to_slice.propTypes = {
  datalength: PropTypes.number.isRequired,
  percentage: PropTypes.number.isRequired
};

end_percentage_to_slice.propTypes = {
  datalength: PropTypes.number.isRequired,
  percentage: PropTypes.number.isRequired
};

export { start_percentage_to_slice, end_percentage_to_slice }