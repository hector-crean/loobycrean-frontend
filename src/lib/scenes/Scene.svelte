<script lang="ts">
  import { cursorKind } from '$lib/components/cursor.store';
  import {
    InteractiveObject,
    LightInstance,
    OrbitControls,
    T,
    TransformableObject,
    useThrelte
  } from '@threlte/core';
  import { spring } from 'svelte/motion';
  import { writable } from 'svelte/store';
  import { PerspectiveCamera, RectAreaLight, TextureLoader, Vector3 } from 'three';
  import { cameraFitPosition } from './utils';

  type State =
    | { tag: 'pre-diagnosis:reading-patient-records' }
    | { tag: 'post-diagnosis:reading-patient-records' }
    | { tag: 'post-diagnosis:reading-decision-tree' };

  const CIRCLE_RADIUS = 3.5;

  const vec3 = (vec3: { x: number; y: number; z: number }) => new Vector3(vec3.x, vec3.y, vec3.z);

  //camera
  const aspect = writable(window.innerWidth / window.innerHeight);
  const fov = writable(45);

  const screenWidth = writable($aspect);
  const screenHeight = writable(1);
  const screenDepth = writable(0.1);

  const textureLoader = new TextureLoader();

  let lightIntensity: number = 8;
  const rectLight = new RectAreaLight(0xffffff, lightIntensity, 10, 10);

  interface Screen {
    position: { x: number; y: number; z: number };
    unnormalisedNormal: { x: number; y: number; z: number };
    content: string;
    imgUrl: string;
  }

  const screens: Array<Screen> = [
    {
      position: { x: -2, y: 0, z: -1 },
      unnormalisedNormal: { x: 0, y: 0, z: 1 },
      content: '<strong>Screen</strong> 1',
      imgUrl:
        'https://cdn2.unrealengine.com/unreal-engine-random42-feature-3-4k-3840x2160-aaf1dae4d54f.jpg'
    },
    {
      position: { x: 0, y: 0, z: 1 },
      unnormalisedNormal: { x: 0, y: 0, z: 1 },
      content: '<strong>Screen</strong> 2',
      imgUrl: 'https://live.staticflickr.com/6016/5925809823_4c6b4961c0_b.jpg'
    },
    {
      position: { x: 2, y: 0, z: -1 },
      unnormalisedNormal: { x: 0, y: 0, z: 1 },
      content: '<strong>Screen</strong> 3',
      imgUrl: 'https://live.staticflickr.com/6004/5925840973_7813b52a17_z.jpg'
    }
  ];

  interface ScreenOnCirumference {
    coords: [r: number, theta: number, z: number]; //between 0 and 2Pi (0 : most distant past, 2Pi present)
    content: string;
    imgUrl: string;
  }

  const screensOnCircumference: Array<ScreenOnCirumference> = [
    {
      coords: [CIRCLE_RADIUS, 0.1 * 2 * Math.PI, 0],
      content: '<strong>Screen</strong> 1',
      imgUrl:
        'https://cdn2.unrealengine.com/unreal-engine-random42-feature-3-4k-3840x2160-aaf1dae4d54f.jpg'
    },
    {
      coords: [CIRCLE_RADIUS, 0.1 * 2 * Math.PI, 0],
      content: '<strong>Screen</strong> 2',
      imgUrl: 'https://live.staticflickr.com/6016/5925809823_4c6b4961c0_b.jpg'
    },
    {
      coords: [CIRCLE_RADIUS, 0.3 * 2 * Math.PI, 0],
      content: '<strong>Screen</strong> 3',
      imgUrl: 'https://live.staticflickr.com/6004/5925840973_7813b52a17_z.jpg'
    },
    {
      coords: [CIRCLE_RADIUS, 0.4 * 2 * Math.PI, 0],
      content: '<strong>Screen</strong> 3',
      imgUrl: 'https://live.staticflickr.com/6004/5925840973_7813b52a17_z.jpg'
    },
    {
      coords: [CIRCLE_RADIUS, 0.55 * 2 * Math.PI, 0],
      content: '<strong>Screen</strong> 3',
      imgUrl: 'https://live.staticflickr.com/6004/5925840973_7813b52a17_z.jpg'
    },
    {
      coords: [CIRCLE_RADIUS, 0.65 * 2 * Math.PI, 0],
      content: '<strong>Screen</strong> 2',
      imgUrl: 'https://live.staticflickr.com/6016/5925809823_4c6b4961c0_b.jpg'
    },
    {
      coords: [CIRCLE_RADIUS, 0.8 * 2 * Math.PI, 0],
      content: '<strong>Screen</strong> 3',
      imgUrl: 'https://live.staticflickr.com/6004/5925840973_7813b52a17_z.jpg'
    },
    {
      coords: [CIRCLE_RADIUS, 0.9 * 2 * Math.PI, 0],
      content: '<strong>Screen</strong> 1',
      imgUrl:
        'https://cdn2.unrealengine.com/unreal-engine-random42-feature-3-4k-3840x2160-aaf1dae4d54f.jpg'
    }
  ];

  let texturesLoaded = false;

  screens.forEach((screen) => {
    textureLoader.load(screen.imgUrl);
    texturesLoaded = true;
  });

  const focusedScreenPosition = writable(vec3(screens[0].position));

  const focusedScreenNormal = writable(vec3(screens[0].unnormalisedNormal).normalize());

  const cameraTarget = spring(screens[0].position, {
    stiffness: 0.1,
    damping: 0.9
  });

  const cameraPosition = spring<[x: number, y: number, z: number]>(
    cameraFitPosition(
      $screenWidth,
      $screenHeight,
      $focusedScreenPosition,
      $focusedScreenNormal,
      $fov,
      $aspect
    ),
    { stiffness: 0.1, damping: 0.9 }
  );

  let camRef: PerspectiveCamera = new PerspectiveCamera($fov, $aspect);

  // const rig = new CameraRig(camRef, scene);
  // const controls = new FreeMovementControls(rig);
  // controls.enable();

  // const rig = new CameraRig(camRef, scene);
  // const controls = new FreeMovementControls(rig);
  // controls.enable();

  const { renderer } = useThrelte();
