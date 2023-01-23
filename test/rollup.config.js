import fs from 'fs'
import svelte from 'rollup-plugin-svelte'
import sveltePreprocess from 'svelte-preprocess'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import livereload from 'rollup-plugin-livereload'
import typescript from '@rollup/plugin-typescript'
import replace from '@rollup/plugin-replace'
import json from '@rollup/plugin-json'
import pkg from '../package.json'

function serve() {
    let server

    function toExit() {
        if (server) server.kill(0)
    }

    return {
        writeBundle() {
            if (server) return
            server = require('child_process').spawn('npm', ['run', 'serve', '--', '--dev'], {
                stdio: ['ignore', 'inherit', 'inherit'],
                shell: true,
            })

            process.on('SIGTERM', toExit)
            process.on('exit', toExit)
        },
    }
}

const exportFix = `
(function () {
    var pkg = WharfKitWeb;
    WharfKitWeb = pkg.default;
    for (var key in pkg) {
        if (key === 'default') continue;
        WharfKitWeb[key] = pkg[key];
    }
})()
`

const license = fs.readFileSync('LICENSE').toString('utf-8').trim()
const banner = `
/**
 * @wharfkit/web v${pkg.version}
 * ${pkg.homepage}
 *
 * @license
 * ${license.replace(/\n/g, '\n * ')}
 */
`.trim()

const replaceVersion = replace({
    preventAssignment: true,
    __ver: `${pkg.version}`,
})

export default {
    input: 'src/index.ts',
    output: {
        banner,
        name: 'WharfKitWeb',
        file: 'test/public/bundle.js',
        footer: exportFix,
        format: 'iife',
        sourcemap: true,
        exports: 'named',
    },
    plugins: [
        replaceVersion,
        svelte({
            preprocess: sveltePreprocess({sourceMap: true}),
            compilerOptions: {
                dev: true,
            },
            emitCss: false,
        }),
        resolve({
            browser: true,
            dedupe: ['svelte'],
        }),
        commonjs(),
        typescript({
            sourceMap: true,
            inlineSources: true,
            rootDir: './src',
        }),
        json(),
        serve('test/public'),
        livereload('test/public'),
    ],
    external: Object.keys({...pkg.peerDependencies}),
}
