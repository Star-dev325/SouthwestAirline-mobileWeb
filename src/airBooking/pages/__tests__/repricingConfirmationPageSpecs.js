import _ from 'lodash';
import React from 'react';
import { mount, shallow } from 'enzyme';
import sinonModule from 'sinon';
import { RepricingConfirmationPage } from 'src/airBooking/pages/repricingConfirmationPage';
import PricesBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/page/flights/pricesBuilder';
import { createMockStoreWithRouterMiddleware } from 'test/unit/helpers/createMockStore';
import { Provider } from 'react-redux';
import i18n from '@swa-ui/locale';

const sinon = sinonModule.sandbox.create();

describe('Repricing Confirmation', () => {
  const givenFlightPricingPage = new PricesBuilder().build().flightPricingPage;

  const givenSearchRequest = {
    numberOfAdults: 1,
    currencyType: 'USD',
    departureDate: '2017-11-10',
    destination: 'CLT',
    isRoundTrip: true,
    origin: 'AUS',
    returnDate: '2017-11-13',
    tripType: 'roundTrip',
    promoCode: ''
  };
  const givenProps = {
    flightPricingPage: {
      response: {
        flightPricingPage: givenFlightPricingPage
      }
    },
    searchRequest: givenSearchRequest,
    searchForFlightsFn: () => {}
  };

  let pushStub;

  beforeEach(() => {
    pushStub = sinon.stub();
    givenProps.push = pushStub;
  });

  afterEach(() => {
    sinon.restore();
  });

  context('render', () => {
    let RepricingConfirmationWrapper;

    beforeEach(() => {
      RepricingConfirmationWrapper = shallow(<RepricingConfirmationPage {...givenProps} />);
    });

    it('should render header', () => {
      RepricingConfirmationWrapper = createComponent();
      expect(RepricingConfirmationWrapper.find('PageHeader')).to.be.present();
    });

    it('should render repricing message', () => {
      expect(RepricingConfirmationWrapper.find('.pricing-summary--message')).to.have.text(
        i18n('SHARED__REPRICING__NOTIFICATION')
      );
    });

    it('should render `ReservationFlightSummary`', () => {
      expect(RepricingConfirmationWrapper.find('ReservationFlightSummary')).to.have.props({
        bounds: givenFlightPricingPage.bounds
      });
    });

    it('should render `PriceSummaryNotice`', () => {
      expect(RepricingConfirmationWrapper.find('PriceSummaryNotice')).to.be.present();
    });

    it('should render `PriceTotal`', () => {
      expect(RepricingConfirmationWrapper.find('PriceTotal')).to.have.props({
        totals: givenFlightPricingPage.totals,
        isReprice: true
      });
    });

    it('should render `RepricingNavigation`', () => {
      expect(RepricingConfirmationWrapper.find('RepricingNavigation')).to.be.present();
    });
  });

  context('when corporate', () => {
    it('should not show company header section if there is no associated company', () => {
      const wrapper = createComponent({});

      expect(wrapper.find('.company-name-banner')).not.to.be.present();
    });

    it('should show company header section if there is an associated company', () => {
      const wrapper = createComponent({
        selectedCompanyName: 'Dunder Mifflin Paper Company'
      });

      expect(wrapper.find('.company-name-banner')).to.be.present();
    });
  });

  const createComponent = (props = {}) => {
    const store = createMockStoreWithRouterMiddleware()();

    return mount(
      <Provider store={store}>
        <RepricingConfirmationPage {..._.merge({}, givenProps, props)} />
      </Provider>
    );
  };
});
