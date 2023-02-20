<script lang="ts">
	import { getContext } from "svelte";
	import type { FrameCtx } from "../frame.type";

	//   type WithTarget<Event, Target> = Event & { currentTarget: Target };

	interface $$Props {
		frameCtxKey: symbol;
		tooltip: {
			tooltipPosition: { x: number; y: number };
			datum: { x: number; y: number };
		} | null;
	}

	export let tooltip: {
		tooltipPosition: { x: number; y: number };
		datum: { x: number; y: number };
	} | null = null;
	export let frameCtxKey: symbol;

	const { containerHeight } = getContext<FrameCtx>(frameCtxKey);

	/**
	 *
	 * - Charts are layered (each with different id )
	 * -  tooltip can be associasted with a partivcular layr
	 */
</script>

{#if tooltip}
	<div
		class="tooltip"
		style:bottom={`${tooltip.tooltipPosition.y * $containerHeight}px`}
		style:left={`${tooltip.tooltipPosition.x * $containerHeight}px`}
	>
		<slot {tooltip} />
	</div>
{/if}

<style lang="scss">
	.tooltip {
		position: absolute;
		min-width: 100px;
		border: none;
		font-size: 13px;
		background-color: rgba(0, 0, 0, 0.8);
		color: white;
		transform: translate(-50%, -100%);
		padding: 5px;
		z-index: 15;
	}
</style>
