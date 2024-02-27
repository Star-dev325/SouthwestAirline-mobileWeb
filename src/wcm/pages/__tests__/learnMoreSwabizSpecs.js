import _ from 'lodash';
import { LearnMoreSwabiz } from 'src/wcm/pages/learnMoreSwabiz';
import { shallow } from 'enzyme';
import React from 'react';
import { airBookingRoutes } from "src/airBooking/constants/airBookingRoutes";
import RouterStore from 'src/shared/stores/routerStore';
import { sandbox } from 'sinon';
import * as analyticsEventHelper from 'src/shared/analytics/helpers/analyticsEventHelper';
import * as AppSelector from 'src/shared/selectors/appSelector';

describe('LearnMoreSwabiz', () => {
  const sinon = sandbox.create();
  const TITLE = 'Learn more about SWABIZ';
  let pushStub;
  let goBackStub;
  let wcmFetchActionFnStub;
  let component;

  beforeEach(() => {
    sinon.stub(analyticsEventHelper, 'raiseSatelliteEvent');
    pushStub = sinon.stub();
    goBackStub = sinon.stub();
    wcmFetchActionFnStub = sinon.stub();
    component = createComponent();
  });

  afterEach(() => {
    sinon.restore();
  });

  context('when loading wcm content', () => {
    it('should call wcm content endpoint', () => {
      component.instance().componentDidMount();
      expect(wcmFetchActionFnStub).to.have.been.called;
    });

    it('should use push if there is no history', () => {
      sinon.stub(RouterStore, 'getPrevState').returns(null);
      sinon.stub(AppSelector, 'getCurrentAppFlow').returns('air/booking');
      component.instance()._transitionToAirBookingPage();
      expect(pushStub).to.have.been.calledWith(airBookingRoutes['index'].canonicalPath);
    });
    it('should use push if there is history', () => {
      sinon.stub(RouterStore, 'getPrevState').returns({ routeState: 'route' });
      component.instance()._transitionToAirBookingPage();
      expect(goBackStub).to.have.been.called;
    });

    it('should fire the analytics satellite event with what is swabiz', () => {
      component.instance().componentDidMount();

      expect(analyticsEventHelper.raiseSatelliteEvent).to.have.been.calledWith('what is swabiz');
    });
  });

  function createComponent(props = {}) {
    const defaultProps = {
      goBack: goBackStub,
      isWebView: false,
      learnMoreSwabizContent: {
        title: TITLE,
        body: []
      },
      push: pushStub,
      wcmFetchActionFn: wcmFetchActionFnStub
    };

    return shallow(<LearnMoreSwabiz {..._.merge({}, defaultProps, props)} />);
  }
});
