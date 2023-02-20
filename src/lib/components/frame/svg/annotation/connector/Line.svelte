<script lang="ts">
    import type { DataLayerCtx } from "$lib/components/frame/data-layer/data-layer.types";
    import { getContext } from "svelte";
    import { draw } from "svelte/transition";
    import type { Line } from "../annotation.type";

    type $$Props = Line["props"] & { dataCtxKey: symbol };
    export let dataCtxKey: symbol;

    export let x1: Line["props"]["x1"];
    export let x2: Line["props"]["x2"];
    export let y1: Line["props"]["y1"];
    export let y2: Line["props"]["y2"];
    export let stroke: Line["props"]["stroke"];
    export let pathLength: Line["props"]["pathLength"] = 1;
    export let strokeWidth: Line["props"]["strokeWidth"] = 1;

    const {
        xScale,
        yScale,
        meta,
        data,
        containerHeight,
        containerWidth,
        aspectRatio,
    } = getContext<DataLayerCtx>(dataCtxKey);
</script>

<line
    in:draw
    {x1}
    {x2}
    {y1}
    {y2}
    {stroke}
    {pathLength}
    stroke-width={strokeWidth}
/>
