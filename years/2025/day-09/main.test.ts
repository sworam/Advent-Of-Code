import { describe, expect, test } from "vitest";
import { insideRectangle, Coord } from "./main";

describe.each([
	{
		recti: [0, 0] as Coord,
		rectj: [10, 10] as Coord,
		c: [5, 5] as Coord,
		expected: true
	},
	{
		recti: [0, 0] as Coord,
		rectj: [10, 10] as Coord,
		c: [10, 5] as Coord,
		expected: false
	},
	{
		recti: [0, 0] as Coord,
		rectj: [10, 10] as Coord,
		c: [-1, 5] as Coord,
		expected: false
	},
	{
		recti: [0, 0] as Coord,
		rectj: [10, 10] as Coord,
		c: [11, 5] as Coord,
		expected: false
	},
	{
		recti: [0, 0] as Coord,
		rectj: [10, 10] as Coord,
		c: [10, 10] as Coord,
		expected: false
	},
])("insideRectangle($recti, $rectj, $c)", ({ recti, rectj, c, expected }) => {
	test(`Expected: ${expected}`, () => {
		const actual = insideRectangle(recti, rectj, c);
		//expect(actual.length).toEqual(expected.length);
		expect(actual).toEqual(expected);
	});
});
