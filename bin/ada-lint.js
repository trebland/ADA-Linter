#! /usr/bin/env node
import { Command } from 'commander';
import { runValidation } from '../dist/index.js';
import { glob } from 'glob';

const program = new Command();  
const options = program.opts();

program
  .name('ada-lint')
  .description('CLI to run ada-lint')
  .version('0.0.1');

program
  .argument('<input-file>', 'path to the .html file(s) to validate')
  .option('-a, --all-files', 'process all .html files')
  .parse(process.argv)

async function runProgram()
{
    runValidation(await CollectFiles());
}

async function CollectFiles()
{
    let htmlFiles = [];

    htmlFiles = htmlFiles.concat(program.args);

    if (options.allFiles) {
      htmlFiles = htmlFiles.concat(
        await glob("**/*.html", {
          ignore: "node_modules/**",
        })
      );
    }

    return htmlFiles;
}

runProgram();