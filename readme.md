# dsstore

Remove `.DS_Store` recursively.

[![Build Status](https://travis-ci.org/1000ch/dsstore.svg?branch=master)](https://travis-ci.org/1000ch/dsstore)
[![Dependency Status](https://david-dm.org/1000ch/dsstore.svg)](https://david-dm.org/1000ch/dsstore)
[![devDependency Status](https://david-dm.org/1000ch/dsstore/dev-status.svg)](https://david-dm.org/1000ch/dsstore?type=dev)

## Install

```bash
$ npm i -g dsstore
```

## Usage

From CLI.

```bash
Usage
  $ dsstore [<path|glob> ...]

Options
  --version, -v Output version
  --help, -h Output help
  --silent Hide output paths of removed .DS_Store

Examples
  $ dsstore
  $ dsstore path/to/folder
  $ dsstore foo bar
  $ dsstore --silent
```

In JavaScript.

```javascript
const dsstore = require('dsstore');
dsstore('foo');
dsstore(['bar', 'baz']);
```

## License

[MIT](https://1000ch.mit-license.org) © [Shogo Sensui](https://github.com/1000ch)
