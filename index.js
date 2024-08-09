import fs from 'node:fs/promises';
import path from 'node:path';
import {globby} from 'globby';

export default async function dsstore(chunks, callback) {
  const dsstores = chunks.map(chunk => path.join(chunk, '**', '.DS_Store'));
  const paths = await globby(dsstores);

  await Promise.all(paths.map(path => {
    if (callback) {
      callback(path);
    }

    return fs.rm(path);
  }));
}
