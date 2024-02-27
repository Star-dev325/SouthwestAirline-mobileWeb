#!/usr/bin/env node

const rest = require('restling');
const chalk = require('chalk');
const _ = require('lodash');
const xmlParser = require('xml2js');

const URL = 'https://opcon-np.swacorp.com/swaapi';

const POLLING_TIMEOUT_IN_MS = 5000;

module.exports = {
  deploy: function (options) {
    return this._executeJob('deploy', options);
  },
  status: function (options) {
    this._getJobStatus(options)
      .then(function (status) {
        console.log(chalk.green(' \u2713'), 'Status:', status);
      })
      .catch(function (result) {
        console.log(result);
        console.log(chalk.red(' \u2717'), 'Status: Error', result.statusCode);
      });
  },
  _executeJob: function (action, options) {
    const args = `-action%20${action}%20-environment%20${options.environment}%20-version%20${options.version}`;
    const url = `${URL}/job/${options.jobId}/run?argString=${args}`;
    let pollingFunctionTimer;

    const requestOptions = {
      rejectUnauthorized: false,
      headers: { Cookie: options.cookie }
    };

    return rest
      .get(url, requestOptions)
      .then(function (result) {
        return new Promise((resolve, reject) => {
          xmlParser.parseString(result.data, (error, parsedDocument) => {
            if (error) {
              reject(error);
            } else if (parsedDocument.result.$.success === 'false') {
              reject('Deploy failed');
            } else {
              const executionId = parsedDocument.result.executions[0].execution[0].$.id;
              resolve(executionId);
            }
          });
        });
      })
      .then((executionId) => {
        return new Promise((resolve, reject) => {
          pollingFunctionTimer = setInterval(() => {
            rest.get(`${URL}/jobstatus/${executionId}`, requestOptions).then((result) => {
              xmlParser.parseString(result.data, (error, parsedDocument) => {
                if (error) {
                  reject(error);
                } else if (parsedDocument.result.$.success === 'false') {
                  reject('Status check failed');
                } else {
                  const executionStatus = parsedDocument.result.executions[0].execution[0].$.status;
                  console.log(`Job with execution ID ${executionId} has status '${executionStatus}'`);
                  if (executionStatus === 'succeeded') {
                    resolve(executionStatus);
                  } else if (executionStatus !== 'running') {
                    reject(executionStatus);
                  }
                }
              });
            });
          }, POLLING_TIMEOUT_IN_MS);
        });
      })
      .finally(() => {
        if (pollingFunctionTimer) {
          clearInterval(pollingFunctionTimer);
        }
      })
      .then(() => {
        console.log(chalk.green(' \u2713'), _.capitalize(action));
      })
      .catch((executionStatus) => {
        console.log(`Job failed with final execution status: ${executionStatus}`);
        console.log(chalk.red(' \u2717'), _.capitalize(action));
        throw executionStatus;
      });
  },
  _getJobStatus: function (options) {
    const url = `${URL}/jobstatus/${options.executionId}`;

    const requestOptions = {
      rejectUnauthorized: false,
      headers: { Cookie: options.cookie }
    };

    return rest.get(url, requestOptions).then(function (result) {
      console.log('woot', result.data);
      // var json = xmlParser.toJson(result.data, { object: true })
      // return json.result.executions.execution.status;
    });
  }
};
