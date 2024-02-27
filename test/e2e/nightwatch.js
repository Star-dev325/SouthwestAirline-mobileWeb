import 'src/app/helpers/dayJsSetup';

const _ = require('lodash');
const glob = require('glob');
const gutil = require('gulp-util');
const os = require('os');

const { skipFlaky, onlyFlaky, docker, android } = gutil.env;
const argv = {};

if (skipFlaky) {
  argv.skiptags = 'flaky';
}

if (onlyFlaky) {
  argv.tag = 'flaky';
}

argv.hostname = (_.isUndefined(docker) || os.platform() === 'linux') ? 'localhost' : 'host.docker.internal';
argv.port = _.isUndefined(docker) ? 4445 : 4444;

const SCREEN_SIZE = {
  iPhone6: '375,667',
  iPhone6Plus: '414,736',
  GalaxyS5: '360, 640'
};
const iPhoneChromeOptions = [
  '--user-agent=Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Mobile/14E304 Version/10.0 Safari/603.1.30 (AirWatch Browser v6.2)',
  `--window-size=${SCREEN_SIZE.iPhone6}`
];
const AndroidChromeOptions = [
  '--user-agent=Mozilla/5.0 (Linux; Android 4.4.2; SM-G900H Build/KOT49H) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.109 Mobile Safari/537.36',
  `--window-size=${SCREEN_SIZE.GalaxyS5}`
];

function _findPathByFileNamePattern(pattern) {
  const files = glob.sync(pattern);

  if (files.length === 0) {
    console.warn(`Can't find the binary file ${pattern}`); // eslint-disable-line no-console

    return '';
  }

  return files[0];
}

function _generateSeleniumConfig() {
  if (docker !== undefined) {
    return {
      start_process: false,
      port: 4444
    };
  } else {
    return {
      start_process: true,
      port: 4445,
      server_path: _findPathByFileNamePattern('node_modules/webdriver-manager/selenium/selenium-server-standalone-*[0-9.].jar'),
      log_path: false,
      cli_args: {
        'webdriver.chrome.driver': _findPathByFileNamePattern('node_modules/webdriver-manager/selenium/chromedriver*[0-9_.]')
      }
    };
  }
}

module.exports = {
  argv,
  src_folders: ['test/e2e/tests'],
  output_folder: 'test/e2e/reports',
  page_objects_path: [
    'test/e2e/pages',
    'test/e2e/pages/airBooking',
    'test/e2e/pages/blank',
    'test/e2e/pages/carBooking',
    'test/e2e/pages/checkIn',
    'test/e2e/pages/enroll',
    'test/e2e/pages/airCancel',
    'test/e2e/pages/airChange',
    'test/e2e/pages/earlyBird',
    'test/e2e/pages/enroll',
    'test/e2e/pages/flightStatus',
    'test/e2e/pages/homeNav',
    'test/e2e/pages/login',
    'test/e2e/pages/myAccount',
    'test/e2e/pages/viewReservation',
    'test/e2e/pages/carCancel',
    'test/e2e/pages/companion',
    'test/e2e/pages/flyingSouthwest',
    'test/e2e/pages/shared',
    'test/e2e/pages/standby',
    'test/e2e/pages/whereWeFly'
  ],
  custom_commands_path: 'test/e2e/commands',
  selenium: _generateSeleniumConfig(),

  test_settings: {
    default: {
      launch_url: `http://${argv.hostname}:9000`,
      selenium_port: argv.port,
      selenium_host: 'localhost',
      silent: true,
      screenshots: {
        enabled: true,
        on_failure: true,
        path: 'nightwatch-screenshots'
      },
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true,
        chromeOptions: {
          args: android ? AndroidChromeOptions : iPhoneChromeOptions
        }
      },
      globals: require('test/e2e/data/default')
    },
    dev: {
      launch_url: 'https://mobile.dev2.southwest.com',
      globals: require('test/e2e/data/dev')
    }
  }
};
