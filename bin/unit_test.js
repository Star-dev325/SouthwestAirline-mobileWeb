#!/usr/bin/env node

'use strict';

/* eslint-disable no-console */
const glob = require('glob');
const gutil = require('gulp-util');
const fs = require('fs');
const child_process = require('child_process');
const _ = require('lodash');
const Q = require('q');
const ora = require('ora');
const prettyHrtime = require('pretty-hrtime');
const argv = require('yargs').argv;
const path = require('path');

const SRC_FOLDER = 'src';
const HIDE_FOLDER = /(^|\/)\.[^/.]/g;

const PARALLEL_TASK_COUNT = argv.coverage ? 10 : 5;
console.log('*** PARALLEL_TASK_COUNT = ', PARALLEL_TASK_COUNT);

function spawnp(cmd, opts) {
  opts || (opts = {});
  return new Promise((resolve, reject) => {
    const child = child_process.spawn(cmd, opts);

    child.stdout.on('data', () => {}); // walk around no exit event fire if doesn't pipe stdout.
    child.on('exit', (code) => (code === 0 ? resolve() : reject(code)));
  });
}

const generateCoverageReport = () => {
  const coverageSpinner = ora('Generating coverage report').start();
  const start = process.hrtime();

  return spawnp('./node_modules/.bin/nyc', ['report', '--reporter=lcov', '--reporter=cobertura'])
    .then(() => {
      coverageSpinner.succeed(`Finished generating coverage report after ${prettyHrtime(process.hrtime(start))}`);
    })
    .catch(() => {
      coverageSpinner.fail('Generate coverage report failed.');
    });
};

const cleanTask = (extraFoldersNeedRemove) => {
  const cleanSpinner = ora('Clean folders').start();
  const start = process.hrtime();

  let options = [
    '-rf',
    '.temp',
    '.nyc_output',
    './node_modules/src',
    './node_modules/test',
    './node_modules/mocks',
    './node_modules/storybook'
  ];
  !_.isEmpty(extraFoldersNeedRemove) && (options = options.concat(extraFoldersNeedRemove));

  return spawnp('rm', options)
    .then(() => {
      cleanSpinner.succeed(`Finished clean folders after ${prettyHrtime(process.hrtime(start))}`);
    })
    .catch(() => {
      cleanSpinner.fail('Clean folders failed.');
    });
};

const checkUncommitted = (reason) => {
  const result = child_process.spawnSync('git', ['diff-index', '--quiet', 'HEAD', '--'], { encoding: 'utf8' });
  if (result.status !== 0) {
    console.error(gutil.colors.red(`\nMust commit work before ${reason}!\n`));
    process.exit(result.status);
  }
};

const compileTask = () => {
  argv.update && checkUncommitted('updating snapshots');

  const compileSpinner = ora('Use Babel Compile Code').start();
  const start = process.hrtime();

  return spawnp('./node_modules/.bin/babel', ['src', '--out-dir', '.temp/src'])
    .then(spawnp('./node_modules/.bin/babel', ['test', '--out-dir', '.temp/test']))
    .then(spawnp('./node_modules/.bin/babel', ['mocks', '--out-dir', '.temp/mocks']))
    .then(() => {
      compileSpinner.succeed(`Finished use babel compile code after ${prettyHrtime(process.hrtime(start))}`);
    })
    .catch(() => {
      compileSpinner.fail('Compile code failed.');
    });
};

const copyJsonTask = () => {
  const copySpinner = ora('Copy json files').start();
  const start = process.hrtime();

  return spawnp('rsync', ['-a', '-m', '--include=*/', '--include=*.json', '--exclude=*', 'test', '.temp'])
    .then(spawnp('rsync', ['-a', '-m', '--include=*/', '--include=*.json', '--exclude=*', 'mocks', '.temp']))
    .then(() => {
      copySpinner.succeed(`Finished copy json files after ${prettyHrtime(process.hrtime(start))}`);
    })
    .catch(() => {
      copySpinner.fail('Copy json files failed.');
    });
};

const copySnapshotsTask = () => {
  const copySpinner = ora('Copy snapshot files').start();
  const start = process.hrtime();

  return spawnp('rsync', ['-a', '-m', '--include=*/', '--include=*.snap', '--exclude=*', 'src', '.temp'])
    .then(() => {
      copySpinner.succeed(`Finished copy snapshot files after ${prettyHrtime(process.hrtime(start))}`);
    })
    .catch(() => {
      copySpinner.fail('Copy snapshot files failed.');
    });
};

