import * as fs from "fs";

export type Coord = [number, number];

export type UniqueGrid = {
	uniqueXs: number[]
	uniqueYs: number[]
}

export type Rectangle = {
	x: number
	y: number
	width: number
	height: number
	area: number
}

function main() {
	console.time("TotalExecutionTime");

	console.log("Starting Solution for Day 09 of Advent of Code!");

	const coords = getCoords("years/2025/day-09/puzzle-input.txt");

	console.time("calcMaxRectSize");
	const maxSize = calcMaxRectangleSize(coords);
	console.log(`maxSize: ${maxSize}`);
	console.timeEnd("calcMaxRectSize");

	console.time("calcMaxInternalRect");
	const maxInternalRect: Rectangle = findLargestInternalRect(coords);
	console.log(`maxInternalRect: ${maxInternalRect.area}`);
	console.timeEnd("calcMaxInternalRect");

	console.timeEnd("TotalExecutionTime");
}

function getCoords(filePath: string): Coord[] {
	const fileContent = fs.readFileSync(filePath, "utf8").trim();
	// Split and filter out empty lines to avoid NaN issues
	return fileContent.split("\n")
		.filter(line => line.trim() !== "")
		.map(line => {
			const [x, y] = line.split(",").map(s => parseInt(s.trim()));
			return [x, y] as Coord;
		});
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

function getUniqueCoords(coords: Coord[]) {
	const xs = new Set<number>(coords.map(p => p[0]));
	const ys = new Set<number>(coords.map(p => p[1]));
	const uniqueXs: number[] = Array.from(xs.values()).sort((a, b) => a - b);
	const uniqueYs: number[] = Array.from(ys.values()).sort((a, b) => a - b);
	return { uniqueXs, uniqueYs };
}

function createBooleanGrid(polygon: Coord[], uniqueXs: number[], uniqueYs: number[]): boolean[][] {
	const columns = uniqueXs.length - 1;
	const rows = uniqueYs.length - 1;
	const grid: boolean[][] = Array.from({ length: rows }, () => Array(columns).fill(false));

	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < columns; c++) {
			const midPoint: Coord = [
				(uniqueXs[c] + uniqueXs[c + 1]) / 2,
				(uniqueYs[r] + uniqueYs[r + 1]) / 2];
			grid[r][c] = isPointInPolygon(midPoint, polygon);
		}
	}
	return grid;
}

function findLargestInternalRect(polygon: Coord[]): Rectangle {
	let maxArea = 0;
	let bestRect: Rectangle = { x: 0, y: 0, width: 0, height: 0, area: 0 };

	const { uniqueXs, uniqueYs } = getUniqueCoords(polygon);
	const grid = createBooleanGrid(polygon, uniqueXs, uniqueYs);
	const rows = grid.length;
	const cols = grid[0].length;
	const heights = new Array(cols).fill(0);

	for (let r = 0; r < rows; r++) {
		const cellHeight = uniqueYs[r + 1] - uniqueYs[r];
		for (let c = 0; c < cols; c++) {
			// if tile in grid add height
			heights[c] = grid[r][c] ? (heights[c] + cellHeight) : 0;
		}

		const currentMax: Rectangle = getMaxRectangleInHistogram(heights, uniqueXs);
		if (currentMax.area > maxArea) {
			maxArea = currentMax.area;
			bestRect = { ...currentMax, y: uniqueYs[r + 1] - currentMax.height };
		}
	}
	return bestRect;
}

function getMaxRectangleInHistogram(heights: number[], uniqueXs: number[]): Rectangle {
	const stack: number[] = [];
	let maxArea = 0;
	let best: Rectangle = { x: 0, y: 0, width: 0, height: 0, area: 0 };

	const h = [...heights, 0];
	for (let i = 0; i <= heights.length; i++) {
		while (stack.length > 0 && h[stack[stack.length - 1]] >= h[i]) {
			const idx = stack.pop()!;
			const rawHeight = h[idx];
			if (rawHeight === 0) continue;

			const leftIndex = stack.length === 0 ? 0 : stack[stack.length - 1] + 1;

			const rawWidth = uniqueXs[i] - uniqueXs[leftIndex];
			const height = rawHeight + 1;
			const width = rawWidth + 1;
			const area = height * width;

			if (area > maxArea) {
				maxArea = area;
				best = { x: uniqueXs[leftIndex], y: 0, width, height, area };
			}
		}
		stack.push(i);
	}
	return best;
}

export function isPointInPolygon(p: Coord, polygon: Coord[]): boolean {
	let inside = false;

	for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
		const p1 = polygon[i];
		const p2 = polygon[j];

		const intersect = ((p1[1] > p[1]) !== (p2[1] > p[1])) &&
			(p[0] < (p2[0] - p1[0]) * (p[1] - p1[1]) / (p2[1] - p1[1]) + p1[0]);
		if (intersect) inside = !inside;
	}
	return inside;
}

function calcRectangleSize(coord1: Coord, coord2: Coord): number {
	return (Math.abs(coord1[0] - coord2[0]) + 1) * (Math.abs(coord1[1] - coord2[1]) + 1);
}

if (import.meta.main) {
	main();
}
