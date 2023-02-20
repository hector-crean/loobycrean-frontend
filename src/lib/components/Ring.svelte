<script lang="ts">
  interface $$Props {
    radius: number;
    arcRatio: number;
  }

  export let radius: number;
  export let arcRatio: number;
</script>

<svg viewBox="0 0 520 520" fill="none" class="ring"
  ><circle
    class="text-black"
    stroke="currentColor"
    stroke-width="18"
    opacity="0.1"
    cx="260"
    cy="260"
    r={`${radius}`}
  /><circle
    class="text-red"
    stroke="currentColor"
    stroke-width="18"
    cx="260"
    cy="260"
    r={`${radius}`}
    stroke-dasharray="1577.0795121020763"
    stroke-dashoffset={(1 - arcRatio) * 2 * Math.PI * radius}
  /></svg
>
