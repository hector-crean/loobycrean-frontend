<script lang="ts">
	import type { FrameCtx } from "$lib/components/frame/frame.type";
	import { bisector } from "d3-array";
	import { scaleLinear } from "d3-scale";
	import { getContext, setContext } from "svelte";
	import { derived, writable } from "svelte/store";
	import { v4 as uuidv4 } from "uuid";
	import type {
		Dimension,
		MultivariateMap,
		VisualisableData,
	} from "../data.types";
	import type { DataLayerCtx } from "./data-layer.types";
	import type { Ord } from "./ord";
	import { sort } from "./ord";

	type D = $$Generic<Dimension>;
	type T = $$Generic;

	type $$Props = {
		dimension: D;
		frameCtxKey: symbol;
		metricSpace: "svg" | "html" | "canvas";
		ord: Ord<MultivariateMap[D]>;
		visualisable: VisualisableData<T>;
	};

	export let dimension: D;
	export let frameCtxKey: symbol;
	export let visualisable: VisualisableData<T>;
	export let metricSpace: "svg" | "html" | "canvas";
	export let ord: Ord<MultivariateMap[D]>;

	const projectedData = visualisable.data.map(visualisable.projection);

	interface $$Slots {
		default: {
			dataCtxKey: symbol;
		};
	}
	// for now just reduce higher dimensional data
	const orderedData = sort(ord)(projectedData).map(({ y, x1 }) => ({
		y,
		x: x1,
	}));

	const { aspectRatio, padding, pointer, ...restFrameCtx } =
		getContext<FrameCtx>(frameCtxKey);

	const uuid = uuidv4();
	const dataCtxKey = Symbol(uuid);

	const ys = orderedData.map((p) => p.y);

	const x1s = orderedData.map((p) => p.x);

	const smallest = (xs: Array<number>) => Math.min(...xs);

	const largest = (xs: Array<number>) => Math.max(...xs);

	const x1Scale = derived(aspectRatio, ($aspectRatio) =>
		scaleLinear()
			.domain([smallest(x1s), largest(x1s)])
			.range([padding.left, $aspectRatio - padding.right])
	);

	const yScale = writable(
		scaleLinear()
			.domain([smallest(ys), largest(ys)])
			.range([padding.bottom, 1 - padding.top])
	);

	const bisect = bisector<{ x: number; y: number }, number>((d) => d.x);

	const nearestDataPointToPointer = derived(
		[pointer, x1Scale],
		([$pointer, $xScale]) => {
			let i = bisect.center(
				orderedData,
				$xScale.invert($pointer.normalisedCartesian.x * $aspectRatio)
			);
			return i < orderedData.length && i >= 0
				? orderedData[i]
				: { x: 0, y: 0 };
		}
	);

	let ctx = {
		dataCtxKey,
		data: orderedData,
		xScale: x1Scale,
		yScale: yScale,
		meta: {
			xs: {
				smallest: smallest(x1s),
				largest: largest(x1s),
			},
			ys: {
				smallest: smallest(ys),
				largest: largest(ys),
			},
		},
		aspectRatio,
		padding,
		nearestDataPointToPointer,
		...restFrameCtx,
	};

	$: setContext<DataLayerCtx>(ctx.dataCtxKey, ctx);
</script>

<slot dataCtxKey={ctx.dataCtxKey} />
