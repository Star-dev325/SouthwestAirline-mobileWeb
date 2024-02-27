jest.mock('src/airCancel/actions/airCancelActions');

import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import _ from 'lodash';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { AirCancelBoundConfirmationPage } from 'src/airCancel/pages/airCancelBoundConfirmationPage';
import * as AppSelector from 'src/shared/selectors/appSelector';
import CancelBoundConfirmationPageBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/page/cancel/cancelBoundConfirmationPageBuilder';
import { createMockStoreWithRouterMiddleware } from 'test/unit/helpers/createMockStore';

describe('AirCancelBoundConfirmationPage', () => {
  let cancelBoundConfirmationPage, getReserveCheckInReservationWithLinkFnMock;
  const pushMock = jest.fn();
  const retrieveTravelFundsMock = jest.fn().mockResolvedValue('promise');

  beforeEach(() => {
    getReserveCheckInReservationWithLinkFnMock = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render basic information', () => {
    jest.spyOn(AppSelector, 'getCurrentAppFlow')
      .mockReturnValueOnce('air/cancel');
    ({ cancelBoundConfirmationPage } = new CancelBoundConfirmationPageBuilder().withMessages().build());
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });

  it('should not render messages if none are sent', () => {
    jest.spyOn(AppSelector, 'getCurrentAppFlow')
      .mockReturnValueOnce('air/cancel');
    ({ cancelBoundConfirmationPage } = new CancelBoundConfirmationPageBuilder().build());
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });

  it('should render multiple messages if multiple are sent', () => {
    jest.spyOn(AppSelector, 'getCurrentAppFlow')
      .mockReturnValueOnce('air/cancel');
    ({ cancelBoundConfirmationPage } = new CancelBoundConfirmationPageBuilder().withMessages(3).build());
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });

  it('should not render passengers if none are sent', () => {
    jest.spyOn(AppSelector, 'getCurrentAppFlow')
      .mockReturnValueOnce('air/cancel');
    ({ cancelBoundConfirmationPage } = new CancelBoundConfirmationPageBuilder().withNoPassengers().build());
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });

  it('should not render refundMessage if none is sent', () => {
    jest.spyOn(AppSelector, 'getCurrentAppFlow')
      .mockReturnValueOnce('air/cancel');
    ({ cancelBoundConfirmationPage } = new CancelBoundConfirmationPageBuilder().withCustomRefundMessage(null).build());
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });

  it('should not render receipt email label if shouldShowReceiptEmail is false', () => {
    jest.spyOn(AppSelector, 'getCurrentAppFlow')
      .mockReturnValueOnce('air/cancel');
    ({ cancelBoundConfirmationPage } = new CancelBoundConfirmationPageBuilder().withNoReceiptEmail().build());
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });

  it('should not render remaining bounds nor passenger info if none are sent', () => {
    jest.spyOn(AppSelector, 'getCurrentAppFlow')
      .mockReturnValueOnce('air/cancel');
    ({ cancelBoundConfirmationPage } = new CancelBoundConfirmationPageBuilder().setRemainingBounds().build());
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });

  it('should render button if link is present', () => {
    ({ cancelBoundConfirmationPage } = new CancelBoundConfirmationPageBuilder().withCheckInLink().build());
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });

  it('should call getReserveCheckInReservationWithLinkFn if _links.checkIn has value', () => {
    ({ cancelBoundConfirmationPage } = new CancelBoundConfirmationPageBuilder().withCheckInLink().build());
    const { container } = createComponent();

    fireEvent.click(container.querySelector('button[data-qa="check-in-button"]'));
    expect(getReserveCheckInReservationWithLinkFnMock).toBeCalled();
  });

  it('should display `View Travel Funds` button when refund held for future use', () => {
    jest.spyOn(AppSelector, 'getCurrentAppFlow')
      .mockReturnValueOnce('air/cancel');
    ({ cancelBoundConfirmationPage } = new CancelBoundConfirmationPageBuilder().withViewTravelFunds().build());
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });

  it('should retrieveTravelFundsFn and push to travel funds lookup page when `View travel funds` is clicked', () => {
    ({ cancelBoundConfirmationPage } = new CancelBoundConfirmationPageBuilder().withViewTravelFunds().build());
    const { container } = createComponent();

    fireEvent.click(container.querySelector('.view-travel-funds-button'));
    expect(retrieveTravelFundsMock).toBeCalled();
    expect(pushMock).toBeCalled();
  });

  it('should not display `View Travel Funds` button when refund sent to credit card', () => {
    jest.spyOn(AppSelector, 'getCurrentAppFlow')
      .mockReturnValueOnce('air/cancel');
    ({ cancelBoundConfirmationPage } = new CancelBoundConfirmationPageBuilder().build());
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });

  it('should render a non-refundable expiration date if defined', () => {
    jest.spyOn(AppSelector, 'getCurrentAppFlow')
      .mockReturnValueOnce('air/cancel');
    ({ cancelBoundConfirmationPage } = new CancelBoundConfirmationPageBuilder().withHoldFunds().build());
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });

  it('should not render a non-refundable expiration date at all if it is null or undefined', () => {
    jest.spyOn(AppSelector, 'getCurrentAppFlow')
      .mockReturnValueOnce('air/cancel');
    ({ cancelBoundConfirmationPage } = new CancelBoundConfirmationPageBuilder().withHoldFunds().build());
    cancelBoundConfirmationPage.nonRefundableExpirationDate = null;
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });

  it('should render RefundSummaryForCancel component with guestPasses when guestPasses present and allowBookAnotherFlight is false', () => {
    ({ cancelBoundConfirmationPage } = new CancelBoundConfirmationPageBuilder().withNonRev().build());
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });

  it('should render Book A Flight button if allowBookAnotherFlight is true and checkIn is false', () => {
    jest.spyOn(AppSelector, 'getCurrentAppFlow')
      .mockReturnValueOnce('air/cancel');
    ({ cancelBoundConfirmationPage } = new CancelBoundConfirmationPageBuilder()
      .withAllowBookAnotherFlightFlag()
      .build());
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });

  it('should not render Book A flight button when guestPasses present and allowBookAnotherFlight is false', () => {
    ({ cancelBoundConfirmationPage } = new CancelBoundConfirmationPageBuilder().withNonRev().build());
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });

  it('should not render Book A Flight button if allowBookAnotherFlight is false and checkin is false', () => {
    ({ cancelBoundConfirmationPage } = new CancelBoundConfirmationPageBuilder()
      .withAllowBookAnotherFlightFalse()
      .build());
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });

  it('should not render Book A Flight button if allowBookAnotherFlight is true and checkIn is true', () => {
    ({ cancelBoundConfirmationPage } = new CancelBoundConfirmationPageBuilder().withCheckInLink().build());
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });

  it('should not render Book A Flight button if allowBookAnotherFlight is false and checkIn is true', () => {
    ({ cancelBoundConfirmationPage } = new CancelBoundConfirmationPageBuilder()
      .withGuestPassesAndAllowBookAnotherFlightFalse()
      .build());
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });

  it('should render the page correctly with recordLocatorLabel', () => {
    jest.spyOn(AppSelector, 'getCurrentAppFlow')
      .mockReturnValueOnce('air/cancel');
    ({ cancelBoundConfirmationPage } = new CancelBoundConfirmationPageBuilder()
      .withSplitPnrConfirmationLabel()
      .build());
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      cancelBoundConfirmationPage,
      getReserveCheckInReservationWithLinkFn: getReserveCheckInReservationWithLinkFnMock,
      push: pushMock,
      retrieveTravelFundsFn: retrieveTravelFundsMock
    };

    return render(
      <BrowserRouter>
        <Provider store={createMockStoreWithRouterMiddleware()()}>
          <AirCancelBoundConfirmationPage {..._.merge({}, defaultProps, props)} />
        </Provider>
      </BrowserRouter>
    );
  };
});
