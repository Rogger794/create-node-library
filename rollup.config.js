import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import json from '@rollup/plugin-json';
import url from 'rollup-plugin-url';

import pkg from './package.json';

export default {
  input: './src/cli.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
      external: [
        'validate-npm-package-name',
        'conf',
        'handlebars',
        'execa',
        'globby',
        'make-dir',
        'ora',
        'p-each-series',
      ],
    },
  ],
  plugins: [
    json(),
    external(),
    url(),
    babel({
      exclude: 'node_modules/**',
    }),
    resolve({ preferBuiltins: true }),
    commonjs(),
  ],
};
