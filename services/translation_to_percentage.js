import React from 'react';


const translate_to_percentage = (holderWidth, sliderWidth, translation) => {
	var result = (translation / (holderWidth - sliderWidth) ) * 100
	return result;
}
const percentage_to_translation = (holderWidth, sliderWidth, percentage) => {
	var effectiveWidth = holderWidth - sliderWidth;
	var result = effectiveWidth * (percentage / 100);
	return result;
}

export { translate_to_percentage, percentage_to_translation }