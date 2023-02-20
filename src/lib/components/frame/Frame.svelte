<script lang="ts">
  import { resizeObserver } from '$lib/components/frame/observers/resize-observer';
  import { onMount, setContext } from 'svelte';
  import { spring } from 'svelte/motion';
  import { writable } from 'svelte/store';
  import { fade } from 'svelte/transition';
  import { frameCtxKey } from './context-keys';
  import type { FrameCtx, Padding } from './frame.type';
  import { round2dp } from './utils/math';

  //https://www.newline.co/@kchan/state-management-with-svelte-context-api-part-2--cecddbc5

  /**	The .chart-container `<div>` tag.  */
  type Datum = $$Generic;

  type $$Props = {
    padding: Padding;
  };

  type $$Slots = {
    default: {
      frameCtxKey: symbol;
    };
  };
  export let padding: Padding;

  //   export let data: Iterable<A>;
  let frameContainerEl: HTMLDivElement;

  let containerWidth = writable(100);
  let containerHeight = writable(100);

  let innerWidth = writable($containerWidth - (padding.left + padding.right));
  let aspectRatio = writable(round2dp($containerWidth / $containerHeight));

  let scale = writable({ sx: 1, sy: 1, sz: 1 });
  let translation = spring({ tx: 0, ty: 0, tz: 0 });
  let rotation = spring({ rx: 0, ry: 0, rz: 0 });

  const clamp = (x: number, min: number, max: number) => Math.min(Math.max(x, min), max);

  const pointer = writable({
    offset: {
      x: 0,
      y: 0
    },
    normalisedCartesian: { x: 0, y: 0 },
    ndc: { x: 0, y: 0 },
    pixel: { x: 0, y: 0 }
  });

  const handlePointerMove = (e: HTMLElementEventMap['pointermove']) => {
    const rect = frameContainerEl.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    pointer.set({
      offset: {
        x: e.offsetX,
        y: e.offsetY
      },
      normalisedCartesian: {
        x: x / rect.width,
        y: 1 - y / rect.height
      },
      ndc: {
        x: (x / rect.width) * 2 - 1,
        y: -(y / rect.height) * 2 + 1
      },
      pixel: {
        x: x,
        y: y
      }
    });
  };

  let ctx = {
    containerWidth,
    containerHeight,
    aspectRatio,
    innerWidth,
    scale,
    translation,
    rotation,
    padding,
    pointer
  };

  $: setContext<FrameCtx>(frameCtxKey, ctx);

  /* --------------------------------------------
   * Keep track of whethr the component has mounted
   * This is used to emit warnings once we have measured
   * the container object and it doesn't have proper dimensions
   */
  let isMounted = false;

  onMount(() => {
    const resize$ = resizeObserver(frameContainerEl, window.ResizeObserver);

    const resizeSubscription = resize$.subscribe((domRect) => {
      containerHeight.set(domRect.height);
      containerWidth.set(domRect.width);
      aspectRatio.set(domRect.width / domRect.height);
    });

    isMounted = true;

    //cleanup
    return () => {
      // gestureStreamSubscription.unsubscribe();
      resizeSubscription.unsubscribe();
    };
  });
</script>

<div
  bind:this={frameContainerEl}
  class="frame"
  transition:fade
  on:pointermove={handlePointerMove}
  on:wheel={(e) => {
    // $scale.sy = clamp($scale.sy - e.deltaY / $containerHeight, 0.1, 5);
  }}
>
  {#if isMounted}
    <slot {frameCtxKey} />
  {/if}
</div>

<!-- <Cursor /> -->
<style lang="scss">
  .frame {
    --frame-text-color-1: var(--text-theme-color-1);
    --frame-text-color-2: var(--text-theme-color-2);
    --frame-bg-color-1: var(--bg-theme-color-1);
    --frame-bg-color-2: var(--bg-theme-color-2);

    /* transform-origin: 0 0; */
    /* -webkit-transform-origin: 0 0; */
    /* transition: transform 0.1s ease-in-out; */

    width: 100%;
    height: 100%;
    position: relative;
    touch-action: none;
    -webkit-user-select: none;
    user-select: none;
    pointer-events: all;
    /* transform-origin: 0% 0%; */
    transform-style: preserve-3d;

    &:focus {
    }
  }
</style>
