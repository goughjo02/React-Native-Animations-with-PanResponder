import React from 'react';
import PropTypes from 'prop-types';


const translate_to_percentage = (holderWidth, sliderWidth, translation) => {
	var result = (translation / (holderWidth - sliderWidth) ) * 100
	return result;
}
const percentage_to_translation = (holderWidth, sliderWidth, percentage) => {
	var effectiveWidth = holderWidth - sliderWidth;
	var result = effectiveWidth * (percentage / 100);
	return result;
}

translate_to_percentage.propTypes = {
  holderWidth: PropTypes.number.isRequired,
  sliderWidth: PropTypes.number.isRequired,
  translation: PropTypes.number.isRequired
};

percentage_to_translation.propTypes = {
  holderWidth: PropTypes.number.isRequired,
  sliderWidth: PropTypes.number.isRequired,
  percentage: PropTypes.number.isRequired
};

export { translate_to_percentage, percentage_to_translation }