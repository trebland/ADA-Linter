#! /usr/bin/env node
function runCli(cli) {
    cli.runValidation(process.argv.slice(2));
}

var dynamicImport = new Function("module", "return import(module)");

module.exports.promise = dynamicImport("../dist/index.js").then(runCli)