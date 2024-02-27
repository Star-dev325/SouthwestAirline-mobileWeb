const url = require('url');
const gutil = require('gulp-util');

function middlewareProxy(from, to, headers, isLog) {
  headers = headers || {};
  isLog = isLog === undefined;

  isLog && gutil.log(gutil.colors.cyan(`${from} will proxy to ${to}`));
  const proxyMiddleware = require('./proxyMiddleware');
  const options = url.parse(to);

  options.route = from;
  options.headers = headers;
  options.isProxyToReal = !!isLog;

  return proxyMiddleware(options);
}

module.exports = middlewareProxy;
