import * as fs from "fs";


export type Coord = {
	x: number
	y: number
}

function main() {
	console.log("Startign Solution for Day 07 of Advent of Code!");
	const map: string[] = getMap("years/2025/day-07/puzzle-input.txt");
	const startingCoord: Coord = findStart(map);
	const cache: Record<string, number> = {};
	const timelineCount = calcTimelines(startingCoord, map, cache);
	const splitCoords: Set<Coord> = startBeam(startingCoord, map);

	console.log(splitCoords);
	console.log(`amount of splits: ${splitCoords.size}`);
	printMap(map);
	console.log(`timelineCount: ${timelineCount}`);
}

function getMap(filePath: string) {
	const fileContent = fs.readFileSync(filePath, "utf8");
	const lines = fileContent.split("\n");
	return lines.slice(0, lines.length - 1);
}

function findStart(map: string[]) {
	const startingY = 0;
	const startingX = map[startingY].indexOf("S");
	return { x: startingX, y: startingY };
}

function startBeam(coord: Coord, map: string[]): Set<Coord> {
	const nextY = coord.y + 1;
	if (nextY >= map.length) {
		//console.log(`end of map at x:${coord.x}, y: ${coord.y}`);
		console.log("---");
		return new Set<Coord>();
	}
	let nextCoord: Coord = { x: coord.x, y: nextY };
	console.log(`current at x:${coord.x}, y: ${coord.y}`);
	const nextChar = getChar(map, nextCoord);

	if (nextChar === "^") {
		console.log(`split at x:${nextCoord.x}, y: ${nextCoord.y}`);
		const leftCoord = { x: nextCoord.x - 1, y: nextCoord.y }
		const rightCoord = { x: nextCoord.x + 1, y: nextCoord.y }
		const splitSet1 = startBeam(leftCoord, map);
		const splitSet2 = startBeam(rightCoord, map);
		return new Set<Coord>([nextCoord, ...splitSet1, ...splitSet2]);
	} else if (nextChar === "|") {
		// already passed
		return new Set<Coord>();
	} else {
		map[nextY] = map[nextY].slice(0, coord.x) + "|" + map[nextY].slice(coord.x + 1);
		return startBeam(nextCoord, map);
	}
}

function calcTimelines(start: Coord, map: string[], cache: Record<string, number>): number {
	const key = `${start.x},${start.y}`;
	if (cache[key] !== undefined) {
		return cache[key];
	}

	if (start.y >= map.length - 1) {
		cache[key] = 1;
		return 1;
	}

	const currentChar = getChar(map, start);
	let result = 0;

	if (currentChar === ".") {
		result = calcTimelines({ x: start.x, y: start.y + 1 }, map, cache);
	} else {
		// is split
		const left = calcTimelines({ x: start.x - 1, y: start.y + 1 }, map, cache);
		const right = calcTimelines({ x: start.x + 1, y: start.y + 1 }, map, cache);
		result = left + right;
	}
	cache[key] = result;
	return result;
}

function getChar(map: string[], coord: Coord) {
	return map[coord.y][coord.x];
}

function printMap(map: string[]) {
	for (const line of map) {
		console.log(line);
	}
}

if (import.meta.main) {
	main();
}
