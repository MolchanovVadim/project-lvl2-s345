#!/usr/bin/env node
import genDiff from '..';
import program from 'commander';

program
  .arguments('Usage: gendiff <firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'Output format', 'curly')
  .action((filePath1, filePath2, options) => {
    console.log(genDiff(filePath1, filePath2, options));
  });
program.parse(process.argv);
