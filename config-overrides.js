const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");
const { override, babelInclude } = require("customize-cra");
const path = require("path");

module.exports = override(
  babelInclude([path.resolve("src"), path.resolve("wasm")]),
  (config) => {
    config.resolve.extensions.push(".wasm");
    config.module.rules.forEach((rule) => {
      (rule.oneOf || []).forEach((oneOf) => {
        if (oneOf.loader && oneOf.loader.indexOf("file-loader") >= 0) {
          // Make file-loader ignore WASM files
          oneOf.exclude.push(/\.wasm$/);
        }
      });
    });

    config.plugins = (config.plugins || []).concat([
      new WasmPackPlugin({
        crateDirectory: path.resolve(__dirname, "./wasm"),
        extraArgs: "--no-typescript",
        outDir: path.resolve(__dirname, "./wasm/build"),
      }),
    ]);

    return config;
  }
);
