import * as fs from "fs"

function main() {
	console.log("Startign Solution for Day 02 of Advent of Code!");
	const ranges = getRanges("years/2025/day-02/puzzle-input.txt");
	let invalidsSummed = 0;
	let invalidId2Summed = 0;
	for (const r of ranges) {
		const [startStr, endStr] = r.split("-");
		let start = parseInt(startStr);
		let end = parseInt(endStr);
		const { invalidIDs, invalidID2s } = calcInvalidIDs(start, end);
		for (const invalidID of invalidIDs) {
			invalidsSummed += invalidID;
		}
		for (const invalidID2 of invalidID2s) {
			invalidId2Summed += invalidID2;
		}

		console.log(`Start:${start}, End:${end}, InvalidIDs:${invalidIDs}`);
		console.log(`Invalid ID2s: ${invalidID2s}`);
	}
	console.log(`Invalid IDs summed: ${invalidsSummed}`);
	console.log(`Invalid ID2s summed: ${invalidId2Summed}`);
}

function getRanges(filePath: string) {
	const fileContent = fs.readFileSync(filePath, "utf8");
	const ranges = fileContent.split(",");
	return ranges;
}

export function calcInvalidIDs(start: number, end: number) {
	let invalidIDs = [];
	let invalidID2s = [];
	for (let id = start; id <= end; id++) {
		if (!checkIdValid(id.toString())) {
			invalidIDs.push(id);
		}

		if (!checkIdValidV2(id.toString())) {
			invalidID2s.push(id);
		}
	}
	return { invalidIDs, invalidID2s };
}

function checkIdValid(id: string) {
	const medianPoint = Math.floor(id.length / 2);
	const h1 = id.substring(0, medianPoint);
	const h2 = id.substring(medianPoint);

	if (h1 === h2) {
		return false;
	} else {
		return true;
	}
}

function checkIdValidV2(id: string): boolean {
	for (let i = 1; i <= id.length / 2; i++) {
		if (substringRepeats(id, i)) {
			return false;
		}
	}
	return true;
}

function substringRepeats(id: string, substringLength: number) {
	// if the length of the subset does not fit into the id it can not repeat.
	if (id.length % substringLength != 0) {
		return false;
	}

	const splitId = createSubstrings(id, substringLength);
	return checkItemsEqual(splitId);
}

function createSubstrings(originalString: string, substringLength: number) {
	let substrings = [];
	for (let i = 0; i < originalString.length; i += substringLength) {
		substrings.push(originalString.slice(i, i + substringLength));
	}
	return substrings;
}

function checkItemsEqual(array: any[]) {
	if (array.length < 2) {
		return true;
	}
	for (let i = 0; i < array.length - 1; i++) {
		if (array[i] !== array[i + 1]) {
			return false;
		}
	}
	return true;
}

if (import.meta.main) {
	main();
}
