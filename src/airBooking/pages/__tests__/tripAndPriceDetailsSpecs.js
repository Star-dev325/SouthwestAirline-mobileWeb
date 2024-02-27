import _ from 'lodash';
import React from 'react';
import PricesBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/page/flights/pricesBuilder';
import { shallow } from 'enzyme';
import sinonModule from 'sinon';
import { mockErrorHeaderContainer } from 'test/unit/helpers/testUtils';
import { TripAndPriceDetails } from 'src/airBooking/pages/tripAndPriceDetails';

const sinon = sinonModule.sandbox.create();

describe('TripAndPriceDetails', () => {
  beforeEach(() => {
    mockErrorHeaderContainer(sinon);
  });

  afterEach(() => {
    sinon.restore();
  });

  context('render', () => {
    it('should return sub-component correctly', () => {
      const wrapper = createComponent();

      expect(wrapper.find('PageHeaderWithButtons')).to.present();
      expect(wrapper.find('ReservationFlightSummary')).to.present();
      expect(wrapper.find('PriceSummaryNotice')).to.present();
      expect(wrapper.find('PriceTotal')).to.present();
    });

    it('should back to review page when click the done button', () => {
      const goBackStub = sinon.stub();
      const wrapper = createComponent({
        goBack: goBackStub
      });

      wrapper.find('PageHeaderWithButtons').props().rightButtons[0].onClick();

      expect(goBackStub).to.called;
    });
  });
});

const createComponent = (props) => {
  const defaultProps = {
    goBack: _.noop,
    flightPricingPage: {
      response: new PricesBuilder().build()
    }
  };

  const mergedProps = _.merge({}, defaultProps, props);

  return shallow(<TripAndPriceDetails {...mergedProps} />);
};
