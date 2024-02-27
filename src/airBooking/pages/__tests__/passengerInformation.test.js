jest.mock('src/airBooking/transformers/passengerInfosTransformer', () => ({ transformPassengerInfos: jest.fn() }));
jest.mock('src/shared/helpers/passengerInfoHelper', () => ({
  ...jest.requireActual('src/shared/helpers/passengerInfoHelper'),
  updatePassengerForm: jest.fn(),
  getSelectedFrequentTravelerDetails: jest.fn()
}));

import i18n from '@swa-ui/locale';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import frequentTravelerList from 'mocks/templates/airReservation/frequentTravelersList';
import React from 'react';
import { Provider } from 'react-redux';
import { PassengerInformation } from 'src/airBooking/pages/passengerInformation';
import { transformPassengerInfos } from 'src/airBooking/transformers/passengerInfosTransformer';
import { getSelectedFrequentTravelerDetails, updatePassengerForm } from 'src/shared/helpers/passengerInfoHelper';
import * as AppSelector from 'src/shared/selectors/appSelector';
import PricesBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/page/flights/pricesBuilder';
import PassengerInfosBuilder from 'test/builders/model/passengerInfosBuilder';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import waitFor from 'test/unit/helpers/waitFor';

const accountInfo = {
  dateOfBirth: '1996-04-15',
  firstName: 'FUNFUN',
  gender: 'M',
  lastName: 'LIU',
  middleName: null,
  suffix: null,
  rapidRewardsNumber: '',
  frequentTravelerId: 'Account',
  emailReceiptTo: 'aterris@example.com',
  knownTravelerNumber: '',
  redressNumber: ''
};
const passengerInfo = {
  ...accountInfo,
  dateOfBirth: '1996-04-15',
  middleName: '',
  suffix: '',
  frequentTravelerId: undefined
};

