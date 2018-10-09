#!/usr/bin/env node
import fillProgram from '..';
import program from 'commander';

fillProgram(program);

const programHelp = program.help;
program.parseOptions(process.argv);
program.parse(process.argv);

if (typeof program.help === 'boolean' && program.help === true) {
  program.help = programHelp;
  program.help();
}
