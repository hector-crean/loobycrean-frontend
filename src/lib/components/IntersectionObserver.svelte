<script lang="ts">
  import { defaultDomRect, type DomRect } from '$lib/utils/dom-rect';
  import { interval, Observable } from 'rxjs';
  import { throttle } from 'rxjs/operators';
  import { createEventDispatcher, onMount } from 'svelte';
  import { writable } from 'svelte/store';

  // API -----------------------------------------------

  interface $$Props {
    options?: IntersectionObserverInit;
  }
  export let options: IntersectionObserverInit = {
    root: null,
    rootMargin: '0px 0px 0px 0px',
    threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
  };

  interface $$Slot {
    default: {
      boundingClientRect: DomRect;
      intersectionRatio: number;
      intersectionRect: DomRect;
      isIntersecting: boolean;
      time: number;
      progressionRatio: number;
    };
  }
  interface $$Events {
    intersectionend: never;
    intersectionstart: never;
    reachedend: never;
    progression: CustomEvent<{ progressionRatio: { seenAll: number; passThrough: number } }>;
  }
  // ---------------------------------------------------

  const boundingClientRect = writable<DomRect>(defaultDomRect);
  const intersectionRatio = writable<number>(0);
  const intersectionRect = writable<DomRect>(defaultDomRect);
  const isIntersecting = writable<boolean>(false);
  const time = writable<number>(0);
  const progressionRatio = writable<{ seenAll: number; passThrough: number }>({
    seenAll: 0,
    passThrough: 0
  });

  $: console.log($isIntersecting);

  let wrapperEl: HTMLElement;
  let windowInnerHeight: number;

  const dispatch = createEventDispatcher<{
    intersectionend: never;
    intersectionstart: never;
    reachedend: never;
    progression: { progressionRatio: { seenAll: number; passThrough: number } };
  }>();

  const intersectionObserver = <T extends HTMLElement>(
    element: T,
    options?: IntersectionObserverInit
  ): Observable<IntersectionObserverEntry> => {
    return new Observable<IntersectionObserverEntry>((subscriber) => {
      const intersectionObserver = new IntersectionObserver(
        (entries: IntersectionObserverEntry[]) => {
          for (let entry of entries) {
            if (entry.target === element) {
              subscriber.next(entry);
              break;
            }
          }
        },
        options
      );

      intersectionObserver.observe(element);

      return () => {
        intersectionObserver.unobserve(element);
        intersectionObserver.disconnect();
      };
    });
  };

  const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);

  const round = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;

  const handleWheel = () => {
    if (isIntersecting) {
      const rect = wrapperEl.getBoundingClientRect();
      $progressionRatio = {
        passThrough: clamp(1 - round(rect.bottom / (rect.height + windowInnerHeight)), 0, 1),
        seenAll: clamp(round(Math.abs(rect.top / (rect.height - windowInnerHeight))), 0, 1)
      };
    }
  };
  onMount(() => {
    const intersection$ = intersectionObserver(wrapperEl, options).pipe(
      throttle(() => interval(10))
    );

    const subscription = intersection$.subscribe((entry) => {
      $isIntersecting = entry.isIntersecting;
      $isIntersecting = entry.isIntersecting;
      $boundingClientRect = entry.boundingClientRect;
      $intersectionRatio = entry.intersectionRatio;
      $intersectionRect = entry.intersectionRect;
      $time = entry.time;

      $progressionRatio = {
        seenAll: clamp(
          round(
            Math.abs(
              entry.boundingClientRect.top / (entry.boundingClientRect.height - windowInnerHeight)
            )
          ),
          0,
          1
        ),
        passThrough: clamp(
          1 -
            round(
              entry.boundingClientRect.bottom /
                (entry.boundingClientRect.height + windowInnerHeight)
            ),
          0,
          1
        )
      };
    });

    return () => subscription.unsubscribe();
  });

  $: if ($isIntersecting === true && $progressionRatio.passThrough > 0.9) dispatch('reachedend');
  $: dispatch('progression', { progressionRatio: $progressionRatio });
</script>

<svelte:window bind:innerHeight={windowInnerHeight} on:wheel={handleWheel} />
<div bind:this={wrapperEl} class:hug-contents={false} class:expand-to-fill={true}>
  <slot
    isIntersecting={$isIntersecting}
    boundingClientRect={$boundingClientRect}
    intersectionRatio={$intersectionRatio}
    intersectionRect={$intersectionRect}
    time={$time}
    progressionRatio={$progressionRatio}
  />
</div>

<style lang="scss">
  .expand-to-fill {
    width: 100%;
    height: 100%;
  }
</style>
