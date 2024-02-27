jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn().mockReturnValue([false, () => {}])
}));
jest.mock('src/airChange/actions/airChangeActions', () => ({
  getPaymentOptions: jest.fn().mockReturnValue({ type: 'getPaymentOptions' })
}));
jest.mock('src/sameDay/actions/sameDayActions');
jest.mock('src/shared/actions/accountActions', () => ({
  getAccountInfo: jest.fn().mockReturnValue({ type: 'ACCOUNT_INFO' })
}));
jest.mock('src/shared/actions/dialogActions', () => ({
  hideDialog: jest.fn().mockReturnValue(() => Promise.resolve('done')),
  showDialog: jest.fn().mockReturnValue({ type: 'SHOW_DIALOG' })
}));
jest.mock('src/shared/actions/webViewActions');
jest.mock('src/shared/analytics/helpers/analyticsEventHelper');
jest.mock('src/shared/analytics/actions/analyticsActions');
jest.mock('src/shared/enhancers/withConnectedReactRouter', () => jest.fn((comp) => comp));
jest.mock('src/shared/helpers/applePayHelper');
jest.mock('src/shared/helpers/browserObject', () => ({
  document: { cookie: 'mockCookie' },
  location: {
    pathname: '/same-day/price-difference'
  }
}));

import { fireEvent, render, waitFor } from '@testing-library/react';
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import * as airChangeActions from 'src/airChange/actions/airChangeActions';
import * as sameDayActions from 'src/sameDay/actions/sameDayActions';
import SameDayPriceDifferencePageConnected, { SameDayPriceDifferencePage } from 'src/sameDay/pages/sameDayPriceDifferencePage';
import { getAccountInfo } from 'src/shared/actions/accountActions';
import { hideDialog, showDialog } from 'src/shared/actions/dialogActions';
import * as webViewActions from 'src/shared/actions/webViewActions';
import * as analyticsActions from 'src/shared/analytics/actions/analyticsActions';
import * as analyticsEventHelper from 'src/shared/analytics/helpers/analyticsEventHelper';
import { LOGIN_TYPES } from 'src/shared/constants/webViewConstants';
import { getIsApplePayCardValid } from 'src/shared/helpers/applePayHelper';
import SameDayPaymentBuilder from 'test/builders/apiResponse/sameDayPaymentBuilder';
import SameDayPricingBuilder from 'test/builders/apiResponse/sameDayPricingBuilder';
import PaymentSavedCreditCardsBuilder from 'test/builders/model/paymentSavedCreditCardsBuilder';
import configureMockStore from 'test/unit/helpers/configureMockStore';
import { integrationRender } from 'test/unit/helpers/testingLibraryUtils';

