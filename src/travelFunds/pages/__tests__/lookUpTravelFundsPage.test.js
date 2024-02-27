import '@testing-library/jest-dom/extend-expect';
import { fireEvent, screen } from '@testing-library/react';
import React from 'react';
import * as AppSelector from 'src/shared/selectors/appSelector';
import * as TravelFundsActions from 'src/travelFunds/actions/travelFundsActions';
import TravelFundsConstants from 'src/travelFunds/constants/travelFundsConstants';
import { LookUpTravelFundsPage } from 'src/travelFunds/pages/lookUpTravelFundsPage';
import localStorage from 'store2';
import { createComponent } from 'test/unit/helpers/testingLibraryUtils';

const {
  FUND_TYPES_FORMATTED
} = TravelFundsConstants;

describe('LookUpTravelFundsPage', () => {
  const windowSatellite = window._satellite;
  let associateFundsFnMock;
  let loadTravelFundsPagePlacementsFnMock;
  let pushMock;
  let resetLookupFlowDataFnMock;
  let resumeAfterLoginFnMock;
  let retrieveTravelFundsFnMock;
  let retrieveUnusedFundsFnMock;
  let satelliteTrackMock;
  let saveLastSearchedFundFnMock;
  let setReLoginCallbackFunctionsFnMock;
  let showNativeAppLoginFnMock;
  let travelFundPageComponent;
  let updateSelectedLookupTabFnMock;
  let validateTransferFundsFnMock;

  beforeEach(() => {
    associateFundsFnMock = jest.fn(() => Promise.resolve());
    loadTravelFundsPagePlacementsFnMock = jest.fn();
    pushMock = jest.fn();
    resetLookupFlowDataFnMock = jest.fn();
    resumeAfterLoginFnMock = jest.fn();
    retrieveTravelFundsFnMock = jest.spyOn(TravelFundsActions, 'retrieveTravelFunds');
    retrieveUnusedFundsFnMock = jest.fn();
    satelliteTrackMock = jest.fn();
    saveLastSearchedFundFnMock = jest.fn();
    setReLoginCallbackFunctionsFnMock = jest.fn();
    showNativeAppLoginFnMock = jest.fn();
    updateSelectedLookupTabFnMock = jest.fn();
    validateTransferFundsFnMock = jest.spyOn(TravelFundsActions, 'validateTransferFunds').mockResolvedValue('done');
    window._satellite = { track: satelliteTrackMock };
  });

  const associateFund = {
    body: {
      fundSearchToken: 'token'
    },
    href: '/test',
    labelText: 'AssociateFundsLink',
    method: 'POST'
  };
  const previousTravelFundsSearch = {
    body: {
      firstName: 'ERIC',
      lastName: 'CHAVEZ',
      travelFundIdentifier: '2E4AX5'
    },
    href: '/previous',
    method: 'GET'
  };
  const retrievedFunds = [
    {
      currentAmount: {
        amount: '439.68',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      displayName: 'JOHNNY QUEST',
      expirationDate: '2020-06-10',
      fundIdentifier: 'OC2EHW',
      nonRefundableAmount: {
        amount: '0.00',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      refundableAmount: {
        amount: '439.68',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      travelFundType: 'TRAVEL_FUNDS'
    },
    {
      currentAmount: {
        amount: '50.00',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      displayName: 'Southwest Gift Card',
      fundIdentifier: 'XXXXXXXXXXX-1234',
      travelFundType: 'GIFT_CARD'
    }
  ];
  const validateTransfer = {
    body: {
      fundSearchToken: 'token'
    },
    href: '/test',
    labelText: 'Validate Transfer Link',
    method: 'POST'
  };
  const transferabilityProps = {
    accountNumber: '12345',
    isLoggedIn: true,
    previousTravelFundsSearch,
    retrievedFunds: [
      {
        _links: {
          associateFund,
          validateTransfer
        },
        displayName: 'Bobby Hill',
        expirationDate: '2019-09-15',
        fundIdentifier: 'OC2EHW',
        fundType: 'TRAVEL_FUNDS',
        removalId: '1',
        transferableAmount: {
          amount: '1.23',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        travelFundType: 'TRAVEL_FUND'
      }
    ]
  };

  afterEach(() => {
    jest.clearAllMocks();
    window._satellite = windowSatellite;
  });

  describe('render', () => {
    it('should render and match snapshot', () => {
      expect(createPageComponent()).toMatchSnapshot();
    });

    it('should render the no travel funds message when the message is present', () => {
      const { container } = createPageComponent({
        message: {
          body: 'No travel funds found on this account.',
          header: 'No Travel Funds Found',
          key: 'SOMESUCH'
        }
      });

      expect(container.querySelector('.look-up-travel-funds--message-container')).toBeInTheDocument();
      expect(container.querySelector('[data-qa="message-header-text"]').textContent).toEqual('No Travel Funds Found');
      expect(container.querySelector('[data-qa="message-body-text"]').textContent).toEqual('No travel funds found on this account.');
    });

    it('should render the results list with the results saved in Redux, should also render message if it exists regardless of the state of retrievedFunds', () => {
      const { container } = createPageComponent({
        message: {
          body: 'No travel funds found on this account.',
          header: 'No Travel Funds Found',
          key: 'SOMESUCH'
        },
        retrievedFunds
      });

      expect(container.querySelectorAll('.fund-results-list--item')).toHaveLength(2);
      expect(container.querySelector('.look-up-travel-funds--message-container')).toBeInTheDocument();
      expect(container.querySelector('[data-qa="message-header-text"]').textContent).toEqual('No Travel Funds Found');
      expect(container.querySelector('[data-qa="message-body-text"]').textContent).toEqual('No travel funds found on this account.');
    });

    it('should continue to form when logged in and resumeAfterLogin true', () => {
      const instance = React.createRef();
      
      createPageComponent({
        instance,
        isLoggedIn: true,
        resumeAfterLogin: {
          requestInfo: {
            requestLink: associateFund,
            type: 'ASSOCIATE'
          },
          shouldResume: true
        }
      });

      instance.current.setState({
        app: {
          account: {
            isLoggedIn: true
          }
        }
      });

      expect(resumeAfterLoginFnMock).toHaveBeenCalledWith(false);
    });

    it('should return if type is not TRANSFER_FUNDS_TYPE nor ASSOCIATE_FUNDS_TYPE', () => {
      const instance = React.createRef();
      
      createPageComponent({
        instance,
        isLoggedIn: true,
        resumeAfterLogin: {
          requestInfo: {
            requestLink: associateFund,
            type: 'NO_TYPE'
          },
          shouldResume: true
        }
      });

      expect(validateTransferFundsFnMock).not.toHaveBeenCalled();
      expect(associateFundsFnMock).not.toHaveBeenCalled();
    });

    it('should return if requestInfo property requestLink is not set', () => {
      const instance = React.createRef();
      
      createPageComponent({
        instance,
        isLoggedIn: true,
        resumeAfterLogin: {
          requestInfo: {
            type: 'ASSOCIATE'
          },
          shouldResume: true
        }
      });

      expect(resumeAfterLoginFnMock).toHaveBeenCalledWith(false);
      expect(validateTransferFundsFnMock).not.toHaveBeenCalled();
    });

    it('should return if requestInfo property type is not set', () => {
      const instance = React.createRef();
      
      createPageComponent({
        instance,
        isLoggedIn: true,
        resumeAfterLogin: {
          requestInfo: {
            requestLink: associateFund
          },
          shouldResume: true
        }
      });

      expect(resumeAfterLoginFnMock).toHaveBeenCalledWith(false);
      expect(validateTransferFundsFnMock).not.toHaveBeenCalled();
    });

    it('should throw an error and be caught in the validateTransferFundsFn function', () => {
      const instance = React.createRef();
      
      createPageComponent({
        instance,
        isLoggedIn: true,
        resumeAfterLogin: {
          requestInfo: {
            requestLink: validateTransfer,
            type: 'TRANSFER'
          },
          shouldResume: true
        },
        validateTransferFundsFn: jest.spyOn(TravelFundsActions, 'validateTransferFunds').mockImplementation(() => Promise.reject(() => new Error()))
      });

      expect(resumeAfterLoginFnMock).toHaveBeenCalledWith(false);
      expect(validateTransferFundsFnMock).rejects.toThrowError();
    });

    it('should render the page with the correct props when the associateFundMessage object is set with a POSITIVE icon', () => {
      travelFundPageComponent = createPageComponent({
        associateFundsMessage: {
          icon: 'POSITIVE'
        }
      });

      expect(travelFundPageComponent).toMatchSnapshot();
    });
  });

  describe('click', () => {
    it('should navigate to home when the done button is clicked', () => {
      const { container } = createPageComponent();

      fireEvent.click(container.querySelector('.action-bar--right-buttons button'));

      expect(pushMock).toHaveBeenCalledWith('/');
    });

    describe('should load correct form when a different fund selector is set', () => {
      it('should load the travel funds selector when clicked', () => {
        const { container } = createPageComponent();
  
        fireEvent.click(container.querySelector('[data-qa="travel-funds-selector"]'));
  
        expect(updateSelectedLookupTabFnMock).toHaveBeenCalledWith('travel-funds');
      });

      it('should load the gift card selector when clicked', () => {
        const { container } = createPageComponent();
  
        fireEvent.click(container.querySelector('[data-qa="gift-card-selector"]'));
  
        expect(updateSelectedLookupTabFnMock).toHaveBeenCalledWith('gift-card');
      });

      it('should load the luv voucher selector when clicked', () => {
        const { container } = createPageComponent();
  
        fireEvent.click(container.querySelector('[data-qa="luv-voucher-selector"]'));
  
        expect(updateSelectedLookupTabFnMock).toHaveBeenCalledWith('luv-voucher');
      });
    });

    it('should retrieve when Travel Funds form is submitted and save fund search info the data store', () => {
      const { container } = createPageComponent();

      fireEvent.change(container.querySelector('input[name="confirmationNumber"]'), { target: { value: 'ABC123' } });
      fireEvent.change(container.querySelector('input[name="passengerFirstName"]'), { target: { value: 'Firstname' } });
      fireEvent.change(container.querySelector('input[name="passengerLastName"]'), { target: { value: 'Lastname' } });
      fireEvent.click(screen.getByRole('submit'));

      expect(retrieveTravelFundsFnMock).toHaveBeenCalledWith({
        body: {
          firstName: 'Firstname',
          lastName: 'Lastname',
          travelFundIdentifier: 'ABC123'
        },
        href: '/v1/mobile-air-booking/page/view-fund/TRAVEL_FUNDS',
        method: 'POST'
      });
      expect(saveLastSearchedFundFnMock).toHaveBeenCalledWith(FUND_TYPES_FORMATTED[0], {
        confirmationNumber: 'ABC123',
        passengerFirstName: 'Firstname',
        passengerLastName: 'Lastname'
      });
    });

    it('should retrieve when Gift Card form is submitted and save fund search info the data store', () => {
      const { container } = createPageComponent({
        currentlySelectedTab: 'gift-card'
      });

      fireEvent.change(container.querySelector('input[name="cardNumber"]'), { target: { value: '1111111111111111' } });
      fireEvent.change(container.querySelector('input[name="securityCode"]'), { target: { value: '1234' } });
      fireEvent.click(screen.getByText('Look up gift card'));

      expect(retrieveTravelFundsFnMock).toHaveBeenCalledWith({
        body: {
          travelFundIdentifier: '1111111111111111',
          securityCode: '1234'
        },
        href: '/v1/mobile-air-booking/page/view-fund/GIFT_CARD',
        method: 'POST'
      });
      expect(saveLastSearchedFundFnMock).toHaveBeenCalledWith(FUND_TYPES_FORMATTED[2], {
        cardNumber: '1111111111111111',
        securityCode: '1234'
      });
    });

    it('should retrieve when LUV Vouchers form is submitted and save fund search info the data store', () => {
      const { container } = createPageComponent({
        currentlySelectedTab: 'luv-voucher'
      });

      fireEvent.change(container.querySelector('input[name="voucherNumber"]'), { target: { value: '1111111111111111' } });
      fireEvent.change(container.querySelector('input[name="securityCode"]'), { target: { value: '1234' } });
      fireEvent.click(screen.getByRole('submit'));

      expect(retrieveTravelFundsFnMock).toHaveBeenCalledWith({
        body: {
          travelFundIdentifier: '1111111111111111',
          securityCode: '1234'
        },
        href: '/v1/mobile-air-booking/page/view-fund/LUV_VOUCHER',
        method: 'POST'
      });
      expect(saveLastSearchedFundFnMock).toHaveBeenCalledWith(FUND_TYPES_FORMATTED[1], {
        securityCode: '1234',
        voucherNumber: '1111111111111111'
      });
    });

    describe('transferability', () => {
      describe('hot state user', () => {
        it('should validate transfer when transfer button is pressed', async () => {
          jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValueOnce('travel-funds');
          const { container } = createPageComponent(
            { ...transferabilityProps, ...{} }
          );

          fireEvent.click(container.querySelectorAll('.fund-results-list--transfer-button')[0]);

          await expect(validateTransferFundsFnMock).toHaveBeenCalledWith(validateTransfer);
          expect(pushMock).toHaveBeenCalledWith('/travel-funds/transfer-review.html');
        });

        it('should call associateFundsFn when associate funds is clicked', async () => {
          const { container } = createPageComponent(
            { ...transferabilityProps, ...{} }
          );

          fireEvent.click(container.querySelector('.fund-results-list--associate-link'));

          await expect(associateFundsFnMock).toHaveBeenCalledWith(associateFund);
          expect(retrieveTravelFundsFnMock).toHaveBeenCalledWith(previousTravelFundsSearch, true);
        });
      });

      describe('session expired', () => {
        it('should validate transfer after user logs in', async () => {
          const { container } = createPageComponent(
            { ...transferabilityProps, ...{} }
          );

          fireEvent.click(container.querySelectorAll('.fund-results-list--transfer-button')[0]);

          await expect(validateTransferFundsFnMock).toHaveBeenCalledWith(validateTransfer);
          expect(pushMock).toHaveBeenCalled();
        });

        it('should call associateFundsFn after user logs in', async () => {
          const { container } = createPageComponent(
            { ...transferabilityProps, ...{} }
          );

          fireEvent.click(container.querySelector('.fund-results-list--associate-link'));

          await expect(associateFundsFnMock).toHaveBeenCalledWith(associateFund);
          expect(retrieveTravelFundsFnMock).toHaveBeenCalledWith(previousTravelFundsSearch, true);
        });

        it('should call retrieveTravelFundsFn when continue as a guest', () => {
          const instance = React.createRef();
      
          createPageComponent({
            instance,
            isLoggedIn: true,
            previousTravelFundsSearch
          });

          instance.current._continueAsGuest();

          expect(retrieveTravelFundsFnMock).toHaveBeenCalledWith(previousTravelFundsSearch, true);
        });

        it('should not call retrieveTravelFundsFn when continue as a guest when body is empty', () => {
          const previousTravelFundsSearchMock = {
            href: '/previous',
            method: 'GET'
          };

          const { container } = createPageComponent(
            { ...transferabilityProps, ...{
              previousTravelFundsSearch: previousTravelFundsSearchMock,
              retrievedFunds: [...transferabilityProps.retrievedFunds]
            } }
          );

          fireEvent.click(container.querySelectorAll('.fund-results-list--transfer-button')[0]);

          expect(retrieveTravelFundsFnMock).not.toHaveBeenCalled();
        });
      });

      describe('cold state', () => {
        let expectedValidateRequestInfo;

        beforeEach(() => {
          expectedValidateRequestInfo = {
            requestLink: validateTransfer,
            type: 'TRANSFER'
          };
        });

        describe('isWebView true', () => {
          it('should call showNativeAppLoginFn and resumeAfterLoginFn after clicking Transfer Funds', () => {
            const { container } = createPageComponent(
              { ...transferabilityProps, ...{
                isLoggedIn: false,
                isWebView: true
              } }
            );

            fireEvent.click(container.querySelectorAll('.fund-results-list--transfer-button')[0]);

            expect(showNativeAppLoginFnMock).toHaveBeenCalled();
            expect(resumeAfterLoginFnMock).toHaveBeenCalledWith(true, expectedValidateRequestInfo);
          });
        });

        describe('isWebView false', () => {
          it('should push login screen and call resumeAfterLoginFn after clicking Transfer Funds', () => {
            jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValueOnce('travel-funds');
            const { container } = createPageComponent(
              { ...transferabilityProps, ...{
                isLoggedIn: false,
                isWebView: false
              } }
            );

            fireEvent.click(container.querySelectorAll('.fund-results-list--transfer-button')[0]);

            expect(pushMock).toHaveBeenCalledWith('/login', null, { simpleLogin: true, to: '/travel-funds/', transferFunds: true });
            expect(resumeAfterLoginFnMock).toHaveBeenCalledWith(true, expectedValidateRequestInfo);
          });
        });
      });
    });

    describe('placements', () => {
      describe('Travel Funds tab', () => {
        it('should not display DynamicPlacement if placements are empty', () => {
          travelFundPageComponent = createPageComponent(
            {
              currentlySelectedTab: 'travel-funds',
              placements: [
                {
                  contentBlockId: '',
                  displayType: 'flex-placement',
                  isChasePrequal: false,
                  isChaseCombo: false,
                  isChasePlacement: false,
                  placement: {
                    props: {
                      href: 'HREF'
                    }
                  },
                  placementData: {},
                  shouldObserveViewPort: false,
                  viewPortThreshold: 0.5
                }
              ],
              retrievedFunds
            }
          );

          expect(travelFundPageComponent).toMatchSnapshot();
        });
      });
    });

    describe('when using api gateway cookies', () => {
      it('should call appropriate actions', async () => {
        jest.fn(localStorage, 'get').mockImplementation(() => ({ expirationDate: 'token' }));

        const { container } = createPageComponent({ ...transferabilityProps });

        fireEvent.click(container.querySelector('.fund-results-list--associate-link'));

        await expect(associateFundsFnMock).toHaveBeenCalledWith(associateFund);
        expect(retrieveTravelFundsFnMock).toHaveBeenCalledWith(previousTravelFundsSearch, true);
        expect(setReLoginCallbackFunctionsFnMock).toHaveBeenCalled();
      });
    });
  });

  const createPageComponent = (props = {}) => {
    const defaultProps = {
      accountNumber: '',
      associateFundsFn: associateFundsFnMock,
      associateFundsMessage: {
        header: '',
        icon: '',
        key: '',
        textColor: ''
      },
      currentlySelectedTab: 'travel-funds',
      isLoggedIn: false,
      isWebView: false,
      loadTravelFundsPagePlacementsFn: loadTravelFundsPagePlacementsFnMock,
      placements: [],
      previousTravelFundsSearch: {},
      push: pushMock,
      resetLookupFlowDataFn: resetLookupFlowDataFnMock,
      resumeAfterLogin: {
        requestInfo: {},
        shouldResume: false
      },
      resumeAfterLoginFn: resumeAfterLoginFnMock,
      retrieveTravelFundsFn: retrieveTravelFundsFnMock,
      retrieveUnusedFundsFn: retrieveUnusedFundsFnMock,
      retrievedFunds: [],
      saveLastSearchedFundFn: saveLastSearchedFundFnMock,
      setReLoginCallbackFunctionsFn: setReLoginCallbackFunctionsFnMock,
      showNativeAppLoginFn: showNativeAppLoginFnMock,
      updateSelectedLookupTabFn: updateSelectedLookupTabFnMock,
      validateTransferFundsFn: validateTransferFundsFnMock
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

    return createComponent(LookUpTravelFundsPage, { state, props: mergedProps });
  };
});
