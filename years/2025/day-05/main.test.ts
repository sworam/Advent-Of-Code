import { describe, expect, test } from "vitest";
import { simplyfyRanges, calcPossibleFreshIngredients, rangesTouch, mergeRanges } from "./main";

describe.each([
	{
		ranges: [{ start: 4, end: 10 }, { start: 2, end: 5 }],
		expected: [{ start: 2, end: 10 }],
	},
	{
		ranges: [{ start: 4, end: 10 }, { start: 10, end: 20 }],
		expected: [{ start: 4, end: 20 }],
	},
	{
		ranges: [{ start: 4, end: 10 }, { start: 11, end: 20 }],
		expected: [{ start: 4, end: 20 }],
	},
])("simplyfyRanges($ranges)", ({ ranges, expected }) => {
	test(`Expected: ${expected}`, () => {
		const actual = simplyfyRanges(ranges);
		//expect(actual.length).toEqual(expected.length);
		expect(actual).toEqual(expected);
	});
});

describe.each([
	{
		ranges: [{ start: 4, end: 10 }, { start: 11, end: 20 }],
		expected: 17,
	},
])("calcPossibleFreshIngredients($ranges)", ({ ranges, expected }) => {
	test(`Expected: ${expected}`, () => {
		const actual = calcPossibleFreshIngredients(ranges);
		expect(actual).toEqual(expected);
	});
});

describe.each([
	{
		range1: { start: 4, end: 10 },
		range2: { start: 11, end: 20 },
		expected: true,
	},
	{
		range1: { start: 4, end: 10 },
		range2: { start: 12, end: 20 },
		expected: false,
	},
	{
		range1: { start: 4, end: 10 },
		range2: { start: 2, end: 3 },
		expected: false,
	},
	{
		range1: { start: 4, end: 10 },
		range2: { start: 4, end: 10 },
		expected: true,
	},
	{
		range1: { start: 11, end: 12 },
		range2: { start: 4, end: 10 },
		expected: true,
	},
])("rangesTouch($range1, $range2)", ({ range1, range2, expected }) => {
	test(`Expected: ${expected}`, () => {
		const actual = rangesTouch(range1, range2);
		expect(actual).toEqual(expected);
	});
});

describe.each([
	{
		range1: { start: 4, end: 10 },
		range2: { start: 11, end: 20 },
		expected: { start: 4, end: 20 },
	},
])("mergeRanges($range1, $range2)", ({ range1, range2, expected }) => {
	test(`Expected: ${expected}`, () => {
		const actual = mergeRanges(range1, range2);
		expect(actual).toEqual(expected);
	});
});
