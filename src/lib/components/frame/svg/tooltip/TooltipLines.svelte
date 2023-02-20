<script lang="ts">
  import type { DataLayerCtx } from '$lib/components/frame/data-layer/data-layer.types';
  import { getContext } from 'svelte';

  interface $$Props {
    dataCtxKey: symbol;
  }

  export let dataCtxKey: symbol;

  const {
    xScale,
    yScale,
    data,
    padding,
    containerHeight,
    containerWidth,
    nearestDataPointToPointer
  } = getContext<DataLayerCtx>(dataCtxKey);

  let hline = { x1: 0, y1: 0, x2: 0, y2: 0 };
  let vline = { x1: 0, y1: 0, x2: 0, y2: 0 };

  // coords for horizontal tooltip line
  $: hline.y1 = $yScale($nearestDataPointToPointer.y);
  $: hline.y2 = $yScale($nearestDataPointToPointer.y);
  $: hline.x1 = padding.left;
  $: hline.x2 = $containerWidth - padding.right;

  // coords for vertical tooltip line
  $: vline.y1 = 0;
  $: vline.y2 = $containerHeight - padding.bottom;
  $: vline.x1 = $xScale($nearestDataPointToPointer.x);
  $: vline.x2 = $xScale($nearestDataPointToPointer.x);
</script>

<g class="tooltip-lines" transform="translate(0, 0)">
  <!-- horizontal line -->
  <line y1={hline.y1} y2={hline.y2} x1={hline.x1} x2={hline.x2} />
  <!-- vertical line -->
  <line y1={vline.y1} y2={vline.y2} x1={vline.x1} x2={vline.x2} />
</g>

<style>
  .tooltip-lines line {
    stroke: #aaa;
  }
</style>
