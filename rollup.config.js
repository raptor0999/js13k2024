import { nodeResolve } from '@rollup/plugin-node-resolve';

import terser from '@rollup/plugin-terser';

export default {
  input: ['src/game.js'],
  output: {
  	//dir: 'build',
    file: 'build/game.bundle-min.js',
    format: 'iife'
  },
  plugins: [nodeResolve(), terser()]
};