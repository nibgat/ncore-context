const typescript = require('rollup-plugin-typescript2');
const peerDepsExternal = require('rollup-plugin-peer-deps-external');
const cleaner = require('rollup-plugin-cleaner');
const commonjs = require('@rollup/plugin-commonjs');
const nodeResolve = require('@rollup/plugin-node-resolve');
const packageJson = require('./package.json');

module.exports = {
    input: 'src/index.ts',
    output: [
        {
            file: packageJson.main,
            format: 'cjs',
            sourcemap: true,
        },
        {
            file: packageJson.module,
            format: 'esm',
            sourcemap: true,
        },
    ],
    plugins: [
        cleaner({
            targets: ['./lib'],
        }),
        peerDepsExternal(),
        nodeResolve(),
        commonjs(),
        typescript({
            exclude: ['**/*.stories.tsx', '**/*.test.tsx'],
        }),
    ],
};