describe('sameDayPriceDifference', () => {
  const isLoggedIn = false;
  const mockRecipientEmail = 'teslaawesome@gmail.com';
  const sameDayPaymentPage = new SameDayPaymentBuilder().build();
  const sameDayPricingPage = new SameDayPricingBuilder().build();
  const savedCreditCards = new PaymentSavedCreditCardsBuilder().build();

  let hasSelectedAlternativeFormOfPaymentMock;
  let pushStub;
  let saveFormDataFnMock;
  let setReLoginCallbackFunctionsFnMock;
  let shouldGotoPayPalSignInFnMock;
  let shouldResumeDataFnMock;
  let showNativeAppLoginFnMock;
  let traceSameDayPaymentTypeMock;
  let updateSameDayConfirmationMethodFnMock;
  let updateSameDayConfirmationRefundMethodFnMock;

  beforeEach(() => {
    pushStub = jest.fn();
    showNativeAppLoginFnMock = webViewActions.showNativeAppLogin.mockImplementationOnce(
      () => () => Promise.resolve({ type: 'WEB_VIEW__SEND_DISPLAY_LOGIN' })
    );
    updateSameDayConfirmationMethodFnMock = sameDayActions.updateSameDayConfirmationMethod.mockImplementationOnce(
      () => () => Promise.resolve({ type: 'retrieve' })
    );
    updateSameDayConfirmationRefundMethodFnMock =
      sameDayActions.updateSameDayConfirmationRefundMethod.mockImplementationOnce(
        () => () => Promise.resolve({ type: 'retrieve' })
      );
    hasSelectedAlternativeFormOfPaymentMock = jest.fn().mockReturnValue(true);
    saveFormDataFnMock = jest.fn().mockResolvedValue({ type: 'FAKE-ACTION' });
    setReLoginCallbackFunctionsFnMock = jest.fn();
    shouldGotoPayPalSignInFnMock = jest.fn();
    shouldResumeDataFnMock = jest.fn();
    traceSameDayPaymentTypeMock = analyticsActions.traceSameDayPaymentType.mockImplementationOnce(() => ({ type: 'test' }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render Same day price difference page', () => {
    const state = {
      app: {
        account: { isLoggedIn: true },
        sameDay: sameDayPricingPage,
        savedCreditCards,
        toggles: { CEPTOR_VOID_API: true }
      }
    };
    const { container } = createComponent({}, state);

    expect(container).toMatchSnapshot();
  });

  it('should render Same day price difference page when isLoggedIn false', () => {
    const state = {
      app: {
        account: { isLoggedIn: false },
        sameDay: sameDayPricingPage,
        savedCreditCards,
        toggles: { CEPTOR_VOID_API: true }
      }
    };
    const { container } = createComponent({}, state);

    expect(container).toMatchSnapshot();
  });

  it('should render Same day price difference page when primary card empty', () => {
    const savedCreditCardsWithNoPrimaryCard = new PaymentSavedCreditCardsBuilder().withNoPrimaryCard().build();
    const state = {
      app: {
        sameDay: sameDayPricingPage,
        savedCreditCards: savedCreditCardsWithNoPrimaryCard,
        toggles: { CEPTOR_VOID_API: true }
      }
    };
    const { container } = createComponent({}, state);

    expect(container).toMatchSnapshot();
  });

  it('should render Same day price difference page when sameDayPaymentPage', () => {
    const state = {
      app: {
        account: { isLoggedIn: true },
        sameDay: { ...sameDayPricingPage, ...sameDayPaymentPage },
        savedCreditCards,
        toggles: { CEPTOR_VOID_API: false }
      }
    };
    const { container } = createComponent({}, state);

    expect(container).toMatchSnapshot();
  });

  it('should render Same day price difference page when payment info is present &  primary card empty', () => {
    const savedCreditCardsWithNoPrimaryCard = new PaymentSavedCreditCardsBuilder().withNoPrimaryCard().build();
    const state = {
      app: {
        account: { isLoggedIn: true },
        sameDay: { ...sameDayPricingPage, ...sameDayPaymentPage },
        savedCreditCards: savedCreditCardsWithNoPrimaryCard,
        toggles: { CEPTOR_VOID_API: false }
      }
    };
    const { container } = createComponent({}, state);

    expect(container).toMatchSnapshot();
  });

  it('should render Payment Method section Same day price difference page', () => {
    const sameDayPricingPageWithAmountDue = new SameDayPricingBuilder().withAmountDue().build();
    const state = {
      app: {
        account: { isLoggedIn: true },
        sameDay: sameDayPricingPageWithAmountDue,
        savedCreditCards,
        toggles: { CEPTOR_VOID_API: false }
      }
    };
    const { container } = createComponent({}, state);

    expect(container).toMatchSnapshot();
  });

  it('should render Same day price difference page without fareSummary', () => {
    const sameDayPricingPageWithNoFareSummary = new SameDayPricingBuilder().withNoFareSummary().build();
    const state = {
      app: {
        account: { isLoggedIn: true },
        sameDay: sameDayPricingPageWithNoFareSummary,
        savedCreditCards,
        toggles: { CEPTOR_VOID_API: false }
      }
    };
    const { container } = createComponent({}, state);

    expect(container).toMatchSnapshot();
  });

  it('should not render Payment Method section in Same day price difference page', () => {
    const emptySavedCreditCards = {};
    const state = {
      app: { sameDay: sameDayPricingPage, savedCreditCards: emptySavedCreditCards, toggles: { CEPTOR_VOID_API: false } }
    };
    const { container } = createComponent({}, state);

    expect(container).toMatchSnapshot();
  });

  it('should not render the back button when in web view', () => {
    const state = {
      app: {
        account: { isLoggedIn: false },
        sameDay: sameDayPricingPage,
        savedCreditCards,
        webView: { isWebView: true },
        toggles: { CEPTOR_VOID_API: false }
      }
    };
    const { container } = createComponent({}, state);

    expect(container.querySelector('.goback-link')).toBeNull();
  });

  it('should fetch payment options if the user is logged in and none are available', () => {
    const savedCreditCardsWithNoPrimaryCard = new PaymentSavedCreditCardsBuilder().withNoPrimaryCard().build();
    const sameDayPricingPageWithAmountDue = new SameDayPricingBuilder().withAmountDue().build();
    const state = {
      app: {
        account: { isLoggedIn: true },
        sameDay: {
          ...sameDayPricingPage,
          ...sameDayPaymentPage,
          ...sameDayPricingPageWithAmountDue,
          sameDaySelectFarePage: { isChangeFlow: true }
        },
        savedCreditCards: savedCreditCardsWithNoPrimaryCard,
        toggles: { CEPTOR_VOID_API: false }
      }
    };

    useState.mockReturnValueOnce([false, () => {}]);
    createComponent({}, state);

    expect(airChangeActions.getPaymentOptions).toHaveBeenCalled();
  });

  it('should not fetch payment options if the call has already been made', () => {
    const savedCreditCardsWithNoPrimaryCard = new PaymentSavedCreditCardsBuilder().withNoPrimaryCard().build();
    const sameDayPricingPageWithAmountDue = new SameDayPricingBuilder().withAmountDue().build();
    const state = {
      app: {
        account: { isLoggedIn: true },
        sameDay: {
          ...sameDayPricingPage,
          ...sameDayPaymentPage,
          ...sameDayPricingPageWithAmountDue,
          sameDaySelectFarePage: { isChangeFlow: true }
        },
        savedCreditCards: savedCreditCardsWithNoPrimaryCard,
        toggles: { CEPTOR_VOID_API: false }
      }
    };

    useState.mockReturnValueOnce([true, () => {}]);
    createComponent({}, state);

    expect(airChangeActions.getPaymentOptions).not.toHaveBeenCalled();
  });

  it('should not fetch payment options when user loggedIn , isPaymentRequired flag is true, isChangeFlow is false  ', () => {
    const sameDayPricingPageWithAmountDue = new SameDayPricingBuilder().withAmountDue().build();
    const state = {
      app: {
        account: { isLoggedIn: true },
        sameDay: {
          ...sameDayPricingPageWithAmountDue,
          ...sameDayPricingPage,
          sameDaySelectFarePage: { isChangeFlow: false }
        },
        savedCreditCards: {},
        toggles: { CEPTOR_VOID_API: false }
      }
    };

    useState.mockReturnValueOnce([false, () => {}]);
    createComponent({}, state);

    expect(airChangeActions.getPaymentOptions).not.toHaveBeenCalled();
  });

  it('should not fetch payment options when user loggedIn , isPaymentRequired flag is false, isChangeFlow is true', () => {
    const sameDayPricingPageWithAmountDue = new SameDayPricingBuilder().withAmountDue().build();
    const state = {
      app: {
        account: { isLoggedIn: true },
        sameDay: {
          ...sameDayPricingPageWithAmountDue,
          ...sameDayPricingPage,
          sameDaySelectFarePage: { isChangeFlow: false }
        },
        savedCreditCards: {},
        toggles: { CEPTOR_VOID_API: false }
      }
    };

    useState.mockReturnValueOnce([false, () => {}]);
    createComponent({}, state);

    expect(airChangeActions.getPaymentOptions).not.toHaveBeenCalled();
  });

  it('should not fetch payment options when user loggedIn, isPaymentRequired flag is true, isChangeFlow is true', () => {
    const sameDayPricingPageWithAmountDue = new SameDayPricingBuilder().withAmountDue().build();
    const state = {
      app: {
        account: { isLoggedIn: true },
        sameDay: {
          ...sameDayPricingPageWithAmountDue,
          ...sameDayPricingPage,
          sameDaySelectFarePage: { isChangeFlow: false }
        },
        savedCreditCards: {},
        toggles: { CEPTOR_VOID_API: false }
      }
    };

    useState.mockReturnValueOnce([false, () => {}]);
    createComponent({}, state);

    expect(airChangeActions.getPaymentOptions).not.toHaveBeenCalled();
  });

  it('should call gotoPaymentEditPage', () => {
    const sameDayPricingPageWithAmountDue = new SameDayPricingBuilder().withAmountDue().build();
    const state = {
      app: {
        sameDay: {
          ...sameDayPricingPageWithAmountDue,
          ...sameDayPaymentPage,
          sameDaySelectFarePage: { isChangeFlow: true }
        },
        savedCreditCards,
        toggles: { CEPTOR_VOID_API: false }
      }
    };

    useState.mockReturnValueOnce([false, () => {}]);
    const { container } = createComponent({}, state);

    fireEvent.click(container.querySelector('.payment-nav-item-field .nav-item-link'));

    expect(traceSameDayPaymentTypeMock).toBeCalled();

    expect(pushStub).toHaveBeenCalledWith('/same-day/pricing/payment?airportsCode=PHX-DEN');
  });

  it('should not call gotoPaymentEditPage when isChangeFlow is false', () => {
    const sameDayPricingPageWithAmountDue = new SameDayPricingBuilder().withAmountDue().build();
    const state = {
      app: {
        sameDay: {
          ...sameDayPricingPageWithAmountDue,
          ...sameDayPricingPage,
          sameDaySelectFarePage: { isChangeFlow: false }
        },
        savedCreditCards,
        toggles: { CEPTOR_VOID_API: false }
      }
    };
    const { container } = createComponent({}, state);
    const paymentContainer = container.querySelector('.payment-nav-item-field .nav-item-link');

    expect(paymentContainer).toBeNull();
  });

  it('should not call gotoPaymentEditPage when isPaymentRequired is false', () => {
    const sameDayPricingPage = new SameDayPricingBuilder().build();
    const state = {
      app: {
        sameDay: { ...sameDayPricingPage, sameDaySelectFarePage: { isChangeFlow: true } },
        savedCreditCards,
        toggles: { CEPTOR_VOID_API: false }
      }
    };
    const { container } = createComponent({}, state);
    const paymentContainer = container.querySelector('.payment-nav-item-field .nav-item-link');

    expect(paymentContainer).toBeNull();
  });

  it('should not call gotoPaymentEditPage when both isChangeFlow and isPaymentRequired are false', () => {
    const sameDayPricingPage = new SameDayPricingBuilder().build();
    const state = {
      app: {
        sameDay: { ...sameDayPricingPage, sameDaySelectFarePage: { isChangeFlow: false } },
        savedCreditCards,
        toggles: { CEPTOR_VOID_API: false }
      }
    };
    const { container } = createComponent({}, state);
    const paymentContainer = container.querySelector('.payment-nav-item-field .nav-item-link');

    expect(paymentContainer).toBeNull();
  });

  it('should render refund credit verbiage/sections correctly if refund credit is due', () => {
    const sameDayPricingPageWithRefundScenario = new SameDayPricingBuilder().withRefundScenario().build();
    const state = {
      app: { sameDay: sameDayPricingPageWithRefundScenario, savedCreditCards, toggles: { CEPTOR_VOID_API: false } }
    };
    const { container } = createComponent({}, state);

    expect(container).toMatchSnapshot();
  });

  it('should render refund credit verbiage/sections correctly if refund credit is due points', () => {
    const sameDayPricingPageWithRefundScenario = new SameDayPricingBuilder()
      .withPtsDowngradeCreditFareAndAmountDueTaxScenario()
      .build();
    const state = {
      app: { sameDay: sameDayPricingPageWithRefundScenario, savedCreditCards, toggles: { CEPTOR_VOID_API: false } }
    };
    const { container } = createComponent({}, state);

    expect(container).toMatchSnapshot();
  });

  it('should render refund credit verbiage/sections correctly if refund credit is due tax', () => {
    const sameDayPricingPageWithRefundScenario = new SameDayPricingBuilder().withPtsDowngradeScenario().build();
    const state = {
      app: { sameDay: sameDayPricingPageWithRefundScenario, savedCreditCards, toggles: { CEPTOR_VOID_API: false } }
    };
    const { container } = createComponent({}, state);

    expect(container).toMatchSnapshot();
  });

  it('should hide email input field when showEmailReceiptTo is false', () => {
    const sameDayPricingPageWithoutEmailField = new SameDayPricingBuilder().withoutEmailField().build();
    const state = {
      app: { sameDay: sameDayPricingPageWithoutEmailField, savedCreditCards, toggles: { CEPTOR_VOID_API: false } }
    };
    const { container } = createComponent({}, state);

    expect(container).toMatchSnapshot();
  });

  describe('Purchase Confirmation page', () => {
    it('should call Purchase Confirmation when clicked for standby flow', () => {
      shouldGotoPayPalSignInFnMock.mockReturnValue(false);
      hasSelectedAlternativeFormOfPaymentMock.mockReturnValue(false);

      const formData = { recipientEmail: mockRecipientEmail };
      const sameDayConfirmationRequest = {
        body: { boundSelection: 'bound2', productId: 'productId2', sameDayToken: 'token' },
        href: '/v1/mobile-air-operations/page/same-day/2Z72ZS/confirmation',
        labelText: 'Confirm standby listing',
        method: 'PUT',
        xhref: '/v1/mobile-air-operations/page/same-day/2Z72ZS/x-confirmation'
      };
      const sameDayPricingPage = new SameDayPricingBuilder().withEmailRecipient().build();
      const state = {
        app: {
          account: { isLoggedIn: true },
          sameDay: { ...sameDayPricingPage, sameDaySelectFarePage: { isChangeFlow: false } },
          savedCreditCards,
          toggles: { CEPTOR_VOID_API: false }
        }
      };
      const { container } = createComponent({}, state);

      fireEvent.submit(container.querySelector('form'));

      expect(updateSameDayConfirmationMethodFnMock).toHaveBeenCalledWith(
        true,
        formData,
        sameDayConfirmationRequest,
        null,
        undefined
      );
    });

    it('should call Purchase Confirmation refund available when clicked for standby flow', () => {
      const formData = { recipientEmail: mockRecipientEmail };
      const response = new SameDayPricingBuilder().withEmailRecipient().withStandbyUsingRefundLink().build();
      const state = {
        app: {
          account: { isLoggedIn: true },
          sameDay: { ...response, sameDaySelectFarePage: { isChangeFlow: false } },
          savedCreditCards,
          toggles: { CEPTOR_VOID_API: false }
        }
      };
      const { container } = createComponent({}, state);

      fireEvent.submit(container.querySelector('form'));

      expect(updateSameDayConfirmationRefundMethodFnMock).toHaveBeenCalledWith(
        formData,
        response.sameDayPricingPage._links.sameDayConfirmationRefund,
        true
      );
    });

    it('should call Purchase Confirmation when clicked for change flow when both payment and recipient Email are available', () => {
      shouldGotoPayPalSignInFnMock.mockReturnValue(false);
      hasSelectedAlternativeFormOfPaymentMock.mockReturnValue(false);

      const amountDue = {
        amount: '20.00',
        currencyCode: 'USD',
        currencySymbol: '$',
        item: 'Amount Due',
        fare: { amount: '20.00', currencyCode: 'USD', currencySymbol: '$' },
        tax: { amount: '5.06', currencyCode: 'USD', currencySymbol: '$' }
      };
      const formData = {
        paymentInfo: { selectedCardId: '1-ENKS4K' },
        recipientEmail: mockRecipientEmail
      };
      const sameDayConfirmationRequest = {
        body: { boundSelection: 'bound2', productId: 'productId2', sameDayToken: 'token' },
        href: '/v1/mobile-air-operations/page/same-day/2Z72ZS/confirmation',
        labelText: 'Confirm standby listing',
        method: 'PUT',
        xhref: '/v1/mobile-air-operations/page/same-day/2Z72ZS/x-confirmation'
      };
      const sameDayPricingPage = new SameDayPricingBuilder().withEmailRecipient().withAmountDueAndTax().build();
      const state = {
        app: {
          account: { isLoggedIn: true },
          sameDay: { ...sameDayPricingPage, sameDaySelectFarePage: { isChangeFlow: true } },
          savedCreditCards,
          toggles: { CEPTOR_VOID_API: false }
        }
      };
      const { container } = createComponent({}, state);

      fireEvent.submit(container.querySelector('form'));

      expect(updateSameDayConfirmationMethodFnMock).toHaveBeenCalledWith(
        true,
        formData,
        sameDayConfirmationRequest,
        null,
        amountDue
      );
    });

    it('should call Purchase Confirmation when clicked for change flow when payment not available and recipient Email is available', () => {
      shouldGotoPayPalSignInFnMock.mockReturnValue(false);
      hasSelectedAlternativeFormOfPaymentMock.mockReturnValue(false);

      const sameDayPricingPage = new SameDayPricingBuilder().withEmailRecipient().build();
      const state = {
        app: {
          account: { isLoggedIn: true },
          sameDay: { ...sameDayPricingPage, sameDaySelectFarePage: { isChangeFlow: false } },
          savedCreditCards,
          toggles: { CEPTOR_VOID_API: false }
        }
      };
      const { container } = createComponent({}, state);

      fireEvent.submit(container.querySelector('form'));

      expect(updateSameDayConfirmationMethodFnMock).toHaveBeenCalled();
    });
  });

  describe('Same day refund scenario', () => {
    it('should render correctly for refund scenario', () => {
      const sameDayPricingPageRefundScenario = new SameDayPricingBuilder().withRefundScenario().build();
      const state = {
        account: { isLoggedIn: true },
        app: { sameDay: sameDayPricingPageRefundScenario, savedCreditCards, toggles: { CEPTOR_VOID_API: false } }
      };
      const { container } = createComponent({}, state);

      expect(container).toMatchSnapshot();
    });

    it('should call updateSameDayConfirmationRefundMethodFn on continue button click', async () => {
      const formData = {
        recipientEmail: mockRecipientEmail
      };
      const sameDayPricingPageRefundScenario = new SameDayPricingBuilder()
        .withEmailRecipient()
        .withRefundScenario()
        .build();
      const state = {
        app: {
          account: { isLoggedIn: true },
          sameDay: sameDayPricingPageRefundScenario,
          savedCreditCards,
          toggles: { CEPTOR_VOID_API: false }
        }
      };
      const { container } = createComponent({}, state);

      fireEvent.submit(container.querySelector('form'));

      expect(updateSameDayConfirmationRefundMethodFnMock).toHaveBeenCalledWith(
        formData,
        sameDayPricingPageRefundScenario.sameDayPricingPage._links.sameDayConfirmationRefund,
        true
      );
    });

    it('should call updateSameDayConfirmationRefundMethodFn with enough fare points', async () => {
      const sameDayPricingPageRefundScenario = new SameDayPricingBuilder()
        .withEmailRecipient()
        .withPtsUpgradeScenario()
        .withAmountDueFarePtsAndNoTax()
        .build();
      const state = {
        app: {
          account: { isLoggedIn: true, accountInfo: { rapidRewardsDetails: { redeemablePoints: 30000 } } },
          sameDay: sameDayPricingPageRefundScenario,
          savedCreditCards,
          toggles: { CEPTOR_VOID_API: false }
        }
      };
      const { container } = createComponent({}, state);

      await fireEvent.submit(container.querySelector('form'));

      expect(updateSameDayConfirmationRefundMethodFnMock).toBeCalled();
    });
  });

  describe('when not enough points modal displayed', () => {
    it('should fire Satellite analytics event', async () => {
      const sameDayPricingPageRefundScenario = new SameDayPricingBuilder()
        .withEmailRecipient()
        .withPtsUpgradeScenario()
        .build();
      const state = {
        app: {
          account: { isLoggedIn: true },
          sameDay: sameDayPricingPageRefundScenario,
          savedCreditCards,
          toggles: { CEPTOR_VOID_API: false }
        }
      };

      const { container } = createComponent(
        { showDialogFn: showDialog, hideDialogFn: hideDialog, getAccountInfoFn: getAccountInfo },
        state
      );

      fireEvent.submit(container.querySelector('form'));

      expect(analyticsEventHelper.raiseSatelliteEvent).toHaveBeenCalledWith('squid', {
        page_description: 'modal: not enough points'
      });
    });

    it('should call getAccountInfoFn on continue button click', async () => {
      const sameDayPricingPageRefundScenario = new SameDayPricingBuilder()
        .withEmailRecipient()
        .withPtsUpgradeScenario()
        .build();
      const state = {
        app: {
          account: { isLoggedIn: true },
          sameDay: sameDayPricingPageRefundScenario,
          savedCreditCards,
          toggles: { CEPTOR_VOID_API: false }
        }
      };

      const { container } = createComponent(
        { showDialogFn: showDialog, hideDialogFn: hideDialog, getAccountInfoFn: getAccountInfo },
        state
      );

      fireEvent.submit(container.querySelector('form'));

      expect(showDialog).toBeCalled();

      await showDialog.mock.calls[0][0].verticalLinks.links[0].onClick();

      expect(getAccountInfo).toBeCalled();
    });

    it('should call getAccountInfoFn on cancel button click', async () => {
      const sameDayPricingPageRefundScenario = new SameDayPricingBuilder()
        .withEmailRecipient()
        .withPtsUpgradeScenario()
        .build();
      const state = {
        app: {
          account: { isLoggedIn: true },
          sameDay: sameDayPricingPageRefundScenario,
          savedCreditCards,
          toggles: { CEPTOR_VOID_API: false }
        }
      };

      const { container } = createComponent(
        { showDialogFn: showDialog, hideDialogFn: hideDialog, getAccountInfoFn: getAccountInfo },
        state
      );

      fireEvent.submit(container.querySelector('form'));

      expect(showDialog).toBeCalled();

      await showDialog.mock.calls[0][0].onClose();

      expect(getAccountInfo).toBeCalled();
    });
  });

  describe('redirect to login page', () => {
    it('should call showNativeAppLoginFn on continue button click when isWebView is true and isLoggedIn false', () => {
      const sameDayPricingPage = new SameDayPricingBuilder().withPtsUpgradeScenario().withEmailRecipient().build();
      const state = {
        account: { isLoggedIn: false },
        app: {
          webView: { isWebView: true },
          sameDay: { ...sameDayPricingPage, sameDaySelectFarePage: { isChangeFlow: false } },
          savedCreditCards,
          toggles: { CEPTOR_VOID_API: false }
        }
      };
      const { container } = createComponent({}, state);

      fireEvent.submit(container.querySelector('form'));

      expect(showNativeAppLoginFnMock).toHaveBeenCalledWith({ loginType: LOGIN_TYPES.POINTS });
    });

    it('should redirect the user to login if they try to continue when owing points', () => {
      const sameDayPricingPage = new SameDayPricingBuilder().withPtsUpgradeScenario().withEmailRecipient().build();
      const state = {
        account: { isLoggedIn: false },
        app: {
          sameDay: { ...sameDayPricingPage, sameDaySelectFarePage: { isChangeFlow: false } },
          savedCreditCards,
          toggles: { CEPTOR_VOID_API: false }
        }
      };
      const { container } = createComponent({}, state);

      fireEvent.submit(container.querySelector('form'));

      expect(pushStub).toHaveBeenCalledWith('/login', null, {
        simpleLogin: true,
        to: '/same-day/price-difference',
        withPoints: true
      });
    });
  });

  describe('alternative forms of payment', () => {
    it('should confirm a same day change when apple pay data becomes available', () => {
      const mockFormData = { recipientEmail: 'test@wnco.com' };
      const mockApplePayCard = { formData: mockFormData };
      const mockSameDayPricingPage = new SameDayPricingBuilder().withAmountDue().build();

      getIsApplePayCardValid.mockReturnValueOnce(true);

      createComponent(
        {},
        {
          app: {
            account: { isLoggedIn: false },
            applePay: { applePayCard: mockApplePayCard },
            sameDay: {
              ...mockSameDayPricingPage,
              sameDaySelectFarePage: { isChangeFlow: true }
            },
            savedCreditCards: {},
            toggles: { CEPTOR_VOID_API: true }
          }
        }
      );

      expect(updateSameDayConfirmationMethodFnMock).toHaveBeenCalledWith(
        false,
        { ...mockFormData, applePayCard: mockApplePayCard },
        { ...mockSameDayPricingPage.sameDayPricingPage._links.sameDayConfirmation },
        null,
        { ...mockSameDayPricingPage.sameDayPricingPage.fareSummary.amountDue }
      );
    });

    it('should confirm a same day change when apple pay data becomes available', () => {
      const mockFormData = { recipientEmail: 'test@wnco.com' };
      const mockApplePayCard = { formData: mockFormData };
      const mockSameDayPricingPage = new SameDayPricingBuilder().withAmountDue().build();

      getIsApplePayCardValid.mockReturnValueOnce(true);

      createComponent(
        {},
        {
          app: {
            account: { isLoggedIn: true },
            applePay: { applePayCard: mockApplePayCard },
            sameDay: {
              ...mockSameDayPricingPage,
              sameDaySelectFarePage: { isChangeFlow: true }
            },
            savedCreditCards: {},
            toggles: { CEPTOR_VOID_API: true }
          }
        }
      );

      expect(updateSameDayConfirmationMethodFnMock).toHaveBeenCalledWith(
        true,
        { ...mockFormData, applePayCard: mockApplePayCard },
        { ...mockSameDayPricingPage.sameDayPricingPage._links.sameDayConfirmation },
        null,
        { ...mockSameDayPricingPage.sameDayPricingPage.fareSummary.amountDue }
      );
    });

    it('should confirm a same day change when paypal data is available', async () => {
      const updateSameDayConfirmationMethodMock = jest.fn();
      const mockFormData = { recipientEmail: 'test@wnco.com' };
      const mockPayPal = { token: '123.abc.xyz' };
      const mockSameDayPricingPage = new SameDayPricingBuilder().withAmountDue().build();
      const payPalProps = {
        isChangeFlow: true,
        resumeDataFn: jest
          .fn()
          .mockResolvedValue({ formData: mockFormData, payPal: mockPayPal, isFromPayPalAuthorized: true }),
        sameDayPricingPage: mockSameDayPricingPage.sameDayPricingPage,
        savedCreditCards: {},
        shouldResumeDataFn: jest.fn(() => true),
        updateSameDayConfirmationMethodFn: updateSameDayConfirmationMethodMock
      };
      const mockPayPalData = {
        formData: mockFormData,
        isFromPayPalAuthorized: true,
        payPal: mockPayPal
      };

      useState.mockImplementation((value) => {
        if (value === false) {
          return [false, () => {}];
        } else {
          return [mockPayPalData, () => {}];
        }
      });

      integrationRender()({}, SameDayPriceDifferencePage, { ...payPalProps });

      await waitFor(() => {
        expect(updateSameDayConfirmationMethodMock).toHaveBeenCalledWith(
          undefined,
          { ...mockFormData, payPal: mockPayPal },
          { ...mockSameDayPricingPage.sameDayPricingPage._links.sameDayConfirmation },
          null,
          { ...mockSameDayPricingPage.sameDayPricingPage.fareSummary.amountDue }
        );
      });
    });

    it('should initiate a void transaction when the user continues as a guest', () => {
      const mockSetReLoginCallbackFunctions = jest.fn();
      const mockInitiateVoidTransactionFunction = jest.fn();
      const sameDayPricingResponse = new SameDayPricingBuilder().withAmountDue().withEmailRecipient().build();
      const { container } = integrationRender()({}, SameDayPriceDifferencePage, {
        applePayCard: { test: 'data' },
        hasSelectedAlternativeFormOfPaymentFn: jest.fn().mockReturnValue(true),
        initiateSameDayVoidTransactionForGuestFn: mockInitiateVoidTransactionFunction,
        resetSameDayPaymentDataFn: jest.fn(),
        sameDayPricingPage: sameDayPricingResponse.sameDayPricingPage,
        savedCreditCards: {},
        saveFormDataFn: jest.fn().mockResolvedValue(),
        setReLoginCallbackFunctionsFn: mockSetReLoginCallbackFunctions,
        shouldGotoPayPalSignInFn: jest.fn().mockReturnValue(false),
        shouldResumeDataFn: jest.fn(),
        updateSameDayConfirmationMethodFn: jest.fn()
      });

      const form = container.querySelector('form');

      fireEvent.submit(form);

      mockSetReLoginCallbackFunctions.mock.calls[1][0].continueAsGuestFn({});

      expect(mockInitiateVoidTransactionFunction).toHaveBeenCalledWith();
    });

    it('should reset payment data when the user continues as a guest', () => {
      const mockSetReLoginCallbackFunctions = jest.fn();
      const mockResetSameDayPaymentDataFn = jest.fn();
      const sameDayPricingResponse = new SameDayPricingBuilder().withAmountDue().withEmailRecipient().build();
      const { container } = integrationRender()({}, SameDayPriceDifferencePage, {
        applePayCard: { test: 'data' },
        CEPTOR_VOID_API: true,
        hasSelectedAlternativeFormOfPaymentFn: jest.fn().mockReturnValue(true),
        initiateSameDayVoidTransactionForGuestFn: jest.fn(),
        resetSameDayPaymentDataFn: mockResetSameDayPaymentDataFn,
        sameDayPricingPage: sameDayPricingResponse.sameDayPricingPage,
        savedCreditCards: {},
        saveFormDataFn: jest.fn().mockResolvedValue(),
        setReLoginCallbackFunctionsFn: mockSetReLoginCallbackFunctions,
        shouldGotoPayPalSignInFn: jest.fn().mockReturnValue(false),
        shouldResumeDataFn: jest.fn(),
        updateSameDayConfirmationMethodFn: jest.fn()
      });

      const form = container.querySelector('form');

      fireEvent.submit(form);

      mockSetReLoginCallbackFunctions.mock.calls[1][0].continueAsGuestFn({});

      expect(mockResetSameDayPaymentDataFn).toHaveBeenCalled();
    });

    it('should go to PayPal sign in', () => {
      const mockGoToPayPalSignIn = jest.fn();
      const sameDayPricingResponse = new SameDayPricingBuilder().withAmountDue().withEmailRecipient().build();
      const { container } = integrationRender()({}, SameDayPriceDifferencePage, {
        applePayCard: { test: 'data' },
        gotoPayPalSignInFn: mockGoToPayPalSignIn,
        hasSelectedAlternativeFormOfPaymentFn: jest.fn().mockReturnValue(false),
        initiateSameDayVoidTransactionForGuestFn: jest.fn(),
        resetSameDayPaymentDataFn: jest.fn(),
        sameDayPricingPage: sameDayPricingResponse.sameDayPricingPage,
        savedCreditCards: {},
        saveFormDataFn: jest.fn().mockResolvedValue(),
        setReLoginCallbackFunctionsFn: jest.fn(),
        shouldGotoPayPalSignInFn: jest.fn().mockReturnValue(true),
        shouldResumeDataFn: jest.fn(),
        updateSameDayConfirmationMethodFn: jest.fn()
      });

      const form = container.querySelector('form');

      fireEvent.submit(form);

      expect(mockGoToPayPalSignIn).toHaveBeenCalledWith(
        sameDayPricingResponse.sameDayPricingPage.fareSummary.amountDue.fare,
        { recipientEmail: 'teslaawesome@gmail.com' }
      );
    });
  });

  const createComponent = (props = {}, state = {}) => {
    const defaultProps = {
      hasSelectedAlternativeFormOfPaymentFn: hasSelectedAlternativeFormOfPaymentMock,
      isLoggedIn,
      location: {},
      match: {
        params: ''
      },
      push: pushStub,
      savedCreditCards,
      saveFormDataFn: saveFormDataFnMock,
      searchRequest: {
        departureAndReturnDate: {
          departureDate: '2022-02-15',
          returnDate: '2022-02-15'
        },
        from: 'AUS',
        to: 'DAL'
      },
      setReLoginCallbackFunctionsFn: setReLoginCallbackFunctionsFnMock,
      shouldGotoPayPalSignInFn: shouldGotoPayPalSignInFnMock,
      shouldResumeDataFn: shouldResumeDataFnMock,
      showNativeAppLoginFn: showNativeAppLoginFnMock,
      traceSameDayPaymentTypeFn: traceSameDayPaymentTypeMock,
      updateSameDayConfirmationMethodFn: updateSameDayConfirmationMethodFnMock,
      updateSameDayConfirmationRefundMethodFn: updateSameDayConfirmationRefundMethodFnMock
    };
    const defaultState = {
      app: {
        account: {
          isLoggedIn: false
        },
        applePay: {
          applePayCard: null
        },
        errorHeader: {
          errorMessage: null,
          hasError: false
        },
        sameDay: {
          sameDayPaymentPage: {},
          sameDayPricingPage: {},
          sameDaySelectFarePage: {}
        },
        savedCreditCards: {
          otherCards: [],
          primaryCard: null
        },
        toggles: {
          CEPTOR_VOID_API: false
        },
        webView: {
          isWebView: false
        }
      },
      router: {
        location: {
          search: 'search'
        }
      }
    };
    const store = configureMockStore()({ ...defaultState, ...state });
    const mergedProps = { ...defaultProps, ...props };

    return render(
      <div>
        <Provider store={store}>
          <Router>
            <SameDayPriceDifferencePageConnected {...mergedProps} />
          </Router>
        </Provider>
      </div>
    );
  };
});
