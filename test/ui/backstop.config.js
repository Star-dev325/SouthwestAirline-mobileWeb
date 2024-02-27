const { argv } = require('yargs');
const scenarios = require('./scenarios');
const _ = require('lodash');

const composeBackstopJson = () => {
  const hostname = argv.linux ? 'localhost' : 'host.docker.internal';
  const port = argv.port ? argv.port : '9100';
  const threads = argv.threads ? argv.threads : 2;

  const defaultViewports = [
    {
      label: 'iPhone8',
      width: 375,
      height: 667
    }
  ];

  return {
    asyncCaptureLimit: threads,
    asyncCompareLimit: 20,
    debug: false,
    debugWindow: false,
    engine: "puppeteer",
    engineOptions: {
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-features=site-per-process"]
    },
    id: 'mweb-ui-test',
    onBeforeScript: "puppet/onBefore.js",
    onReadyScript: "puppet/onReady.js",
    paths: {
      bitmaps_reference: 'backstop_data/bitmaps_reference',
      bitmaps_test: 'backstop_data/bitmaps_test',
      ci_report: 'backstop_data/ci_report',
      engine_scripts: 'backstop_data/engine_scripts',
      html_report: 'backstop_data/html_report'
    },
    report: ['browser', 'CI'],
    requireSameDimensions: true,
    resembleOutputOptions: {
      ignoreAntialiasing: true,
      usePreciseMatching: true
    },
    scenarios: scenarios.map((scenario) => ({
      clickAllSelector: scenario.clickAllSelector,
      clickAllSelectors: scenario.clickAllSelectors,
      clickSelector: scenario.clickSelector,
      clickSelectors: scenario.clickSelectors,
      delay: 0,
      expect: 0,
      label: scenario.label,
      hideSelectors: [],
      hoverSelector: "",
      misMatchThreshold: 0.001,
      postInteractionWait: (scenario.clickSelector || scenario.clickSelectors) ? 200 : 0,
      readyEvent: "",
      readySelector: "",
      removeSelectors: [],
      referenceUrl: "",
      selectors: [
        "document"
      ],
      selectorExpansion: false,
      url: `http://${hostname}:${port}/iframe.html?selectedKind=${scenario.selectedKind}&selectedStory=${scenario.type}`,
      viewports: scenario.viewports ? _.concat(defaultViewports, scenario.viewports) : defaultViewports
    })),
    viewports: defaultViewports
  };
};

const backstopJson = composeBackstopJson();

module.exports = backstopJson;
