'use strict';

const gutil = require('gulp-util');
const _ = require('lodash');

const isWatchON = !!gutil.env.watch;

function unitTestsForAllFoldersBeingTested() {
  let folders = [''];
  const folderArguments = gutil.env.folder;

  if (folderArguments) {
    const folderArgumentsAsArray = _.isArray(folderArguments) ? folderArguments : [folderArguments];

    folders = folderArgumentsAsArray.map((folder) => `${folder}/`);
  }

  return folders.map((folder) => `src/${folder}**/__tests__/*Spec{,s}.js{,x}`);
}

function unitTestsForSpecificFile() {
  const watchArgument = gutil.env.watch;

  return _.isArray(watchArgument) ? watchArgument : watchArgument.split(',');
}

module.exports = {
  src: ['test/unit/setup.js'].concat(isWatchON ? unitTestsForSpecificFile() : unitTestsForAllFoldersBeingTested()),
  options: {
    R: gutil.env.debug ? 'spec' : 'dot',
    compilers: '.:@babel/register',
    istanbul: gutil.env.cover,
    require: ['mocha-clean', '@babel/polyfill'],
    timeout: 5000,
    bail: gutil.env.failFast,
    grep: gutil.env.grep,
    invert: gutil.env.invert
  }
};
