<script lang="ts">
    import type { PartitionLine } from "../annotation.type";

    type $$Props = PartitionLine["props"];

    export let x1: number;
    export let x2: number;
    export let y1: number;
    export let y2: number;
</script>

<line {x1} {x2} {y1} {y2} stroke="orange" stroke-width="5" />
