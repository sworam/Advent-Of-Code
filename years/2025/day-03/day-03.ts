import * as fs from "fs";

function main() {
	console.log("Starting Solution for Day 03 of Advent of Code!");
	const batteries = getLines("years/2025/day-03/puzzle-input.txt");
	let totalJoltageV1 = 0;
	let totalJoltageV2 = 0;

	for (const battery of batteries) {
		console.log("---");
		const joltageV1 = calcJoltage(battery, 2);
		totalJoltageV1 += joltageV1;
		const joltageV2 = calcJoltage(battery, 12);
		totalJoltageV2 += joltageV2;
		console.log(`Battery: ${battery}, joltageV1: ${joltageV1}, joltageV2: ${joltageV2}`);
	}

	console.log(`The total output Joltage is: ${totalJoltageV1}, V2: ${totalJoltageV2}`);
}

function getLines(filePath: string) {
	const fileContent = fs.readFileSync(filePath, "utf8");
	const lines = fileContent.split("\n");
	return lines.slice(0, -1);
}

export function memoize(fn: Function) {
	const cache: { [key: string]: any } = {};
	return function(...args: any[]) {
		const key = JSON.stringify(args);
		if (cache[key]) {
			return cache[key];
		}
		const result = fn(...args);
		cache[key] = result;
		return result;
	}
}

export function calcJoltage(battery: string, numDigits: number) {
	const indexList = calcIndexList(battery, numDigits, 0, battery.length - 1);
	return calculateJoltageFromIndexList(battery, indexList)
}

function calcIndexList(battery: string, remainingDigits: number, start: number, end: number): number[] {
	let indexList: number[] = [];
	if (remainingDigits == 0 || end < start) {
		return indexList;
	}

	const largestIndex = findLargestDigitIndex(battery, start, end);
	indexList.push(largestIndex);
	remainingDigits--;
	const rightIndices = calcIndexList(battery, remainingDigits, largestIndex + 1, end);
	indexList = indexList.concat(rightIndices);
	remainingDigits -= rightIndices.length;
	const leftIndices = calcIndexList(battery, remainingDigits, start, largestIndex - 1);
	indexList = indexList.concat(leftIndices);
	return indexList;
}

function findLargestDigitIndex(battery: string, start: number, end: number) {
	let largestDigit = -1;
	let largestDigitIndex = -1;
	for (let i = start; i <= end; i++) {
		const digit = parseInt(battery[i]);
		if (digit > largestDigit) {
			largestDigit = digit;
			largestDigitIndex = i;
		}
	}
	return largestDigitIndex;
}

function calculateJoltageFromIndexList(battery: string, indexList: number[]) {
	let joltageString = "";
	for (let i = 0; i < battery.length; i++) {
		if (!indexList.includes(i)) {
			continue;
		}
		joltageString += battery[i];
	}
	return parseInt(joltageString);
}

main();
