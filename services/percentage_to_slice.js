import React from "react";

const start_percentage_to_slice = (datalength, percentage) => {
	var result = datalength * (percentage / 100);
	return result;
};
const end_percentage_to_slice = (datalength, percentage) => {
	var result = datalength * (percentage / 100) + 1;
	return result;
};
const start_slice_to_percentage = (datalength, slice) => {
	var result = Math.round(Math.min( 99, Math.max(0, ((slice/datalength) * 100))));
	return result;
};
const end_slice_to_percentage = (datalength, slice) => {
	var result = Math.round(Math.min(100, (slice/datalength) * 100));
	return result;
};

export {
	start_percentage_to_slice,
	end_percentage_to_slice,
	start_slice_to_percentage,
	end_slice_to_percentage
};
