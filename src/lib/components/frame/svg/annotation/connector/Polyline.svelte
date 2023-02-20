<script lang="ts">
    import type { PolyLine } from "../annotation.type";

    type $$Props = PolyLine["props"];

    export let points: PolyLine["props"]["points"];
    export let fittingFn: PolyLine["props"]["fittingFn"];

    const p = fittingFn(points)
        .flatMap(({ x, y }) => [x, y])
        .join(",");
</script>

<polyline points={p} fill="none" stroke="black" />
