import * as fs from "fs";
import { DistancePair, MaxHeap } from "./max-heap.js";

export type Coord = {
	x: number
	y: number
	z: number
	idx: number
}


const NUM_PAIRS = 1000;

function main() {
	console.time("TotalExecutionTime");

	console.log("Startign Solution for Day 08 of Advent of Code!");

	console.time("GetCoords");
	const coords: Coord[] = getCoords("years/2025/day-08/puzzle-input.txt");
	console.timeEnd("GetCoords");

	console.log("Calculating shortest distances...");
	console.time("CalcShortestDistances");
	const shortestDistances: DistancePair[] = calcShortestDistances(coords, NUM_PAIRS);
	console.timeEnd("CalcShortestDistances");

	console.log("Calculating coord clusters");
	console.time("CalcCoordClusters");
	const coordClusters: Set<number>[] = calcCoordClusters(shortestDistances);
	console.timeEnd("CalcCoordClusters");

	console.time("SortClusters");
	const sortedClusters = sortClustersBySize([...coordClusters]);
	console.timeEnd("SortClusters");

	console.log(`largestClusterSizes: ${sortedClusters[0].size}, ${sortedClusters[1].size}, ${sortedClusters[2].size}`);
	console.log(`productOfThreeLargestClusters: ${sortedClusters[0].size * sortedClusters[1].size * sortedClusters[2].size}`);

	// part2
	console.time("CalcLastPair");
	const allCoordClusters = addSingletonClusters(coordClusters, coords);
	const [coord1, coord2]: [Coord, Coord] = calcLastCoordPair(allCoordClusters, coords);
	console.timeEnd("CalcLastPair");

	console.log(`result: ${coord1.x}*${coord2.x}=${coord1.x * coord2.x}`);
	console.timeEnd("TotalExecutionTime");
}

function getCoords(filePath: string): Coord[] {
	const fileContent = fs.readFileSync(filePath, "utf8");
	const lines = fileContent.split("\n");
	const coords: Coord[] = [];
	for (let i = 0; i < lines.length - 1; i++) {
		const [strX, strY, strZ] = lines[i].split(",");
		coords.push({ x: parseInt(strX), y: parseInt(strY), z: parseInt(strZ), idx: i });
	}
	return coords;
}

export function euclidDistance(coord1: Coord, coord2: Coord): number {
	const inner = Math.pow(coord1.x - coord2.x, 2) + Math.pow(coord1.y - coord2.y, 2) + Math.pow(coord1.z - coord2.z, 2);
	return Math.sqrt(inner);
}

function calcShortestDistances(coords: Coord[], numPairs: number): DistancePair[] {
	const distanceHeap = new MaxHeap(numPairs);

	for (let i = 0; i < coords.length - 1; i++) {
		const coord1 = coords[i];
		for (let j = i + 1; j < coords.length; j++) {
			const coord2 = coords[j];
			const dist = euclidDistance(coord1, coord2);
			distanceHeap.insert([dist, i, j]);
		}
	}

	return distanceHeap.getSortedPairs();
}

function addSingletonClusters(baseClusters: Set<number>[], coords: Coord[]): Set<number>[] {
	for (let i = 0; i < coords.length; i++) {
		if (!hasCluster(i, baseClusters)) {
			baseClusters.push(new Set<number>([i]));
		}
	}
	return baseClusters;
}

function hasCluster(idx: number, clusters: Set<number>[]): boolean {
	for (const cluster of clusters) {
		if (cluster.has(idx)) {
			return true;
		}
	}
	return false;
}

function calcLastCoordPair(clusters: Set<number>[], coords: Coord[]): [Coord, Coord] {
	while (clusters.length > 2) {
		const [idx1, idx2] = calcMinDistClusterPair(clusters, coords);
		clusters = fuzeClusters(clusters, idx1, idx2);
	}
	const [_, i1, i2] = calcDistanceBetweenClusters(clusters[0], clusters[1], coords);
	return [coords[i1], coords[i2]];
}

function calcMinDistClusterPair(clusters: Set<number>[], coords: Coord[]): [number, number] {
	let minDist = Number.MAX_VALUE;
	let idx1 = -1;
	let idx2 = -1;

	for (let i = 0; i < clusters.length - 1; i++) {
		for (let j = i + 1; j < clusters.length; j++) {
			const [dist] = calcDistanceBetweenClusters(clusters[i], clusters[j], coords)
			if (dist < minDist) {
				minDist = dist;
				idx1 = i;
				idx2 = j;
			}
		}
	}
	return [idx1, idx2];
}

function calcDistanceBetweenClusters(cluster1: Set<number>, cluster2: Set<number>, coords: Coord[]): DistancePair {
	let minDistance = Number.MAX_VALUE;
	let idx1 = -1;
	let idx2 = -1;

	for (const id1 of cluster1) {
		for (const id2 of cluster2) {
			const dist = euclidDistance(coords[id1], coords[id2])
			if (dist < minDistance) {
				minDistance = dist;
				idx1 = id1;
				idx2 = id2;
			}
		}
	}
	return [minDistance, idx1, idx2];
}

function calcCoordClusters(shortestDistances: DistancePair[]): Set<number>[] {
	let coordClusters: Set<number>[] = [];

	for (let i = 0; i < shortestDistances.length; i++) {
		const [_, id1, id2] = shortestDistances[i];
		coordClusters = addToClusters(id1, id2, coordClusters);
	}
	return coordClusters;
}

function addToClusters(id1: number, id2: number, clusters: Set<number>[]): Set<number>[] {
	let index1 = -1;
	let index2 = -1;

	for (let i = 0; i < clusters.length; i++) {
		const cluster = clusters[i];

		if (cluster.has(id1)) {
			index1 = i;
		}
		if (cluster.has(id2)) {
			index2 = i;
		}
	}

	if (index1 === -1 && index2 === -1) {
		// both not in cluster -> create new
		clusters.push(new Set<number>([id1, id2]));
	} else if (index1 !== -1 && index2 === -1) {
		// 2 not in cluster -> add to 1
		clusters[index1].add(id2);
	} else if (index1 === -1 && index2 !== -1) {
		// 1 not in cluster -> add to 2
		clusters[index2].add(id1);
	} else if (index1 === index2) {
		// both in same clusters -> return;
		return clusters;
	} else {
		// both in different clusters -> merge
		clusters = fuzeClusters(clusters, index1, index2);
	}

	return clusters;
}

function fuzeClusters(clusters: Set<number>[], idx1: number, idx2: number): Set<number>[] {
	// merge cluster with larger index into cluster with smaller index to prevent index shift.
	const indexSmall = Math.min(idx1, idx2);
	const indexLarge = Math.max(idx1, idx2);
	for (const id of clusters[indexLarge]) {
		clusters[indexSmall].add(id);
	}
	clusters.splice(indexLarge, 1);
	return clusters;
}

function sortClustersBySize(clusters: Set<number>[]): Set<number>[] {
	const sortedClusters = clusters.sort((a, b) => b.size - a.size);
	return sortedClusters;
}

if (import.meta.main) {
	main();
}
