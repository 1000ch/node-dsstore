import fs from 'node:fs/promises';
import path from 'node:path';
import {globby} from 'globby';

export default async function dsstore(args, callback) {
  const dsstores = args.map(arg => path.join(arg, '**', '.DS_Store'));
  const paths = await globby(dsstores);

  await Promise.all(paths.map(path => {
    if (callback) {
      callback(path);
    }

    return fs.rm(path);
  }));
}
