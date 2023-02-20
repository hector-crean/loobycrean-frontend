<script lang="ts">
  import theGuardship from '$lib/assets/images/looby/The Guardship 17.jpg';
  import { spring } from 'svelte/motion';

  const titleOffset = spring(0, { stiffness: 0.9, damping: 0.7 });
</script>

<!-- <Cursor kind={$cursorKind} /> -->

<div class="landing-page-grid">
  <div class="fill-grid">
    <img src={theGuardship} />
  </div>
  <div class="centre" style:transform="translateX({600 * $titleOffset}%)">
    <span class="main-title">Looby Crean Ltd</span>
  </div>
  <!-- <div class="about" style:transform="translateX({600 * $titleOffset}%)">
    <a class="links" href="/about">About</a>
  </div> -->
  <div class="contact" style:transform="translateX({600 * $titleOffset}%)">
    <a class="links" href="/contact">Contact</a>
  </div>
</div>

<style lang="scss">
  @use 'sass:color';
  @import '../styles/colors';
  @import '../styles/breakpoints';
  @import '../styles/vars.scss';
  @import '../styles/mixins/scrollbar';

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

  .landing-page-grid {
    @include filling();
    @include viewport();
    overflow-y: hidden;

    /* cursor: none !important; */
    box-shadow: inset 0 -1px 0 0 rgba(0, 0, 0, 0.1);
    z-index: 0;
    background-color: transparent;
    display: grid;
    grid-template-columns: 40px 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 40px;
    grid-template-rows: 40px 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 40px;
    gap: 0px 0px;
    grid-template-areas:
      '. . . . . . . . . . . .'
      '. . . . . . . . . . . .'
      '. . . . . . . . . . . .'
      '. . . centre centre centre centre centre centre . . .'
      '. . . centre centre centre centre centre centre . . .'
      '. . . centre centre centre centre centre centre . . .'
      '. . . centre centre centre centre centre centre . . .'
      '. . . . . . . . . . . .'
      '. . . . . . . . . . . .'
      '. . . . . . . . . . . .'
      '. . . . . contact contact . . . . .'
      '. . . . . . . . . . . .';
  }
  .fill-grid {
    overflow: hidden;
    grid-area: 1 / 1 / 13 / 13;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .main-title {
    font-size: $space-2xl;
    line-height: calc(1.2 * $space-2xl);
    color: white;
  }

  .centre {
    grid-area: centre;
    @include flex(column);
    align-items: center;
    justify-content: center;
    text-align: center;
    color: rgb(228, 227, 227);
  }
  .contact {
    grid-area: contact;
    @include flex(column);
    align-items: center;
    justify-content: center;
    text-align: center;
    color: rgb(228, 227, 227);
  }

  .about {
    grid-area: about;
    @include flex(column);
    align-items: center;
    justify-content: center;
    text-align: center;
    color: rgb(228, 227, 227);
  }

  .links {
    color: $primary-light;
    font-size: $space-xl;
    line-height: calc(1.2 * $space-xl);
    border-bottom: 2px solid adjust-color($color: $primary-light, $alpha: -0.9);
    transition: border-bottom 0.4s ease-in;

    &:hover {
      border-bottom: 2px solid $primary-light;
    }
  }

  /* background: rgb(78, 72, 84);
    background: linear-gradient(90deg, rgba(78, 72, 84, 1) 0%, rgba(74, 73, 77, 1) 100%); */
</style>
