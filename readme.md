# dsstore [![Build Status](https://travis-ci.org/1000ch/node-dsstore.svg?branch=master)](https://travis-ci.org/1000ch/node-dsstore)

Remove `.DS_Store` recursively.

## Install

```bash
$ npm install -g dsstore
```

## Usage

```javascript
const dsstore = require('dsstore');
dsstore('foo');
dsstore(['bar', 'baz']);
```

## License

[MIT](https://1000ch.mit-license.org) © [Shogo Sensui](https://github.com/1000ch)
