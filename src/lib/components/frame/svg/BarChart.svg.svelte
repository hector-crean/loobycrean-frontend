<script lang="ts">
	import { scaleY } from "$lib/transition/scale-y";
	import { createEventDispatcher, getContext } from "svelte";
	import { cubicInOut } from "svelte/easing";
	import type { DataLayerCtx } from "../data-layer/data-layer.types";

	type $$Props = {
		dataCtxKey: symbol;
		barColor: string;
	};

	export let dataCtxKey: symbol;
	export let barColor: string;

	const { data, xScale, yScale, aspectRatio, padding, meta } =
		getContext<DataLayerCtx>(dataCtxKey);

	$: barWidth = $aspectRatio / (2 * data.length);

	/**
	 * Tooltip:
	 * - layer of
	 */
	const dispatch = createEventDispatcher<{
		"tooltip-activated": {
			datum: { x: number; y: number };
			tooltipPosition: { x: number; y: number };
		};
		"tooltip-deactivated": never;
	}>();
</script>

{#each data as { x, y }, i}
	<g transform="translate({-0.5 * barWidth}, -0)">
		<rect
			style:--bar-color={barColor}
			on:pointerenter={() =>
				dispatch("tooltip-activated", {
					tooltipPosition: { x: $xScale(x), y: $yScale(y) },
					datum: { x, y },
				})}
			on:pointerleave={() => dispatch("tooltip-deactivated")}
			on:pointercancel={() => dispatch("tooltip-deactivated")}
			on:pointerout={() => dispatch("tooltip-deactivated")}
			transition:scaleY={{ easing: cubicInOut }}
			class="svg-bar"
			data-id={i}
			x={$xScale(x)}
			y={$yScale(meta.ys.smallest)}
			width={barWidth}
			height={$yScale(y)}
		/>
	</g>
{/each}

<style lang="scss">
	.svg-bar {
		fill: var(--bar-color);
		&:hover {
			filter: hue-rotate(90deg);
		}
	}
</style>
