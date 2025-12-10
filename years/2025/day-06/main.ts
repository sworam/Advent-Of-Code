import * as fs from "fs";

function main() {
	const { numbers, operations } = extractMathProblems("years/2025/day-06/puzzle-input.txt");

	let total = 0;
	for (let i = 0; i < operations.length; i++) {
		total += doOperation(numbers[i], operations[i]);
	}
	console.log(`total: ${total}`);
}

function extractMathProblems(filePath: string): { numbers: number[][], operations: string[] } {
	const fileContent = fs.readFileSync(filePath, "utf8");
	let lines = fileContent.split("\n")
	lines = lines.slice(0, lines.length - 1);
	const splitLines = [];

	for (const line of lines) {
		splitLines.push(removeWhitespace(line.split(" ")));
	}

	const numbers = getNumberColumnsFromLines(splitLines.slice(0, splitLines.length - 1))
	const operations = splitLines[splitLines.length - 1];

	return { numbers, operations };
}

function removeWhitespace(strings: string[]): string[] {
	const clearedStrings: string[] = [];
	for (const s of strings) {
		if (s === "") {
			continue;
		}
		clearedStrings.push(s);
	}
	return clearedStrings;
}

function getNumberColumnsFromLines(splitLines: string[][]) {
	const numbers: number[][] = [];
	for (let i = 0; i < splitLines[0].length; i++) {
		numbers.push([]);
	}
	console.log(splitLines.length);
	console.log(numbers.length);

	for (const line of splitLines) {
		const lineNumbers = convertStringArrayToNumberArray(line);
		for (let i = 0; i < lineNumbers.length; i++) {
			numbers[i].push(lineNumbers[i]);
		}
	}
	return numbers;
}

function convertStringArrayToNumberArray(line: string[]) {
	const numberArray: number[] = [];
	for (const s of line) {
		numberArray.push(parseInt(s));
	}
	return numberArray;
}

function doOperation(numbers: number[], operation: string): number {
	if (operation === "+") {
		return sum(numbers);
	} else if (operation === "*") {
		return multiply(numbers);
	} else {
		throw Error(`operation ${operation} is undefined`);
	}
}

function sum(numbers: number[]): number {
	let total = 0;
	for (const n of numbers) {
		total += n;
	}
	return total;
}

function multiply(numbers: number[]): number {
	let total = 1;
	for (const n of numbers) {
		total *= n;
	}
	return total;
}

main();
