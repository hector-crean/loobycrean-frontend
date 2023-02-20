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

  let width = 50;
  let height = 15;
</script>

<div
  class="arrowBox"
  style="--before-border: {height / 2}px; --before-margin-top: {-height /
    2}px; width: {width}px; height: {height}px; line-height: {height}px; top: {top -
    height / 2}px; --bg-color: red"
>
  {$nearestDataPointToPointer.y}
</div>

<style>
  .arrowBox {
    z-index: 10;
    background-color: var(--bg-color);
    border-radius: 2px;
    position: absolute;
    font-size: 0.725em;
    font-weight: 200;
    color: white;
    text-align: center;
    left: 500px;
  }

  .arrowBox:before {
    content: ' ';
    z-index: 10;
    width: 0px;
    height: 0px;
    border-top: var(--before-border) solid transparent;
    border-left: var(--before-border) solid transparent;
    border-bottom: var(--before-border) solid transparent;
    border-right: var(--before-border) solid var(--bg-color);
    border-radius: 2px;
    position: absolute;
    right: 100%;
    top: 50%;
    margin-top: var(--before-margin-top);
  }
</style>
