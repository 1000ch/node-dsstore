#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const minimist = require('minimist');
const dsstore = require('./');

const argv = minimist(process.argv.slice(2), {
  alias: {
    v: 'version',
    h: 'help',
    s: 'silent'
  }
});

if (argv.v || argv.version) {
  console.log(require('./package').version);
  return;
}

if (argv.h || argv.help) {
  fs.createReadStream(`${__dirname}/usage.txt`)
    .pipe(process.stdout)
    .on('close', () => process.exit(1));
  return;
}

const cwd = process.cwd();
const args = argv._.length ? argv._.map(arg => path.resolve(cwd, arg)) : [cwd];

dsstore(args, argv.s || argv.silent)
  .catch(error => console.error(error));
