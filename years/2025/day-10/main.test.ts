import { describe, expect, test } from "vitest";
import { combineButtons, getCombinations } from "./main";

describe.each([
	{
		indices: [0, 1, 2],
		expected: [[], [0], [1], [0, 1], [2], [0, 2], [1, 2], [0, 1, 2]]
	},
	{
		indices: [0, 1],
		expected: [[], [0], [1], [0, 1]]
	},
	{
		indices: [1, 2, 3, 4],
		expected: [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3], [4], [1, 4],
		[2, 4], [1, 2, 4], [3, 4], [1, 3, 4], [2, 3, 4], [1, 2, 3, 4]]
	}
])("getCombinations($indices, $n)", ({ indices, expected }) => {
	test(`Expected: ${expected}`, () => {
		const actual = getCombinations(indices);
		expect(actual).toEqual(expected);
	});
});

describe.each([
	{
		start: [false, false, false],
		buttons: [
			[false, false, true],
			[true, false, false],
		],
		expected: [true, false, true],
	},
	{
		start: [false, false, false],
		buttons: [
			[false, false, true],
			[true, false, true],
			[false, false, true],
		],
		expected: [true, false, true],
	},
])("combineButtons($start, $buttons)", ({ start, buttons, expected }) => {
	test(`Expected: ${expected}`, () => {
		const actual = combineButtons(start, buttons);
		expect(actual).toEqual(expected);
	});
});
