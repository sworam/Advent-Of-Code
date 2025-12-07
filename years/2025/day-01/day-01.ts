import * as fs from "fs"
function main() {
	console.log("Starting Solution for Day 01 of Advant of Code!");
	const rotations = readLinesFromFile("years/2025/day-01/puzzle-input.txt");
	let currentRotation = 50; // starting rotation
	console.log(`The dial starts by pointing at ${currentRotation}`);
	let zeroCount = 0;

	for (const rotation of rotations) {
		const direction = rotation.substring(0, 1);
		const rotationAmount = parseInt(rotation.substring(1));
		currentRotation = getNextRotation(currentRotation, direction, rotationAmount);
		console.log(`Direction: ${direction}, Rotation Amount: ${rotationAmount} now pointing to ${currentRotation}`);
		if (currentRotation === 0) {
			zeroCount++;
		}
	}

	console.log(`Zero Count: ${zeroCount}`);
}

function readLinesFromFile(filePath: string) {
	const fileContent = fs.readFileSync(filePath, "utf8");
	const lines = fileContent.split("\n");
	return lines.slice(0, -1);
}

function getNextRotation(startingRotation: number, direction: string, rotationAmount: number) {
	let nextRotation: number;
	if (direction === "L") {
		nextRotation = startingRotation - rotationAmount;
	} else {
		nextRotation = startingRotation + rotationAmount;
	}

	//console.log(`pre next rotation: ${nextRotation}`);

	if (nextRotation < 0) {

		nextRotation = 100 - ((-nextRotation) % 100);
	}
	if (nextRotation > 99) {
		nextRotation = nextRotation % 100;
	}
	return nextRotation;
}

main();
