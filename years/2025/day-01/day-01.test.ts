import { describe, expect, test } from "vitest";
import { calcZeroPasses } from "./day-01";

describe.each([
	{
		startRotation: 50,
		direction: "L",
		rotationAmount: 68,
		expected: 1,
	},
	{
		startRotation: 50,
		direction: "R",
		rotationAmount: 1000,
		expected: 10,
	},
	{
		startRotation: 50,
		direction: "R",
		rotationAmount: 50,
		expected: 1,
	},
	{
		startRotation: 50,
		direction: "L",
		rotationAmount: 50,
		expected: 1,
	},
	{
		startRotation: 50,
		direction: "R",
		rotationAmount: 151,
		expected: 2,
	},
	{
		startRotation: 0,
		direction: "R",
		rotationAmount: 99,
		expected: 0,
	},
	{
		startRotation: 0,
		direction: "L",
		rotationAmount: 99,
		expected: 0,
	},
	{
		startRotation: 0,
		direction: "R",
		rotationAmount: 99,
		expected: 0,
	},
])("calcZeroPasses($startRotation, $direction, $rotationAmount)", ({ startRotation, direction, rotationAmount, expected }) => {
	test(`Expected: ${expected}`, () => {
		const actual = calcZeroPasses(startRotation, direction, rotationAmount);
		expect(actual).toEqual(expected);
	});
});
