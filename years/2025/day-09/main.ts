import * as fs from "fs";

export type Coord = [number, number];
function main() {
	console.time("TotalExecutionTime");

	console.log("Startign Solution for Day 09 of Advent of Code!");

	const coords = getCoords("years/2025/day-09/puzzle-input.txt");

	console.time("calcMaxRectSize");
	const maxSize = calcMaxRectangleSize(coords);
	console.log(`maxSize: ${maxSize}`);
	console.timeEnd("calcMaxRectSize");

	console.time("calcMaxRectSizeOnLoop");
	const maxSizeOnLoop = calcMaxRectangleOnLoop(coords);
	console.log(`maxSizeOnLoop: ${maxSizeOnLoop}`);
	console.timeEnd("calcMaxRectSizeOnLoop");

	console.timeEnd("TotalExecutionTime");
}

function getCoords(filePath: string): Coord[] {
	const fileContent = fs.readFileSync(filePath, "utf8");
	const lines = fileContent.split("\n");
	const coords: Coord[] = [];
	for (let i = 0; i < lines.length - 1; i++) {
		const [strX, strY] = lines[i].split(",");
		coords.push([parseInt(strX), parseInt(strY)]);
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

function calcMaxRectangleOnLoop(coords: Coord[]): number {
	let maxSize = 0;
	for (let i = 0; i < coords.length - 1; i++) {
		for (let j = i + 1; j < coords.length; j++) {
			if (!isElegible(i, j, coords)) {
				continue;
			}
			const rectSize = calcRectangleSize(coords[i], coords[j]);
			maxSize = Math.max(maxSize, rectSize);
		}
	}
	return maxSize;
}

function calcRectangleSize(coord1: Coord, coord2: Coord): number {
	return (Math.abs(coord1[0] - coord2[0]) + 1) * (Math.abs(coord1[1] - coord2[1]) + 1);
}

function isElegible(i: number, j: number, coords: Coord[]): boolean {
	const coordi = coords[i];
	const coordj = coords[j];
	//const corner1: Coord = [coordi[0], coordj[1]];
	//const corner2: Coord = [coordi[1], coordj[0]];
	//if (!isOnLoop(corner1, coords) || !isOnLoop(corner2, coords)) {
	//	return false;
	//}
	if (somePointInsideRectangle(coordi, coordj, coords)) {
		return false;
	}
	return true;
}

function isOnLoop(coord: Coord, coords: Coord[]): boolean {
	let currentCoord = coords[coords.length - 1];
	if (currentCoord === coord) {
		return true;
	}

	for (let i = 0; i < coords.length; i++) {
		let nextCoord = coords[i];
		if (nextCoord === coord) {
			return true;
		}
		if (isOnLine(coord, currentCoord, nextCoord)) {
			return true;
		}
		currentCoord = nextCoord;
	}
	return false;
}

function isOnLine(coord: Coord, coordi: Coord, coordj: Coord): boolean {
	if (coord[0] < Math.min(coordi[0], coordj[0])
		|| coord[0] > Math.max(coordi[0], coordj[0])
		|| coord[1] < Math.min(coordi[1], coordj[1])
		|| coord[1] > Math.max(coordi[1], coordj[1])) {
		return false;
	}
	return true;
}

function somePointInsideRectangle(coordi: Coord, coordj: Coord, coords: Coord[]): boolean {
	for (const c of coords) {
		if (insideRectangle(coordi, coordj, c)) {
			return true;
		}
	}
	return false;
}

export function insideRectangle(coordi: Coord, coordj: Coord, c: Coord): boolean {
	// c is on boarder of rectangle
	// not necessary to check because of next check
	//if (c[0] === coordi[0]
	//	|| c[0] === coordj[0]
	//	|| c[1] === coordi[1]
	//	|| c[1] === coordj[1]) {
	//	return false;
	//}
	// c is outside of rectangle (or on border)
	if (c[0] <= Math.min(coordi[0], coordj[0])
		|| c[0] >= Math.max(coordi[0], coordj[0])
		|| c[1] <= Math.min(coordi[1], coordj[1])
		|| c[1] >= Math.max(coordi[1], coordj[1])) {
		return false;
	}
	return true;
}

if (import.meta.main) {
	main();
}
