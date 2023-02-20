<script lang="ts">
  interface $$Slots {
    default: never;
    toc: {};
    information: {};
    questionnaire: {};
  }
</script>

<main class="container">
  <div class="toc"><slot name="toc" /></div>
  <div class="information"><slot name="information" /></div>
  <div class="questionnaire"><slot name="questionnaire" /></div>
</main>

<style lang="scss">
  @import '../../styles/mixins/scrollbar';

  .container {
    width: 100%;
    height: 100%;
    max-height: 100vh;

    display: grid;
    grid-template-columns: clamp(300px, 30%, 500px) 2fr 2fr;
    grid-template-rows: 1fr;
    gap: 0px 0px;
    grid-template-areas: 'toc information questionnaire';

    overflow: hidden;
  }
  .toc {
    overflow-y: none;
    grid-area: toc;
    background-color: rgb(31, 30, 30);
    @include hide-scrollbar();
    overflow-y: scroll;
    scroll-behavior: smooth;
  }

  .information {
    grid-area: information;
    background-color: rgb(31, 30, 30);
    max-height: 100vh;
  }

  .questionnaire {
    grid-area: questionnaire;
    background-color: rgb(31, 30, 30);
    max-height: 100vh;
  }
</style>
