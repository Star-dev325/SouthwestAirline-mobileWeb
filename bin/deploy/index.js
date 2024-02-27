#!/usr/bin/env node

const program = require('commander');
const chalk = require('chalk');

const Rundeck = {
  Auth: require('./lib/auth'),
  Actions: require('./lib/actions'),
  Helpers: require('./lib/helpers')
};

const TIMES_TO_RETRY_DEPLOY = 5;

// Usage:
//
// npm install
// mweb-deploy itest2 -u 17646 -p Password -b 16.20.0  -j 1272657
//

//TODO: prompt user for password
//TODO: config file for urls/environments etc
//TODO: determine jobID for the user
//TODO: Implement verbose?
//TODO: contain all output in one place so I can unit test functionality
//TODO: subcommands
//TODO: implement/finish waitForJobComplete

const retryFunction = (promiseFn, timesToRetry) => {
  return promiseFn().catch(() => {
    if (timesToRetry > 0) {
      console.log('Retrying');
      return retryFunction(promiseFn, timesToRetry - 1);
    } else {
      console.log('No more retries left');
      process.exit(1);
    }
  });
};

program
  .arguments('<environment>')
  .option('-u, --username <username>', 'The Rundeck username')
  .option('-p, --password <password>', 'The Rundeck password')
  .option('-b, --build <build>', 'The Nexus build version')
  .option('-j, --jobid <jobid>', 'The Rundeck Job ID')
  .option('--verbose <verbose>', 'Verbose output')
  .action(function (environment) {
    Rundeck.Helpers.requiredFields(this);
    Rundeck.Helpers.validateEnvironment(environment);

    console.log(chalk.blue(`Deploying ${program.build} to ${environment}`));
    Rundeck.Helpers.protect(environment);

    const deployPromiseFunction = () =>
      Rundeck.Auth.login(program.username, program.password).then(function (cookie) {
        return Rundeck.Actions.deploy({
          environment,
          version: program.build,
          jobId: program.jobid,
          cookie
        });
      });

    retryFunction(deployPromiseFunction, TIMES_TO_RETRY_DEPLOY);
  })
  .parse(process.argv);
