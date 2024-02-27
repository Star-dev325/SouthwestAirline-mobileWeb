#!/usr/bin/env node

const inquirer = require('inquirer');
const chalk = require('chalk');
const createPullRequest = require('./lib/createPullRequest');
const git = require('./lib/git');

console.log('I can open a pull request in stash for you!');

(async function createPR() {
  const branchName = await git.getBranchName();

  const answers = await inquirer.prompt([
    {
      type: 'input',
      message: `Which branch: `,
      name: 'branch',
      default: branchName
    },
    {
      type: 'input',
      message: 'Username:',
      name: 'user'
    },
    {
      type: 'password',
      message: 'Password:',
      name: 'password',
      mask: '*'
    },
    {
      type: 'input',
      message: 'Destination branch:',
      name: 'destinationBranch',
      default: 'master'
    }
  ]);

  console.log(`creating pull request for branch ${answers.branch}...`);
  createPullRequest(answers)
    .then(() => {
      console.log(chalk.green('SUCCESS: '), 'successfully created pull request');
    })
    .catch((error) => {
      console.log(chalk.red('FAILED: '), {
        statusCode: error.statusCode,
        error: error.error.errors[0].message
      });
    });
})();
