import * as fs from "fs";

export type Coord = {
	x: number
	y: number
}

function main() {
	console.time("TotalExecutionTime");

	console.log("Startign Solution for Day 09 of Advent of Code!");

	const coords = getCoords("years/2025/day-09/puzzle-input.txt");

	console.time("calcMaxRectSize");
	const maxSize = calcMaxRectangleSize(coords);
	console.log(`maxSize: ${maxSize}`);
	console.timeEnd("calcMaxRectSize");

	console.timeEnd("TotalExecutionTime");
}

function getCoords(filePath: string): Coord[] {
	const fileContent = fs.readFileSync(filePath, "utf8");
	const lines = fileContent.split("\n");
	const coords: Coord[] = [];
	for (let i = 0; i < lines.length - 1; i++) {
		const [strX, strY] = lines[i].split(",");
		coords.push({ x: parseInt(strX), y: parseInt(strY) });
	}
	return coords;
}

function calcMaxRectangleSize(coords: Coord[]): number {
	let maxSize = 0;
	for (let i = 0; i < coords.length - 1; i++) {
		for (let j = i + 1; j < coords.length; j++) {
			const rectSize = calcRectangleSize(coords[i], coords[j]);
			maxSize = Math.max(maxSize, rectSize);
		}
	}
	return maxSize;
}

function calcRectangleSize(coord1: Coord, coord2: Coord): number {
	return (Math.abs(coord1.x - coord2.x) + 1) * (Math.abs(coord1.y - coord2.y) + 1);
}

if (import.meta.main) {
	main();
}
