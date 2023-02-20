export interface Eq<A> {
	readonly equals: (x: A, y: A) => boolean;
}

export type Ordering = -1 | 0 | 1;

export interface Ord<A> extends Eq<A> {
	readonly compare: (first: A, second: A) => Ordering;
}

export const descendingOrd: Ord<{ x1: number; y: number }> = {
	equals: (p1, p2) => p1.x1 === p2.y,
	compare: (p1, p2) => {
		return p1.x1 > p2.x1 ? -1 : p1.x1 < p2.x1 ? 1 : 0;
	},
};

export const ascendingOrd: Ord<{ x1: number; y: number }> = {
	equals: (p1, p2) => p1.x1 === p2.y,
	compare: (p1, p2) => {
		return p1.x1 < p2.x1 ? -1 : p1.x1 > p2.x1 ? 1 : 0;
	},
};

export const sort =
	<B>(O: Ord<B>) =>
	<A extends B>(as: Array<A>): Array<A> =>
		as.slice().sort(O.compare);
