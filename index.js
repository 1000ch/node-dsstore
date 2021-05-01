import fs from 'fs/promises';
import path from 'path';
import globby from 'globby';

const dsstore = async (args, callback) => {
  const dsstores = args.map(arg => path.join(arg, '**', '.DS_Store'));
  const paths = await globby(dsstores);

  await Promise.all(paths.map(path => {
    if (callback) {
      callback(path);
    }

    return fs.rm(path);
  }));
};

export default dsstore;
