import React from 'react';
import _ from 'lodash';
import sinonModule from 'sinon';
import { mount } from 'enzyme';

import { Provider } from 'react-redux';
import { createMockStoreWithRouterMiddleware } from 'test/unit/helpers/createMockStore';

import { click } from 'test/unit/helpers/enzymeFormTestUtils';
import { mockErrorHeaderContainer } from 'test/unit/helpers/testUtils';
import { RecentSearchesPage } from 'src/airBooking/pages/recentSearchesPage';

const sinon = sinonModule.sandbox.create();

const searchFlightRequest = {
  currencyType: 'Dollars',
  departureDate: '2017-11-10',
  destination: 'CLT',
  isRoundTrip: true,
  numberOfAdults: 1,
  numberOfLapInfants: 0,
  origin: 'AUS',
  returnDate: '2017-11-13',
  tripType: 'roundTrip',
  promoCode: ''
};

const searchFlightRequestWithLapChildren = {
  currencyType: 'Dollars',
  departureDate: '2017-11-10',
  destination: 'CLT',
  isRoundTrip: true,
  numberOfAdults: 2,
  numberOfLapInfants: 2,
  origin: 'AUS',
  returnDate: '2017-11-13',
  tripType: 'roundTrip',
  promoCode: ''
};

const searchFlightRequestWithMultiSelectGroup = {
  currencyType: 'Dollars',
  departureDate: '2017-11-10',
  destination: 'CLT, BDL',
  isRoundTrip: true,
  numberOfAdults: 2,
  numberOfLapInfants: 0,
  origin: 'BOS, BDL',
  returnDate: '2017-11-13',
  tripType: 'roundTrip',
  promoCode: '',
  multiSelectGroup: {
    isSelected: true,
    origin: ['BOS', 'BDL']
  }
};

describe('RecentSearchesPage', () => {
  beforeEach(() => {
    mockErrorHeaderContainer(sinon);
  });

  afterEach(() => {
    sinon.restore();
  });

  let recentSearchesPageWrapper;

  context('render', () => {
    it('should show no-results message when search history store contains no searches', () => {
      recentSearchesPageWrapper = createComponent({ searches: [] });

      expect(recentSearchesPageWrapper.find('[data-qa="recent-searches-no-results"]')).to.exist;
    });

    it('should show as many search request cards as stored recent searches', () => {
      recentSearchesPageWrapper = createComponent({ searches: [searchFlightRequest] });

      expect(recentSearchesPageWrapper.find('RecentShoppingSearchCard')).to.be.present();
    });

    it('should show as many search request cards with lap children as stored recent searches', () => {
      recentSearchesPageWrapper = createComponent({ searches: [searchFlightRequestWithLapChildren] });

      expect(recentSearchesPageWrapper.find('RecentShoppingSearchCard')).to.be.present();
    });

    it('should show as many search request cards with multiselectgroups as stored recent searches', () => {
      recentSearchesPageWrapper = createComponent({ searches: [searchFlightRequestWithMultiSelectGroup] });

      expect(recentSearchesPageWrapper.find('RecentShoppingSearchCard')).to.be.present();
    });

    it('should show as many search request cards with multiselectgroups as stored recent searches', () => {
      recentSearchesPageWrapper = createComponent({
        searches: [searchFlightRequestWithMultiSelectGroup, searchFlightRequestWithLapChildren]
      });

      expect(recentSearchesPageWrapper.find('.recent-search').length).to.equal(2);
    });

    it('should show as many search request non search cards with multiselectgroups as stored recent searches', () => {
      recentSearchesPageWrapper = createComponent({
        searches: [searchFlightRequestWithMultiSelectGroup, searchFlightRequestWithLapChildren]
      });

      expect(recentSearchesPageWrapper.find('.recent-search').length).to.equal(2);
    });
  });

  context('click on card', () => {
    it('should reset selected airport info and transition to shoppingLandingPage', () => {
      const transitionToShoppingLandingPageStub = sinon.stub();

      recentSearchesPageWrapper = createComponent({
        searches: [searchFlightRequest],
        transitionToShoppingLandingPageFn: transitionToShoppingLandingPageStub
      });

      const recentSearchCard = recentSearchesPageWrapper.find('RecentShoppingSearchCard').find('.segment');

      click(recentSearchCard);

      expect(transitionToShoppingLandingPageStub).to.have.been.calledWith(searchFlightRequest);
    });

    it('should call loadMultiSelectGroup when recent search containing multile airports are selected', () => {
      const loadMultiSelectGroupStub = sinon.stub();

      recentSearchesPageWrapper = createComponent({
        searches: [searchFlightRequestWithMultiSelectGroup],
        loadMultiSelectGroupFn: loadMultiSelectGroupStub
      });

      const recentSearchCard = recentSearchesPageWrapper.find('RecentShoppingSearchCard').find('.segment');

      click(recentSearchCard);

      expect(loadMultiSelectGroupStub).to.have.been.calledWith(
        searchFlightRequestWithMultiSelectGroup.multiSelectGroup
      );
    });

    it('should call clearMultiSelectGroup when recent search containing multile airports are not selected', () => {
      const clearMultiSelectGroupStub = sinon.stub();

      recentSearchesPageWrapper = createComponent({
        searches: [searchFlightRequest],
        clearMultiSelectGroupFn: clearMultiSelectGroupStub
      });

      const recentSearchCard = recentSearchesPageWrapper.find('RecentShoppingSearchCard').find('.segment');

      click(recentSearchCard);

      expect(clearMultiSelectGroupStub).to.have.been.called;
    });
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      resetSelectedAirportsFn: _.noop,
      onDeleteCurrentSearchFn: _.noop,
      transitionToShoppingLandingPageFn: _.noop,
      loadMultiSelectGroupFn: _.noop,
      clearMultiSelectGroupFn: _.noop,
      history: {}
    };

    const store = createMockStoreWithRouterMiddleware()();

    return mount(
      <Provider store={store}>
        <RecentSearchesPage {..._.merge({}, defaultProps, props)} />
      </Provider>
    );
  };
});
