import type { ScaleLinear } from 'd3-scale';
import type { Writable } from "svelte/store";
import type { FrameCtx } from "../frame.type";

interface DataLayerCtx extends FrameCtx {
	dataCtxKey: symbol;
	data: Array<{ x: number; y: number }>;
	xScale: Writable<ScaleLinear<number, number, never>>;
	yScale: Writable<ScaleLinear<number, number, never>>;
	meta: {
		xs: {
			smallest: number;
			largest: number;
		};
		ys: {
			smallest: number;
			largest: number;
		};
	};
	nearestDataPointToPointer: Writable<{
		x: number;
		y: number;
	}>;
}

export type { DataLayerCtx };
