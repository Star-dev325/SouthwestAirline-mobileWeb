import { sandbox } from 'sinon';
import * as WcmApi from 'src/shared/api/wcm/wcmApi';
import * as TravelAdvisoryApi from 'src/shared/api/wcm/travelAdvisoryApi';

const sinon = sandbox.create();

describe('TravelAdvisoryApi', () => {
  beforeEach(() => {
    sinon.stub(WcmApi, 'getJsonFile');
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('getTravelAdvisories', () => {
    it('should request correct url', () => {
      TravelAdvisoryApi.getTravelAdvisories();
      expect(WcmApi.getJsonFile).to.have.been.calledWith('content/generated/data/travel_advisories_common.json');
    });
  });
});
