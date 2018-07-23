import React from 'react';
import renderer from 'react-test-renderer';

import { translate_to_percentage, percentage_to_translation } from '../services/translation_to_percentage';

describe('convert between translation and percentage', () => {
	let holderWidth, sliderWidth, translation, percentage, expectation;
	it('can convert translation to percentage 1', () => {
		holderWidth = 100;
		sliderWidth = 25;
		translation = 50;
		expectation = translation / (holderWidth - sliderWidth) * 100;
		var result = translate_to_percentage(
			holderWidth,
			sliderWidth,
			translation
			);
		expect(result).toEqual(expectation);
	});
	it('can convert translation to percentage 2', () => {
		holderWidth = 150;
		sliderWidth = 30;
		translation = 100;
		expectation = (translation/(holderWidth - sliderWidth)) * 100;
		var result = translate_to_percentage(
			holderWidth,
			sliderWidth,
			translation
			);
		expect(result).toEqual(expectation);
	});
	it('can convert translation to percentage 3', () => {
		holderWidth = 6000;
		sliderWidth = 190;
		translation = 2000;
		expectation = (translation/(holderWidth - sliderWidth)) * 100;
		var result = translate_to_percentage(
			holderWidth,
			sliderWidth,
			translation
			);
		expect(result).toEqual(expectation);
	});
	it('can convert percentage to translation 1', () => {
		holderWidth = 200;
		sliderWidth = 50;
		percentage = 25;
		expectation = (holderWidth - sliderWidth) * (percentage / 100);
		var result = percentage_to_translation(
			holderWidth,
			sliderWidth,
			percentage
			);
		expect(result).toEqual(expectation);
	})
	it('can convert percentage to translation 2', () => {
		holderWidth = 760;
		sliderWidth = 40;
		percentage = 35;
		expectation = (holderWidth - sliderWidth) * (percentage / 100);
		var result = percentage_to_translation(
			holderWidth,
			sliderWidth,
			percentage
			);
		expect(result).toEqual(expectation);
	})
	it('can convert percentage to translation 3', () => {
		holderWidth = 10;
		sliderWidth = 2;
		percentage = 5;
		expectation = (holderWidth - sliderWidth) * (percentage / 100);
		var result = percentage_to_translation(
			holderWidth,
			sliderWidth,
			percentage
			);
		expect(result).toEqual(expectation);
	})
})