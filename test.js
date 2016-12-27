const test = require('ava');
const pify = require('pify');
const mkdirp = pify(require('mkdirp'));
const rimraf = pify(require('rimraf'));
const touch = pify(require('touch'));
const globby = require('globby');
const dsstore = require('./');
const fixtures = `${__dirname}/fixtures`;
const dsstores = `${fixtures}/**/.DS_Store`;

test.before(async t => {
  await mkdirp(`${__dirname}/fixtures/foo/bar`);
});

test.after(async t => {
  await rimraf(`${__dirname}/fixtures`);
});

test.beforeEach(async t => {
  await touch(`${fixtures}/.DS_Store`);
  await touch(`${fixtures}/foo/.DS_Store`);
  await touch(`${fixtures}/foo/bar/.DS_Store`);
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

  await dsstore(`${fixtures}/foo`);
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

  await dsstore([`${fixtures}/foo`, `${fixtures}/**/bar`]);
  const after = await globby(dsstores);
  t.is(after.length, 1);
});
