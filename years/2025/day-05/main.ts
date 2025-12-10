import * as fs from "fs";

export type Range = {
	start: number
	end: number
}

function main() {
	console.log("Startign Solution for Day 05 of Advent of Code!");
	const { ranges, ids } = getPuzzleInput("years/2025/day-05/puzzle-input.txt");
	const simplifiedRanges = simplyfyRanges(ranges);
	let spoiledCounter = 0;
	for (const id of ids) {
		if (checkInRanges(id, simplifiedRanges)) {
			spoiledCounter++;
		}
	}
	console.log(`Number of spoiled items: ${spoiledCounter}`);
	//console.log(simplifiedRanges);

	// part2
	const numPossibleFreshIngredients = calcPossibleFreshIngredients(simplifiedRanges);
	const numNonSimplified = calcPossibleFreshIngredients(ranges);
	console.log(`number of possible fresh ingredients: ${numPossibleFreshIngredients}`);
	console.log(`number of possible fresh ingredients (non simplified): ${numNonSimplified}`);
}

function getPuzzleInput(filePath: string) {
	const fileContent = fs.readFileSync(filePath, "utf8");
	const ranges: Range[] = getRanges(fileContent);
	const ids: number[] = getIDs(fileContent);
	return { ranges, ids };
}

function getRanges(fileContent: string) {
	console.log("Retrieving range lines");
	const rangeText = fileContent.split("\n\n")[0];
	const rangeLines = rangeText.split("\n");
	const ranges: Range[] = [];
	for (const rangeLine of rangeLines) {
		if (rangeLine === "") {
			continue;
		}
		const [startStr, endStr] = rangeLine.split("-");
		ranges.push({ start: parseInt(startStr), end: parseInt(endStr) });
	}
	//console.log(ranges);
	return ranges;
}

function getIDs(fileContent: string) {
	console.log("Retrieving id lines");
	const idText = fileContent.split("\n\n")[1];
	const idLines = idText.split("\n");
	const ids: number[] = [];
	for (const idLine of idLines) {
		if (idLine === "") {
			continue;
		}
		ids.push(parseInt(idLine));
	}
	//console.log(ids);
	return ids;
}

function checkInRanges(id: number, ranges: Range[]) {
	for (const range of ranges) {
		if (numberInRange(id, range)) {
			return true;
		}
	}
	return false;
}

function numberInRange(n: number, range: Range) {
	if (n >= range.start && n <= range.end) {
		return true;
	}
	return false;
}

export function calcPossibleFreshIngredients(ranges: Range[]) {
	//let freshIngredients: number[] = [];
	let numFreshIngredients = 0;
	for (const range of ranges) {
		numFreshIngredients += range.end - range.start + 1;
	}
	return numFreshIngredients;
}

export function simplyfyRanges(ranges: Range[]) {
	if (ranges.length === 0) {
		return [];
	}

	// sort ragnes based on start
	const sortedRanges = ranges.slice().sort((a, b) => a.start - b.start);
	const simplifiedRanges: Range[] = [];

	let currentMergedRange = sortedRanges[0];

	for (let i = 1; i < sortedRanges.length; i++) {
		const nextRange = sortedRanges[i];

		if (nextRange.start <= currentMergedRange.end + 1) {
			currentMergedRange.end = Math.max(currentMergedRange.end, nextRange.end);
		} else {
			simplifiedRanges.push(currentMergedRange);
			currentMergedRange = nextRange;
		}
	}

	// push last range
	simplifiedRanges.push(currentMergedRange);
	return simplifiedRanges;
}

export function rangesTouch(range1: Range, range2: Range): boolean {
	return Math.max(range1.start, range2.start) <= Math.min(range1.end, range2.end) + 1;
}

export function mergeRanges(range1: Range, range2: Range): Range {
	const mergedStart = Math.min(range1.start, range2.start);
	const mergedEnd = Math.max(range1.end, range2.end);
	return { start: mergedStart, end: mergedEnd };
}

if (import.meta.main) {
	main();
}