const updateSnapshotsTask = () => {
  const copySpinner = ora('Update snapshot files').start();
  const start = process.hrtime();

  return spawnp('rsync', ['-a', '-m', '--include=*/', '--include=*.snap', '--exclude=*', '.temp/src/', 'src'])
    .then(() => {
      copySpinner.succeed(`Updated snapshot files after ${prettyHrtime(process.hrtime(start))}`);
    })
    .catch((err) => {
      copySpinner.fail('Update snapshot files failed.', err);
    });
};

const runTestsTask = () => {
  const testSpinner = ora('Run unit test').start();
  const start = process.hrtime();
  const folders = fs.readdirSync(SRC_FOLDER);

  const predicate = argv.filter
    ? (item) => !HIDE_FOLDER.test(item) && item === argv.filter
    : (item) => !HIDE_FOLDER.test(item);

  const allFeatures = _.chain(folders)
    .filter(predicate)
    .map((item) => {
      return {
        folder: item,
        count: glob.sync(`src/${item}/**/__tests__/*Spec{,s}.js{,x}`).length
      };
    })
    .filter((item) => item.count > 0)
    .orderBy('count', 'desc')
    .value();

  console.log('\n***** allFeatures \n', allFeatures);

  const parallelTasks = [];
  _.times(PARALLEL_TASK_COUNT, () => {
    parallelTasks.push([]);
  });
  allFeatures.forEach((feature) => {
    const minTask = _.chain(parallelTasks)
      .sortBy((tasks) => _.sumBy(tasks, (task) => task.count))
      .head()
      .value();

    minTask.push(feature);
  });

  const parallelCommandsPromise = _.chain(parallelTasks)
    .map((task) => {
      return task
        .map((feature) => feature.folder)
        .map((folder) =>
          argv.coverage
            ? `"src/${folder}/**/__tests__/*Spec{,s}.js{,x}"`
            : `".temp/src/${folder}/**/__tests__/*Spec{,s}.js{,x}"`
        );
    })
    .map((testsFolder) => testsFolder.join(' '))
    .map((folderParameter) => {
      const taskPrefix = argv.coverage
        ? 'NODE_OPTIONS="--max_old_space_size=8192" NODE_PATH=. ./node_modules/.bin/nyc -s --require @babel/register'
        : 'NODE_OPTIONS="--max_old_space_size=4096" NODE_PATH=.temp';
      return `${taskPrefix} ./node_modules/.bin/mocha ${argv.update ? '--update' : ''}  --require ${path.join(process.cwd(), ".temp/test/unit/nextGenSetup")} -R dot -t 20000 ${
        argv.coverage ? '' : '.temp/'
      }test/unit/setup.js ${folderParameter}`;
    })
    .map((command) => {
      const defer = Q.defer();

      child_process.exec(command, (err, stdout, stderr) => {
        if (err) {
          defer.reject([command, stdout, stderr, err]);
        } else {
          defer.resolve([command, stdout, stderr]);
        }
      });

      return defer.promise;
    })
    .value();

  return Q.allSettled(parallelCommandsPromise).then((results) => {
    const allTestSuccess = _.every(results, { state: 'fulfilled' });
    allTestSuccess
      ? testSpinner.succeed(`Finish unit test after: ${prettyHrtime(process.hrtime(start))}`)
      : testSpinner.fail('Run unit test failed.');

    results.forEach(function (result) {
      const printResult = function (value) {
        console.log('Test Command: ', value[0]);
        console.log(value[1]);
        console.log(value[2]);
      };

      if (result.state === 'fulfilled') {
        printResult(result.value);
      } else {
        printResult(result.reason);
      }
    });

    if (!allTestSuccess) {
      process.exit(1);
    }
  });
};

cleanTask(['coverage'])
  .then(compileTask)
  .then(copyJsonTask)
  .then(copySnapshotsTask)
  .then(runTestsTask)
  .then(() => {
    return argv.coverage && generateCoverageReport();
  })
  .then(() => {
    return argv.update && updateSnapshotsTask();
  })
  .then(cleanTask)
  .catch(console.log);
