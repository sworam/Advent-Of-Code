import * as fs from "fs";

function main() {
	console.log("Starting Solution for Day 04 of Advent of Code!");
	const diagram = getDiagram("years/2025/day-04/puzzle-input.txt");
	let numAccessableRolls = 0;
	const maxY = diagram.length;
	const maxX = diagram[0].length;
	console.log(`Dims of diagram: (${maxY}/${maxX})`);

	for (let y = 0; y < maxY; y++) {
		for (let x = 0; x < maxX; x++) {
			if (diagram[y][x] != "@") {
				// skip as no roll
				continue;
			}
			const isAccessable = checkPaperrollAccessable(x, y, diagram);
			if (isAccessable) {
				numAccessableRolls++;
			}
		}
	}

	console.log(`The number of accessible rolls is ${numAccessableRolls}`);
}

function getDiagram(filePath: string) {
	const fileContent = fs.readFileSync(filePath, "utf8");
	const diagram = fileContent.split("\n");
	return diagram.slice(0, -1);
}

function checkPaperrollAccessable(x: number, y: number, diagram: string[]): boolean {
	const neighbors = getNeighbors(x, y, diagram);
	const numNeighboringRolls = countRolls(neighbors);
	return numNeighboringRolls < 4;
}

function getNeighbors(x: number, y: number, diagram: string[]): string[] {
	let neighbors = [];
	const minY = Math.max(0, y - 1);
	const maxY = Math.min(y + 1, diagram.length - 1);
	const minX = Math.max(0, x - 1);
	const maxX = Math.min(x + 1, diagram[0].length - 1);
	for (let yt = minY; yt <= maxY; yt++) {
		for (let xt = minX; xt <= maxX; xt++) {
			if (xt == x && yt == y) {
				continue;
			}
			const neighbor = diagram[yt][xt]
			neighbors.push(neighbor);
		}
	}
	return neighbors;
}

function countRolls(neighbors: string[]): number {
	let rollCount = 0;
	for (const neighbor of neighbors) {
		if (neighbor === "@") {
			rollCount++;
		}
	}
	return rollCount;
}

main();
