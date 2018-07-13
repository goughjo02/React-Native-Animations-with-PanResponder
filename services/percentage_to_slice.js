import React from 'react';


const start_percentage_to_slice = (datalength, percentage) => {
	var result = (datalength * (percentage / 100) );
	return result;
}
const end_percentage_to_slice = (datalength, percentage) => {
	var result = (datalength * (percentage / 100) ) + 1;
	return result;
}

export { start_percentage_to_slice, end_percentage_to_slice }