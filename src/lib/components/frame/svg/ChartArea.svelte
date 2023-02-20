<script lang="ts">
    import { getContext } from "svelte";
    import type { DataLayerCtx } from "../data-layer/data-layer.types";
    import { area } from "d3-shape";

    interface $$Props {
        dataCtxKey: symbol;
        areaColor: string;
    }

    export let dataCtxKey: symbol;
    export let areaColor: string;

    const { xScale, yScale, data, padding, meta } =
        getContext<DataLayerCtx>(dataCtxKey);

    $: pathArea = area()
        .x((d) => $xScale(d[0]))
        .y1((d) => $yScale(d[1]))
        .y0($yScale(meta.ys.smallest))(data.map(({ x, y }) => [x, y]));
</script>

<path class="path-area" d={pathArea} style:--area-color={areaColor} />

<style>
    .path-area {
        pointer-events: none;
        fill: var(--area-color);
        opacity: 0.3;
    }
</style>
