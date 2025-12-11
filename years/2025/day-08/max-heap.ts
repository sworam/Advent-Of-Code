export type DistancePair = [number, number, number];

export class MaxHeap {
	private heap: DistancePair[] = [];
	private maxSize: number;

	constructor(maxSize: number) {
		this.maxSize = maxSize;
	}

	public size(): number {
		return this.heap.length;
	}

	public peek(): DistancePair | undefined {
		return this.heap.length > 0 ? this.heap[0] : undefined;
	}

	public insert(element: DistancePair) {
		if (this.heap.length < this.maxSize) {
			this.heap.push(element);
			this.siftUp(this.heap.length - 1);
		} else if (element[0] < this.peek()![0]) {
			this.heap[0] = element;
			this.siftDown(0);
		}
	}

	private siftUp(index: number): void {
		let parentIndex = Math.floor((index - 1) / 2);

		while (index > 0 && this.heap[index][0] > this.heap[parentIndex][0]) {
			[this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
			index = parentIndex;
			parentIndex = Math.floor((index - 1) / 2);
		}
	}

	private siftDown(index: number): void {
		let maxIndex = index;
		const leftChildIndex = 2 * index + 1;
		const rightChildIndex = 2 * index + 2;

		if (leftChildIndex < this.heap.length && this.heap[leftChildIndex][0] > this.heap[maxIndex][0]) {
			maxIndex = leftChildIndex;
		}

		if (rightChildIndex < this.heap.length && this.heap[rightChildIndex][0] > this.heap[maxIndex][0]) {
			maxIndex = rightChildIndex;
		}

		if (maxIndex !== index) {
			[this.heap[index], this.heap[maxIndex]] = [this.heap[maxIndex], this.heap[index]];
			this.siftDown(maxIndex);
		}
	}

	public getSortedPairs(): DistancePair[] {
		return [...this.heap].sort((a, b) => b[0] - a[0]);
	}
}
