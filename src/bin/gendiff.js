#!/usr/bin/env node
import genDiff from '..';
import program from 'commander';
import { version, description } from '../../package.json';

program
  .version(version)
  .arguments('Usage: gendiff <firstConfig> <secondConfig>')
  .description(description)
  .option('-f, --format [type]', 'Output format', 'curly')
  .action((filePath1, filePath2) => {
    console.log(genDiff(filePath1, filePath2, program.format));
  });
program.parse(process.argv);
