import resolve from '@rollup/plugin-node-resolve';

export default {
    input: "app.js",
    output: [
        {
        format: 'esm',
        file: "bundle.js",
        inlineDynamicImports: true, //Necessary for jspdf
        },
    ],
    plugins: [
        resolve(),
    ]
};