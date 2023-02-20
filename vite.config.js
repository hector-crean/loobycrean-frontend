import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import gltf from 'vite-plugin-gltf';

import { dedup, draco, prune, textureResize } from "@gltf-transform/functions";

// import * as squoosh from "@squoosh/lib";

// https://vitejs.dev/config/
export default defineConfig({
  ssr: {
    noExternal: ['three', 'troika-three-text']
  },
  plugins: [
    sveltekit(),
    gltf({
      transforms: [
        // remove unused resources
        prune(),
        // combine duplicated resources
        dedup(),
        // keep textures under 2048x2048
        textureResize({ size: [2048, 2048] }),
        // optimize images
        // mozjpeg({ squoosh }),
        // oxipng({ squoosh }),
        // compress mesh geometry
        draco(),
      ]
    })
  ],


  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  // prevent vite from obscuring rust errors
  clearScreen: false,
  // tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
  },
  // to make use of `TAURI_DEBUG` and other env variables
  // https://tauri.studio/v1/api/config#buildconfig.beforedevcommand
  envPrefix: ["VITE_", "TAURI_"],
  build: {
    // Tauri supports es2021
    target: ["es2021", "chrome100", "safari13"],
    // don't minify for debug builds
    minify: !process.env.TAURI_DEBUG ? "esbuild" : false,
    // produce sourcemaps for debug builds
    sourcemap: !!process.env.TAURI_DEBUG,
  },
});
