import { describe, expect, test } from "vitest";
import { getCephalopodNumbers, getCephalopodColumn } from "./main";

describe.each([
	{
		lines: [
			"123 328  51 64 ",
			" 45 64  387 23 ",
			"  6 98  215 314",
			"*   +   *   +  "],
		expected: [[1, 24, 356], [369, 248, 8], [32, 581, 175], [623, 431, 4]],
	},
])("getCephalopodNumbers($lines)", ({ lines, expected }) => {
	test(`Expected: ${expected}`, () => {
		const actual = getCephalopodNumbers(lines);
		//expect(actual.length).toEqual(expected.length);
		expect(actual).toEqual(expected);
	});
});

describe.each([
	{
		lines: [
			"123 328  51 64 ",
			" 45 64  387 23 ",
			"  6 98  215 314",
			"*   +   *   +  "],
		start: 12,
		end: undefined,
		expected: [623, 431, 4],
	},
])("getCephalopodColumn($lines, $start, $end)", ({ lines, start, end, expected }) => {
	test(`Expected: ${expected}`, () => {
		const actual = getCephalopodColumn(lines, start, end);
		//expect(actual.length).toEqual(expected.length);
		expect(actual).toEqual(expected);
	});
});
