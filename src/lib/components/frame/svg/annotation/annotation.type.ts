//traits

type Circle = {
	kind: "circle";
	props: {
		position: { x: number; y: number };
		r: number;
		stroke: string;
		fill: string;
	};
};

type Rectangle = {
	kind: "rectangle";
	props: { position: { x: number; y: number }; width: number; height: number };
};

type Badge = {
	kind: "badge";
	props: { position: { x: number; y: number }; width: number; height: number };
};

type PartitionLine = {
	kind: "partition-line";
	props: {
		x1: number;
		x2: number;
		y1: number;
		y2: number;
	};
};

type AnnotationSubject = Circle | Rectangle | Badge | PartitionLine;

type Path = {
	kind: "path";
	props: {
		points: Array<{x: number, y: number}>;
		stroke: string;
		fill: string;
	};
};

type PolyLine = {
	kind: "polyline";
	props: {
		points: Array<{ x: number; y: number }>;
		fittingFn: (
			points: Array<{ x: number; y: number }>,
		) => Array<{ x: number; y: number }>;
	};
};

type Line = {
	kind: "line";
	props: {
		x1: number;
		y1: number;
		x2: number;
		y2: number;
		stroke: string;
		pathLength?: number
		strokeWidth?: number
	};
};

type AnnotationConnector = Line | PolyLine | Path;

type AnnotationNote {
	position: {x: number, y: number},
	title: string;
	body: string;
}

interface Annotation {
	subject: AnnotationSubject;
	connector: AnnotationConnector;
	note: AnnotationNote;
}

export type {
	Annotation,
	AnnotationConnector,
	AnnotationSubject,
	AnnotationNote,
	Badge,
	Circle,
	Rectangle,
	PartitionLine,
	PolyLine,
	Path,
	Line,
};
