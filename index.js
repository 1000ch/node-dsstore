const rmfr = require('rmfr');
const arrify = require('arrify');
const globby = require('globby');

module.exports = (args, verbose = false) => {
  const dsstores = arrify(args).map(arg => `${arg}/**/.DS_Store`);

  return globby(dsstores).then(paths => {
    return Promise.all(paths.map(path => {
      if (verbose) {
        console.log(path);
      }

      return path;
    }).map(path => rmfr(path)));
  });
};
