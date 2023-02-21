<script lang="ts">
  import { fade, fly } from 'svelte/transition';
</script>

<main class="layout-grid">
  <div class="exit"><a class="span-text" href="/">Exit</a></div>
  <div class="centre" in:fly={{ delay: 500, duration: 2000, y: 200 }}>
    <section class="telephone">
      <a
        href="tel:+44-07771950930"
        in:fade={{ delay: 500, duration: 500 }}
        out:fade={{ duration: 500 }}>+44 07771 950 930</a
      >
    </section>
    <section class="email">
      <a
        href="mailto:looby@loobycrean.co.uk"
        in:fade={{ delay: 800, duration: 500 }}
        out:fade={{ duration: 500 }}>looby@loobycrean.co.uk</a
      >
    </section>
    <section class="address">
      <p in:fade={{ delay: 900, duration: 500 }} out:fade={{ duration: 500 }}>
        <span>Latimer House</span>
        <br />
        <span>Church Street</span>
        <br />
        <span>London, W4 2PH</span>
      </p>
    </section>
  </div>
</main>

<style lang="scss">
  @use 'sass:math';
  @use 'sass:color';
  @import '../../styles/colors';
  @import '../../styles/vars';
  @import '../../styles/breakpoints';

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

  .layout-grid {
    background-color: $primary-light;
    @include filling();
    @include viewport();
    overflow-y: hidden;

    /* cursor: none !important; */
    box-shadow: inset 0 -1px 0 0 rgba(0, 0, 0, 0.1);
    z-index: 0;
    display: grid;
    grid-template-columns: 40px 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 40px;
    grid-template-rows: 40px 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 40px;
    gap: 0px 0px;
    grid-template-areas:
      '. . . . . . . . . . . .'
      '. . . centre centre centre centre centre centre . exit .'
      '. . . centre centre centre centre centre centre . . .'
      '. . . centre centre centre centre centre centre . . .'
      '. . . centre centre centre centre centre centre . . .'
      '. . . centre centre centre centre centre centre . . .'
      '. . . centre centre centre centre centre centre . . .'
      '. . . centre centre centre centre centre centre . . .'
      '. . . centre centre centre centre centre centre . . .'
      '. . . centre centre centre centre centre centre . . .'
      '. . . centre centre centre centre centre centre . . .'
      '. . . . . . . . . . . .';

    .fill-grid {
      grid-area: 1 / 1 / 13 / 13;
    }
  }

  .centre {
    overflow: visible;
    grid-area: centre;
    @include flex(column);
    align-items: center;
    justify-content: center;
    text-align: center;
    color: rgb(228, 227, 227);
  }
  .exit {
    grid-area: exit;
    @include flex(column);
    align-items: center;
    justify-content: center;
    text-align: center;
    color: rgb(228, 227, 227);
    overflow: visible;
  }

  .telephone,
  .email,
  .address {
    font-size: $space-l;
    line-height: $space-xl;

    @include respond-below(sm) {
      font-size: $space-m;
      line-height: $space-l;
    }
  }
  .telephone,
  .email {
    &:hover {
      cursor: pointer;
    }
  }

  a {
    border-bottom: 2px solid rgba(255, 255, 255, 0.084);
    transition: border-bottom 0.4s ease-in;
    &:hover {
      border-bottom: 2px solid adjust-color($color: rgba(255, 255, 255, 0.084), $alpha: 0.9);
    }
  }
</style>
