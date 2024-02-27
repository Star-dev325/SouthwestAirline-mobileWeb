const gulp = require('gulp');
const express = require('express');
const gutil = require('gulp-util');
const _ = require('lodash');
const findAPortNotInUse = require('../libs/findAPortNotInUse');

const TASK_NAME = 'payPalMockServer';

function createApp() {
  const app = express();

  app.get('/webscr', (req, res) => {
    const referrer = req.header('Referer');
    const host = referrer.split('/')[2];

    const { token } = req.query;
    const tokenWithoutPNR = _.includes(token, 'WITH_PNR') ? token.substr(0, token.length - 16) : token;

    switch (tokenWithoutPNR) {
      case 'PAYPAL_AIR_BOOKING_TOKEN': {
        return res.redirect(`http://${host}/air/booking/review/paypal`);
      }
      case 'PAYPAL_AIR_CHANGE_TOKEN': {
        return res.redirect(`http://${host}/air/change/pricing/review/paypal`);
      }
      case 'PAYPAL_COMPANION_TOKEN': {
        return res.redirect(`http://${host}/companion/purchase/paypal`);
      }
      case 'PAYPAL_EARLY_BIRD_TOKEN': {
        const pnr = token.substr(token.length - 6, token.length);

        return res.redirect(`http://${host}/earlybird/checkin/${pnr}/review/paypal`);
      }
    }
  });

  return app;
}

function serveMockPayPal() {
  return gulp.autoRegister(TASK_NAME, (config) =>
    findAPortNotInUse({ portStart: 6816, portEnd: 12306 }).then((port) => {
      config.port = port;
      process.env.PAYPAL_PORT = port;

      const app = createApp();

      app.listen(port, (err) => {
        gutil.log(`${TASK_NAME} listened port: ${port}`);
        err && gutil.log(err);
      });
    })
  );
}

gulp.task(TASK_NAME, serveMockPayPal);

module.exports = serveMockPayPal;
