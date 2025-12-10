import * as fs from "fs";

function main() {
	const { numbers, cephalopodNumbers, operations } = extractMathProblems("years/2025/day-06/puzzle-input.txt");

	let total = 0;
	let totalCephalo = 0;
	for (let i = 0; i < operations.length; i++) {
		total += doOperation(numbers[i], operations[i]);
		totalCephalo += doOperation(cephalopodNumbers[i], operations[i]);
	}
	console.log(`total: ${total}, cephalopodTotal: ${totalCephalo}`);
}

function extractMathProblems(filePath: string): { numbers: number[][], cephalopodNumbers: number[][], operations: string[] } {
	const fileContent = fs.readFileSync(filePath, "utf8");
	let lines = fileContent.split("\n")
	lines = lines.slice(0, lines.length - 1);
	const splitLines = [];

	for (const line of lines) {
		splitLines.push(removeWhitespace(line.split(" ")));
	}

	const numbers = getNumberColumnsFromLines(splitLines.slice(0, splitLines.length - 1))
	const operations = splitLines[splitLines.length - 1];
	const cephalopodNumbers = getCephalopodNumbers(lines);

	return { numbers, cephalopodNumbers, operations };
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

export function getCephalopodNumbers(lines: string[]) {
	const operatorLine = lines[lines.length - 1];
	const numbersLine = lines.slice(0, lines.length - 1)
	const operatorIndices = getOperatorIndices(operatorLine, ["+", "*"]);
	const numbers: number[][] = []

	for (let i = 0; i < operatorIndices.length - 1; i++) {
		numbers.push(getCephalopodColumn(numbersLine, operatorIndices[i], operatorIndices[i + 1] - 2));
	}
	numbers.push(getCephalopodColumn(numbersLine, operatorIndices[operatorIndices.length - 1]));
	return numbers;
}

function getOperatorIndices(operatorLine: string, operators: string[]) {
	const indices: number[] = [];
	for (let i = 0; i < operatorLine.length; i++) {
		if (operators.includes(operatorLine[i])) {
			indices.push(i);
		}
	}
	return indices;
}

export function getCephalopodColumn(lines: string[], start: number, stop?: number): number[] {
	if (typeof stop === "undefined") {
		stop = lines[0].length - 1;
	}
	const numbers: number[] = []

	for (let i = start; i <= stop; i++) {
		let n = "";
		for (let j = 0; j < lines.length; j++) {
			n += lines[j][i];
		}
		numbers.push(parseInt(n));
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
