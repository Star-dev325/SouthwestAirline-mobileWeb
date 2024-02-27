'use strict';

// eslint-disable-next-line no-global-assign, no-undef
require = require('esm')(module);

const gulp = require('gulp');
const gutil = require('gulp-util');
const requireDir = require('require-dir');
const runSequence = require('gulp4-run-sequence');
const _ = require('lodash');
const gulpTaskConfig = require('./libs/gulpTaskConfig');

if (gutil.env.proxy) {
  process.env.NODE_APP_INSTANCE = 'proxy';
}
gutil.env.isDevMode = process.env.NODE_ENV !== 'production';
gutil.env.isUsingOriginCode = !_.isUndefined(gutil.env.origin);

gulpTaskConfig(gulp);

requireDir('./tasks', { recurse: true });

// global configure

const hosts = [
  'dev1',
  'dev2',
  'dev3',
  'dev4',
  'dev5',
  'dev6',
  'dev7',
  'dev8',
  'dev9',
  'dev10',
  'itest1',
  'itest2',
  'qa1',
  'qa2',
  'qa3',
  'qa4',
  'qa5',
  'qa6',
  'qa7',
  'efix1.qa',
  'cstg1.qa',
  'ptest1.qa',
  'ptest2.qa',
  'prod1',
  'prod2',
  'localApi'
];

const host = process.env.HOST || process.env.HOSTNAME;
let currentHost = 'mock';

if (isKnownEnvironment(host)) {
  currentHost = host;
} else if (isProxyMode()) {
  currentHost = 'default-proxy';
} else {
  gutil.log(`There is no environment named ${gutil.colors.magenta(host)}`);
}

gulp.config('hosts', hosts);
gulp.config('currentHost', currentHost);

gulp.config('root.shared', 'shared');
gulp.config('root.src', 'src');
gulp.config('root.app', 'src/app');
gulp.config('root.dist', 'build/mobile-swa-ui-app-mobile-web');
gulp.config('root.built', './build');
gulp.config('mock.wcm', 'mocks/wcm/wcm');
gulp.config('mock.services', 'mocks/services');
gulp.config('mock.templates', 'mocks/templates');

gulp.config('tasks', requireDir('./config', { recurse: true }));

gulp.config('tasks.build', {
  taskQueue: ['clean', 'copy', 'processHtml', 'iconfont', 'webpack'].concat(getExtraBuildTasks())
});

gulp.task('dev', (callback) => {
  gulp.config(gulp.DEV_MODE, true);
  runSequence(
    'build',
    'processHTMLRoutes',
    'writeVersion',
    'setConfig',
    'chaseMockServer',
    'payPalMockServer',
    'applePayMockServer',
    'dyson',
    'server',
    callback
  );
});

gulp.task('default', gulp.series('build'));

function getExtraBuildTasks() {
  if (gutil.env.isUsingOriginCode) {
    return ['tar'];
  }

  if (process.env.NODE_ENV === 'production') {
    return ['rev', 'writeVersion', 'processHTMLRoutes', 'tar'];
  }

  return [];
}

function isKnownEnvironment(host) {
  return host && hosts.indexOf(host) > -1;
}

function isProxyMode() {
  return !!gutil.env.proxy;
}
