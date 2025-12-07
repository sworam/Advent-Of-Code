import { describe, expect, test } from "vitest";
import { calcInvalidIDs } from "./day-02";

describe.each([
	{
		start: 11,
		end: 22,
		expected: [11, 22],
	},
	{
		start: 95,
		end: 115,
		expected: [99],
	},
	{
		start: 998,
		end: 1012,
		expected: [1010],
	},
	{
		start: 1188511880,
		end: 1188511890,
		expected: [1188511885],
	},
	{
		start: 222220,
		end: 222224,
		expected: [222222],
	},
	{
		start: 1698522,
		end: 1698528,
		expected: [],
	},
	{
		start: 446443,
		end: 446449,
		expected: [446446],
	},
	{
		start: 38593856,
		end: 38593862,
		expected: [38593859],
	},
])("calcInvalidIDs($start, $end)", ({ start, end, expected }) => {
	test(`Expected: ${expected}`, () => {
		const actual = calcInvalidIDs(start, end);
		expect(actual).toEqual(expected);
	});
});
