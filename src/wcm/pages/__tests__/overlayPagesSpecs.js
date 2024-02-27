import _ from 'lodash';
import Q from 'q';
import { sandbox } from 'sinon';
import { integrationMount } from 'test/unit/helpers/testUtils';
import * as overlayPages from 'src/wcm/pages/overlayPages';
import * as WcmApi from 'src/shared/api/wcmApi';
import waitFor from 'test/unit/helpers/waitFor';

const sinon = sandbox.create();

describe('Overlays', () => {
  const overlay = {
    title: 'fake title',
    body: ['fake body']
  };

  beforeEach(() => {
    sinon.stub(WcmApi, 'getJsonFile').returns(Q({ overlay }));
  });
  afterEach(() => {
    sinon.restore();
  });

  const dynamicOverlayNames = ['FareRulesForFareTypeOverlays'];
  const overlaysWithStaticRoute = _.omit(overlayPages, dynamicOverlayNames);

  context('overlays with static route', () => {
    _.forIn(overlaysWithStaticRoute, (page, pageName) => {
      it(`should render ${pageName}`, (done) => {
        const wrapper = integrationMount()(undefined, page);

        waitFor.untilAssertPass(() => {
          wrapper.update();
          expect(wrapper.find(pageName)).to.have.prop('overlay').to.deep.equal(overlay);
        }, done);
      });
    });
  });

  context('overlays with dynamic route', () => {
    it('should render FareRulesForFareTypeOverlays', (done) => {
      const props = {
        match: {
          params: {
            fareType: 'business-select'
          }
        }
      };
      const { FareRulesForFareTypeOverlays } = overlayPages;
      const wrapper = integrationMount()(undefined, FareRulesForFareTypeOverlays(props));

      waitFor.untilAssertPass(() => {
        wrapper.update();
        expect(wrapper.find('FareRulesForFareTypeOverlay')).to.have.prop('overlay').to.deep.equal(overlay);
      }, done);
    });
  });
});
