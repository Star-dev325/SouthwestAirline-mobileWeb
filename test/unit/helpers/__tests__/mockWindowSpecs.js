import _ from 'lodash';
import { sandbox } from 'sinon';
import {
  Window,
  Navigator,
  Geolocation
} from 'test/unit/helpers/mockWindow';

const sinon = sandbox.create();

describe('mockWindowSpecs', () => {
  afterEach(() => {
    sinon.restore();
  });

  context('geoLocation', () => {
    it('should return mock window not support geoLocation', () => {
      const window = new Window()
        .navigator(
          new Navigator()
            .geolocation()
            .build())
        .build();

      expect(window.navigator.geolocation).to.be.undefined;
    });

    it('should return mock window with getCurrentPosition success', () => {
      const window = new Window()
        .navigator(
          new Navigator()
            .geolocation(
              new Geolocation()
                .getCurrentPosition().success('100', '200')
                .build())
            .build())
        .build();

      const successStub = sinon.stub();

      window.navigator.geolocation.getCurrentPosition(successStub);

      expect(successStub).to.be.calledWithExactly({
        coords: {
          latitude: '100',
          longitude: '200'
        }
      });
    });

    it('should return mock window with getCurrentPosition failed', () => {
      const window = new Window()
        .navigator(
          new Navigator()
            .geolocation(
              new Geolocation()
                .getCurrentPosition().failed()
                .build())
            .build())
        .build();

      const failedStub = sinon.stub();

      window.navigator.geolocation.getCurrentPosition(_.noop, failedStub);

      expect(failedStub).to.be.called;
    });
  });
});
