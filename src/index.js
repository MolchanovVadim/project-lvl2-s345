import program from 'commander';

export default () => {
  program
    .arguments('Usage: gendiff [options] <firstConfig> <secondConfig>')
    .description('Compares two configuration files and shows a difference.')
    .option('-h, --help', 'output usage information')
    .option('-V, --version', 'output the version number')
    .option('-f, --format [type]', 'Output format');

  program.help();
};
