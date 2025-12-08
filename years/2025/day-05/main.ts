import * as fs from "fs";

type Range = {
	start: number
	end: number
}

function main() {
	const { ranges, ids } = getPuzzleInput("years/2025/day-05/puzzle-input.txt");
	let spoiledCounter = 0;
	for (const id of ids) {
		if (checkInRanges(id, ranges)) {
			spoiledCounter++;
		}
	}
	console.log(`Number of spoiled items: ${spoiledCounter}`);
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

main();
