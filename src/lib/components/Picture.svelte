<script lang="ts">
  import type { Source, SourceSetElement } from './Picture.api';

  interface $$Props {
    sources: Array<Source>;
    defaultSrc: string;
    alt: string;
  }

  export let sources: Array<Source>;
  export let defaultSrc: string;
  export let alt: string;

  type Into<T1, T2> = (from: T1) => T2;

  const intoSourceSetString: Into<Array<SourceSetElement>, string> = (from) =>
    from.reduce((acc: string, v: SourceSetElement) => `${acc}, ${v.src} ${v.width}w`, '');
</script>

<picture>
  {#each sources as { type, media_query, srcset }}
    <source media={media_query} {type} srcset={intoSourceSetString(srcset)} />
  {/each}

  <img src={defaultSrc} {alt} loading="lazy" decoding="async" />
</picture>
