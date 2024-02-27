const StashApi = require('./stashApi');
const PullRequest = require('./pullRequest');
const { getBranchDescription } = require('./git');

module.exports = async function createPullRequest({ branch, user, password, destinationBranch }) {
  const stash = new StashApi('https', 'stash1-tools.swacorp.com', user, password);

  const projectKey = 'MOB';
  const repoSlug = 'phoenix-web';

  // create a PR
  const pr = new PullRequest();
  pr.title = branch;
  pr.description = await getBranchDescription(branch);

  pr.fromRef = {
    id: `refs/heads/${branch}`,
    repository: {
      slug: repoSlug,
      project: {
        key: projectKey
      }
    }
  };

  pr.toRef = {
    id: `refs/heads/${destinationBranch}`,
    repository: {
      slug: repoSlug,
      project: {
        key: projectKey
      }
    }
  };

  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // get around SWA self-signed cert
  return stash.createPullRequest(projectKey, repoSlug, pr);
};
