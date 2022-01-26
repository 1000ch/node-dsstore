# dsstore ![GitHub Actions Status](https://github.com/1000ch/node-dsstore/workflows/test/badge.svg?branch=main)

Remove `.DS_Store` recursively.

## Install

```bash
$ npm install -g dsstore
```

## Usage

```javascript
import dsstore from 'dsstore';

dsstore(['foo']);
dsstore(['bar', 'baz']);
```

### `dsstore(folders: string[])`

Remove `.DS_Store` under specified folders.

## License

[MIT](https://1000ch.mit-license.org) © [Shogo Sensui](https://github.com/1000ch)
