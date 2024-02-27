jest.mock('src/shared/actions/dialogActions');
jest.mock('src/airCancel/actions/airCancelActions');

import { fireEvent, render } from '@testing-library/react';
import _ from 'lodash';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import * as AirCancelActions from 'src/airCancel/actions/airCancelActions';
import AirCancelRefundQuotePage from 'src/airCancel/pages/airCancelRefundQuotePage';
import { REFUND_METHOD } from 'src/shared/constants/refundMethods';
import RefundTypes from 'src/shared/constants/refundTypes';
import * as DialogActions from 'src/shared/actions/dialogActions';
import CancelRefundQuotePageBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/page/cancel/cancelRefundQuotePageBuilder';
import { createMockStoreWithRouterMiddleware } from 'test/unit/helpers/createMockStore';

const { BACK_TO_ORIGINAL_PAYMENT } = RefundTypes;

describe('AirCancelRefundQuotePage', () => {
  const AirCancelActionsMock = jest.mocked(AirCancelActions);
  const DialogActionsMock = jest.mocked(DialogActions);

  let cancelRefundQuotePage;
  let cancelReservationByBoundsFnMock;
  let defaultProps;
  let hideDialogFnMock;
  let retrieveFlightAndCancelBoundWithSearchTokenFnMock;
  let retrieveRefundQuoteForCancelBoundFnMock;
  let showDialogFnMock;

  beforeEach(() => {
    ({ cancelRefundQuotePage } = new CancelRefundQuotePageBuilder().build());
    showDialogFnMock = DialogActionsMock.showDialog.mockImplementation(() => () => Promise.resolve({ type: 'SHOW_DIALOG' }));
    hideDialogFnMock = DialogActionsMock.hideDialog.mockImplementation(() => () => Promise.resolve({ type: 'HIDE_DIALOG' }));
    cancelReservationByBoundsFnMock = AirCancelActionsMock.cancelReservationByBounds.mockImplementation(() => () => Promise.resolve({ type: 'CANCEL_RESERVATION_BOUND_TEST' }));
    retrieveRefundQuoteForCancelBoundFnMock = AirCancelActionsMock.retrieveRefundQuoteForCancelBound.mockImplementation(() => () => Promise.resolve({ type: 'REFUND_QUOTE_CANCEL_BOUND_TEST' }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render page and form', () => {
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });

  it('should render page and call retrieveFlightAndCancelBoundWithSearchToken action when the searchToken is present and cancelRefundQuotePage store object is empty', async () => {
    retrieveFlightAndCancelBoundWithSearchTokenFnMock = jest.spyOn(AirCancelActions, 'retrieveFlightAndCancelBoundWithSearchToken').mockImplementationOnce(() => () => Promise.resolve({}));

    const props = {
      cancelRefundQuotePage: {},
      query: {
        searchToken: 'eyJhbGci'
      },
      retrieveFlightAndCancelBoundWithSearchTokenFn: retrieveFlightAndCancelBoundWithSearchTokenFnMock
    };

    await createComponent({ ...props });

    expect(retrieveFlightAndCancelBoundWithSearchTokenFnMock).toHaveBeenCalled();
  });

  it('should call AirCancelActions.retrieveRefundQuoteForCancelBound action when dropdown is changed to HOLD_FUTURE_USE', () => {
    const { container } = createComponent();

    fireEvent.change(container.querySelector('select[name="refundMethod"]'), { target: { value: REFUND_METHOD.HOLD_FUTURE_USE } });

    const retrieveRefundQuoteForCancelBoundData = cancelRefundQuotePage._links.refundQuote;

    expect(retrieveRefundQuoteForCancelBoundFnMock).toHaveBeenCalledWith(
      retrieveRefundQuoteForCancelBoundData,
      false,
      true
    );
  });

  it('should not call AirCancelActions.retrieveRefundQuoteForCancelBound action when dropdown is changed to BACK_TO_ORIGINAL_PAYMENT for the first time', () => {
    const { container } = createComponent();

    fireEvent.change(container.querySelector('select[name="refundMethod"]'), { target: { value: BACK_TO_ORIGINAL_PAYMENT } });

    expect(retrieveRefundQuoteForCancelBoundFnMock).not.toHaveBeenCalled();
  });

  it('should call AirCancelActions.retrieveRefundQuoteForCancelBound action when dropdown is changed to BACK_TO_ORIGINAL_PAYMENT after it was changed to HOLD_FUTURE_USE', () => {
    const { container } = createComponent();
    const retrieveRefundQuoteForCancelBoundData = cancelRefundQuotePage._links.refundQuote;

    fireEvent.change(container.querySelector('select[name="refundMethod"]'), { target: { value: REFUND_METHOD.HOLD_FUTURE_USE } });
    fireEvent.change(container.querySelector('select[name="refundMethod"]'), { target: { value: BACK_TO_ORIGINAL_PAYMENT } });

    expect(retrieveRefundQuoteForCancelBoundFnMock).toHaveBeenCalledTimes(2);
    expect(retrieveRefundQuoteForCancelBoundFnMock).toHaveBeenCalledWith(
      retrieveRefundQuoteForCancelBoundData,
      false,
      true
    );
  });

  it('should call AirCancelActions.cancelReservationByBounds action when form is submitted, do not send an email address as it is in the token, and not request refund', async () => {
    ({ cancelRefundQuotePage } = new CancelRefundQuotePageBuilder().withCancelBoardingPassMessage().build());
    
    const props = {
      cancelRefundQuotePage
    };

    const { container } = createComponent({ ...props });

    fireEvent.change(container.querySelector('select[name="refundMethod"]'), { target: { value: REFUND_METHOD.HOLD_FUTURE_USE } });
    fireEvent.click(container.querySelector('button[type="submit"]'));

    const bodyParams = {
      body: {
        refundRequested: false
      }
    };
    const cancelReservationRequestData = _.merge({}, cancelRefundQuotePage._links.cancel, bodyParams);

    expect(showDialogFnMock).toHaveBeenCalled();

    await clickDialogButton(1);

    expect(hideDialogFnMock).toHaveBeenCalled();

    expect(cancelReservationByBoundsFnMock).toHaveBeenCalledWith(cancelReservationRequestData, true);
  });

  it('should call AirCancelActions.cancelReservationByBounds action when form is submitted, use the user entered email because none is on file, and request refund', () => {
    ({ cancelRefundQuotePage } = new CancelRefundQuotePageBuilder().withEmailRequired().build());

    const props = {
      cancelRefundQuotePage
    };

    const { container } = createComponent({ ...props });

    fireEvent.change(container.querySelector('select[name="refundMethod"]'), { target: { value: BACK_TO_ORIGINAL_PAYMENT } });
    fireEvent.change(container.querySelector('input[name="emailReceiptTo"]'), { target: { value: 'new.email@wnco.com' } });
    fireEvent.click(container.querySelector('button[type="submit"]'));

    const bodyParams = {
      body: {
        receiptEmail: 'new.email@wnco.com',
        refundRequested: true
      }
    };
    const cancelReservationRequestData = _.merge({}, cancelRefundQuotePage._links.cancel, bodyParams);

    expect(cancelReservationByBoundsFnMock).toHaveBeenCalledWith(cancelReservationRequestData, true);
  });

  it('should render the page correctly', () => {
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });

  const createComponent = (props = {}) => {
    const defaultStore = {
      app: {
        airCancel: { cancelRefundQuotePage: { response: props.cancelRefundQuotePage ?? cancelRefundQuotePage } },
        account: { isLoggedIn: props.isLoggedIn ?? true }
      }
    };

    defaultProps = {
      cancelReservationByBoundsFn: props.cancelReservationByBoundsFnMock ?? cancelReservationByBoundsFnMock,
      hideDialogFn: props.hideDialogFnMock ?? hideDialogFnMock,
      query: props.query ?? {},
      retrieveFlightAndCancelBoundWithSearchTokenFn: props.retrieveFlightAndCancelBoundWithSearchTokenFnMock ?? retrieveFlightAndCancelBoundWithSearchTokenFnMock,
      retrieveRefundQuoteForCancelBoundFn: props.retrieveRefundQuoteForCancelBoundFnMock ?? retrieveRefundQuoteForCancelBoundFnMock,
      showDialogFn: props.showDialogFnMock ?? showDialogFnMock
    };
  
    const store = createMockStoreWithRouterMiddleware()(defaultStore);
  
    return render(
      <BrowserRouter>
        <Provider store={store}>
          <AirCancelRefundQuotePage {...defaultProps} />
        </Provider>
      </BrowserRouter>
    );
  };

  const clickDialogButton = async (buttonIndex) => {
    await showDialogFnMock.mock.calls[0][0].buttons[buttonIndex].onClick();
  };
});