</script>

<!-- <Studio enabled={dev} /> -->

<T.PerspectiveCamera makeDefault bind:ref={camRef} let:ref position={$cameraPosition}>
  <!-- {#if renderer?.domElement}
    <CameraControls camera={ref} domElement={renderer?.domElement} let:controls />
  {/if} -->
  <OrbitControls enableZoom={true} target={$cameraTarget} maxPolarAngle={Math.PI / 2} />
</T.PerspectiveCamera>

<T.DirectionalLight castShadow position={[3, 10, 10]} />
<T.DirectionalLight position={[-3, 10, -10]} intensity={0.2} />
<T.AmbientLight intensity={0.2} />
<LightInstance light={rectLight} intensity={lightIntensity} position={{ x: 0, y: 0 }} />

<!-- Cube -->

<!-- Screeb -->
{#if texturesLoaded}
  {#each screensOnCircumference as { coords: [r, theta, z], content, imgUrl }, idx}
    <T.Group>
      <T.Mesh castShadow let:ref>
        <InteractiveObject
          object={ref}
          interactive={true}
          on:pointerenter={() => ($cursorKind = 'plus-3D-cursor')}
          on:pointerleave={() => ($cursorKind = 'default-3D-cursor')}
          on:click={() => {
            const cartesianPosition = vec3({
              x: r * Math.cos(theta),
              y: 0,
              z: r * Math.sin(theta)
            });
            const cartesianNormal = vec3({
              x: Math.cos(theta),
              y: 0,
              z: Math.sin(theta)
            }).normalize();

            const cartesianCameraTargetPosition = vec3({
              x: 1.01 * r * Math.cos(theta),
              y: 0,
              z: 1.01 * r * Math.sin(theta)
            });

            $cameraPosition = cameraFitPosition(
              $screenWidth,
              $screenHeight,
              cartesianPosition,
              cartesianNormal,
              $fov,
              $aspect
            );
            $cameraTarget = vec3(cartesianCameraTargetPosition);
          }}
        />
        <TransformableObject
          object={ref}
          position={vec3({
            x: r * Math.cos(theta),
            y: 0,
            z: r * Math.sin(theta)
          })}
          rotation={{
            x: 0,
            y: 2 * Math.PI - theta - 0.5 * Math.PI,
            z: 0
          }}
          on:transform={() => {
            console.log('transofm handler firing');
          }}
        />
        <T.BoxGeometry attach="geometry" args={[$screenWidth, $screenHeight, $screenDepth]} />
        <T.MeshStandardMaterial
          attach="material"
          color="#333333"
          map={textureLoader.load(imgUrl)}
        />
      </T.Mesh>
    </T.Group>
  {/each}

  <T.Mesh receiveShadow rotation.x={-Math.PI / 2} position.y={-$screenHeight / 2}>
    <T.CircleGeometry attach="geometry" args={[CIRCLE_RADIUS, 72]} />
    <T.MeshStandardMaterial attach="material" color="black" />
  </T.Mesh>
{/if}

<style lang="scss">
</style>
