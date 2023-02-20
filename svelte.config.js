import staticAdapter from "@sveltejs/adapter-static";
import { preprocessThrelte } from '@threlte/preprocess';
import preprocess from 'svelte-preprocess';
import seqPreprocessor from 'svelte-sequential-preprocessor';




/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: seqPreprocessor([
    preprocess({
      scss: {
        // prependData: `@import './src/styles/vars.scss';`
      }
    }),
    preprocessThrelte()
  ]),
  kit: {
    adapter: staticAdapter(),
  },
};

export default config;
