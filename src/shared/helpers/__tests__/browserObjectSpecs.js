import waitFor from 'test/unit/helpers/waitFor';
import _ from 'lodash';
import BrowserObject from 'src/shared/helpers/browserObject';

describe('BrowserObject', () => {
  context('loadJSAsync', () => {
    beforeEach(() => {
      const appRoot = window.document.getElementById('appRoot');
      const mainScriptElement = document.createElement('script');

      appRoot.parentNode.insertBefore(mainScriptElement, appRoot);
    });

    afterEach('clean up script nodes added by tests', () => {
      const scriptElements = window.document.getElementsByTagName('script');

      _.forEach(scriptElements, (scriptElement) => {
        scriptElement.parentNode.removeChild(scriptElement);
      });
    });

    it('should insert a script element', (done) => {
      const src = 'https://the.mobile.com/maps/api/js?client=client&callback=initMap';

      BrowserObject.loadJSAsync(src);

      waitFor.untilAssertPass(() => {
        const scriptElements = window.document.getElementsByTagName('script');

        expect(scriptElements).to.have.lengthOf(2);

        const scriptElement = scriptElements[0];

        expect(scriptElement.getAttribute('src')).to.contain.string('&callback=initMap');
      }, done);
    });
  });
});
