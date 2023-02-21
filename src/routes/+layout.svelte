<script lang="ts">
  import { fade } from 'svelte/transition';
  import '../app.scss';
  import type { LayoutData } from './$types';

  export let data: LayoutData;
</script>

{#key data.pathname}
  <div in:fade={{ delay: 500, duration: 500 }} out:fade={{ delay: 0, duration: 500 }}>
    <slot />
  </div>
{/key}

<style lang="scss">
  ::selection {
    background: rgba(218, 75, 43, 0.8);
  }

  div {
    width: 100%;
    height: 100%;
    max-height: 100vh;
    max-width: 100vw;
    overflow: hidden;
  }
</style>
