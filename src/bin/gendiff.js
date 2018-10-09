#!/usr/bin/env node
import help from '..';
import program from 'commander';

program.on('--help', help(program));
program.parse(process.argv);
if (program.help) {
  program.help();
}
