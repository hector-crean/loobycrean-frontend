<script lang="ts">
  import { fly } from 'svelte/transition';

  interface $$Props {
    pathname: string;
  }
  export let pathname = '';
</script>

{#key pathname}
  <div in:fly={{ x: -10, duration: 500, delay: 500 }} out:fly={{ x: 5, duration: 500 }}>
    <slot />
  </div>
{/key}
