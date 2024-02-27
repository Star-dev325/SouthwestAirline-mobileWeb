'use strict';
const findAPortNotInUse = require('../libs/findAPortNotInUse');
const clearRequireCacheOfMocks = require('./../libs/clearRequireCacheOfMocks');
const gulp = require('gulp');
const gutil = require('gulp-util');
const dyson = require('dyson');
const express = require('express');
const http = require('http');

const TASK_NAME = 'dyson';
let server;

function createServer(app, port) {
  server = http.createServer(app).listen(port, (err) => {
    gutil.log(`${TASK_NAME} listened port: ${port}`);
    err && gutil.log(err);
  });
}

function dysonOnce(fileConfig) {
  if (!gutil.env.proxy) {
    process.env.NODE_ENV = 'test';

    const configs = dyson.getConfigurations({
      configDir: fileConfig.configDir
    });

    const app = dyson.registerServices(express(), {}, configs);

    return findAPortNotInUse({ portStart: 9000, portEnd: 12306 }).then((port) => {
      fileConfig.port = port;
      gutil.env.DYSON_PORT = port;
      createServer(app, port);
    });
  }

  return Promise.resolve(`proxy ${gutil.env.proxy}`);
}

function deleteChangedModuleInCache(path) {
  gutil.log(gutil.colors.yellow('will reload require: '), path);

  delete require.cache[path];
}

function serveDyson() {
  return gulp.autoRegister(TASK_NAME, dysonOnce, (config) => {
    gulp.watch(config.watchFiles, (evt) => {
      gutil.log(evt.type, evt.path);
      deleteChangedModuleInCache(evt.path);

      if (server) {
        gutil.log('Stopping:', `'${gutil.colors.cyan('dyson')}'`);
        server.shutdown(() => {
          gutil.log('Reload:', `'${gutil.colors.cyan('dyson')}'`);
          clearRequireCacheOfMocks();
          dysonOnce(config);
        });
      }
    });
  });
}

gulp.task(TASK_NAME, serveDyson);
module.exports = serveDyson;
