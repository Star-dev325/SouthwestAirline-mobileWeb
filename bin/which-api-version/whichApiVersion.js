/* eslint-disable */

'use strict';
const program = require('commander');
const rp = require('request-promise');
const Q = require('q');
const dayjs = require('dayjs');
const Table = require('cli-table');

let environmentToCheck;

program
  .arguments('<environment>')
  .action(function (environment) {
    environmentToCheck = environment;
  })
  .parse(process.argv);

if (!environmentToCheck) {
  showHelpAndFail('Must provide an environment to test. example: itest2');
}

function showHelpAndFail(errorMessage) {
  console.error(errorMessage);
  program.outputHelp();
  process.exit(1);
}

const table = new Table({ head: ['Environment', 'Version', 'Build Time'], style: { head: ['magenta'] } });
const formatDataTime = (dateTime) => dayjs(dateTime, 'ddd MMM DD HH:mm:ss YYYY').format('YYYY-MM-DD HH:MM:ss');
const DiagnosticsProcessor = (service, response) => {
  return {
    service: service,
    version: response.data.version,
    buildTime: response.data.buildTime
  };
};

const MetricsProcessor = (service, response) => {
  return {
    service: service,
    version: response['com.swacorp.tbs.status.DeploymentDetails'].version.value,
    buildTime: response['com.swacorp.tbs.status.DeploymentDetails'].buildTimestamp.value
  };
};

const ENDPOINT_MAP = {
  CHAPI: {
    path: 'v1/mobile-misc/diagnostics',
    processor: DiagnosticsProcessor
  },
  CAR_API: {
    path: 'v1/car-reservations/admin/metrics',
    processor: MetricsProcessor
  }
};

const fetchVersionInfo = (env, serviceName) => {
  const config = require(`../../config/${env}`);
  if (config[serviceName] === undefined) return;
  const absoluteUrlRegex = /^[a-z][a-z0-9+.-]*:/;

  let uri;
  if (absoluteUrlRegex.test(config[serviceName])) {
    uri = `${config[serviceName]}/${ENDPOINT_MAP[serviceName].path}`;
  } else {
    uri = `https://mobile.${env}.southwest.com${config[serviceName]}${ENDPOINT_MAP[serviceName].path}`;
  }
  const options = {
    uri: uri,
    headers: {
      'X-API-KEY': config.API_KEY
    },
    json: true
  };

  return rp(options)
    .then(ENDPOINT_MAP[serviceName].processor.bind(null, serviceName))
    .catch(() => {
      return {
        service: serviceName,
        version: 'Unknown',
        buildTime: 'Request Failed!'
      };
    });
};

Q.all([fetchVersionInfo(environmentToCheck, 'CHAPI'), fetchVersionInfo(environmentToCheck, 'CAR_API')])
  .then((results) => {
    results.forEach((item) => {
      if (item) {
        table.push({ [item.service]: [item.version, formatDataTime(item.buildTime)] });
      }
    });

    console.log(table.toString());
  })
  .catch((err) => {
    console.log(err);
  });

/* eslint-enable */
