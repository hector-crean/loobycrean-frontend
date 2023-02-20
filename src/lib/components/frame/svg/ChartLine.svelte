<script lang="ts">
    import { getContext } from "svelte";
    import type { DataLayerCtx } from "../data-layer/data-layer.types";
    import { line } from "d3-shape";

    interface $$Props {
        dataCtxKey: symbol;
        lineColor: string;
    }

    export let dataCtxKey: symbol;
    export let lineColor: string;

    const { xScale, yScale, data } = getContext<DataLayerCtx>(dataCtxKey);

    $: pathLine = line()
        .x((d) => $xScale(d[0]))
        .y((d) => $yScale(d[1]))(data.map(({ x, y }) => [x, y]));
</script>

<path class="path-line" d={pathLine} style:--stroke-color={lineColor} />

<style>
    .path-line {
        pointer-events: none;
        stroke: var(--stroke-color);

        fill: none;
        stroke-linejoin: round;
        stroke-linecap: round;
        stroke-width: 2;
    }
</style>