describe('PassengerInformation', () => {
  let fetchSavedCreditCardsAndPassengerInfoFnMock;
  let pushMock;
  let submitPassengerFormMock;
  let generatePassengerPageInfoMock;
  let specialAssistanceAnalyticsFnMock;
  let showDialogFnMock;
  let setExpressCheckoutFromPassengerPageFnMock;
  let showNativeAppLoginFnMock;
  let transformPassengerInfosMock;
  let updateFrequentTravelerSelectionFnMock;
  let getSelectedFrequentTravelerDetailsMock;
  let updatePassengerFormMock;
  let reLoginCallbackFunctionsFnMock;
  const selectedFrequentTravelers = [
    {
      addFrequentTravelerToggle: true,
      frequentTravelerId: 'ACCOUNT',
      paxNumber: 0
    }
  ];
  let transitionToFrequentTravelerPageMock;

  const defaultFlightProducts = new PricesBuilder().build().flightPricingPage;

  beforeEach(() => {
    pushMock = jest.fn();
    submitPassengerFormMock = jest.fn();
    fetchSavedCreditCardsAndPassengerInfoFnMock = jest.fn();
    generatePassengerPageInfoMock = jest.fn();
    specialAssistanceAnalyticsFnMock = jest.fn();
    showDialogFnMock = jest.fn();
    setExpressCheckoutFromPassengerPageFnMock = jest.fn();
    reLoginCallbackFunctionsFnMock = jest.fn();
    showNativeAppLoginFnMock = jest.fn();
    transformPassengerInfosMock = transformPassengerInfos.mockImplementation(() => {});
    updateFrequentTravelerSelectionFnMock = jest.fn();
    updatePassengerFormMock = updatePassengerForm.mockImplementation(() => {});
    getSelectedFrequentTravelerDetailsMock = getSelectedFrequentTravelerDetails.mockImplementation(() => {});
    transitionToFrequentTravelerPageMock = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('generate passenger information', () => {
    it('should generate passenger info with chase when first passenger is not logged in', () => {
      createComponent({
        params: {
          paxNumber: '0'
        }
      });

      expect(generatePassengerPageInfoMock).toHaveBeenCalledWith({
        chaseCardHolder: {
          accountNumber: '',
          firstName: 'firstName',
          lastName: 'lastName',
          middleName: 'middleName'
        },
        searchRequest: {
          tripType: 'oneWay',
          isRoundTrip: false,
          currencyType: 'USD',
          numberOfAdults: 1
        }
      });
    });

    it('should not generate passenger info when passenger is not first', () => {
      createComponent();

      expect(generatePassengerPageInfoMock).not.toHaveBeenCalled();
    });

    it('should generate passenger info when first passenger without chase when first passenger is logged in', () => {
      createComponent({
        params: {
          paxNumber: '0'
        },
        isLoggedIn: true
      });

      expect(generatePassengerPageInfoMock).toHaveBeenCalledWith({
        searchRequest: {
          tripType: 'oneWay',
          isRoundTrip: false,
          currencyType: 'USD',
          numberOfAdults: 1
        }
      });
    });
  });

  describe('initialize', () => {
    it('should not contain LapChildDisclosure when no lap child is in booking', () => {
      const { container: passengerInformation } = createComponent();

      expect(passengerInformation.querySelector('.lap-child-personal-info')).toBeNull();
    });

    it('should contain LapChildDisclosure when at least one lap child is in booking', () => {
      const passengerInfos = PassengerInfosBuilder.getLapChildPassengerInfos();
      const { container: passengerInformation } = createComponent({ passengerInfos });

      expect(passengerInformation.querySelector('.lap-child-personal-info')).toMatchSnapshot();
    });

    it('should contains passengerPersonalInfoForm', () => {
      const { container: passengerInformation } = createComponent();

      expect(passengerInformation).toMatchSnapshot();
    });

    it('should not call fetchSavedCCsAndPassengerInfoWithExpressCheckOutFn when user is not logged in', () => {
      createComponent({ isLoggedIn: false });

      expect(fetchSavedCreditCardsAndPassengerInfoFnMock).not.toHaveBeenCalledWith();
    });

    it('should not call fetchSavedCCsAndPassengerInfoWithExpressCheckOutFn when passengerInfo and account info has value', () => {
      createComponent({
        params: {
          paxNumber: '0'
        },
        isLoggedIn: true,
        passengerInfos: [
          {
            type: 'adult',
            departureDate: '2015-02-01',
            passengerInfo: {
              firstName: 'test',
              lastName: 'wang',
              gender: 'M',
              dateOfBirth: '2015-02-01'
            }
          }
        ],
        accountInfo: {
          firstName: 'test',
          lastName: 'wang',
          gender: 'M',
          dateOfBirth: '2015-02-01'
        }
      });

      expect(fetchSavedCreditCardsAndPassengerInfoFnMock).not.toHaveBeenCalledWith();
    });
  });

  describe('login banner', () => {
    it('should be hidden when user is logged in', () => {
      const { container: passengerInformation } = createComponent({ isLoggedIn: true });

      expect(passengerInformation.querySelector('.login-banner')).not.toBeInTheDocument();
    });

    describe('user not logged in yet', () => {
      it('should be shown when you are not logged in and is the first passenger', () => {
        const { container: passengerInformation } = createComponent({ params: { paxNumber: '0' } });

        expect(passengerInformation.querySelector('.login-banner')).toBeInTheDocument();
      });

      it('should be hidden when you are not logged in and is the second passenger', () => {
        const { container: passengerInformation } = createComponent();

        expect(passengerInformation.querySelector('.login-banner')).not.toBeInTheDocument();
      });

      it('should transition to login page when clicked and not in webview', () => {
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValueOnce('air/booking');
        const { container: passengerInformation } = createComponent({
          params: {
            paxNumber: '0'
          }
        });

        fireEvent.click(passengerInformation.querySelector('.login-banner'));

        expect(pushMock).toHaveBeenCalledWith('/login', null, {
          to: '/air/booking/passenger/0',
          simpleLogin: true
        });
        expect(setExpressCheckoutFromPassengerPageFnMock).toHaveBeenCalledWith(true);
        expect(showNativeAppLoginFnMock).not.toHaveBeenCalledWith();
      });

      it('should invoke showNativeAppLoginFn when clicked and in webview', () => {
        const multiplePassengerInfos = PassengerInfosBuilder.getMultipleAdultPassengers();
        const updatedPassengerInfo = {
          ...multiplePassengerInfos[0],
          ...{
            dateOfBirth: '12/22/1959',
            departureDate: '2015-02-01'
          }
        };

        transformPassengerInfosMock.mockReturnValue([updatedPassengerInfo, updatedPassengerInfo]);

        const { container: passengerInformation } = createComponent({
          params: { paxNumber: '0' },
          isWebView: true,
          passengerInfos: multiplePassengerInfos
        });

        fireEvent.click(passengerInformation.querySelector('.login-banner'));

        expect(pushMock).not.toHaveBeenCalled();
        expect(setExpressCheckoutFromPassengerPageFnMock).toHaveBeenCalledWith(true);
        expect(showNativeAppLoginFnMock).toHaveBeenCalled();
        expect(transformPassengerInfosMock).toHaveBeenCalled();
      });
    });
  });

  describe('submit passenger', () => {
    describe('check passenger passed', () => {
      it('should pass passengerInfos passengerInfo and paxNumber to checkRapidRewardAndSavePassenger', () => {
        const instance = React.createRef();

        createComponent({
          ref: instance,
          setReLoginCallbackFunctionsFn: reLoginCallbackFunctionsFnMock,
          params: { paxNumber: '0' },
          contactMethodContent: `${i18n('SHARED__CONTACT_METHOD_OPTION__DOMESTIC_OPTIONS_EMAIL')}, a@gmail.com`,
          passengerInfos: [
            {
              type: 'adult',
              departureDate: '2015-02-01'
            },
            {
              type: 'adult',
              departureDate: '2015-02-01'
            }
          ]
        });

        instance.current._onSubmit(passengerInfo);

        expect(submitPassengerFormMock).toHaveBeenCalledWith(
          [
            {
              type: 'adult',
              departureDate: '2015-02-01'
            },
            {
              type: 'adult',
              departureDate: '2015-02-01'
            }
          ],
          passengerInfo,
          0
        );
      });

      it('should not pass passengerInfos', () => {
        const { container: passengerInformation } = createComponent(
          {
            setReLoginCallbackFunctionsFn: reLoginCallbackFunctionsFnMock,
            params: { paxNumber: '0' },
            contactMethodContent: `${i18n('SHARED__CONTACT_METHOD_OPTION__DOMESTIC_OPTIONS_EMAIL')}, a@gmail.com`,
            passengerInfos: []
          },
          {},
          false
        );

        expect(passengerInformation).toMatchSnapshot();
      });
    });
  });

  describe('isInternationalBooking', () => {
    it('should pass the passenger index and name when we click the `add international travel info`', () => {
      jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValueOnce('air/booking');
      const instance = React.createRef();

      createComponent({ ref: instance, isInternationalBooking: true });
      instance.current._goToPassengerPassport('FUNFUN LIU', false);

      expect(pushMock).toHaveBeenCalledWith('/air/booking/passenger/1/passport', null, {
        passengerName: 'FUNFUN LIU',
        isLapChild: false
      });
    });

    it('should show dialog to let user fill the name when click the `add international travel info`', (done) => {
      const { container: passengerInformation } = createComponent({ isInternationalBooking: true });

      fireEvent.click(passengerInformation.querySelector('.international-travel-info-item'));

      waitFor.untilAssertPass(() => {
        expect(showDialogFnMock).toHaveBeenCalled();
      }, done);
    });
  });

  describe('contact method', () => {
    it('should push contact method route', () => {
      const instance = React.createRef();

      createComponent(
        {
          ref: instance,
          params: { paxNumber: '0' },
          contactMethodContent: `${i18n('SHARED__CONTACT_METHOD_OPTION__DOMESTIC_OPTIONS_EMAIL')}, a@gmail.com`,
          passengerInfos: []
        },
        {},
        true
      );
      instance.current._goToContactMethod();

      expect(pushMock).toHaveBeenCalledWith('/air/booking/contact-method');
    });
  });

  describe('progress bar', () => {
    it('should show the index of passenger', () => {
      const { container: passengerInformation } = createComponent();

      expect(passengerInformation.querySelector('.title').textContent).toEqual('Passenger 2 of 2');
    });
  });

  describe('special assistance', () => {
    it('should transition to special assistance page when click special assistance block', () => {
      jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValueOnce('air/booking');
      const { container: passengerInformation } = createComponent();

      fireEvent.click(passengerInformation.querySelector('.special-assistance-item'));

      expect(pushMock).toHaveBeenCalledWith('/air/booking/passenger/1/special-assistance');
    });
  });

  describe('when corporate', () => {
    it('should not show company header section if there is no associated company', () => {
      const { container: passengerInformation } = createComponent({});

      expect(passengerInformation.querySelector('.company-name-banner')).not.toBeInTheDocument();
    });

    it('should show company header section if there is an associated company', () => {
      const { container: passengerInformation } = createComponent({
        selectedCompanyName: 'Dunder Mifflin Paper Company'
      });

      expect(passengerInformation.querySelector('.company-name-banner')).toBeInTheDocument();
    });
  });

  describe('webview', () => {
    it('should pass passengerInfos, updatedPassengerInfo, and paxNumber when the form is submitted', () => {
      const instance = React.createRef();
      const updatedPassengerInfo = {
        ...passengerInfo,
        ...{
          dateOfBirth: '12/22/1959',
          departureDate: '2015-02-01'
        }
      };

      transformPassengerInfosMock.mockReturnValue([updatedPassengerInfo]);

      createComponent({
        ref: instance,
        setReLoginCallbackFunctionsFn: reLoginCallbackFunctionsFnMock,
        params: { paxNumber: '0' },
        contactMethodContent: `${i18n('SHARED__CONTACT_METHOD_OPTION__DOMESTIC_OPTIONS_EMAIL')}, a@gmail.com`,
        passengerInfos: [
          {
            type: 'adult',
            departureDate: '2015-02-01'
          },
          {
            type: 'adult',
            departureDate: '2015-02-01'
          }
        ],
        isWebView: true,
        accountInfo: passengerInfo
      });

      instance.current._onSubmit(passengerInfo);

      expect(submitPassengerFormMock).toHaveBeenCalledWith(
        [
          {
            type: 'adult',
            departureDate: '2015-02-01'
          },
          {
            type: 'adult',
            departureDate: '2015-02-01'
          }
        ],
        passengerInfo,
        0
      );
    });

    it('should pass passengerInfos, updatedPassengerInfo, paxNumber, frequentTravelerId, frequentTravelerToken when the form is submitted', () => {
      const instance = React.createRef();
      const expectedPassengerInfo = {
        ...passengerInfo,
        frequentTravelerId: 'test id',
        frequentTravelerToken: 'test token',
        saveAsFrequentTraveler: false
      };
      const updatedPassengerInfo = {
        ...passengerInfo,
        dateOfBirth: '12/22/1959',
        departureDate: '2015-02-01'
      };

      transformPassengerInfosMock.mockReturnValue([updatedPassengerInfo]);
      createComponent({
        ref: instance,
        params: { paxNumber: '0' },
        setReLoginCallbackFunctionsFn: reLoginCallbackFunctionsFnMock,
        contactMethodContent: `${i18n('SHARED__CONTACT_METHOD_OPTION__DOMESTIC_OPTIONS_EMAIL')}, a@gmail.com`,
        passengerInfos: [
          {
            type: 'adult',
            departureDate: '2015-02-01'
          },
          {
            type: 'adult',
            departureDate: '2015-02-01'
          }
        ],
        frequentTravelerList: [],
        isWebView: true,
        selectedFrequentTravelers: [
          {
            addFrequentTravelerToggle: true,
            paxNumber: 0,
            ...expectedPassengerInfo
          }
        ]
      });

      instance.current._onSubmit(expectedPassengerInfo);

      expect(submitPassengerFormMock).toHaveBeenCalledWith(
        [
          {
            type: 'adult',
            departureDate: '2015-02-01'
          },
          {
            type: 'adult',
            departureDate: '2015-02-01'
          }
        ],
        expectedPassengerInfo,
        0
      );
    });

    it('should not pass saveAsFrequentTraveler flag when the form is submitted without frequent traveler id', () => {
      const instance = React.createRef();
      const expectedPassengerInfo = {
        ...passengerInfo,
        frequentTravelerId: '',
        frequentTravelerToken: ''
      };
      const updatedPassengerInfo = { ...expectedPassengerInfo, 
        dateOfBirth: '12/22/1959',
        departureDate: '2015-02-01'
      };

      transformPassengerInfosMock.mockReturnValue([updatedPassengerInfo]);

      createComponent({
        ref: instance,
        params: { paxNumber: '0' },
        setReLoginCallbackFunctionsFn: reLoginCallbackFunctionsFnMock,
        contactMethodContent: `${i18n('SHARED__CONTACT_METHOD_OPTION__DOMESTIC_OPTIONS_EMAIL')}, a@gmail.com`,
        passengerInfos: [
          {
            type: 'adult',
            departureDate: '2015-02-01'
          },
          {
            type: 'adult',
            departureDate: '2015-02-01'
          }
        ],
        frequentTravelerList: [],
        isWebView: true,
        selectedFrequentTravelers: [
          {
            addFrequentTravelerToggle: true,
            paxNumber: 0,
            ...expectedPassengerInfo
          }
        ]
      });

      instance.current._onSubmit(passengerInfo);

      expect(submitPassengerFormMock).toHaveBeenCalledWith(
        [
          {
            type: 'adult',
            departureDate: '2015-02-01'
          },
          {
            type: 'adult',
            departureDate: '2015-02-01'
          }
        ],
        expectedPassengerInfo,
        0
      );
    });

    it('should generate MM-DD-YYYY format', () => {
      getSelectedFrequentTravelerDetailsMock.mockReturnValue(passengerInfo);
      transformPassengerInfosMock.mockReturnValue([
        {
          type: 'adult',
          departureDate: '2015-02-01',
          passengerInfo: { ...passengerInfo, dateOfBirth: '02-01-2015' }
        }
      ]);
      const { container: passengerInformation } = createComponent(
        {
          selectedFrequentTravelers,
          isWebView: true,
          frequentTravelerList: frequentTravelerList.frequentTravelerResponse,
          params: {
            paxNumber: '0'
          },
          passengerInfos: [
            {
              type: 'adult',
              departureDate: '2015-02-01',
              passengerInfo
            }
          ]
        },
        {},
        true
      );

      expect(getSelectedFrequentTravelerDetailsMock).toHaveBeenCalled();
      expect(passengerInformation).toMatchSnapshot();
    });
  });

  describe('FrequentTraveler', () => {
    it('should contain FrequentTravelerButton when logged in and have at least one frequent traveler', () => {
      const { container: passengerInformation } = createComponent(
        {
          showFrequentTravelerButton: false
        },
        {},
        true
      );

      expect(passengerInformation).toMatchSnapshot();
    });

    it('should call transitionToFrequentTravelerPage when clicked on frequent traveler button', () => {
      const { container: passengerInformation } = createComponent(
        {
          showFrequentTravelerButton: true
        },
        {},
        false
      );

      fireEvent.click(passengerInformation.querySelectorAll('.frequent-traveler--button')[0]);

      expect(transitionToFrequentTravelerPageMock).toHaveBeenCalledWith(
        1,
        'AIRBOOKING_PASSENGER_PERSONAL_INFO_FORM_ADULT_1'
      );
    });

    it('should clear the passenger form when user clicks on the add frequent traveler button', () => {
      const { container: passengerInformation } = createComponent(
        {
          selectedFrequentTravelers,
          frequentTravelerList: [],
          params: {
            paxNumber: '0'
          }
        },
        {},
        true
      );

      expect(passengerInformation).toMatchSnapshot();
    });

    it('should not clear the passenger form when there is no frequent traveler selected', () => {
      const { container: passengerInformation } = createComponent(
        {
          params: {
            paxNumber: '0'
          }
        },
        {},
        true
      );

      expect(passengerInformation).toMatchSnapshot();
    });

    it('should not show the frequent traveler selected information for second passenger', () => {
      const { container: passengerInformation } = createComponent(
        {
          params: {
            paxNumber: '1'
          }
        },
        {},
        true
      );

      expect(passengerInformation).toMatchSnapshot();
    });

    it('should show the frequent traveler selected information for second passenger when frequent traveler is selected', () => {
      const { container: passengerInformation } = createComponent(
        {
          selectedFrequentTravelers,
          params: {
            paxNumber: '1'
          }
        },
        {},
        true
      );

      expect(passengerInformation).toMatchSnapshot();
    });

    it('should display save frequent traveler checkbox', () => {
      const { container: passengerInformation } = createComponent(
        {
          selectedFrequentTravelers: [],
          frequentTravelerList: [],
          params: {
            paxNumber: '0'
          },
          accountInfo: { allowAddFrequentTraveler: true }
        },
        {},
        true
      );

      expect(passengerInformation).toMatchSnapshot();
    });

    it('should call updatePassengerForm when account info is updated', () => {
      const instance = React.createRef();

      createComponent(
        {
          ref: instance,
          selectedFrequentTravelers: [],
          frequentTravelerList: [],
          params: {
            paxNumber: '0'
          },
          isWebView: false,
          accountInfo
        },
        {},
        true
      );

      instance.current.setUpPassengerPage();

      expect(updatePassengerFormMock).toHaveBeenCalledWith({
        accountInfo,
        paxNumber: 0,
        selectedFrequentTraveler: undefined,
        updateFrequentTravelerSelectionFn: updateFrequentTravelerSelectionFnMock
      });
    });

    it('should call updatePassengerForm when account info is updated in webview', () => {
      const instance = React.createRef();

      createComponent(
        {
          ref: instance,
          selectedFrequentTravelers: [],
          frequentTravelerList: [],
          params: {
            paxNumber: '0'
          },
          isWebView: true,
          accountInfo
        },
        {},
        true
      );

      instance.current.setUpPassengerPage();

      expect(updatePassengerFormMock).toHaveBeenCalledWith({
        accountInfo: {
          ...accountInfo,
          dateOfBirth: '04/15/1996'
        },
        paxNumber: 0,
        selectedFrequentTraveler: undefined,
        updateFrequentTravelerSelectionFn: updateFrequentTravelerSelectionFnMock
      });
    });

    it('should not call updatePassengerForm when the paxNumber is 1', () => {
      const instance = React.createRef();

      createComponent(
        {
          ref: instance,
          selectedFrequentTravelers: [],
          frequentTravelerList: [],
          params: {
            paxNumber: '1'
          },
          accountInfo
        },
        {},
        true
      );

      instance.current.setUpPassengerPage();

      expect(updatePassengerFormMock).not.toHaveBeenCalled();
    });
  });

  const createComponent = (props, store) => {
    const defaultProps = {
      flightPricingResponse: {
        flightPricingPage: defaultFlightProducts,
        prefill: {
          chaseCardHolder: {
            accountNumber: '',
            firstName: 'firstName',
            lastName: 'lastName',
            middleName: 'middleName'
          }
        }
      },
      passengerInfos: props?.passengerInfos
        ? props.passengerInfos
        : [
          {
            passengerReference: 0,
            type: 'adult',
            departureDate: '2015-02-01'
          },
          {
            passengerReference: 1,
            type: 'adult',
            departureDate: '2015-02-01'
          }
        ],
      accountInfo: props?.accountInfo ? props.accountInfo : null,
      savedCreditCards: {
        primaryCard: null,
        otherCards: []
      },
      submitPassengerFormFn: submitPassengerFormMock,
      push: pushMock,
      showFrequentTravelerButton: false,
      fetchSavedCCsAndPassengerInfoWithExpressCheckOutFn: fetchSavedCreditCardsAndPassengerInfoFnMock,
      generatePassengerPageInfoFn: generatePassengerPageInfoMock,
      setExpressCheckoutFromPassengerPageFn: setExpressCheckoutFromPassengerPageFnMock,
      transitionToFrequentTravelerPageFn: transitionToFrequentTravelerPageMock,
      isInternationalBooking: false,
      params: {
        paxNumber: '1'
      },
      location: {
        pathname: '',
        search: ''
      },
      isLoggedIn: false,
      isWebView: false,
      searchRequest: {
        tripType: 'oneWay',
        isRoundTrip: false,
        currencyType: 'USD',
        numberOfAdults: 1
      },
      selectedFrequentTravelers: props?.selectedFrequentTravelers ? props.selectedFrequentTravelers : [],
      specialAssistanceAnalyticsFn: specialAssistanceAnalyticsFnMock,
      showDialogFn: showDialogFnMock,
      showNativeAppLoginFn: showNativeAppLoginFnMock,
      updateFrequentTravelerSelectionFn: updateFrequentTravelerSelectionFnMock
    };

    const Component = <PassengerInformation {...defaultProps} {...props} />;

    return render(<Provider store={createMockedFormStore(store)}>{Component}</Provider>);
  };
});
