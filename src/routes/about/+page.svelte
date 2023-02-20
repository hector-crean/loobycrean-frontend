<script lang="ts">
  import { goto } from '$app/navigation';
  import loobyAtDoorPngPath from '$lib/assets/images/looby/looby-at-door.png';
</script>

<main class="layout-grid">
  <div class="exit"><span class="span-text" on:click={() => goto('/')}>Exit</span></div>
  <div class="content-area">
    <figure>
      <img src={loobyAtDoorPngPath} class="face-in" />
      <figcaption>Looby at home</figcaption>
    </figure>
    <!-- <p class="fade-in-text">
      Thirteen years trading Crude oil and Derivatives, plus bringing up three small boys is, I
      discovered, extremely useful experience for the running an interior design company - plus the
      year I spent at the Inchbald learning directly about the trade itself. We are a business of
      three. We focus completely on large scale residential projects. The business has been
      operating for five years. Each project is completely 'self contained' from an aesthetic point
      of view. We take a very clear brief from our client - frequently this will be simply by
      understanding their own particular lifestyle and leanings. We place great emphasis on the
      productive use of all the space and its flexibility based on their family unit. Although our
      designs cover a very wide range of styles- from Gustavian simplicity to modernist, slick
      interiors, the unifying factors include: Simplicity using the highest quality, 'honest'
      components. We do not use any 'reproduced' components whether in furniture or in the fabric of
      the house. Floorboards are wide and finished naturally; virtually all furniture is designed
      in-house and made to order. Knobs may be cast silver; tables could be slabs of perfect timber
      on perspex bases or indeed a table simply hewn as boards from a huge tree, 70mm thick and 4
      metres long, sitting on slabs; mirrors may have oversized solid silver simple candle sconces
      for church candles. Suedes, knobbly wools, hand woven paisleys, heavy linens, simple prints,
      embroidered cottons and sumptuous heavy silks tend to be the repertoire. Aside from the design
      aspect of the business, the key areas to emphasise are documentation, delivery and price.
      Designs are presented in board form complete with all price information for the entire
      project. Accounting is meticulous and statements sent out on a weekly basis. The client is
      provided with a complete file of all images and pricing for every item on agreement. All
      design work is priced at a fixed rate and provided to the client as an offer prior to
      commitment. We work extremely hard to deliver on schedule. The service we provide encompasses
      the following: Liaise with the client and take the brief; Propose General and Sub Contractors
      if not already in place; Propose Architect if required or if not already in place; Develop the
      overall scheme including the complete and detailed layout of all spaces; Specify all finishes
      to architect where one is involved; Design the Mechanical Services Schemes - Heating and
      Lighting layouts and specifications; Specify all floor and wall surfaces/finishes; Provide
      detailed information to the architect (if exists), for drawing up of details for
      bathroom/kitchen layout and furniture/equipment; Work with the architect in all areas where
      there is overlap between structure and surfaces of the house; Present highly detailed and
      finished scheme to the client based on the initial brief and subsequent communication. This is
      in the form of visual boards with attendant detailed information on all finishes and
      furniture, plus a very detailed and complete budget on everything presented; Agree scheme and
      present total final costing prior to execution of this stage of the project which does not
      overlap with General/sub contractors or Architect; Execute scheme to finish and provide
      constant detailed statement of accounts.
    </p> -->
  </div>
</main>

<style lang="scss">
  @use 'sass:math';
  @use 'sass:color';
  @import '../../styles/colors';
  @import '../../styles/vars';

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

  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .fade-in {
    animation: fade-in 2s;
  }

  .layout-grid {
    background-color: grey;
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
      '. . . . . . . . . . exit .'
      '. . . . . . . . . . . .'
      '. . . . . . . . . . . .'
      '. . . centre centre centre centre centre centre . . .'
      '. . . centre centre centre centre centre centre . . .'
      '. . . centre centre centre centre centre centre . . .'
      '. . . centre centre centre centre centre centre . . .'
      '. . . . . . . . . . . .'
      '. . . . . . . . . . . .'
      '. contact contact contact . . . . projects projects projects .'
      '. . . . . . . . . . . .';

    .content-area {
      grid-area: 1 / 3 / 13 / 11;
      overflow-y: scroll;

      padding: 2rem 0rem;
      @include flex(column);

      align-items: center;
      justify-content: center;

      font-size: $space-m;
      line-height: $space-l;
      color: $primary-light;
    }
  }

  figure {
    width: clamp(400px, 0.8 * min(100vw, 100vh), 100vw);
    height: clamp(400px, 0.8 * min(100vw, 100vh), 100vh);

    @include flex(column);
    align-items: center;
    justify-items: center;

    figcaption {
      width: 100%;
      font-size: $space-s;
      text-align: center;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .exit {
    grid-area: exit;
    @include flex(column);
    align-items: center;
    justify-content: center;
    text-align: center;
    color: rgb(228, 227, 227);
  }

  .span-text {
    border-bottom: 2px solid adjust-color($color: $primary-light, $alpha: -0.9);
    transition: border-bottom 0.4s ease-in;
    &:hover {
      border-bottom: 2px solid $primary-light;
    }
  }

  .para-text {
    span {
      border-bottom: 2px solid adjust-color($color: $primary-light, $alpha: -0.9);
      transition: border-bottom 0.4s ease-in;
    }
    &:hover {
      span {
        border-bottom: 2px solid $primary-light;
      }
    }
  }
</style>
