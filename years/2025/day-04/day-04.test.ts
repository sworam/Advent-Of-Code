import { describe, expect, test } from "vitest";
import { removeAccessible, Coord } from "./day-04";

describe.each([
	{
		diagram: ["...@...@@@@", "@@@.@@@"],
		coords: [{ y: 0, x: 3 }, { y: 1, x: 0 }, { y: 1, x: 2 }],
		expected: [".......@@@@", ".@..@@@"],
	},
])("removeAccessible($diagram, $coords)", ({ diagram, coords, expected }) => {
	test(`Expected: ${expected}`, () => {
		const actual = removeAccessible(diagram, coords);
		expect(actual).toEqual(expected);
	});
});
