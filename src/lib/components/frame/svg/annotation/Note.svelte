<script lang="ts">
    import type { DataLayerCtx } from "$lib/components/frame/data-layer/data-layer.types";
    import { getContext } from "svelte";
    import type { AnnotationNote } from "./annotation.type";

    type $$Props = { note: AnnotationNote } & { dataCtxKey: symbol };

    export let dataCtxKey: symbol;
    export let note: AnnotationNote;

    const { position, title, body } = note;

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

<text
    fill="red"
    transform="scale({1 / $containerWidth}, {-1 / $containerHeight})"
    x={position.x * $containerWidth * $aspectRatio}
    y={position.y * -$containerHeight}>{body}</text
>
