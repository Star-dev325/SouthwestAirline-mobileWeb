import { sandbox } from 'sinon';
import * as WcmApi from 'src/shared/api/wcm/wcmApi';
import * as AirportsApi from 'src/shared/api/wcm/airportsApi';

const sinon = sandbox.create();

describe('AirportsApi', () => {
  beforeEach(() => {
    sinon.stub(WcmApi, 'getJsonFile');
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('getAirports', () => {
    it('should request correct url', () => {
      AirportsApi.getAirports();
      expect(WcmApi.getJsonFile).to.have.been.calledWith('content/generated/data/service/air_stations.json');
    });
  });
});
