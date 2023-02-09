import typescript from "@rollup/plugin-typescript";

/** @type {import('rollup').RollupOptions[]} */
export default [
  {
    input: "src/index.ts",
    plugins: [typescript()],
    output: [
      {
        file: "lib/index.mjs",
        format: "esm",
        sourcemap: true,
      },
      {
        file: "lib/index.js",
        format: "cjs",
        sourcemap: true,
      },
    ],
  },
  {
    input: "src/index.ts",
    plugins: [
      typescript({
        declaration: true,
        emitDeclarationOnly: true,
        outDir: "lib",
        include: "src",
        moduleResolution: "node",
      }),
    ],
    output: [
      {
        dir: "lib",
        sourcemap: true,
      },
    ],
  },
];
