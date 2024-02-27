import i18n from '@swa-ui/locale';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent } from '@testing-library/react';
import React from 'react';
import { EarlyBirdDetailPage } from 'src/earlyBird/pages/earlyBirdDetailPage';
import localStorage from 'store2';
import BrowserObject from 'src/shared/helpers/browserObject';
import * as AppSelector from 'src/shared/selectors/appSelector';
import EarlyBirdBoundsBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/earlybird/earlyBirdBoundsBuilder';
import { createComponent } from 'test/unit/helpers/testingLibraryUtils';

describe('EarlyBirdDetailPage', () => {
  let setReLoginCallbackFunctionsFnMock;
  const earlyBirdBounds = new EarlyBirdBoundsBuilder().build();
  const response = {
    dates: {
      first: '2018-06-25',
      second: '2018-06-30'
    },
    destinationDescription: 'destinationDescription',
    earlyBirdBounds,
    receiptEmail: null,
    recordLocator: 'NALVRY'
  };

  beforeEach(() => {
    setReLoginCallbackFunctionsFnMock = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should display SubHeader', () => {
    const { container } = createEarlyBirdDetailPage();

    expect(container.querySelector('.page-header')).toBeInTheDocument();
  });

  it('should display EarlyBirdCheckInPricingBanner', () => {
    const { container } = createEarlyBirdDetailPage();

    expect(container.querySelector('.early-bird-confirmation--pricing-banner')).toBeInTheDocument();
  });

  it('should display DestinationInfo', () => {
    const { container } = createEarlyBirdDetailPage();

    expect(container.querySelector('.early-bird-destination-info')).toBeInTheDocument();
  });

  it('should display earlyBird tip message', () => {
    const { container } = createEarlyBirdDetailPage();

    expect(container.querySelector('.early-bird-detail--message').textContent).toEqual(
      i18n('EARLY_BIRD_NEW_SELECT_ALL_PASSENGERS_TIPS')
    );
  });

  it('should display EarlyBirdDetailForm and checkbox in page by default', () => {
    const { container } = createEarlyBirdDetailPage({
      formData: {
        bound_0_ebPaxCheckBox_0: true,
        bound_0_ebPaxCheckBox_1: false,
        bound_1_ebPaxCheckBox_0: true,
        bound_1_ebPaxCheckBox_1: false
      }
    });

    expect(container).toMatchSnapshot();
  });

  it('should show dialog when user click ineligible label', () => {
    const instance = React.createRef();
    const showDialogFnMock = jest.fn();

    createEarlyBirdDetailPage({
      ref: instance,
      showDialogFn: showDialogFnMock
    });

    instance.current._onClickIneligibleLabel('message');

    expect(showDialogFnMock).toHaveBeenCalledWith({
      message: 'message',
      name: 'earlybird-checkin-ineligible',
      title: i18n('EARLY_BIRD_INELIGIBLE_DIALOG_TITLE')
    });
  });

  it('should clear header error message when user click EB checkbox', () => {
    const { container } = createEarlyBirdDetailPage();

    fireEvent.click(container.querySelector('.checkbox-button'));

    expect(container.querySelector('.error-header')).toBeNull();
  });

  describe('click continue button', () => {
    let gotoReviewPageFnMock;
    let resetPaymentInfoFnMock;

    const expectedFormData = {
      bound_0_ebPaxCheckBox_0: true,
      bound_1_ebPaxCheckBox_0: true
    };

    beforeEach(() => {
      gotoReviewPageFnMock = jest.fn();
      resetPaymentInfoFnMock = jest.fn();
    });

    it('should go to review page with no session expired', () => {
      jest.spyOn(AppSelector, 'getCurrentAppFlow')
        .mockReturnValueOnce('earlybird');
      BrowserObject.location = { pathname: '/earlybird/checkin/NALVRY/review' };
      const { container } = createEarlyBirdDetailPage({
        gotoReviewPageFn: gotoReviewPageFnMock
      });

      fireEvent.submit(container.querySelector('form'));

      expect(gotoReviewPageFnMock).toHaveBeenCalledWith(
        '/earlybird/checkin/NALVRY/review',
        true,
        expectedFormData,
        response
      );
    });

    it('should go to review page with isLoggedIn false when session expired and continue as guest', () => {
      const instance = React.createRef();

      createEarlyBirdDetailPage({
        gotoReviewPageFn: gotoReviewPageFnMock,
        isLoggedIn: true,
        ref: instance,
        resetPaymentInfoFn: resetPaymentInfoFnMock
      });

      instance.current._continueAsGuest('/earlybird/checkin/NALVRY/review', {
        bound_0_ebPaxCheckBox_0: true,
        bound_1_ebPaxCheckBox_0: true
      });

      expect(resetPaymentInfoFnMock).toHaveBeenCalled();
      expect(gotoReviewPageFnMock).toHaveBeenCalledWith(
        '/earlybird/checkin/NALVRY/review',
        false,
        expectedFormData,
        response
      );
    });

    describe('when using api gateway cookies', () => {
      it('should call appropriate actions', () => {
        jest.spyOn(localStorage, 'get').mockReturnValue({ expirationDate: 'token' });

        const { container } = createEarlyBirdDetailPage({
          gotoReviewPageFn: gotoReviewPageFnMock
        });

        fireEvent.submit(container.querySelector('form'));

        expect(setReLoginCallbackFunctionsFnMock).toHaveBeenCalled();
      });
    });
  });

  const createEarlyBirdDetailPage = (props = {}) => {
    const defaultProps = {
      accountNumber: '823984433',
      flightDateRange: 'Jun 4 - Jun 6',
      gotoReviewPageFn: () => {},
      isLoggedIn: true,
      resetPaymentInfoFn: () => {},
      response,
      setReLoginCallbackFunctionsFn: setReLoginCallbackFunctionsFnMock,
      showDialogFn: () => {},
      totalPrice: {
        amount: '30.00',
        currencyCode: 'USD',
        currencySymbol: '$'
      }
    };
    const mergedProps = { ...defaultProps, ...props };
    const state = {
      app: {},
      router: {
        location: {
          search: 'search'
        }
      }
    };

    return createComponent(EarlyBirdDetailPage, { state, props: mergedProps });
  };
});
