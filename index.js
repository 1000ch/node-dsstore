const rmfr = require('rmfr');
const arrify = require('arrify');
const globby = require('globby');

module.exports = (args, callback) => {
  const dsstores = arrify(args).map(arg => `${arg}/**/.DS_Store`);

  return globby(dsstores).then(paths => {
    paths.forEach(async path => {
      if (callback) {
        callback(path);
      }

      await rmfr(path);
    });
  });
};
