const { green, cyan, red } = require('chalk');
const webpack = require('webpack');

const path = require('path');
const fse = require('fs-extra');
const execa = require('execa');
const cherryPick = require('cherry-pick').default;
const getConfig = require('./dist.webpack.config');

const targets = process.argv.slice(2);

const srcRoot = path.join(__dirname, '../src');
const scssRoot = path.join(__dirname, '../scss');
const typesRoot = path.join(__dirname, '../types');

const libRoot = path.join(__dirname, '../lib');
const libPackageRoot = path.join(libRoot, 'package.json');
const distRoot = path.join(libRoot, 'dist');
const cjsRoot = path.join(libRoot, 'cjs');
const esRoot = path.join(libRoot, 'esm');

const clean = () => fse.existsSync(libRoot) && fse.removeSync(libRoot);

const step = (name, fn) => async () => {
  console.log(cyan('Building: ') + green(name));
  await fn();
  console.log(cyan('Built: ') + green(name));
};

const shell = (cmd) =>
  execa(cmd, { stdio: ['pipe', 'pipe', 'inherit'], shell: true });

const has = (t) => !targets.length || targets.includes(t);

const buildTypes = step('generating .d.ts', () => shell(`yarn build-types`));

const copyTypes = (dest) => shell(`cpy ${typesRoot}/*.d.ts ${dest}`);

const babel = (outDir, envName) =>
  shell(
    `yarn babel ${srcRoot} -x .es6,.js,.es,.jsx,.mjs,.ts,.tsx --out-dir ${outDir} --env-name "${envName}"`,
  );

/**
 * Run babel over the src directory and output
 * compiled common js files to ./lib.
 */
const buildLib = step('commonjs modules', async () => {
  await babel(cjsRoot, 'cjs');
  await copyTypes(cjsRoot);
});

/**
 * Run babel over the src directory and output
 * compiled es modules (but otherwise es5) to /es
 */
const buildEsm = step('es modules', async () => {
  await babel(esRoot, 'esm');
  await copyTypes(esRoot);
});

/**
 * Bundles a minified and unminified version of react-bootstrap including
 * all it's immediate dependencies (excluding React, ReactDOM, etc)
 */
const buildDist = step(
  'browser distributable',
  () =>
    new Promise((resolve, reject) => {
      webpack(
        [getConfig(distRoot, false), getConfig(distRoot, true)],
        async (err, stats) => {
          if (err || stats.hasErrors()) {
            reject(err || stats.toJson().errors);
            return;
          }

          resolve();
        },
      );
    }),
);

const buildDirectories = step('Linking directories', () =>
  cherryPick({
    inputDir: '../src',
    cjsDir: 'cjs',
    esmDir: 'esm',
    cwd: libRoot,
  }),
);

console.log(
  green(`Building targets: ${targets.length ? targets.join(', ') : 'all'}\n`),
);

const buildPackage = step('Build pack', async () => {
  const files = await fse.readdir(srcRoot);

  await Promise.all(
    files.map(async (file) => {
      file = file.split('.')[0];
      const libComponentRoot = path.join(libRoot, file);
      const libComponentPackageRoot = path.join(libRoot, file, 'package.json');

      // Create folder by component file name and write json
      await fse.mkdir(libComponentRoot);
      await fse.writeJson(
        libComponentPackageRoot,
        {
          private: true,
          name: `itm-ui/${file}`,
          main: `../cjs/${file}.js`,
          module: `../esm/${file}.js`,
          types: `../esm/${file}.d.ts`,
        },
        { spaces: 2 },
      );
    }),
  );

  // Build package.json for lib
  let packageJSON = await fse.readJson('package.json');
  packageJSON.scripts = undefined;
  packageJSON.devDependencies = undefined;

  fse.writeJson(libPackageRoot, packageJSON, { spaces: 2 });
});

const copySCSS = step('Copy scss to lib', () => {
  fse.copy(scssRoot, libRoot + '/scss');
});

clean();

Promise.resolve(true)
  .then(buildTypes)
  .then(() =>
    Promise.all([
      has('lib') && buildLib(),
      has('es') && buildEsm(),
      has('dist') && buildDist(),
      has('scss') && copySCSS(),
      has('package') && buildPackage(),
    ]),
  )
  .then(buildDirectories)
  .catch((err) => {
    if (err) console.error(red(err.stack || err.toString()));
    process.exit(1);
  });
