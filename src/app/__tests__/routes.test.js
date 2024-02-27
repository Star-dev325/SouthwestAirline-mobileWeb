jest.mock('src/app/app', () => ({ children }) => <div>{children}</div>);
jest.mock('src/homeAndNav/index', () => () => <div>Mocked HomeAndNav</div>);
jest.mock('src/wcm/index', () => () => <div>Mocked Wcm</div>);
jest.mock('src/flightStatus/index', () => () => <div>Mocked FlightStatus</div>);
jest.mock('src/rapidRewards/index', () => () => <div>Mocked RapidRewards</div>);
jest.mock('src/standby/index', () => () => <div>Mocked Standby</div>);
jest.mock('src/chase/index', () => () => <div>Mocked Chase</div>);
jest.mock('src/branch/index', () => () => <div>Mocked Branch</div>);
jest.mock('src/whereWeFly/index', () => () => <div>Mocked WhereWeFly</div>);
jest.mock('src/earlyBird', () => () => <div>Mocked EarlyBird</div>);
jest.mock('src/contactTracing', () => () => <div>Mocked ContactTracing</div>);
jest.mock('src/viewReservation', () => () => <div>Mocked ViewReservation</div>);
jest.mock('src/airBooking/index', () => () => <div>Mocked AirBooking</div>);
jest.mock('src/airCancel/index', () => () => <div>Mocked AirCancel</div>);
jest.mock('src/airChange/index', () => () => <div>Mocked AirChange</div>);
jest.mock('src/airUpgrade/index', () => () => <div>Mocked AirUpgrade</div>);
jest.mock('src/carBooking/index', () => () => <div>Mocked CarBooking</div>);
jest.mock('src/carCancel/index', () => () => <div>Mocked CarCancel</div>);
jest.mock('src/checkIn/index', () => () => <div>Mocked CheckIn</div>);
jest.mock('src/companion/index', () => () => <div>Mocked Companion</div>);
jest.mock('src/enroll/index', () => () => <div>Mocked Enroll</div>);
jest.mock('src/myAccount/index', () => () => <div>Mocked MyAccount</div>);
jest.mock('src/travelAdvisory/index', () => () => <div>Mocked TravelAdvisory</div>);
jest.mock('src/travelFunds/index', () => () => <div>Mocked TravelFunds</div>);
jest.mock('src/upgradedBoarding/index', () => () => <div>Mocked UpgradedBoarding</div>);
jest.mock('src/login/index', () => () => <div>Mocked Login</div>);
jest.mock('src/shared/pages/blankPage', () => () => <div>Mocked BlankPage</div>);
jest.mock('src/shared/featureToggle/featureTogglePage', () => () => <div>Mocked FeatureTogglePage</div>);
jest.mock('src/shared/featureToggle/viewAppConfigPage', () => () => <div>Mocked ViewAppConfigPage</div>);
jest.mock('src/shared/featureToggle/generateErrorPage', () => () => <div>Mocked GenerateErrorPage</div>);
jest.mock('src/externalPayment/pages/externalPaymentPage', () => () => <div>Mocked ExternalPaymentPage</div>);
jest.mock('src/homeAndNav/pages/offersPage', () => () => <div>Mocked OffersPage</div>);
jest.mock('src/shared/config/appConfig', () => ({
  USER_CAN_CHANGE_TOGGLES: true // You can change this value as needed for your test cases
}));
jest.mock('src/sameDay', () => () => <div>Mocked sameDay</div>);

import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import routes from 'src/app/routes';
import BrowserObject from 'src/shared/helpers/browserObject';

const { window } = BrowserObject;

describe('AppRoutes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render AirBooking route page', () => {
    window.history.pushState({}, '', '/air/booking/index.html');
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });

  it('should render AirCancel Reservation route page', () => {
    window.history.pushState({}, '', '/air/cancel-reservation/confirmation.html');
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });
});

const createComponent = () => {
  const store = configureMockStore()({
    app: {
      errorHeader: {
        errorMessage: null,
        hasError: false
      }
    },
    router: {
      location: {
        search: 'search'
      }
    }
  });

  return render(
    <Provider store={store}>
      <BrowserRouter>
        {routes}
      </BrowserRouter>
    </Provider>
  );
};
