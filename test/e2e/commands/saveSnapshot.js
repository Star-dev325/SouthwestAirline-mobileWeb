'use strict';

const { argv } = require('yargs');
const path = require('path');
const _ = require('lodash');
const commit = require('child_process').execSync('git rev-parse HEAD').toString().trim();

module.exports.command = function(stepDescription) {
  const client = this;

  if (!stepDescription) throw new Error('Snapshots require a description.');

  if (argv.snapshots) {
    client.element('id', 'app', appElement => {
      const scrollHeightPromise = new Promise(resolve => {
        client.elementIdAttribute(appElement.value.ELEMENT, 'scrollHeight', result => {
          resolve(result.value);
        });
      });

      Promise.all([scrollHeightPromise]).then(heights => {
        const scrollHeight = heights[0];
        const clientHeight = '667';
        const screenshotsCount = Math.ceil(scrollHeight / clientHeight);

        const snapshotsPath = 'test/e2e/snapshots';
        const dashifiedModulePath = client.currentTest.module.split('/').map(folder => _.camelCase(folder)).join('-');
        const currentTestName = _.camelCase(client.currentTest.name);
        const camelCasedStepDescription = _.camelCase(stepDescription);

        let i = 0;

        do {
          client.execute(`document.querySelector('#app').scrollTop = ${clientHeight * i}`);
          client.pause(500);

          const fullFilepath = path.join(snapshotsPath, commit, `${dashifiedModulePath}-${currentTestName}-${camelCasedStepDescription}-${++i}.png`);

          client.saveScreenshot(fullFilepath, () => console.log(`${fullFilepath} saved`)); // eslint-disable-line no-console
        } while (i < screenshotsCount);
      });
    });
  }

  return client.waitForElementVisible('body', 10000);
};
