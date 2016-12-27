const rmfr = require('rmfr');
const arrify = require('arrify');
const globby = require('globby');
const symbols = require('log-symbols');

module.exports = (args, silent = false) => {
  const dsstores = arrify(args).map(arg => `${arg}/**/.DS_Store`);

  return globby(dsstores).then(paths => {
    return Promise.all(paths.map(path => {
      if (!silent) {
        console.log(symbols.success, path);
      }

      return rmfr(path);
    }));
  });
};
