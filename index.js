const rmfr = require('rmfr');
const arrify = require('arrify');
const globby = require('globby');

module.exports = (args, callback) => {
  const dsstores = arrify(args).map(arg => `${arg}/**/.DS_Store`);

  return globby(dsstores).then(paths => {
    return Promise.all(paths.map(path => {
      if (callback) {
        callback(path);
      }

      return rmfr(path);
    }));
  });
};
