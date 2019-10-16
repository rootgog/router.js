import {
    terser
} from "rollup-plugin-terser";

export default {
    input: 'src/router.js',
    output: [{
            file: 'lib/router.min.js',
            format: 'iife',
            name: "Router"
        },
        {
            file: 'lib/router.js',
            format: 'cjs',
        }
    ],
    plugins: [
        terser({
            include: [/^.+\.min\.js$/]
        })
    ]
};