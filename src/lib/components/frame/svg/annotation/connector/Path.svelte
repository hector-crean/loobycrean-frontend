<script lang="ts">
    import type { DataLayerCtx } from "$lib/components/frame/data-layer/data-layer.types";
    import { curveCardinal, line } from "d3-shape";
    import { getContext } from "svelte";
    import { derived } from "svelte/store";

    import type { Path } from "../annotation.type";

    type $$Props = Path["props"] & { dataCtxKey: symbol };

    export let dataCtxKey: symbol;

    export let points: Path["props"]["points"];
    export let stroke: Path["props"]["stroke"];
    export let fill: Path["props"]["fill"];

    const {
        xScale,
        yScale,
        meta,
        data,
        containerHeight,
        containerWidth,
        aspectRatio,
    } = getContext<DataLayerCtx>(dataCtxKey);

    const d = derived(aspectRatio, ($aspectRatio) => {
        const controlPoints = points.map(
            ({ x, y }) => [x * $aspectRatio, y] as [number, number]
        );
        return line().curve(curveCardinal)(controlPoints);
    });
</script>

<path
    d={$d}
    {stroke}
    {fill}
    stroke-width="2"
    fill-opacity="0.5"
    stroke-dasharray="20,10,5,5,5,10"
/>
