import * as fs from "fs";

export type Machine = {
	targetLights: boolean[];
	buttonsPanel: Button[]
	joltage: number[];
}

export type Button = boolean[];

function main() {
	console.time("TotalExecutionTime");

	console.log("Starting Solution for Day 10 of Advent of Code!");
	const machines = getMachines("years/2025/day-10/puzzle-input.txt");

	console.time("calcMinButtonPresses");
	const minButtonPresses = calcMinButtonPresses(machines);
	console.log(`minButtonPresses: ${minButtonPresses}`);
	console.timeEnd("calcMinButtonPresses");

	console.timeEnd("TotalExecutionTime");
}

function getMachines(filePath: string): Machine[] {
	const fileContent = fs.readFileSync(filePath, "utf8");
	const lines = fileContent.split("\n").filter(line => line.trim() !== "")
	const machines: Machine[] = lines.map(l => {
		const splitLine = l.split(" ");
		const targetLights: boolean[] = [...splitLine[0].slice(1, -1)]
			.map(c => c === "." ? false : true);
		const joltage: number[] = numbersFromString(splitLine[splitLine.length - 1]);
		const buttonsPanel: Button[] = splitLine.slice(1, -1)
			.map(buttonStr => buttonFromString(buttonStr, targetLights.length));
		return {
			targetLights,
			buttonsPanel,
			joltage
		};
	});
	return machines;
}

function numbersFromString(inputString: string): number[] {
	// remove brackets at first and last index
	const numberString = inputString.slice(1, -1);
	return numberString.split(",").map(n => parseInt(n.trim()));
}

function buttonFromString(inputString: string, lenPanel: number): Button {
	const button: Button = Array(lenPanel).fill(false);
	const numbers = numbersFromString(inputString);
	for (const n of numbers) {
		button[n] = true;
	}
	return button;
}

function calcMinButtonPresses(machines: Machine[]): number {
	let total = 0;
	for (let i = 0; i < machines.length; i++) {
		const machine = machines[i];
		const minPresses = findMinButtonPresses(machine.targetLights, machine.buttonsPanel)
		total += minPresses;
	}
	return total;
}

function findMinButtonPresses(target: boolean[], buttons: Button[]): number {
	const start: boolean[] = Array(target.length).fill(false);
	const buttonIndices: number[] = [...buttons.keys()];
	const combinations = getCombinations(buttonIndices).sort((a, b) => a.length - b.length);

	for (const comb of combinations) {
		const buttonComb: Button[] = comb.map(i => buttons.at(i)!);
		const result = combineButtons(start, buttonComb);
		if (arraysMatch(result, target)) {
			return buttonComb.length;
		}
	}
	throw new Error(`could not find combination for target: ${target}`);
}

export function getCombinations(indices: number[]): number[][] {
	const result: number[][] = [[]];

	for (const i of indices) {
		const newCombinations = result.map(subset => [...subset, i]);
		result.push(...newCombinations);
	}
	return result
}

export function combineButtons(start: boolean[], buttons: Button[]): boolean[] {
	const panelSize = start.length;
	const result = start.slice();
	for (const button of buttons) {
		for (let i = 0; i < panelSize; i++) {
			result[i] = result[i] != button[i];
		}
	}
	return result;
}

function arraysMatch(arr1: boolean[], arr2: boolean[]): boolean {
	return arr1.every((val, index) => val === arr2[index]);
}

if (import.meta.main) {
	main();
}
