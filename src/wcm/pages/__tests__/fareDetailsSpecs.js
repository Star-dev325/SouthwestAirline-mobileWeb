import _ from 'lodash';
import FareDetailsBuilder from 'test/builders/model/fareDetailsBuilder';
import React from 'react';
import { airBookingRoutes } from "src/airBooking/constants/airBookingRoutes";
import RouterStore from 'src/shared/stores/routerStore';
import { click } from 'test/unit/helpers/enzymeFormTestUtils';
import { createComponent as createComponentHelper } from 'test/unit/helpers/testUtils';
import { FareDetails } from 'src/wcm/pages/fareDetails';
import { sandbox } from 'sinon';
import { shallow } from 'enzyme';
import * as AppSelector from 'src/shared/selectors/appSelector';

const sinon = sandbox.create();

describe('FareDetails', () => {
  let fareDetails;
  let defaultProps;

  beforeEach(() => {
    defaultProps = {
      location: {
        pathname: ''
      },
      pageContent: new FareDetailsBuilder().build(),
      goBack: sinon.stub(),
      push: sinon.stub()
    };
  });

  afterEach(() => {
    sinon.restore();
  });

  context('with default fares', () => {
    it('should render as expected', () => {
      const wrapper = createComponent({}, true);

      expect(wrapper).toMatchSnapshot();
    });
  });

  context('click back button', () => {
    beforeEach(() => {
      fareDetails = createComponentHelper(FareDetails, { props: defaultProps });
    });
    it('should back to shopping page when this is the initial page', () => {
      sinon.stub(RouterStore, 'getPrevState').returns(undefined);
      sinon.stub(AppSelector, 'getCurrentAppFlow').returns('air/booking');

      click(fareDetails.find('.action-bar-buttons--item button').at(0));

      expect(defaultProps.goBack).to.not.have.been.called;
      expect(defaultProps.push).to.have.been.calledWith(airBookingRoutes['index'].canonicalPath);
    });

    it('should back to previous page when this is not the initial page', () => {
      sinon.stub(RouterStore, 'getPrevState').returns({ routeState: 'route' });

      click(fareDetails.find('.action-bar-buttons--item button'));

      expect(defaultProps.goBack).to.have.been.called;
      expect(defaultProps.push).to.not.have.been.called;
    });
  });

  const createComponent = (props = {}, shouldShallow = false) => {
    const pageProps = _.merge({}, defaultProps, props);

    return shouldShallow
      ? shallow(<FareDetails {...pageProps} />)
      : createComponentHelper(FareDetails, { props: pageProps });
  };
});
