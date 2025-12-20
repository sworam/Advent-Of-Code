import { describe, expect, test } from "vitest";
import { Coord, isPointInPolygon } from "./main";

describe.each([
	{
		point: [2, 2] as Coord,
		polygon: [[0, 0], [4, 0], [4, 4], [0, 4]] as Coord[],
		expected: true
	},
	{
		point: [0, 0] as Coord,
		polygon: [[0, 0], [4, 0], [4, 4], [0, 4]] as Coord[],
		expected: true
	},
	{
		point: [-1, 0] as Coord,
		polygon: [[0, 0], [4, 0], [4, 4], [0, 4]] as Coord[],
		expected: false
	},
	{
		point: [6, 3.1] as Coord,
		polygon: [[0, 0], [4, 0], [4, 2], [6, 2], [6, 3], [4, 3], [4, 4], [0, 4]] as Coord[],
		expected: false
	},
	{
		point: [5.5, 2.5] as Coord,
		polygon: [[0, 0], [4, 0], [4, 2], [6, 2], [6, 3], [4, 3], [4, 4], [0, 4]] as Coord[],
		expected: true
	},
])("isPointInPolygon($point, $polygon)", ({ point, polygon, expected }) => {
	test(`Expected: ${expected}`, () => {
		const actual = isPointInPolygon(point, polygon);
		//expect(actual.length).toEqual(expected.length);
		expect(actual).toEqual(expected);
	});
});
