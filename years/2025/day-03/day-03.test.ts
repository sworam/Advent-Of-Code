import { describe, expect, test } from "vitest";
import { calcJoltage } from "./day-03";

describe.each([
	{
		battery: "987654321111111",
		numDigits: 2,
		expected: 98,
	},
	{
		battery: "811111111111119",
		numDigits: 2,
		expected: 89,
	},
	{
		battery: "234234234234278",
		numDigits: 2,
		expected: 78,
	},
	{
		battery: "818181911112111",
		numDigits: 2,
		expected: 92,
	},
	{
		battery: "987654321111111",
		numDigits: 12,
		expected: 987654321111,
	},
	{
		battery: "811111111111119",
		numDigits: 12,
		expected: 811111111119,
	},
	{
		battery: "234234234234278",
		numDigits: 12,
		expected: 434234234278,
	},
	{
		battery: "818181911112111",
		numDigits: 12,
		expected: 888911112111,
	},
])("calcJoltage($battery, $numDigits)", ({ battery, numDigits, expected }) => {
	test(`Expected: ${expected}`, () => {
		const actual = calcJoltage(battery, numDigits);
		expect(actual).toEqual(expected);
	});
});
