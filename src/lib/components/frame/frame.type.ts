import type { Spring } from "svelte/motion";
import type { Writable } from "svelte/store";
//https://www.newline.co/@kchan/state-management-with-svelte-context-api-part-2--cecddbc5

type Layer = 0 | 1 | 2 | 3 | 4 | 5;

interface Padding {
	top: 0 | 0.05 | 0.1 | 0.15 | 0.2 | 0.25;
	right: 0 | 0.05 | 0.1 | 0.15 | 0.2 | 0.25;
	bottom: 0 | 0.05 | 0.1 | 0.15 | 0.2 | 0.25;
	left: 0 | 0.05 | 0.1 | 0.15 | 0.2 | 0.25;
}

type Viewbox = `${number} ${number} ${number} ${number}`;

type Rotation = { rx: number; ry: number; rz: number };
type Translation = { tx: number; ty: number; tz: number };
type Scale = { sx: number; sy: number; sz: number };

type Point = [x: number, y: number];

type Polyline = { id: string; points: Array<Point> };

type FrameCtx = {
	containerWidth: Writable<number>;
	containerHeight: Writable<number>;
	aspectRatio: Writable<number>;
	rotation: Spring<Rotation>;
	translation: Spring<Translation>;
	scale: Writable<Scale>;
	padding: Padding;
	innerWidth: Writable<number>;
	pointer: Writable<{
		normalisedCartesian: { x: number; y: number };
		ndc: { x: number; y: number };
		pixel: { x: number; y: number };
		offset: { x: number; y: number };
	}>;
	//markup:
};
// type FrameCtx = {
// 	containerWidth: number;
// 	containerHeight: number;
// 	aspectRatio: number;
// 	rotation: Rotation;
// 	translation: Translation;
// 	scale: Scale;
// 	padding: Padding;
// 	innerWidth: number;
// 	//markup:
// };

export type {
	Padding,
	Rotation,
	FrameCtx,
	Viewbox,
	Translation,
	Scale,
	Layer,
	Polyline,
	Point,
};
