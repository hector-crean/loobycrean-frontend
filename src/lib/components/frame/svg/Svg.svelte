<!--
	@component
	SVG layout component

  This component normalises the coordinates. Coordinates of the children should be given in 'percentages'/ratios across the svg. i.e. x=0.1, y=0.2
 -->
<script lang="ts">
	import type { FrameCtx, Layer } from "$lib/components/frame/frame.type";
	import { getContext } from "svelte";

	let imgSvgEl: SVGImageElement;

	type $$Props = {
		frameCtxKey: Symbol;
		layer: Layer;
		pointerEvents: boolean;
	};
	export let layer: Layer;
	export let pointerEvents: boolean;
	export let frameCtxKey: Symbol;

	const {
		rotation,
		translation,
		scale,
		containerWidth,
		containerHeight,
		aspectRatio,
	} = getContext<FrameCtx>(frameCtxKey);
</script>

<svg
	viewBox="{0} {0} {$aspectRatio} {1}"
	width={$aspectRatio}
	height={1}
	style:z-index={layer}
	style:pointer-events={pointerEvents ? "all" : "none"}
	style:--svg-container-width={Math.round($containerWidth)}
	style:--svg-container-height={Math.round($containerHeight)}
>
	<!-- <g pointer-events="visible">
		<slot />
	</g> -->
	<g
		pointer-events="visible"
		transform="translate({0.5 * $aspectRatio}, {0.5 *
			1}) scale({$scale.sx} {-$scale.sy})  translate({-0.5 *
			$aspectRatio} {-0.5 *
			1}) translate({$translation.tx} {$translation.ty})"
	>
		<slot />
	</g>
</svg>

<style lang="scss" global>
	@import "../vars.scss";

	svg {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		width: 100%;
		height: 100%;
		overflow: visible;
	}

	svg :global(*) {
		vector-effect: non-scaling-stroke;

		// g > text {
		// 	/* Re-flip all <text> element descendants to their original side up. */
		// 	transform: scaleY(-1 / var(--svg-container-height))
		// 		scaleX(1 / var(--svg-container-width));
		// }
	}
</style>
