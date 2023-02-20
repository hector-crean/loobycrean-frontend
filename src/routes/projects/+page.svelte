<script lang="ts">
  import looby_at_door_png from '$lib/assets/images/looby/looby-at-door.png';
  import { cursorKind } from '$lib/components/cursor.store';
  import Cursor from '$lib/components/Cursor.svelte';
  import IntersectionObserver from '$lib/components/IntersectionObserver.svelte';
</script>

<Cursor kind={$cursorKind} />

<article>
  <IntersectionObserver let:isIntersecting>
    <section data-kind="fullscreen">
      <figure>
        <img
          alt="looby-at-door"
          src={looby_at_door_png}
          class:animation-fade-in={isIntersecting}
          class:animation-fade-out={!isIntersecting}
        />
        <figcaption>This is the caption here</figcaption>
      </figure>
    </section>
  </IntersectionObserver>

  <IntersectionObserver let:isIntersecting>
    <section data-kind="fullscreen">
      <figure>
        <img
          alt="looby-at-door"
          src={looby_at_door_png}
          class:animation-fade-in={isIntersecting}
          class:animation-fade-out={!isIntersecting}
        />
        <figcaption>This is the caption here</figcaption>
      </figure>
    </section>
  </IntersectionObserver>
</article>

<style lang="scss">
  @use 'sass:math';

  @mixin flex($direction) {
    display: flex;
    flex-direction: $direction;
  }
  @mixin filling() {
    width: 100%;
    height: 100;
  }
  @mixin viewport() {
    min-width: 100vw;
    min-height: 100vh;
    max-width: 100vw;
    max-height: 100vh;
  }
  @mixin keyframe($animation_name) {
    @keyframes #{$animation_name} {
      @content;
    }
  }

  @mixin animation($delay, $duration, $animation, $direction: forward, $fillmode: fowards) {
    animation-delay: $delay;
    animation-duration: $duration;
    animation-name: $animation;
    animation-fill-mode: $fillmode;
    animation-direction: $direction;
  }

  * {
    cursor: none !important;
  }

  // fade-in
  @include keyframe(animation-fade-in) {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @include keyframe(animation-fade-out) {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  .animation-fade-in {
    @include animation(0.2s, 1s, animation-fade-in, ease);
  }
  .animation-fade-out {
    @include animation(2s, 1s, animation-fade-out, ease);
  }

  article {
    padding: 0;
    margin: 0;
    @include filling();
    @include flex(column);
    @include viewport();
    overflow-y: scroll;
    flex-basis: 50%;
    scroll-snap-type: y mandatory;
  }

  section {
    @include filling();
    @include viewport();
    @include flex(column);
    align-items: center;
    justify-content: center;
    scroll-snap-align: start;
  }

  figure {
    width: clamp(200px, 0.7 * min(100vw, 100vh), 100vw);
    height: clamp(200px, 0.7 * min(100vw, 100vh), 100vh);

    @include flex(column);
    align-items: center;
    justify-items: center;

    img {
      /* transform: translateX(50%); */
      opacity: 1;
      transition: opacity 0.2s;
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  /* *,
  * > *,
  * > * > * {
    border: 2px solid red;
  } */

  ///
</style>
