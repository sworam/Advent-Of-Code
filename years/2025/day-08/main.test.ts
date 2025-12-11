import { describe, expect, test } from "vitest";
import { euclidDistance } from "./main";

describe.each([
	{
		coord1: { x: 1, y: 1, z: 1, idx: 0 },
		coord2: { x: 1, y: 1, z: 1, idx: 0 },
		expected: 0,
	},
	{
		coord1: { x: 1, y: 1, z: 1, idx: 0 },
		coord2: { x: 10, y: 1, z: 1, idx: 0 },
		expected: 9,
	},
	{
		coord1: { x: 1, y: 1, z: 1, idx: 0 },
		coord2: { x: 1, y: 10, z: 1, idx: 0 },
		expected: 9,
	},
	{
		coord1: { x: 1, y: 1, z: 1, idx: 0 },
		coord2: { x: 1, y: 1, z: 10, idx: 0 },
		expected: 9,
	},
	{
		coord1: { x: 8, y: -2, z: 1, idx: 0 },
		coord2: { x: 11, y: 2, z: 1, idx: 0 },
		expected: 5,
	},
	{
		coord1: { x: 0, y: -3, z: 100, idx: 0 },
		coord2: { x: -1, y: 5, z: 104, idx: 0 },
		expected: 9,
	},
])("euclidDistance($coord1, $coord2)", ({ coord1, coord2, expected }) => {
	test(`Expected: ${expected}`, () => {
		const actual = euclidDistance(coord1, coord2);
		//expect(actual.length).toEqual(expected.length);
		expect(actual).toEqual(expected);
	});
});
