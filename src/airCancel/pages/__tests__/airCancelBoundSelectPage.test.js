jest.mock('src/shared/actions/dialogActions');
jest.mock('src/shared/helpers/browserObject', () => ({
  document: { cookie: 'mockCookie' },
  location: { pathname: '/air/cancel/', search: '' }
}));
jest.mock('src/airCancel/actions/airCancelActions');

import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import * as AirCancelActions from 'src/airCancel/actions/airCancelActions';
import AirCancelBoundSelectPage from 'src/airCancel/pages/airCancelBoundSelectPage';
import * as DialogActions from 'src/shared/actions/dialogActions';
import * as analyticsEventHelper from 'src/shared/analytics/helpers/analyticsEventHelper';
import AirCancelBoundSelectPageMockResponseBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/page/cancel/airCancelBoundSelectPageBuilder';
import { createMockStoreWithRouterMiddleware } from 'test/unit/helpers/createMockStore';

describe('airCancelBoundSelectPage', () => {
  const { cancelBoundPage } = new AirCancelBoundSelectPageMockResponseBuilder().build();
  const AirCancelActionsMock = jest.mocked(AirCancelActions);
  const DialogActionsMock = jest.mocked(DialogActions);

  let defaultProps;
  let hideDialogFnMock;
  let retrieveFlightAndCancelBoundWithSearchTokenFnMock;
  let retrieveRefundQuoteForCancelBoundFnMock;
  let selectBoundAnalyticsFnMock;
  let showDialogFnMock;
  
  beforeEach(() => {
    hideDialogFnMock = DialogActionsMock.hideDialog.mockImplementation(() => () => Promise.resolve({ type: 'HIDE_DIALOG' }));
    jest.spyOn(analyticsEventHelper, 'raiseSatelliteEvent');
    retrieveRefundQuoteForCancelBoundFnMock = AirCancelActionsMock.retrieveRefundQuoteForCancelBound.mockImplementation(() => () => Promise.resolve({ type: 'REFUND_QUOTE_CANCEL_BOUND_TEST' }));
    selectBoundAnalyticsFnMock = AirCancelActionsMock.selectBoundAnalytics.mockImplementationOnce(() => ({ type: 'SELECT_BOUND_ANALYTICS_TEST' }));
    showDialogFnMock = DialogActionsMock.showDialog.mockImplementation(() => () => Promise.resolve({ type: 'SHOW_DIALOG' }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('render', () => {
    it('should render expected component', () => {
      const { container } = createComponent();

      expect(container).toMatchSnapshot();
    });

    it('should render expected component with split pnr confirmation message when message exists', () => {
      const { cancelBoundPage } = new AirCancelBoundSelectPageMockResponseBuilder()
        .withSplitPnrConfirmationMessage()
        .build();

      const props = {
        cancelBoundPage
      };

      const { container } = createComponent({ ...props });

      expect(container).toMatchSnapshot();
    });
  });

  describe('componentDidMount', () => {
    it('should fire the analytics satellite event', () => {
      createComponent();
    
      expect(selectBoundAnalyticsFnMock).toHaveBeenCalled();
    });

    it('should call retrieveRefundQuoteForCancelBound function if the searchToken is present in the URL and the trip is single bound', async () => {
      retrieveFlightAndCancelBoundWithSearchTokenFnMock = jest.spyOn(AirCancelActions, 'retrieveFlightAndCancelBoundWithSearchToken').mockImplementationOnce(() => () => Promise.resolve(
        {
          viewForCancelBoundPage: {
            _meta: {
              showBoundSelection: false
            }
          }
        }));

      const props = {
        cancelBoundPage: {},
        query: {
          searchToken: 'eyJhbGci'
        },
        retrieveFlightAndCancelBoundWithSearchTokenFn: retrieveFlightAndCancelBoundWithSearchTokenFnMock
      };

      await createComponent({ ...props });

      expect(retrieveRefundQuoteForCancelBoundFnMock).toHaveBeenCalled();
    });

    it('should not call retrieveRefundQuoteForCancelBound function if the searchToken is present in the URL and the trip is single bound', async () => {
      retrieveFlightAndCancelBoundWithSearchTokenFnMock = jest.spyOn(AirCancelActions, 'retrieveFlightAndCancelBoundWithSearchToken').mockImplementationOnce(() => () => Promise.resolve({}));

      const props = {
        cancelBoundPage: {},
        query: {
          searchToken: 'eyJhbGci'
        },
        retrieveFlightAndCancelBoundWithSearchTokenFn: retrieveFlightAndCancelBoundWithSearchTokenFnMock
      };

      await createComponent({ ...props });

      expect(retrieveRefundQuoteForCancelBoundFnMock).not.toHaveBeenCalled();
    });
  });

  describe('continue button click', () => {
    it('should not call retrieveRefundQuoteForCancelBoundFnMock when should call form onsubmit', () => {
      const { container } = createComponent();

      fireEvent.click(container.querySelectorAll('.checkbox-button')[0]);
      fireEvent.submit(container.querySelector('form'));

      expect(retrieveRefundQuoteForCancelBoundFnMock).toBeCalled();
    });

    it('should call retrieveRefundQuoteForCancelBoundFnMock with inbound flight only when continue button clicked', () => {
      const { container } = createComponent();

      fireEvent.click(container.querySelectorAll('.checkbox-button')[1]);
      fireEvent.submit(container.querySelector('form'));

      expect(retrieveRefundQuoteForCancelBoundFnMock).toBeCalled();
    });

    it('should call retrieveRefundQuoteForCancelBoundFnMock with both flights when continue button clicked', () => {
      const { container } = createComponent();

      fireEvent.click(container.querySelectorAll('.checkbox-button')[0]);
      fireEvent.click(container.querySelectorAll('.checkbox-button')[1]);
      fireEvent.submit(container.querySelector('form'));

      expect(retrieveRefundQuoteForCancelBoundFnMock).toBeCalled();
    });

    it('should not open modal if boundSelectionNotice is not present and selected bound is eligible for checkin', () => {
      const { cancelBoundPage } = new AirCancelBoundSelectPageMockResponseBuilder()
        .withBoundSelectionNoticeEmptyAndHasInactiveBagsTrue()
        .build();
      const props = {
        cancelBoundPage,
        isLoggedIn: true
      };
      const { container } = createComponent({ ...props });

      fireEvent.click(container.querySelectorAll('.checkbox-button')[0]);
      fireEvent.submit(container.querySelector('form'));

      expect(showDialogFnMock).not.toHaveBeenCalled();
      expect(retrieveRefundQuoteForCancelBoundFnMock).toBeCalled();
    });

    it('should not open modal if boundSelectionNotice is present and selected bound is not eligible for checkin', () => {
      const { cancelBoundPage } = new AirCancelBoundSelectPageMockResponseBuilder()
        .withBoundSelectionNoticeAndHasInactiveBagsFalse()
        .build();
      const props = {
        cancelBoundPage,
        isLoggedIn: true
      };
      const { container } = createComponent({ ...props });

      fireEvent.click(container.querySelectorAll('.checkbox-button')[0]);
      fireEvent.submit(container.querySelector('form'));

      expect(showDialogFnMock).not.toHaveBeenCalled();
      expect(retrieveRefundQuoteForCancelBoundFnMock).toBeCalled();
    });

    it('should open modal if boundSelectionNotice is present and selected bound is eligible for checkin', async () => {
      const { cancelBoundPage } = new AirCancelBoundSelectPageMockResponseBuilder()
        .withBoundSelectionNoticeAndHasInactiveBagsTrue()
        .build();

      const props = {
        cancelBoundPage
      };

      const { container } = createComponent({ ...props });

      fireEvent.click(container.querySelectorAll('.checkbox-button')[0]);
      fireEvent.submit(container.querySelector('form'));

      expect(showDialogFnMock).toBeCalled();

      await clickDialogButton(1);

      expect(hideDialogFnMock).toHaveBeenCalled();
    });
  });

  const createComponent = (props = {}, initialStore = {}) => {
    const defaultStore = {
      app: {
        airCancel: { cancelBoundPage: { response: props.cancelBoundPage ?? cancelBoundPage } },
        account: { isLoggedIn: true }
      },
      router: {
        location: {
          search: 'search'
        }
      }
    };

    defaultProps = {
      hideDialogFn: props.hideDialogFn ?? hideDialogFnMock,
      location: props.location ?? { pathname: '/test/', search: '' },
      query: props.query ?? {},
      retrieveRefundQuoteForCancelBoundFn: props.retrieveRefundQuoteForCancelBoundFn ?? retrieveRefundQuoteForCancelBoundFnMock,
      retrieveFlightAndCancelBoundWithSearchTokenFn: props.retrieveFlightAndCancelBoundWithSearchTokenFn ?? retrieveFlightAndCancelBoundWithSearchTokenFnMock,
      selectBoundAnalyticsFn: props.selectBoundAnalyticsFn ?? selectBoundAnalyticsFnMock,
      showDialogFn: props.showDialogFn ?? showDialogFnMock
    };

    const mergedState = { ...defaultStore, ...initialStore };
    const store = createMockStoreWithRouterMiddleware()(mergedState);

    return render(
      <BrowserRouter>
        <Provider store={store}>
          <AirCancelBoundSelectPage {...defaultProps} />
        </Provider>
      </BrowserRouter>
    );
  };

  const clickDialogButton = async (buttonIndex) => {
    await showDialogFnMock.mock.calls[0][0].buttons[buttonIndex].onClick();
  };
});
