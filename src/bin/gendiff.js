#!/usr/bin/env node
import { fillProgram } from '..';
import program from 'commander';

fillProgram(program);
program.parse(process.argv);
