import { fireEvent } from '@testing-library/react';
import footer from 'mocks/templates/content-delivery/footer';
import * as AppSelector from 'src/shared/selectors/appSelector';
import { TransferTravelFundsPage } from 'src/travelFunds/pages/transferTravelFundsPage';
import * as TravelFundsTransformer from 'src/travelFunds/transformers/travelFundsTransformer';
import localStorage from 'store2';
import TransferTravelFundsBuilder from 'test/builders/apiResponse/transferTravelFundsBuilder';
import { createComponentRender } from 'test/unit/helpers/testUtils';

describe('TransferTravelFundsPage', () => {
  let clock;
  let formData;
  let goBackMock;
  let pathMock;
  let setReLoginCallbackFunctionsFnMock;
  let transferTravelFundsFnMock;
  let transformedData;
  let transformToTransferTravelFundsRequestMock;
  let validateFunds;

  beforeEach(() => {
    clock = jest.useFakeTimers();
    goBackMock = jest.fn();
    jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('travel-funds');
    pathMock = jest.fn();
    setReLoginCallbackFunctionsFnMock = jest.fn();
    transferTravelFundsFnMock = jest.fn().mockResolvedValue();
    transformToTransferTravelFundsRequestMock = jest.spyOn(
      TravelFundsTransformer,
      'transformToTransferTravelFundsRequest'
    );

    formData = {
      additionalReceipt: 't@s.com',
      firstName: 'Thomas',
      lastName: 'Shelby',
      personalMessage: 'this is the personal message',
      rapidRewardsNumber: '123456',
      recipientEmailAddress: 'arthur@shelby.com'
    };
    transformedData = {
      body: {
        fundSearchToken: 'fundSearchToken',
        personalMessage: 'this is the personal message',
        receiptEmailAddress: 't@s.com',
        recipientAccountNumber: '123456',
        recipientEmailAddress: 'arthur@shelby.com',
        recipientFirstName: 'Thomas',
        recipientInfoText: 'mock recipient info text',
        recipientLastName: 'Shelby',
        transferAmount: {
          amount: '100.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        }
      },
      href: '/transfer-funds',
      method: 'POST'
    };
    validateFunds = new TransferTravelFundsBuilder().build();
  });

  afterEach(() => {
    clock.resetAllMocks();
    jest.resetAllMocks();
  });

  it('should render the page', () => {
    const { container } = createPageComponent({});

    expect(container).toMatchSnapshot();
  });

  it('should render the webview version of the page', () => {
    const { container } = createPageComponent({ isWebView: true }, true);

    expect(container).toMatchSnapshot();
  });

  it('should go back when cancel is clicked', () => {
    const { container } = createPageComponent();

    fireEvent.click(container.querySelectorAll('.page-header .button')[0]);

    expect(goBackMock).toHaveBeenCalled();
  });

  describe('transfer button clicked', () => {
    beforeEach(() => {
      transformToTransferTravelFundsRequestMock.mockReturnValue(transformedData);
    });

    describe('hot state user', () => {
      it('should transform form, call transferTravelFundsFn and push to confirmation page', async () => {
        const { container } = createPageComponent(
          {
            isLoggedIn: true
          },
          true
        );

        passengerDetailsFireEvents(container);

        await expect(transformToTransferTravelFundsRequestMock).toHaveBeenCalledWith(validateFunds, formData);

        expect(transformToTransferTravelFundsRequestMock).toHaveReturnedWith(transformedData);

        await expect(transferTravelFundsFnMock).toHaveBeenCalled;

        expect(pathMock).toHaveBeenCalledWith('/travel-funds/transfer-confirmation.html');
      });
    });

    describe('session expired', () => {
      it('should transfer funds after user logs in', async () => {
        const { container } = createPageComponent(
          {
            isLoggedIn: true
          },
          true
        );

        passengerDetailsFireEvents(container);

        await expect(transformToTransferTravelFundsRequestMock).toHaveBeenCalledWith(validateFunds, formData);

        expect(transformToTransferTravelFundsRequestMock).toHaveReturnedWith(transformedData);

        await expect(transferTravelFundsFnMock).toHaveBeenCalledWith(transformedData);

        expect(pathMock).toHaveBeenCalledWith('/travel-funds/transfer-confirmation.html');
      });
    });

    describe('continue as guest', () => {
      it('should be pushed back to Check Travel Funds screen', () => {
        const { container } = createPageComponent({
          setReLoginCallbackFunctionsFn: (arg) => arg.continueAsGuestFn() 
        }, true);

        passengerDetailsFireEvents(container);

        expect(pathMock).toBeCalledWith('/travel-funds/');
      });
    });
  });

  describe('when using api gateway cookies', () => {
    it('should call appropriate actions', async () => {
      const { container } = createPageComponent({ isLoggedIn: true }, true);

      transformToTransferTravelFundsRequestMock.mockReturnValueOnce(transformedData);
      jest.spyOn(localStorage, 'get').mockReturnValueOnce({ expirationDate: 'token' });
      
      passengerDetailsFireEvents(container);

      await expect(transformToTransferTravelFundsRequestMock).toHaveBeenCalledWith(validateFunds, formData);
      await expect(transferTravelFundsFnMock).toHaveBeenCalledWith(transformedData);

      expect(pathMock).toHaveBeenCalledWith('/travel-funds/transfer-confirmation.html');
      expect(setReLoginCallbackFunctionsFnMock).toHaveBeenCalled();
    });
  });

  it('should show PageFooterWcmSourced by default', () => {
    const footerLinkRows = footer.results.footer.content.placement.linkRows;
    const { container } = createPageComponent({ footerLinkRows }, true);

    expect(container).toMatchSnapshot();
  });

  it('should not show PageFooterWcmSourced when in a webview', () => {
    const footerLinkRows = footer.results.footer.content.placement.linkRows;
    const { container } = createPageComponent({ footerLinkRows, isWebView: true }, true);

    expect(container).toMatchSnapshot();
  });

  const passengerDetailsFireEvents = (container) => {
    fireEvent.change(container.querySelector('input[name="firstName"]'), { target: { value: 'Thomas' } });
    fireEvent.change(container.querySelector('input[name="lastName"]'), { target: { value: 'Shelby' } });
    fireEvent.change(container.querySelector('input[name="rapidRewardsNumber"]'), { target: { value: '123456' } });
    fireEvent.change(container.querySelector('input[name="recipientEmailAddress"]'), { target: { value: 'arthur@shelby.com' } });
    fireEvent.change(container.querySelector('textarea[placeholder="PERSONAL_MESSAGE_PLACEHOLDER"]'), { target: { value: 'this is the personal message' } });
    fireEvent.change(container.querySelector('input[name="additionalReceipt"]'), { target: { value: 't@s.com' } });
    fireEvent.click(container.querySelector('button[type="submit"]'));
  };

  const createPageComponent = (props = {}) => {
    const defaultProps = {
      accountNumber: '',
      footerLinkRows: [],
      goBack: goBackMock,
      isLoggedIn: false,
      isWebView: false,
      push: pathMock,
      receiptEmailAddress: 'e@a.com',
      setReLoginCallbackFunctionsFn: setReLoginCallbackFunctionsFnMock,
      TF_PERSONAL_MSG_MAX_CHAR: 340,
      transferTravelFundsFn: transferTravelFundsFnMock,
      validateFunds
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

    return createComponentRender(TransferTravelFundsPage, { state, props: mergedProps });
  };
});
