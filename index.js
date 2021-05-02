import fs from 'node:fs';
import path from 'node:path';
import {promisify} from 'node:util';
import globby from 'globby';

export default async function dsstore(args, callback) {
  const dsstores = args.map(arg => path.join(arg, '**', '.DS_Store'));
  const paths = await globby(dsstores);
  const rm = promisify(fs.rm);

  await Promise.all(paths.map(path => {
    if (callback) {
      callback(path);
    }

    return rm(path);
  }));
}
