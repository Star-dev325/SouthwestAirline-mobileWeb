#!/usr/bin/env node

const _ = require('lodash');
const chalk = require('chalk');

const VALID_ENVIRONMENTS = ['dev1', 'dev2', 'itest1', 'itest2', 'qa1', 'qa2', 'qa3', 'qa4', 'prod'];
const PROTECTED_ENVIRONMENTS = ['prod'];

module.exports = {
  requiredFields: function (program) {
    const required = {
      Username: program.username,
      Password: program.password,
      Build: program.build,
      'Job ID': program.jobid
    };

    let missingField = false;

    _.each(required, function (value, key) {
      if (!value) {
        console.log(chalk.red(' \u2717'), `${key} Required!`);
        missingField = true;
      }
    });

    if (missingField) {
      process.exit(1);
    }
  },
  validateEnvironment: function (environment) {
    if (!_.includes(VALID_ENVIRONMENTS, environment)) {
      console.log(chalk.red(' \u2717'), 'Invalid Environment!');
      process.exit(1);
    }
  },
  protect: function (environment) {
    if (_.includes(PROTECTED_ENVIRONMENTS, environment)) {
      console.log(chalk.red(' \u2717'), 'Protected Environment! - Cannot deploy to this environment at this time.');
      process.exit(1);
    }
  }
};
