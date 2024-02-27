import { sandbox } from 'sinon';

import { transformHomeHeroesToHeroContents } from 'src/homeAndNav/transformers/heroShotsTransformers';
import * as HomeContentHelper from 'src/shared/helpers/homeContentHelper';

const sinon = sandbox.create();

describe('heroShotsTransformer', () => {
  afterEach(() => {
    sinon.restore();
  });

  context('from home heroes', () => {
    const response = {
      success: true,
      errors: [],
      results: {
        loginBanner: 'response 3'
      }
    };

    let filterAndSortContentStub;

    beforeEach(() => {
      filterAndSortContentStub = sinon.stub(HomeContentHelper, 'filterAndSortContent');
      filterAndSortContentStub.onCall(0).returns(['response1']);
      filterAndSortContentStub.onCall(1).returns(['response2']);
    });

    it('should separate by their keys', () => {
      const result = transformHomeHeroesToHeroContents(response);

      expect(filterAndSortContentStub.getCall(0).args[0]).to.deep.equal(response, 'homeHero');
      expect(filterAndSortContentStub.getCall(1).args[0]).to.deep.equal(response, 'homeBanner');
      expect(result).to.deep.equal({
        heroes: ['response1'],
        banners: ['response2'],
        loginBanner: 'response 3'
      });
    });
  });
});
