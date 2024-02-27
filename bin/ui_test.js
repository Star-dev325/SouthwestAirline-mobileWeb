#!/usr/bin/env node
const child_process = require('child_process');
const os = require('os');
const fs = require('fs');
const del = require('del');
const process = require('process');
const argv = require('yargs').argv;
const ora = require('ora');

const TEST_BITMAP_FOLDER = 'backstop_data/bitmaps_test';
const TEST_KEEP_COUNT = 10;
const productionEnv = Object.create(process.env);
let storybookCompileComplete = false;
productionEnv.STORYBOOK_PORT = '9100';

const TARGETED_BACKSTOP_DOCKER_IMAGE_VERSION = 'backstopjs/backstopjs:6.3.3';

function storybookRunner() {
  const storybookSpinner = ora('Start storybook').start();

  productionEnv.STORYBOOK_PORT = argv.port ? argv.port : '9100';

  const storybook = child_process.spawn('npm', ['run', 'storybook'], { env: productionEnv });
  storybook.stdout.on('data', (message) => {
    if (!storybookCompileComplete && message.indexOf('webpack built') >= 0) {
      storybookSpinner.succeed('Finished storybook compile');
      storybookCompileComplete = true;
      backstopRunner();
    }
  });

  storybook.stderr.on('data', (message) => {
    if (message.indexOf('listen EADDRINUSE') >= 0) {
      storybookSpinner.fail('Storybook compile failed.');
      console.log(`${message}`);
      forceKillProcessAtPort(productionEnv.STORYBOOK_PORT);
      process.exit(1);
    }

    if (message.indexOf('ERROR in') >= 0) {
      storybookSpinner.fail('Storybook compile failed.');
      console.log(`${message}`);
      process.exit(1);
    }
  });
}

function backstopRunner() {
  let linux_flag = '';
  if (os.platform() === 'linux') {
    linux_flag = '--linux';
  }

  let port_flag = '';
  if (argv.port) {
    port_flag = `--port=${argv.port}`;
  }

  const threads = argv.threads || productionEnv.BACKSTOPJS_THREADS;
  let threads_flag = '';
  if (threads) {
    threads_flag = `--threads=${threads}`;
  }

  const backstop_docker_run_command =
    `docker run --user 1000 --shm-size 8g --net=host --rm -v ${process.cwd()}:/src -t --entrypoint='' ` +
    `${TARGETED_BACKSTOP_DOCKER_IMAGE_VERSION} ` +
    `backstop --config=test/ui/backstop.config.js ${argv._.join(' ')} ${port_flag} ${linux_flag} ${threads_flag}`;

  const child_spawn = child_process.spawn;
  const backstop = child_spawn(
    `docker pull ${TARGETED_BACKSTOP_DOCKER_IMAGE_VERSION} && ${backstop_docker_run_command}`,
    { shell: true }
  );
  backstop.stdout.on('data', (message) => {
    console.log(`${message}`);
  });
  backstop.stderr.on('data', (err) => {
    console.log('stderr: ', `${err}`);
  });
  backstop.on('error', (err) => {
    console.log('error', `${err}`);
    forceKillProcessAtPort(productionEnv.STORYBOOK_PORT);
    process.exit(1);
  });
  backstop.on('exit', (err) => {
    forceKillProcessAtPort(productionEnv.STORYBOOK_PORT);
    process.exit(err);
  });
}

function forceKillProcessAtPort(port) {
  child_process.exec(`kill -9 \`lsof -t -i tcp:${port}\``, function (error) {
    if (error) {
      console.log(error.code);
    }
  });
}

(function deleteExpiredFolder(folder, maxKeepCount) {
  const folderPath = `${folder}/`;
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }
  const files = fs.readdirSync(folderPath).sort();

  if (files.length > maxKeepCount) {
    const folderToBeDelete = files[0];
    del(`${folder}/${folderToBeDelete}`, (err, deletedFiles) => {
      console.log('Deleted files and folders:\n', deletedFiles.join('\n'));
    });
  }
})(TEST_BITMAP_FOLDER, TEST_KEEP_COUNT);

if (argv._.indexOf('test') >= 0 || argv._.indexOf('reference') >= 0) {
  storybookRunner();
} else {
  backstopRunner();
}
