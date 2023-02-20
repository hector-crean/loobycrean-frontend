<script lang="ts">
    import type { DataLayerCtx } from "$lib/components/frame/data-layer/data-layer.types";
    import { getContext } from "svelte";
    import type { Circle } from "../annotation.type";

    type $$Props = Circle["props"] & { dataCtxKey: symbol };

    export let position: Circle["props"]["position"];
    export let r: Circle["props"]["r"];
    export let stroke: Circle["props"]["stroke"];
    export let fill: Circle["props"]["fill"];

    export let dataCtxKey: symbol;

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

<circle cx={position.x * $aspectRatio} cy={position.y} {r} {stroke} {fill} />
