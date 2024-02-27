const gulp = require('gulp');
const express = require('express');
const gutil = require('gulp-util');
const findAPortNotInUse = require('../libs/findAPortNotInUse');

const bodyParser = require('body-parser');

const TASK_NAME = 'chaseMockServer';

function createApp() {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: true }));

  app.get('/foundry9', (req, res) => {
    const referrer = req.header('Referer');

    if (referrer) {
      const host = referrer.split('/')[2];

      return res.redirect(`http://${host}/chase/offer/apply?CELL=1234&SPID=1234`);
    }

    return res.redirect('/chase/offer/apply?CELL=1234&SPID=1234');
  });

  return app;
}

function serveMockChase() {
  return gulp.autoRegister(TASK_NAME, (config) =>
    findAPortNotInUse({ portStart: 6808, portEnd: 12306 }).then((port) => {
      config.port = port;
      process.env.CHASE_PORT = port;
      const app = createApp();

      app.listen(port, (err) => {
        gutil.log(`${TASK_NAME} listened port: ${port}`);
        err && gutil.log(err);
      });
    })
  );
}

gulp.task(TASK_NAME, serveMockChase);

module.exports = serveMockChase;
