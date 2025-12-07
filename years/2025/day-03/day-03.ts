import * as fs from "fs";

function main() {
	console.log("Starting Solution for Day 03 of Advent of Code!");
	const batteries = getLines("years/2025/day-03/puzzle-input.txt");
	let totalJoltage = 0;

	for (const battery of batteries) {
		const maxJoltage = calcMaxJoltage(battery);
		totalJoltage += maxJoltage;
		console.log(`Battery: ${battery}, maxJoltage: ${maxJoltage}`);
	}

	console.log(`The total output Joltage is: ${totalJoltage}`);
}

function getLines(filePath: string) {
	const fileContent = fs.readFileSync(filePath, "utf8");
	const lines = fileContent.split("\n");
	return lines;
}

function calcMaxJoltage(battery: string): number {
	const { maxDigit, maxDigitIdx } = calcMaxDigit(battery);
	let secondDigit = 0;
	for (let i = maxDigitIdx + 1; i < battery.length; i++) {
		let digit = parseInt(battery[i]);
		if (digit > secondDigit) {
			secondDigit = digit;
		}
	}
	const joltageString = maxDigit.toString() + secondDigit.toString();
	return parseInt(joltageString);
}

function calcMaxDigit(battery: string) {
	let maxDigit = 0;
	let maxDigitIdx = 0;
	for (let i = 0; i < battery.length - 1; i++) {
		let digit = parseInt(battery[i]);
		if (digit > maxDigit) {
			maxDigit = digit;
			maxDigitIdx = i;
		}
	}
	return { maxDigit, maxDigitIdx };
}

main();
