<script lang="ts">
  import { useFrame } from '@threlte/core';
  import CameraControls from 'camera-controls';
  import { onMount } from 'svelte';
  import type { PerspectiveCamera } from 'three';
  import * as THREE from 'three';

  interface $$Props {
    camera: PerspectiveCamera;
    domElement: HTMLCanvasElement;
  }
  interface $$Slots {
    default: {
      controls: CameraControls;
    };
  }
  export let camera: PerspectiveCamera;
  export let domElement: HTMLCanvasElement;

  CameraControls.install({ THREE: THREE });

  const controls = new CameraControls(camera, domElement);

  onMount(() => {
    controls.addEventListener('transitionstart', (e) => {});

    return () => {
      controls.removeEventListener('transitionstart', (e) => {});
    };
  });

  useFrame((_, dt) => {
    controls.update(dt);
  });
</script>

<slot {controls} />

<!-- <svelte:window on:keyup={} on:keydown={}/> -->
