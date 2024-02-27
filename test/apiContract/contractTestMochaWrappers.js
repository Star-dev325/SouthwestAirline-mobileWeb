require('request-to-curl');

module.exports = {
  before(fn) {
    before((done) => {
      fn()
        .then(() => done())
        .catch((error) => {
          const isApiError = !!error.response;
          const errorToReport = isApiError ? new Error(prettyPrint(error.response)) : error;

          done(errorToReport);
        });
    });
  }
};

function prettyPrint(errorResponse) {
  const jsonErrorObject = JSON.parse(errorResponse.text);
  const errorMessage = JSON.stringify(jsonErrorObject, null, 2);

  const curlCommand = errorResponse.req.toCurl();

  return `${errorResponse.error.method} ${errorResponse.error.path}:\n${
    errorMessage
  }\n\nCurl command to reproduce: \n${
    curlCommand
  }\n\n`;
}
