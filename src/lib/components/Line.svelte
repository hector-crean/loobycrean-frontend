<script lang="ts">
  export let start: [x1: number, y1: number];
  export let end: [x2: number, y2: number];

  const [x1, y1] = start;
  const [x2, y2] = end;
</script>

<svg viewBox="0 0 {x1} {y1}" xmlns="http://www.w3.org/2000/svg">
  <line x1="0" y1="80" x2="100" y2="20" stroke="black" />

  <!-- If you do not specify the stroke
         color the line will not be visible -->
</svg>
