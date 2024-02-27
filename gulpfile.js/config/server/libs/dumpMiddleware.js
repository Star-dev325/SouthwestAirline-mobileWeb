'use strict';
const fs = require('fs');
const url = require('url');
const zlib = require('zlib');
const dayjs = require('dayjs');
const mkdirp = require('mkdirp');
const _ = require('lodash');
const del = require('del');
const gutil = require('gulp-util');

const DEFAULT_DUMP_FOLDER = '.dump';
const DEFAULT_MAX_KEEP_DAYS = 2;

function getHeader(headersString, headerName) {
  return _.chain(headersString)
    .split(/\r\n/)
    .find((header) => {
      const [key, value] = header.split(':');

      return key === headerName ? value : false;
    })
    .value();
}

function reWriteResponseHeaders(req, res) {
  res.headers = {};

  if (res._header) {
    res.headers['content-encoding'] = getHeader(res._header, 'content-encoding');
    res.headers['content-type'] = getHeader(res._header, 'content-type');
  } else {
    res.headers = res._headers;
  }

  return res;
}

function transformBufferToObject(buf) {
  if (!buf) return {};
  try {
    return JSON.parse(buf.toString());
  } catch (e) {
    return buf.toString();
  }
}

function deleteExpiredFolder(dumpFolder, folderName, maxDays) {
  const files = fs.readdirSync(`${dumpFolder}/`);

  files.push(folderName);
  const uniqFiles = _.uniq(files);

  if (uniqFiles.length > maxDays) {
    const folderToBeDelete = files.sort()[0];

    del(`${dumpFolder}/${folderToBeDelete}`, (err, deletedFiles) => {
      gutil.log('Deleted files and folders:\n', deletedFiles.join('\n'));
    });
  }
}

function getResponseData(response) {
  let body;
  const beenGziped = _.get(response.headers, 'content-encoding', '').includes('gzip');
  const isJsonContent = _.get(response.headers, 'content-type', '').includes('json');

  if (!isJsonContent) return {};

  if (beenGziped) {
    body = transformBufferToObject(zlib.gunzipSync(response.body));
  } else {
    body = transformBufferToObject(response.body);
  }

  return {
    body
  };
}

function getRequestData(request) {
  return {
    body: transformBufferToObject(request.body),
    url: request.url
  };
}

function dumpResource(resource, options) {
  const requestData = getRequestData(resource.request);
  const responseData = getResponseData(resource.response);

  const data = {
    request: requestData,
    response: responseData
  };

  const maxDays = _.get(options, 'maxDays', DEFAULT_MAX_KEEP_DAYS);
  const dumpFolder = _.get(options, 'dumpFolder', DEFAULT_DUMP_FOLDER);
  const currentTime = dayjs().format('HH-mm-ss-SSS');
  const folderName = dayjs().format('YYYY-MM-DD');
  const dumpDataPath = `${dumpFolder}/${folderName}`;
  const fileName = `${currentTime}${url.parse(requestData.url).pathname.replace(/\//g, '-')}.json`;

  if (!fs.existsSync(dumpDataPath)) {
    mkdirp.sync(dumpDataPath);
  }

  deleteExpiredFolder(dumpFolder, folderName, maxDays);

  fs.writeFile(`${dumpDataPath}/${fileName}`, JSON.stringify(data, null, '\t'), (err) => {
    if (err) gutil.log(err);
  });

  return data;
}

function dumpMiddleware(options) {
  const dumpFolder = options.folder;
  const dumpUrls = options.urls;
  const { maxDays } = options;

  return (req, res, next) => {
    const isDumpUrl = _.some(dumpUrls, (dumpUrl) => req.url.includes(dumpUrl));

    if (!isDumpUrl) return next();

    const _write = res.write;
    const _end = res.end;
    const requestData = [];
    const responseData = [];

    req.on('data', (chunk) => {
      requestData.push(chunk);
    });

    res.end = function (chunk, encoding) {
      res = reWriteResponseHeaders(req, res);

      return _end.call(this, chunk, encoding, () => {
        try {
          responseData.push(chunk);
          dumpResource(
            {
              request: {
                body: Buffer.concat(_.compact(requestData)),
                url: req.url
              },
              response: {
                body: Buffer.concat(_.compact(responseData)),
                url: req.url,
                headers: res.headers
              }
            },
            {
              dumpFolder,
              maxDays
            }
          );
        } catch (err) {
          console.warn(err); // eslint-disable-line no-console
        }
      });
    };

    res.write = function (chunk, encoding) {
      responseData.push(chunk);

      return _write.call(this, chunk, encoding);
    };

    next();
  };
}

module.exports = dumpMiddleware;
