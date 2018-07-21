import React from 'react';
import * as scale from "d3-scale";
const d3 = { scale };

export function getSum(array, key) {
	var result = 0;
	array.forEach(e => {
		result = result + e[key];
	});
	return result;
}

export function getMinMax(array, key) {
	var min;
	var max;
	max = array.reduce((prev, curr) => {
		return prev[key] > curr[key] ? prev : curr;
	})[key];
	min = array.reduce((prev, curr) => {
		return prev[key] < curr[key] ? prev : curr;
	})[key];
	return { min, max };
}

export function getXScale(minDomain, maxDomain, maxWidth, minWidth = 0) {
	var xScale = d3.scale
		.scaleTime()
		.domain([minDomain, maxDomain])
		.range([0, maxWidth]);
	return xScale;
}

export function getYScale(minDomain, maxDomain, maxHeight, minHeight = 0) {
	var yScale = d3.scale
		.scaleLinear()
		.domain([minDomain, maxDomain])
		.range([maxHeight, 0]);
	return yScale;
}
