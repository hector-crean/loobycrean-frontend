<script lang="ts">
  import type { DataLayerCtx } from '$lib/components/frame/data-layer/data-layer.types';
  import { getContext } from 'svelte';

  interface $$Props {
    dataCtxKey: symbol;
  }

  export let dataCtxKey: symbol;

  const {
    xScale,
    yScale,
    data,
    padding,
    containerHeight,
    containerWidth,
    nearestDataPointToPointer,
    pointer,
    aspectRatio
  } = getContext<DataLayerCtx>(dataCtxKey);
</script>

<div
  class:positioning={true}
  style:left="{($xScale($nearestDataPointToPointer.x) * $containerWidth) / $aspectRatio}px"
  style:top={0}
>
  <div class="arrow-box">
    {$nearestDataPointToPointer.x}
  </div>
</div>

<style lang="scss">
  $arrow-size: 10px;
  $arrowbox-baground-color: rgba(5, 5, 5, 0.822);

  @mixin box-arrow($arrowDirection, $arrowColor, $arrowSize: 10px) {
    position: relative;
    z-index: 10;

    &::after {
      content: '';
      width: 0;
      height: 0;
      display: block;
      position: absolute;
      z-index: 10;
      border: 0;

      @if $arrowDirection == bottom or $arrowDirection == top {
        border-left: $arrowSize solid transparent;
        border-right: $arrowSize solid transparent;
        margin-left: -$arrowSize;
        left: 50%;

        @if $arrowDirection == bottom {
          border-top: $arrowSize solid $arrowColor;
          bottom: -$arrowSize;
        }

        @if $arrowDirection == top {
          border-bottom: $arrowSize solid $arrowColor;
          top: -$arrowSize;
        }
      }

      @if $arrowDirection == left or $arrowDirection == right {
        border-top: $arrowSize solid transparent;
        border-bottom: $arrowSize solid transparent;
        margin-top: -$arrowSize;
        top: 50%;

        @if $arrowDirection == left {
          border-right: $arrowSize solid $arrowColor;
          left: -$arrowSize;
        }

        @if $arrowDirection == right {
          border-left: $arrowSize solid $arrowColor;
          left: auto;
          right: -$arrowSize;
        }
      }
    }
  }

  .positioning {
    position: absolute;
    transform: translate(-50%, calc(-100% - $arrow-size));
    z-index: 15;
    background-color: $arrowbox-baground-color;
    color: white;
  }

  .arrow-box {
    @include box-arrow(bottom, $arrowbox-baground-color, $arrow-size);
    min-width: 120px;
    display: grid;
    align-items: center;
    justify-items: center;
  }
</style>
