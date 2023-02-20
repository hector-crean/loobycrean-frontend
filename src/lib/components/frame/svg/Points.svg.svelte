<script lang="ts">
	import { frameCtxKey } from "$lib/components/frame/context-keys";
	import { scaleLinear } from "d3-scale";
	import { getContext } from "svelte";
	import type { FrameCtx } from "../frame.type";

	type $$Props = {
		points: Array<{ x: number; y: number }>;
	};

	export let points: Array<{ x: number; y: number }>;

	const { containerWidth, containerHeight } =
		getContext<FrameCtx>(frameCtxKey);

	$: xs = points.map((p) => p.x);
	$: ys = points.map((p) => p.y);

	const smallest = (xs: Array<number>) => Math.min(...xs);

	const largest = (xs: Array<number>) => Math.max(...xs);

	$: xScale = scaleLinear()
		.domain([smallest(xs), largest(xs)])
		.range([0, $containerWidth / $containerHeight]);

	$: yScale = scaleLinear()
		.domain([0, largest(ys)])
		.range([0, 1]);
</script>

{#each points as point}
	<circle cx={xScale(point.x)} cy={yScale(point.y)} r="0.04" fill="red" />
{/each}
