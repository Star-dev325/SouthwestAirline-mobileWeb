const fs = require('fs');
const argv = require('yargs').argv;
const _ = require('lodash');
const mkdirp = require('mkdirp');
const BlinkDiff = require('blink-diff');

const paths = {
  snapshots: 'test/e2e/snapshots',
  diffs: 'test/e2e/diffs'
};

const fromCommit = argv.from;
const toCommit = argv.to;
if (!fromCommit || !toCommit) {
  throw new Error(
    'You must provide valid --from and --to commits\n' +
      'Usage: npm run diff -- --from 1671de58543a0250cca601479e33128ddc1c3d9d --to d785f9af43d8e850412b0f8fc0774819deee49ec'
  );
}

function generateDiffs(fromCommit, toCommit) {
  const fromFileList = listFiles(fromCommit);
  const toFileList = listFiles(toCommit);

  Promise.all([fromFileList, toFileList])
    .then((fileLists) => {
      const sharedFileNames = _.intersection(fileLists[0], fileLists[1]);
      sharedFileNames.forEach((filename) => diff(filename));
    })
    .catch((err) => {
      throw err;
    });
}

function listFiles(commit) {
  return new Promise((resolve, reject) => {
    fs.readdir(`${paths.snapshots}/${commit}`, (err, fileList) => {
      if (err && err.errno === -2) throw new Error(`No snapshots exist for commit '${commit}'\n`);
      if (err) reject(err);
      resolve(fileList.filter((filename) => filename.indexOf('.png') !== -1 && filename));
    });
  });
}

function diff(filename) {
  const fromFilePath = `${paths.snapshots}/${fromCommit}/${filename}`;
  const toFilePath = `${paths.snapshots}/${toCommit}/${filename}`;
  const outputDir = `${paths.diffs}/${fromCommit}-${toCommit}`;

  const diff = new BlinkDiff({
    imageAPath: fromFilePath,
    imageBPath: toFilePath,
    imageOutputLimit: BlinkDiff.OUTPUT_DIFFERENT,
    imageOutputPath: `${outputDir}/${filename}`
  });

  mkdirp(`${outputDir}`, (err) => {
    if (err) {
      throw err;
    } else {
      diff.run((err, result) => {
        if (err) {
          throw err;
        } else {
          console.log(diff.hasPassed(result.code) ? 'Passed' : 'Failed');
          console.log(`Found ${result.differences} differences.`);
        }
      });
    }
  });
}

generateDiffs(fromCommit, toCommit);
