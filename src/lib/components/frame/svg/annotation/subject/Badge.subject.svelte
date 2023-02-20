<script lang="ts">
    import type { Badge } from "../annotation.type";
    type $$Props = Badge["props"];

    export let width: number;
    export let height: number;
    export let postition: { x: number; y: number };
</script>

<circle cx={postition.x} cy={postition.y} r="20" />
