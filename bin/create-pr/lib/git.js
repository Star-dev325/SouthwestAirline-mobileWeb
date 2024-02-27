const { promisify } = require('util');
const childProcess = require('child_process');
const exec = promisify(childProcess.exec);

const getBranchName = async () => {
  const { stdout } = await exec('git symbolic-ref --short HEAD');
  return stdout.trimRight();
};

const getBranchDescription = async (branchName) => {
  const { stdout } = await exec(`git log origin/master..origin/${branchName} --oneline`);

  return stdout
    .trim()
    .split('\n')
    .map((line) => `* ${line}`)
    .join('\n');
};

module.exports = {
  getBranchName,
  getBranchDescription
};
