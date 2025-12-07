import * as fs from "fs"

function main() {
	console.log("Startign Solution for Day 02 of Advant of Code!");
	const ranges = getRanges("years/2025/day-02/puzzle-input.txt");
	let invalidsSummed = 0;
	for (const r of ranges) {
		const [startStr, endStr] = r.split("-");
		let start = parseInt(startStr);
		let end = parseInt(endStr);
		const invalidIDs = calcInvalidIDs(start, end);
		for (const invalidID of invalidIDs) {
			invalidsSummed += invalidID;
		}

		console.log(`Start:${start}, End:${end}, InvalidIDs:${invalidIDs}`);
	}
	console.log(`Invalid IDs summed: ${invalidsSummed}`);
}

function getRanges(filePath: string) {
	const fileContent = fs.readFileSync(filePath, "utf8");
	const ranges = fileContent.split(",");
	return ranges;
}

export function calcInvalidIDs(start: number, end: number) {
	let invalidIDs = [];
	for (let id = start; id <= end; id++) {
		const idValid = checkIdValid(id.toString());
		if (!idValid) {
			invalidIDs.push(id);
		}
	}
	return invalidIDs;
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

main();
