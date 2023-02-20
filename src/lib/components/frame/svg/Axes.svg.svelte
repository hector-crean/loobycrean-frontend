<script lang="ts">
  import { getContext } from 'svelte';
  import { fade } from 'svelte/transition';
  import type { DataLayerCtx } from '../data-layer/data-layer.types';

  type $$Props = {
    dataCtxKey: symbol;
    numberYTicks: number;
    numberXTicks: number;
  };

  export let dataCtxKey: symbol;
  export let numberYTicks: number;
  export let numberXTicks: number;

  const { xScale, yScale, meta, data, containerHeight, containerWidth } =
    getContext<DataLayerCtx>(dataCtxKey);

  $: xTicks = $xScale.ticks(numberXTicks);
  $: yTicks = $yScale.ticks(numberYTicks);
</script>

<!-- y = k lines-->
{#each yTicks as tick}
  <g class="y-tick" transform="translate(0, {$yScale(tick)})">
    <!-- <line
			x1={$xScale(meta.xs.smallest)}
			x2={$xScale(meta.xs.largest)}
			y1="0"
			y2="0"
		/> -->
    <line x2="100%" />

    <text
      in:fade
      fill="red"
      transform="scale({1 / $containerWidth}, {-1 / $containerHeight})"
      x={$xScale(meta.xs.smallest)}
      y={-0.005 * $containerHeight}>{tick}</text
    >
  </g>
{/each}

<!-- x axis -->
{#each xTicks as xTick, i}
  <g class="x-tick" transform="translate({$xScale(xTick)},{0})">
    <text
      in:fade
      fill="red"
      transform="scale({1 / $containerWidth}, {-1 / $containerHeight})"
      x={0}
      y={0.04 * $containerHeight}>{xTick}</text
    >
  </g>
{/each}

<style lang="scss">
  .chart-title {
    font-weight: 600;
    font-size: large;
  }
  .chart-labels {
    font-weight: 300;
    font-size: x-large;
    font-weight: bold;
  }
  .chart-axes-label {
  }

  .y-tick {
    font-family: Helvetica, Arial;
    font-size: 0.725em;
    font-weight: 200;

    line {
      stroke: #e2e2e2;
      stroke-dasharray: 2;
    }
    text {
      text-anchor: start;
      fill: #ccc;
      font-size: var(--step-2);
      width: 100%;
      height: 100%;
    }
  }
  .x-tick {
    font-family: Helvetica, Arial;
    font-size: 0.725em;
    font-weight: 200;

    line {
      stroke: #9a0b0b;
      fill: yellow;
      stroke-width: 4px;
    }

    text {
      text-anchor: middle;
      fill: #ccc;
      font-size: var(--step-2);
      // transform: translateX(-50%);
    }
  }
</style>
