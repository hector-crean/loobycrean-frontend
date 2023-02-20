<script lang="ts">
    import type { Rectangle } from "../annotation.type";

    type $$Props = Rectangle["props"];

    export let position: Rectangle["props"]["position"];
    export let width: Rectangle["props"]["width"];
    export let height: Rectangle["props"]["height"];
</script>

<rect {width} {height} x={position.x} y={position.y} />
