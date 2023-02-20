<script lang="ts">
  import type { DataLayerCtx } from '$lib/components/frame/data-layer/data-layer.types';
  import { getContext } from 'svelte';

  interface $$Props {
    dataCtxKey: symbol;
  }

  export let dataCtxKey: symbol;

  const { xScale, yScale, nearestDataPointToPointer } = getContext<DataLayerCtx>(dataCtxKey);
</script>

<g>
  <circle
    cx={$xScale($nearestDataPointToPointer.x)}
    cy={$yScale($nearestDataPointToPointer.y)}
    r="0.01"
    stroke="white"
    stroke-width="3"
    fill="none"
  />
  <circle
    cx={$xScale($nearestDataPointToPointer.x)}
    cy={$yScale($nearestDataPointToPointer.y)}
    r="0.012"
    stroke="red"
    stroke-width="2"
    fill="none"
  />
</g>

<style>
</style>
