import i18n from '@swa-ui/locale';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent } from '@testing-library/react';
import React from 'react';
import { airBookingRoutes } from "src/airBooking/constants/airBookingRoutes";
import PurchaseConfirmationPage from 'src/airBooking/pages/purchaseConfirmationPage';
import * as AppSelector from 'src/shared/selectors/appSelector';
import FlightsPurchasePageBuilder from 'test/builders/apiResponse/flightsPurchasePageBuilder';
import { getPaymentInfoForUseNewCreditCard } from 'test/builders/model/paymentInfoBuilder';
import { integrationRender } from 'test/unit/helpers/testingLibraryUtils.js';

describe('Enhanced purchaseConfirmationPage', () => {
  it('should navigate to air booking shopping page when user click the search flight when there is some passenger failed get pnr confirmation', () => {
    jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('air/booking');
    const instance = React.createRef();
    const { container } = createComponent({ failedPassengers: ['Amber Awesome'], instance });

    fireEvent.click(container.querySelector('[data-qa="search-flight"]'));

    expect(instance.current.props.history.location.pathname).toEqual(airBookingRoutes['index'].canonicalPath);
  });

  it('should show page header with correct content', () => {
    const { container } = createComponent();

    expect(container.querySelector('.header').textContent).toEqual(
      i18n('AIR_BOOKING__PURCHASE_CONFIRMATION_MESSAGES__HEADER')
    );
  });

  it('should show check email messaging when bounds is null', () => {
    const { container } = createComponent();

    expect(container.querySelector('.trip-booked--content')).toMatchSnapshot();
  });

  it('should show passport required messaging when passport is not completed', () => {
    const { container } = createComponent({
      messages: [
        {
          "key": "BOOKING_CONFIRMATION_PASSPORT_REQUIRED",
          "header": i18n('AIR_BOOKING__CONFIRMATION_PASSPORT_REQUIRED_HEADER'),
          "body": i18n('AIR_BOOKING__CONFIRMATION_PASSPORT_REQUIRED_BODY'),
          "icon": "INFO",
          "textColor": "DEFAULT"
        }
      ]
    });

    expect(container.querySelector('.info-banner-container')).toMatchSnapshot();
  });

  const createComponent = (props = {}, withHeaderMessage) => {
    const paymentInfo = { ...getPaymentInfoForUseNewCreditCard() };
    const response = withHeaderMessage
      ? new FlightsPurchasePageBuilder().build().flightConfirmationPage
      : new FlightsPurchasePageBuilder().withoutHeaderMessage().build().flightConfirmationPage;

    const defaultProps = {
      ...response,
      saveCreditCardFn: () => {},
      savedCreditCards: {
        primaryCard: null,
        cardsWithoutPrimary: []
      },
      paymentInfo,
      confirmationPagePlacements: {
        bottomPromo1: {}
      }
    };

    const state = {
      app: {
        airBooking: {
          flightConfirmationPage: {
            response: {
              flightConfirmationPage: { ...defaultProps, ...props }
            }
          }
        }
      }
    };

    return integrationRender()(state, PurchaseConfirmationPage, props);
  };
});
