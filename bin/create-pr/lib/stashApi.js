const request = require('request-promise-native');
const debug = require('debug')('create-pr:stash');

class StashApi {
  constructor(protocol, server, username, password) {
    this.baseUrl = `${protocol}://${username}:${encodeURIComponent(password)}@${server}`;
    this.apiUrl = '/rest/api/1.0';
  }

  buildUrl(endpoint) {
    return this.baseUrl + this.apiUrl + endpoint;
  }

  getBranches(projKey, repoSlug, filterText) {
    let queryString = '';
    if (filterText) {
      queryString += `?filterText${encodeURIComponent(filterText)}`;
    }

    const options = {
      url: this.buildUrl(`/projects/${projKey}/repos/${repoSlug}/branches${queryString}`),
      json: true
    };

    return request.get(options);
  }

  getCommit(projKey, repoSlug, commitId) {
    const options = {
      url: this.buildUrl(`/projects/${projKey}/repos/${repoSlug}/commits/${commitId}`),
      json: true
    };

    return request.get(options);
  }

  getGroupMembers(queryParams) {
    const options = {
      url: this.buildUrl('/admin/groups/more-members'),
      qs: queryParams,
      json: true
    };

    return request.get(options);
  }

  createPullRequest(projKey, repoSlug, pr) {
    const json = pr.toPostJson();
    const options = {
      url: this.buildUrl(`/projects/${projKey}/repos/${repoSlug}/pull-requests`),
      body: json,
      json: true
    };

    debug(options);

    return request.post(options).then((body) => {
      debug(body);
      return body;
    });
  }

  fetchToRefreshPR(url) {
    const getOptions = {
      url: this.buildUrl(`${url}/merge`)
    };
    return request.get(getOptions).then((body) => {
      debug(body);
      return body;
    });
  }
}

module.exports = StashApi;
