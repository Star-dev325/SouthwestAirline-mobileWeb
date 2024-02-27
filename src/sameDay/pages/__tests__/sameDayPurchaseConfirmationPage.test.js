jest.mock('src/checkIn/actions/checkInActions');
jest.mock('src/standby/actions/standbyActions');

import '@testing-library/jest-dom/extend-expect';
import { act, fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import * as checkInActions from 'src/checkIn/actions/checkInActions';
import SameDayPurchaseConfirmationPage from 'src/sameDay/pages/sameDayPurchaseConfirmationPage';
import * as standbyActions from 'src/standby/actions/standbyActions';
import FlightsPurchasePageBuilder from 'test/builders/apiResponse/flightsPurchasePageBuilder';
import SameDayPurchaseConfirmationBuilder from 'test/builders/apiResponse/sameDayPurchaseConfirmationPageBuilder';
import FlexPlacementBuilder from 'test/builders/model/flexPlacementBuilder';
import configureMockStore from 'test/unit/helpers/configureMockStore';
import { untilAssertPass } from 'test/unit/helpers/waitFor';

describe('sameDayPurchaseConfirmationPage', () => {
  let checkEnhancedStandbyNearAirportFnMock;
  let checkInFnMock;
  let checkStandbyNearAirportFnMock;
  let resetFlowDataFnMock;
  let response;
  let retrieveSameDayPurchaseConfirmationPlacementFnMock;
  let transitToBoardingPositionFnMock;

  const passengerRequestDetailsMock = { firstName: 'Eric', lastName: 'test', recordLocator: 'xyzabc' };

  beforeEach(() => {
    checkEnhancedStandbyNearAirportFnMock = standbyActions.checkEnhancedStandbyNearAirport.mockImplementationOnce(
      () => () => Promise.resolve({ type: 'retrieve' })
    );
    checkInFnMock = checkInActions.checkIn.mockImplementationOnce(
      () => () => Promise.resolve({ type: 'retrieve' }));
    checkStandbyNearAirportFnMock = standbyActions.checkStandbyNearAirport.mockImplementationOnce(
      () => () => Promise.resolve({ type: 'retrieve' })
    );
    resetFlowDataFnMock =
    checkInActions.resetFlowData.mockImplementationOnce(
      () => () => Promise.resolve({ type: 'retrieve' })
    );
    response = new SameDayPurchaseConfirmationBuilder().build();
    retrieveSameDayPurchaseConfirmationPlacementFnMock = jest.fn().mockResolvedValue({});
    transitToBoardingPositionFnMock = checkInActions.transitToBoardingPosition.mockImplementationOnce(
      () => () => Promise.resolve({ type: 'retrieve' }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render Same day Purchase Confirmation page', () => {
    const { sameDayConfirmationPage } = new SameDayPurchaseConfirmationBuilder().build();
    const state = { app: { sameDay: { sameDayConfirmationPage: { response: sameDayConfirmationPage } } } };
    const { container } = createComponent({}, state);

    expect(container).toMatchSnapshot();
  });

  it('should should render standby confirmation placement if sameDayConfirmationContentModule1 exists', () => {
    const mockPlacement = new FlexPlacementBuilder().build();
    const { container } = createComponent({
      sameDayConfirmationPagePlacement: { app: { sameDay: { sameDayConfirmationPage: { sameDayConfirmationContentModule1: mockPlacement } } } }
    });

    expect(container).toMatchSnapshot();
  });

  it('should call retrieveSameDayPurchaseConfirmationPlacementFn on mount if passenger contactInfo exists', () => {
    const testContactInfo = { contactInfo: { details: 'test@mail.com', method: 'EMAIL' } };

    createComponent({
      sameDayConfirmationInformation: { fareSummary: { total: 0 }, location: {}, ...testContactInfo },
      retrieveSameDayPurchaseConfirmationPlacementFn: retrieveSameDayPurchaseConfirmationPlacementFnMock
    });
    untilAssertPass(() => {
      expect(retrieveSameDayPurchaseConfirmationPlacementFnMock).toHaveBeenCalled();
    });
  });

  it('should render MessageWithInstructions', () => {
    const { container } = createComponent();

    expect(container.querySelector('.trip-booked--content')).toMatchSnapshot();
    expect(container.querySelector('.info-banner--alert')).not.toBeInTheDocument();
  });

  it('should render check in message', () => {
    const { container } = createComponent({}, { 
      app: {
        account: {
          isLoggedIn: true
        },
        errorHeader: {
          errorMessage: null,
          hasError: false
        },
        sameDay: {
          sameDayConfirmationPage: {
            response: {
              bounds: [{}],
              fareSummary: { total: 0 },
              location: {}
            }
          }
        }
      }
    });

    expect(container.querySelector('.trip-booked--content')).toMatchSnapshot();
  });

  it('should render InfoBanner', () => {
    response = new FlightsPurchasePageBuilder().withWarningIcon().build().flightConfirmationPage;
    const { container } = createComponent();

    expect(container.querySelector('.info-banner--alert')).toMatchSnapshot();
  });

  it('should render stand by list footer with points and no tax', () => {
    const { sameDayConfirmationPage: sameDayConfirmationPageAmountDueNoTax } = new SameDayPurchaseConfirmationBuilder().withPointsNoTaxAmountDue().build();
    const state = { app: { sameDay: { sameDayConfirmationPage: { response: sameDayConfirmationPageAmountDueNoTax } } } };
    const { container } = createComponent({}, state);

    expect(container).toMatchSnapshot();
  });

  it('should render stand by list footer with points and tax', () => {
    const { sameDayConfirmationPage: sameDayConfirmationPageAmountDueWithTax } = new SameDayPurchaseConfirmationBuilder().withPointsAmountDue().build();
    const state = { app: { sameDay: { sameDayConfirmationPage: { response: sameDayConfirmationPageAmountDueWithTax } } } };
    const { container } = createComponent({}, state);

    expect(container).toMatchSnapshot();
  });

  it('should render stand by list footer with credit when refund exists', () => {
    const { sameDayConfirmationPage: sameDayConfirmationPageCreditDue } = new SameDayPurchaseConfirmationBuilder().withTotalCreditDue().build();
    const state = { app: { sameDay: { sameDayConfirmationPage: { response: sameDayConfirmationPageCreditDue } } } };
    const { container } = createComponent({}, state);

    expect(container).toMatchSnapshot();
  });

  it('should render stand by list footer with credit and tax when refund exists in points', () => {
    const { sameDayConfirmationPage: sameDayConfirmationPageCreditDueWithTax } = new SameDayPurchaseConfirmationBuilder().withPointsTotalCreditDue().build();
    const state = { app: { sameDay: { sameDayConfirmationPage: { response: sameDayConfirmationPageCreditDueWithTax } } } };
    const { container } = createComponent({}, state);

    expect(container).toMatchSnapshot();
  });
  
  it('should render stand by list footer with points and taxes due', () => {
    const { sameDayConfirmationPage: sameDayConfirmationPointsAndTaxDue } = new SameDayPurchaseConfirmationBuilder().withPointsAndTaxDue().build();
    const state = { app: { sameDay: { sameDayConfirmationPage: { response: sameDayConfirmationPointsAndTaxDue } } } };
    const { container } = createComponent({}, state);

    expect(container).toMatchSnapshot();
  });

  it('should render stand by list footer with even exchange points and taxes due', () => {
    const { sameDayConfirmationPage: sameDayConfirmationPointsEvenExchangeAndTaxDue } = new SameDayPurchaseConfirmationBuilder().withEvenExchangeAndTaxDue().build();
    const state = { app: { sameDay: { sameDayConfirmationPage: { response: sameDayConfirmationPointsEvenExchangeAndTaxDue } } } };
    const { container } = createComponent({}, state);

    expect(container).toMatchSnapshot();
  });

  it('should render stand by list footer with points credit and tax credit', () => {
    const { sameDayConfirmationPage: sameDayConfirmationPointsAndTaxCredit } = new SameDayPurchaseConfirmationBuilder().withPointsAndTaxCredit().build();
    const state = { app: { sameDay: { sameDayConfirmationPage: { response: sameDayConfirmationPointsAndTaxCredit } } } };
    const { container } = createComponent({}, state);

    expect(container).toMatchSnapshot();
  });

  it('should render stand by list footer with no points due and tax credit', () => {
    const { sameDayConfirmationPage: sameDayConfirmationNoPointsDueAndTaxCredit } = new SameDayPurchaseConfirmationBuilder().withNoPointsDueAndTaxCredit().build();
    const state = { app: { sameDay: { sameDayConfirmationPage: { response: sameDayConfirmationNoPointsDueAndTaxCredit } } } };
    const { container } = createComponent({}, state);

    expect(container).toMatchSnapshot();
  });

  it('should render stand by list footer with points credit and taxes due', () => {
    const { sameDayConfirmationPage: sameDayConfirmationPointsCreditTaxDue } = new SameDayPurchaseConfirmationBuilder().withPointsCreditAndTaxDue().build();
    const state = { app: { sameDay: { sameDayConfirmationPage: { response: sameDayConfirmationPointsCreditTaxDue } } } };
    const { container } = createComponent({}, state);

    expect(container).toMatchSnapshot();
  });

  it('should render stand by list footer with only points due', () => {
    const { sameDayConfirmationPage: sameDayConfirmationOnlyPointsDue } = new SameDayPurchaseConfirmationBuilder().withOnlyPointsDue().build();
    const state = { app: { sameDay: { sameDayConfirmationPage: { response: sameDayConfirmationOnlyPointsDue } } } };
    const { container } = createComponent({}, state);

    expect(container).toMatchSnapshot();
  });

  it('should render stand by list footer with only even exchange points due', () => {
    const { sameDayConfirmationPage: sameDayConfirmationOnlyPointsEvenExchange } = new SameDayPurchaseConfirmationBuilder().withOnlyEvenExchange().build();
    const state = { app: { sameDay: { sameDayConfirmationPage: { response: sameDayConfirmationOnlyPointsEvenExchange } } } };
    const { container } = createComponent({}, state);

    expect(container).toMatchSnapshot();
  });

  it('should render stand by list footer with points credit ', () => {
    const { sameDayConfirmationPage: sameDayConfirmationOnlyPointsCredit } = new SameDayPurchaseConfirmationBuilder().withOnlyPointsCredit().build();
    const state = { app: { sameDay: { sameDayConfirmationPage: { response: sameDayConfirmationOnlyPointsCredit } } } };
    const { container } = createComponent({}, state);

    expect(container).toMatchSnapshot();
  });
  
  describe('standby list page', () => {
    const clickSameDayConfirmationButton = (queryByText, text = 'see standby list') => {
      fireEvent.click(queryByText(text));
    };

    it('should route to Enhanced stand by list page when clicked with isEnhancedStandbyList is true', () => {
      const { sameDayConfirmationPage } = new SameDayPurchaseConfirmationBuilder().build();
      const state = {
        app: {
          sameDay: { sameDayConfirmationPage: { response: sameDayConfirmationPage } },
          toggles: { ENHANCED_STANDBY_LIST: true },
          viewReservation: { searchRequest: passengerRequestDetailsMock }
        }
      };
      const { queryByText } = createComponent(
        { checkEnhancedStandbyNearAirportFn: checkEnhancedStandbyNearAirportFnMock },
        state
      );

      act(() => clickSameDayConfirmationButton(queryByText));

      expect(checkEnhancedStandbyNearAirportFnMock).toHaveBeenCalledWith(
        sameDayConfirmationPage._links.enhancedStandbyList,
        true,
        true,
        passengerRequestDetailsMock
      );
    });

    it('should route to stand by list page when clicked with isEnhancedStandbyList is false', () => {
      const enhancedStandbyList = {
        'arrival-time': '18:30',
        'departure-date': '2022-11-07',
        'departure-time': '15:30',
        'destination-airport': 'DEN',
        'first-name': 'Eric',
        'flight-number': '1234',
        'last-name': 'test',
        'origin-airport': 'PHX',
        'record-locator': 'xyzabc'
      };
      const { sameDayConfirmationPage } = new SameDayPurchaseConfirmationBuilder().build();
      const state = {
        app: {
          sameDay: { sameDayConfirmationPage: { response: sameDayConfirmationPage } },
          toggles: { ENHANCED_STANDBY_LIST: false },
          viewReservation: { searchRequest: passengerRequestDetailsMock }
        }
      };
      const { queryByText } = createComponent(
        { checkStandbyNearAirportFn: checkStandbyNearAirportFnMock },
        state
      );

      act(() => clickSameDayConfirmationButton(queryByText));

      expect(checkStandbyNearAirportFnMock).toHaveBeenCalledWith(enhancedStandbyList, true, true);
    });

    it('should route to Enhanced stand by list page when clicked with isEnhancedStandbyList is true and isNonRevPnr is true', () => {
      const enhancedStandbyList = {
        body: {
          standbyToken: 'standbyToken'
        },
        href: '/v1/mobile-air-operations/page/standby/ABC123',
        labelText: 'see standby list',
        method: 'POST'
      };
      const { sameDayConfirmationPage } = new SameDayPurchaseConfirmationBuilder().build();
      const state = {
        app: {
          sameDay: { sameDayConfirmationPage: { response: sameDayConfirmationPage } },
          toggles: { ENHANCED_STANDBY_LIST: true },
          viewReservation: { flightReservation: { isNonRevPnr: true }, searchRequest: passengerRequestDetailsMock }
        }
      };
      const { queryByText } = createComponent(
        {
          checkEnhancedStandbyNearAirportFn: checkEnhancedStandbyNearAirportFnMock,
          isNonRevPnr: true
        },
        state
      );

      act(() => clickSameDayConfirmationButton(queryByText));

      expect(checkEnhancedStandbyNearAirportFnMock).toHaveBeenCalledWith(
        enhancedStandbyList,
        true,
        false,
        passengerRequestDetailsMock
      );
    });

    it('should route to stand by list page when clicked with isEnhancedStandbyList is false and isNonRevPnr is true', () => {
      const { sameDayConfirmationPage } = new SameDayPurchaseConfirmationBuilder().build();
      const enhancedStandbyList = {
        'arrival-time': '18:30',
        'departure-date': '2022-11-07',
        'departure-time': '15:30',
        'destination-airport': 'DEN',
        'first-name': 'Eric',
        'flight-number': '1234',
        'last-name': 'test',
        'origin-airport': 'PHX',
        'record-locator': 'xyzabc'
      };
      const state = {
        app: {
          sameDay: { sameDayConfirmationPage: { response: sameDayConfirmationPage } },
          toggles: { ENHANCED_STANDBY_LIST: false },
          viewReservation: { flightReservation: { isNonRevPnr: true }, searchRequest: passengerRequestDetailsMock }
        }
      };
      const { queryByText } = createComponent(
        { checkStandbyNearAirportFn: checkStandbyNearAirportFnMock, isNonRevPnr: true },
        state
      );

      act(() => clickSameDayConfirmationButton(queryByText));

      expect(checkStandbyNearAirportFnMock).toHaveBeenCalledWith(enhancedStandbyList, true, false);
    });
  });

  describe('when click Boarding Details button', () => {
    const { sameDayConfirmationPage } = new SameDayPurchaseConfirmationBuilder().withTotalCreditDue().build();

    it('should call resetFlowData and checkIn action', () => {
      const state = { app: { sameDay: { sameDayConfirmationPage: { response: sameDayConfirmationPage } } } };
      const { getByText } = createComponent({}, state);
      const sameDayConfirmationButton = getByText('Boarding details');

      fireEvent.click(sameDayConfirmationButton);

      expect(resetFlowDataFnMock).toHaveBeenCalled();
      expect(checkInFnMock).toHaveBeenCalledWith({
        body: {
          firstName: 'Bobby',
          lastName: 'Blaine',
          passengerSearchToken: "eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMhV3Km1",
          recordLocator: '3NSCML'
        },
        href: '/v1/mobile-air-operations/page/check-in/view-boarding-details',
        isLoggedIn: undefined,
        labelText: "Boarding details",
        method: 'POST'
      });
    });

    it('should call transitToBoardingPosition when the checkIn API is successful', async () => {
      const state = { app: { sameDay: { sameDayConfirmationPage: { response: sameDayConfirmationPage } } } };
      const { getByText } = createComponent({}, state);
      const sameDayConfirmationButton = getByText('Boarding details');

      fireEvent.click(sameDayConfirmationButton);

      await checkInFnMock;

      expect(transitToBoardingPositionFnMock).toHaveBeenCalled();
    });

    it('should not call transitToBoardingPosition when the checkIn API is failed', () => {
      checkInFnMock = jest.fn().mockRejectedValue('');
      const state = { app: { sameDay: { sameDayConfirmationPage: { response: sameDayConfirmationPage } } } };
      const { getByText } = createComponent({}, state);
      const sameDayConfirmationButton = getByText('Boarding details');

      fireEvent.click(sameDayConfirmationButton);

      expect(transitToBoardingPositionFnMock).not.toHaveBeenCalled();
    });
  });

  const createComponent = (props = {}, state = {}) => {
    const defaultProps = {
      ...response,
      location: {},
      match: { params: '' },
      isNonRevPnr: false,
      checkEnhancedStandbyNearAirportFn: checkEnhancedStandbyNearAirportFnMock,
      checkStandbyNearAirportFn: checkStandbyNearAirportFnMock,
      checkInFn: checkInFnMock,
      resetFlowDataFn: resetFlowDataFnMock,
      sameDayConfirmationInformation: {
        fareSummary: { total: 0 },
        location: {}
      },
      transitToBoardingPositionFn: transitToBoardingPositionFnMock,
      passengerRequestDetails: passengerRequestDetailsMock
    };
    const defaultState = {
      app: {
        account: {
          isLoggedIn: true
        },
        errorHeader: {
          errorMessage: null,
          hasError: false
        },

        sameDay: {}
      },
      router: {
        location: {
          search: 'search'
        }
      }
    };
    const mergedProps = { ...defaultProps, ...props };
    const store = configureMockStore()({ ...defaultState, ...state });

    return render(
      <div>
        <Provider store={store}>
          <Router>
            <SameDayPurchaseConfirmationPage {...mergedProps} />
          </Router>
        </Provider>
      </div>
    );
  };
});
