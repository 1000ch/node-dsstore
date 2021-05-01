import fs from 'fs/promises';
import path from 'path';
import {promisify} from 'util';
import test from 'ava';
import globby from 'globby';
import touch from 'touch';
import dsstore from './index.js';

const touchP = promisify(touch);
const fixtures = new URL('fixtures', import.meta.url).pathname;
const dsstores = path.join(fixtures, '**', '.DS_Store');

test.before(async () => {
  await fs.mkdir(path.join(fixtures, 'foo', 'bar'), {
    recursive: true
  });
});

test.after(async () => {
  await fs.rm(fixtures, {
    recursive: true,
    force: true
  });
});

test.beforeEach(async () => {
  await touchP(path.join(fixtures, '.DS_Store'));
  await touchP(path.join(fixtures, 'foo', '.DS_Store'));
  await touchP(path.join(fixtures, 'foo', 'bar', '.DS_Store'));
});

test('Remove files from current folder', async t => {
  const before = await globby(dsstores);
  t.is(before.length, 3);

  await dsstore([fixtures]);
  const after = await globby(dsstores);
  t.is(after.length, 0);
});

test('Remove files from specified folder (1)', async t => {
  const before = await globby(dsstores);
  t.is(before.length, 3);

  await dsstore([`${fixtures}/foo/bar`]);
  const after = await globby(dsstores);
  t.is(after.length, 2);
});

test('Remove files from specified folder (2)', async t => {
  const before = await globby(dsstores);
  t.is(before.length, 3);

  await dsstore([`${fixtures}/foo`]);
  const after = await globby(dsstores);
  t.is(after.length, 1);
});

test('Remove files from specified folder (3)', async t => {
  const before = await globby(dsstores);
  t.is(before.length, 3);

  await dsstore([`${fixtures}/doesnotexist`]);
  const after = await globby(dsstores);
  t.is(after.length, 3);
});

test('Remove files from specified folders', async t => {
  const before = await globby(dsstores);
  t.is(before.length, 3);

  await dsstore([
    path.join(fixtures, '/foo'),
    path.join(fixtures, '**', 'bar')
  ]);
  const after = await globby(dsstores);
  t.is(after.length, 1);
});
