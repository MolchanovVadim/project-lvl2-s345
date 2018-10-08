#!/usr/bin/env node
import help from '..';

if (process.argv[2] === '-h' || process.argv[2] === '--help') {
  help();
}
