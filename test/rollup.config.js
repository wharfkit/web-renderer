import svelte from 'rollup-plugin-svelte'
import sveltePreprocess from 'svelte-preprocess'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import livereload from 'rollup-plugin-livereload'
import typescript from '@rollup/plugin-typescript'
import replace from '@rollup/plugin-replace'
import json from '@rollup/plugin-json'
import pkg from '../package.json'

const production = !process.env.ROLLUP_WATCH

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
    var pkg = WebRenderer;
    WebRenderer = pkg.default;
    for (var key in pkg) {
        if (key === 'default') continue;
        WebRenderer[key] = pkg[key];
    }
})()
`

const replaceVersion = replace({
    preventAssignment: true,
    delimiters: ['', ''],
    __ver: `${pkg.version}`,
    'process.env.NODE_ENV': JSON.stringify('production'),
    'typeof process': JSON.stringify('undefined'),
    'typeof process.env': JSON.stringify('undefined'),
    'process.env': JSON.stringify({}),
})

export default {
    input: 'test/index.ts',
    output: {
        name: 'WebRenderer',
        file: 'test/public/bundle.js',
        footer: exportFix,
        format: 'iife',
        sourcemap: true,
        exports: 'named',
        inlineDynamicImports: true,
    },
    plugins: [
        replaceVersion,
        svelte({
            preprocess: sveltePreprocess({sourceMap: true}),
            emitCss: false,
            onwarn: (warning, handler) => {
                const {code, frame} = warning
                if (code === 'anchor-is-valid' || code === 'a11y-autofocus') return
                if (code === 'css-unused-selector' && frame.includes('shape')) return
                handler(warning)
            },
        }),
        resolve({
            preferBuiltins: false,
            browser: true,
            dedupe: ['svelte'],
        }),
        commonjs(),
        typescript({
            sourceMap: true,
            inlineSources: true,
            resolveJsonModule: true,
            rootDir: './src',
            compilerOptions: {
                module: 'ES2015',
            },
        }),
        json(),
        !production && serve('test/public'),
        !production && livereload('test/public'),
    ],
}
