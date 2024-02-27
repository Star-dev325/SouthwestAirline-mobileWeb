#!/usr/bin/env node

const rest = require('restling');
const chalk = require('chalk');
const _ = require('lodash');

const Promise = require('bluebird');

module.exports = {
  login: function (username, password) {
    const url = 'https://opcon-np.swacorp.com/j_security_check';

    const requestOptions = {
      rejectUnauthorized: false,
      followRedirects: false,
      data: {
        j_username: username,
        j_password: password
      }
    };

    return rest.post(url, requestOptions).then(this._handleSuccess).catch(this._handleError);
  },
  _handleError: function () {
    console.log(chalk.red(' \u2717'), 'Login');
  },
  _handleSuccess: function (result) {
    if (result.response.headers['location'].indexOf('error') > -1) {
      console.log(result);
      return Promise.reject('Login failed');
    }

    console.log(chalk.green(' \u2713'), 'Login');

    return _.map(result.response.headers['set-cookie'], function (cookie) {
      return cookie.substr(0, cookie.indexOf(';') + 1);
    }).join(' ');
  }
};
