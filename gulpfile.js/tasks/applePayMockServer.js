const gulp = require('gulp');
const express = require('express');
const gutil = require('gulp-util');
const findAPortNotInUse = require('gulpfile.js/libs/findAPortNotInUse');

const getAvailablePaymentMethods = require('mocks/templates/applePay/getAvailablePaymentMethods');
const finalizeTransaction = require('mocks/templates/applePay/finalizeTransaction');
const update = require('mocks/templates/applePay/update');

const cors = require('cors');
const bodyParser = require('body-parser');

const TASK_NAME = 'applePayMockServer';

function createApp() {
  const app = express();

  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(bodyParser.raw());

  app.post('/ceptorJS/PaymentMethods/getavailable', (req, res) => {
    res.json(getAvailablePaymentMethods);
  });

  app.post('/ceptorJS/PaymentMethods/FinalizeTransaction', (req, res) => {
    res.json(finalizeTransaction);
  });

  app.post('/ceptorJS/PaymentMethods/update', (req, res) => {
    const amount = req.body.Amount;

    res.json(update(amount));
  });

  return app;
}

function serveMockApplePay() {
  return gulp.autoRegister(TASK_NAME, (config) =>
    findAPortNotInUse({ portStart: 6824, portEnd: 12306 }).then((port) => {
      config.port = port;
      process.env.APPLE_PAY_PORT = port;

      const app = createApp();

      app.listen(port, (err) => {
        gutil.log(`${TASK_NAME} listened port: ${port}`);
        err && gutil.log(err);
      });
    })
  );
}

gulp.task(TASK_NAME, serveMockApplePay);

module.exports = serveMockApplePay;
