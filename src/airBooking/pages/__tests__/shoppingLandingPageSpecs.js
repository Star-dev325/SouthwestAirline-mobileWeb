import { shallow } from 'enzyme';
import homeNavMenu from 'mocks/templates/content-delivery/homeNavMenu';
import Q from 'q';
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { sandbox } from 'sinon';
import { ShoppingLandingPage } from 'src/airBooking/pages/shoppingLandingPage';
import * as AppSelector from 'src/shared/selectors/appSelector';
import { click, submitForm } from 'test/unit/helpers/enzymeFormTestUtils';
import { mockErrorHeaderContainer, mountWithMemoryRouter } from 'test/unit/helpers/testUtils';

const sinon = sandbox.create();

describe('ShoppingLandingPage', () => {
  let analyticsTrackViewTabFnStub;
  let fetchLocalSearchRequestsFnStub;
  let getLowFareCalendarFnStub;
  let getUserInfoFnStub;
  let loadAirportsFnStub;
  let loadRecentlySearchedFnStub;
  let refreshCorporateInfoFnStub;
  let resetAirBookingFlowDataFnStub;
  let resetSavedCreditCardsFnStub;
  let savePassengerCountFnStub;
  let saveSearchRequestFnStub;
  let searchForFlightsFnStub;
  let searchForMultiSelectGroupFlightsFnStub;
  let shoppingLandingPage;
  let updateFormDataValueFnStub;
  let updateFormFieldDataValueFnStub;
  let updateSelectedAirportInfoFnStub;
  const multiSelectGroup = { isSelected: true, origin: ['BOS', 'BDL'] };

  beforeEach(() => {
    analyticsTrackViewTabFnStub = sinon.stub();
    fetchLocalSearchRequestsFnStub = sinon.stub();
    getLowFareCalendarFnStub = sinon.stub();
    getUserInfoFnStub = sinon.stub();
    loadAirportsFnStub = sinon.stub();
    loadRecentlySearchedFnStub = sinon.stub();
    mockErrorHeaderContainer(sinon);
    refreshCorporateInfoFnStub = sinon.stub();
    resetAirBookingFlowDataFnStub = sinon.stub();
    resetSavedCreditCardsFnStub = sinon.stub();
    savePassengerCountFnStub = sinon.stub();
    saveSearchRequestFnStub = sinon.stub();
    searchForFlightsFnStub = sinon.stub();
    searchForMultiSelectGroupFlightsFnStub = sinon.stub();
    updateFormDataValueFnStub = sinon.stub();
    updateFormFieldDataValueFnStub = sinon.stub();
    updateSelectedAirportInfoFnStub = sinon.stub();
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should call loadAirports and loadRecentlySearched', () => {
    sinon.stub(AppSelector, 'getCurrentAppFlow').returns('air/booking');
    shoppingLandingPage = createComponent();
    expect(loadAirportsFnStub).to.have.been.called;
    expect(loadRecentlySearchedFnStub).to.have.been.called;
  });

  context('render', () => {
    beforeEach(() => {
      shoppingLandingPage = createComponent();
    });

    it('should call initialization functions', () => {
      expect(fetchLocalSearchRequestsFnStub).to.have.been.called;
    });

    it('should call refreshCorporateInfo action', () => {
      expect(refreshCorporateInfoFnStub).to.have.been.calledWith(true);
    });

    it('should render form, page footer, set active tab to round trip, and not render corporate booking selection', () => {
      sinon.stub(AppSelector, 'getCurrentAppFlow').returns('air/booking');
      const page = createComponent({}, true);

      expect(page).toMatchSnapshot();
    });

    context('useEffect', () => {
      it('should update corporateInfo if all conditions are passed', () => {
        shoppingLandingPage = createComponent({
          corporateBookingSwitchInfo: { label: 'SWABIZ' },
          corporateInfo: {
            expirationDate: '2010-11-10T13:25:05',
            activeCompanyIdAssociations: [{ companyId: 123456 }, { companyId: 2345654 }]
          },
          isLoggedIn: true,
          getUserInfoFn: getUserInfoFnStub
        });
        expect(getUserInfoFnStub).to.have.been.called;
      });

      it('should not call getUserInfoFn if one of conditions of _hasCorporateSwitchInfo is false', () => {
        shoppingLandingPage = createComponent({
          corporateBookingSwitchInfo: { label: 'SWABIZ' },
          corporateInfo: { expirationDate: '2040-11-10T13:25:05', activeCompanyIdAssociations: [] },
          isLoggedIn: true,
          getUserInfoFn: getUserInfoFnStub
        });
        expect(getUserInfoFnStub).to.not.have.been.called;
      });

      it('should not call getUserInfoFn if corporateInfo is not expired', () => {
        shoppingLandingPage = createComponent({
          corporateBookingSwitchInfo: { label: 'SWABIZ' },
          corporateInfo: { expirationDate: '2040-11-10T13:25:05', activeCompanyIdAssociations: [] },
          isLoggedIn: true,
          getUserInfoFn: getUserInfoFnStub
        });
        expect(getUserInfoFnStub).to.not.have.been.called;
      });

      it('should not call getUserInfoFn if corporateInfo is expired and corporateInfo has empty associated company', () => {
        shoppingLandingPage = createComponent({
          corporateBookingSwitchInfo: { label: 'SWABIZ' },
          corporateInfo: { expirationDate: '2010-11-10T13:25:05', activeCompanyIdAssociations: [] },
          isLoggedIn: true,
          getUserInfoFn: getUserInfoFnStub
        });
        expect(getUserInfoFnStub).to.not.have.been.called;
      });

      it('should call getUserInfoFn if corporateInfo has at least one associated company', () => {
        shoppingLandingPage = createComponent({
          corporateBookingSwitchInfo: { label: 'SWABIZ' },
          corporateInfo: {
            expirationDate: '2010-11-10T13:25:05',
            activeCompanyIdAssociations: [{ companyId: 123456 }]
          },
          isLoggedIn: true,
          getUserInfoFn: getUserInfoFnStub
        });
        expect(getUserInfoFnStub).to.have.been.called;
      });

      it('should call getUserInfoFn if corporateInfo is expired', () => {
        shoppingLandingPage = createComponent({
          corporateBookingSwitchInfo: { label: 'SWABIZ' },
          corporateInfo: { expirationDate: '2010-11-10T13:25:05' },
          isLoggedIn: true,
          getUserInfoFn: getUserInfoFnStub
        });
        expect(getUserInfoFnStub).to.have.been.called;
      });

      it('should call savePassengerCountFnStub with default values if no values exists in search request', () => {
        shoppingLandingPage = createComponent({
          searchRequest: {
            adultPassengersCount: null,
            lapInfantPassengersCount: null
          },
          savePassengerCountFn: savePassengerCountFnStub
        });
        expect(savePassengerCountFnStub).to.have.been.called;
      });

      it('should call savePassengerCountFnStub with actual values from search request', () => {
        shoppingLandingPage = createComponent({
          searchRequest: {
            adultPassengersCount: 2,
            lapInfantPassengersCount: 1
          },
          savePassengerCountFn: savePassengerCountFnStub
        });
        expect(savePassengerCountFnStub).to.have.been.called;
      });
    });

    context('when user is logged in', () => {
      it('should indicate not to show corporate booking switch if corporateBookingSwitch is empty', () => {
        const page = createComponent(
          {
            corporateBookingSwitchInfo: {},
            isLoggedIn: true
          },
          true
        );

        expect(page.find('Container')).toMatchSnapshot();
      });

      it('should indicate not to show corporate booking switch if corporateInfo is empty', () => {
        const page = createComponent(
          {
            isLoggedIn: true,
            corporateBookingSwitchInfo: { label: 'SWABIZ', learnMoreUrl: '', nonCorporateLearnMoreUrl: '' }
          },
          true
        );

        expect(page.find('Container')).toMatchSnapshot();
      });

      it('should indicate not to show corporate booking switch when in a webview', () => {
        const page = createComponent(
          {
            corporateBookingSwitchInfo: { label: 'SWABIZ', learnMoreUrl: '', nonCorporateLearnMoreUrl: '' },
            corporateInfo: { activeCompanyIdAssociations: [{ companyId: 123456 }] },
            isLoggedIn: true,
            isWebView: true
          },
          true
        );

        expect(page.find('Container')).toMatchSnapshot();
      });

      it('should indicate to show corporate booking switch if mbox response indicates to show', () => {
        const page = createComponent(
          {
            corporateBookingSwitchInfo: { label: 'SWABIZ', learnMoreUrl: '', nonCorporateLearnMoreUrl: '' },
            corporateInfo: { activeCompanyIdAssociations: [{ companyId: 123456 }] },
            isLoggedIn: true
          },
          true
        );

        expect(page.find('Container')).toMatchSnapshot();
      });

      it('should indicate to show corporate booking switch if mbox response indicates to hide', () => {
        const page = createComponent(
          {
            corporateBookingSwitchInfo: { label: 'SWABIZ', learnMoreUrl: '', nonCorporateLearnMoreUrl: '' },
            corporateInfo: { activeCompanyIdAssociations: [{ companyId: 123456 }] },
            isLoggedIn: true
          },
          true
        );

        expect(page.find('Container')).toMatchSnapshot();
      });

      it('should indicate not to show corporate booking switch if corporateInfo is empty', () => {
        const page = createComponent(
          {
            corporateBookingSwitchInfo: { label: 'SWABIZ', learnMoreUrl: '', nonCorporateLearnMoreUrl: '' },
            isLoggedIn: true,
            getUserInfoFn: getUserInfoFnStub
          },
          true
        );

        expect(page.find('Container')).toMatchSnapshot();
      });
    });

    context('PageFooterWcmSourced', () => {
      it('should show PageFooterWcmSourced by default', () => {
        sinon.stub(AppSelector, 'getCurrentAppFlow').returns('air/booking');
        const footerLinkRows = homeNavMenu.results.footer.content.placement.linkRows;
        const page = createComponent({ footerLinkRows }, true);

        expect(page).toMatchSnapshot();
      });

      it('should not show PageFooterWcmSourced when webview is true', () => {
        sinon.stub(AppSelector, 'getCurrentAppFlow').returns('air/booking');
        const page = createComponent({ isWebView: true }, true);

        expect(page).toMatchSnapshot();
      });
    });
  });

  context('click on tab bar', () => {
    beforeEach(() => {
      shoppingLandingPage = createComponent();
    });

    it('should trigger updateFormFieldDataValueFn', () => {
      const tabBar = shoppingLandingPage.find('TabBar');

      click(tabBar.find('Tab').last().find('button'));

      expect(updateFormFieldDataValueFnStub).to.have.been.called;
    });
  });

  context('#onSearchFlightSubmit', () => {
    beforeEach(() => {
      searchForFlightsFnStub.returns(Q());
      shoppingLandingPage = createComponent();
      submitForm(shoppingLandingPage);
    });

    it('should trigger updateFormFieldDataValueFn to update isDateChanged', () => {
      expect(updateFormFieldDataValueFnStub).to.have.been.calledWith(
        'AIR_BOOKING_SHOPPING_SEARCH_FORM',
        'departureAndReturnDate',
        {
          departureDate: '2017-11-10',
          isDateChanged: true,
          returnDate: '2017-11-13'
        }
      );
    });

    it('should trigger getLowFareCalendarFn for low fare calendar', () => {
      getLowFareCalendarFnStub.returns(Q());
      const shoppingLandingPage = createComponent({
        searchFlightRequest: {
          useLowFareCalendar: true
        }
      });

      submitForm(shoppingLandingPage);

      expect(getLowFareCalendarFnStub.lastCall.args[0]).to.have.property('useLowFareCalendar', true);
    });

    it('should pass multiselectgroups data to searchForMultiSelectGroupFlights action', () => {
      searchForMultiSelectGroupFlightsFnStub.returns(Q());
      const shoppingLandingPage = createComponent({
        isMultiSelectGroupEnabled: true,
        multiSelectGroup
      });

      submitForm(shoppingLandingPage);

      const request = searchForMultiSelectGroupFlightsFnStub.lastCall.args[0];

      expect(request).to.have.property('multiSelectGroup');
    });

    it('should trigger the searchForFlights action', () => {
      const { searchRequest: searchRequestParameter } = searchForFlightsFnStub.lastCall.args[0];

      expect(searchRequestParameter).to.have.property('origin', 'ATL');
      expect(searchRequestParameter).to.have.property('destination', 'AUS');
    });

    it('should set values for numberOfLapInfants and numberOfAdults from passengerCountValue', () => {
      const { searchRequest: searchRequestParameter } = searchForFlightsFnStub.lastCall.args[0];

      expect(searchRequestParameter).to.have.property('numberOfLapInfants', 0);
      expect(searchRequestParameter).to.have.property('numberOfAdults', 1);
    });

    it('should call shopping reset and saved credit cards reset action', () => {
      expect(resetAirBookingFlowDataFnStub).to.have.been.calledImmediatelyBefore(resetSavedCreditCardsFnStub);
      expect(resetSavedCreditCardsFnStub).to.have.been.calledImmediatelyBefore(searchForFlightsFnStub);
    });
  });

  context('lapChild', () => {
    const pushStub = sinon.stub();

    beforeEach(() => {
      shoppingLandingPage = createComponent({
        toggles: {
          LAP_CHILD: true
        },
        push: pushStub
      });
    });

    it('should not show plus minus button', () => {
      expect(shoppingLandingPage.find('.passenger-amount-field button')).to.have.lengthOf(0);
    });

    it('should call pushStub function when clicked on wrapper', () => {
      click(shoppingLandingPage.find('.passenger-amount-field').at(0));

      expect(pushStub).to.have.been.called;
    });
  });

  describe('multiSelectGroup', () => {
    it('should pass multiSelectGroup data when isMultiSelectGroupEnabled is true', () => {
      sinon.stub(AppSelector, 'getCurrentAppFlow').returns('air/booking');
      const shoppingLandingPage = createComponent(
        {
          isMultiSelectGroupEnabled: true,
          multiSelectGroup
        },
        true
      );

      expect(shoppingLandingPage).toMatchSnapshot();
    });

    it('should pass multiSelectGroup blank when isMultiSelectGroupEnabled is false', () => {
      sinon.stub(AppSelector, 'getCurrentAppFlow').returns('air/booking');
      const shoppingLandingPage = createComponent(
        {
          multiSelectGroup
        },
        true
      );

      expect(shoppingLandingPage).toMatchSnapshot();
    });

    it('should pass multiSelectGroup as an empty object when isMultiSelectGroupEnabled is false', () => {
      sinon.stub(AppSelector, 'getCurrentAppFlow').returns('air/booking');
      const shoppingLandingPage = createComponent(
        {
          isMultiSelectGroupEnabled: false,
          multiSelectGroup
        },
        true
      );

      expect(shoppingLandingPage).toMatchSnapshot();
    });
  });

  const searchFlightRequest = {
    currencyType: 'USD',
    departureDate: '2017-11-10',
    destination: 'AUS',
    isRoundTrip: true,
    numberOfAdults: 1,
    origin: 'ATL',
    returnDate: '2017-11-13',
    tripType: 'roundTrip',
    promoCode: '',
    adultPassengersCount: 1,
    lapInfantPassengersCount: 0
  };
  const providerStore = configureMockStore()({
    app: {
      airBooking: {
        corporateBookingSwitchInfo: {
          label: 'Book with a SWABIZ account',
          learnMoreUrl: 'corporate/url',
          nonCorporateLearnMoreUrl: 'non/corporate/url'
        }
      },
      errorHeader: {
        hasError: false
      }
    },
    router: {
      location: {
        search: 'search'
      }
    }
  });

  const createComponent = (props = {}, shouldShallow = false) => {
    const defaultProps = {
      airportInfo: {},
      allAirports: [],
      analyticsTrackViewTabFn: analyticsTrackViewTabFnStub,
      calendarScheduleMessage: '',
      corporateBookingSwitchInfo: { label: 'SWABIZ' },
      fetchLocalSearchRequestsFn: fetchLocalSearchRequestsFnStub,
      footerLinkRows: [],
      getLowFareCalendarFn: getLowFareCalendarFnStub,
      getUserInfoFn: getUserInfoFnStub,
      history: {},
      isLoggedIn: false,
      isMultiSelectGroupEnabled: false,
      isWebView: false,
      lastBookableDate: '2018-08-08',
      loadAirportsFn: loadAirportsFnStub,
      loadRecentlySearchedFn: loadRecentlySearchedFnStub,
      location: {},
      multiSelectGroup: {},
      MWEB_HOMEPAGE_REDESIGN: false,
      recentlySearched: [],
      refreshCorporateInfoFn: refreshCorporateInfoFnStub,
      resetAirBookingFlowDataFn: resetAirBookingFlowDataFnStub,
      resetSavedCreditCardsFn: resetSavedCreditCardsFnStub,
      savePassengerCountFn: savePassengerCountFnStub,
      saveSearchRequestFn: saveSearchRequestFnStub,
      searchForFlightsFn: searchForFlightsFnStub,
      searchForMultiSelectGroupFlightsFn: searchForMultiSelectGroupFlightsFnStub,
      searchRequest: { ...searchFlightRequest, ...props.searchFlightRequest },
      updateFormDataValueFn: updateFormDataValueFnStub,
      updateFormFieldDataValueFn: updateFormFieldDataValueFnStub,
      updateSelectedAirportInfoFn: updateSelectedAirportInfoFnStub
    };
    const allProps = { ...defaultProps, ...props };

    if (shouldShallow) {
      return shallow(<ShoppingLandingPage {...allProps} />);
    } else {
      const ShoppingLandingPageWithProvider = () => (
        <Provider store={providerStore}>
          <ShoppingLandingPage {...allProps} />
        </Provider>
      );

      return mountWithMemoryRouter(ShoppingLandingPageWithProvider);
    }
  };
});
