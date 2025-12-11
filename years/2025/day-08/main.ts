import * as fs from "fs";

export type Coord = {
	x: number
	y: number
	z: number
	idx: number
}

const NUM_PAIRS = 1000;

function main() {
	console.log("Startign Solution for Day 08 of Advent of Code!");
	const coords: Coord[] = getCoords("years/2025/day-08/puzzle-input.txt");
	//console.log(coords);
	//const distanceMatrix: number[][] = calcDistMatrix(coords, euclidDistance);
	console.log("Calculating shortest distances...");
	const shortestDistances: [number, number, number][] = calcShortestDistances(coords, NUM_PAIRS);
	console.log("Calculating coord clusters");
	const coordClusters: Set<number>[] = calcCoordClusters(shortestDistances);
	const sortedClusters = sortClustersBySize(coordClusters);
	console.log(`largestClusterSizes: ${sortedClusters[0].size}, ${sortedClusters[1].size}, ${sortedClusters[2].size}`);
	console.log(`productOfThreeLargestClusters: ${sortedClusters[0].size * sortedClusters[1].size * sortedClusters[2].size}`);
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

function calcDistMatrix(coords: Coord[], distFunc: Function): number[][] {
	const distMatrix: number[][] = [];

	for (let i = 0; i < coords.length; i++) {
		distMatrix.push([]);
		const coord1 = coords[i];
		for (let j = 0; j < coords.length; j++) {
			const coord2 = coords[j];
			distMatrix[i].push(distFunc(coord1, coord2));
		}
	}
	return distMatrix;
}

function calcShortestDistances(coords: Coord[], numPairs: number): [number, number, number][] {
	let shortestDistances: [number, number, number][] = [];

	for (let i = 0; i < coords.length - 1; i++) {
		const coord1 = coords[i];
		for (let j = i + 1; j < coords.length; j++) {
			const coord2 = coords[j];
			const dist = euclidDistance(coord1, coord2);
			shortestDistances = pushDistance([dist, i, j], shortestDistances, numPairs);
		}
	}

	return shortestDistances;
}

function pushDistance(pair: [number, number, number], distanceList: [number, number, number][], numPairs: number): [number, number, number][] {
	distanceList = insertPair(pair, distanceList);
	if (distanceList.length > numPairs) {
		return distanceList.slice(0, numPairs);
	}
	return distanceList;
}

function insertPair(pair: [number, number, number], distanceList: [number, number, number][]) {
	if (distanceList.length === 0) {
		return [pair];
	}
	for (let i = 0; i < distanceList.length; i++) {
		if (pair[0] <= distanceList[i][0]) {
			return [...distanceList.slice(0, i), pair, ...distanceList.slice(i)];
		}
	}
	return [...distanceList, pair];
}

function calcCoordClusters(shortestDistances: [number, number, number][]): Set<number>[] {
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
		// merge cluster with larger index into cluster with smaller index to prevent index shift.
		const indexSmall = Math.min(index1, index2);
		const indexLarge = Math.max(index1, index2);
		for (const id of clusters[indexLarge]) {
			clusters[indexSmall].add(id);
		}
		clusters.splice(indexLarge, 1);
	}

	return clusters;
}

function sortClustersBySize(clusters: Set<number>[]): Set<number>[] {
	const sortedClusters = clusters.sort((a, b) => b.size - a.size);
	return sortedClusters;
}

if (import.meta.main) {
	main();
}
