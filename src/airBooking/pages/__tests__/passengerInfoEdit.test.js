import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { PassengerInfoEdit } from 'src/airBooking/pages/passengerInfoEdit';
import * as AppSelector from 'src/shared/selectors/appSelector';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';

describe('passengerInfoEdit', () => {
  const passengerInfo = {
    dateOfBirth: '1990-02-01',
    emailReceiptTo: 'aterris@example.com',
    firstName: 'test',
    middleName: '',
    gender: 'M',
    lastName: 'wang',
    suffix: ''
  };
  let checkRapidRewardAndUpdatePassengerFnMock;
  let pushMock;
  let setReLoginCallbackFunctionsFnMock;
  let showDialogFnMock;
  let specialAssistanceAnalyticsFnMock;
  let submitPassengerFormFnMock;
  let transitionToFrequentTravelerPageFnMock;
  let updateFormDataValueFnMock;
  let updateFrequentTravelerSelectionFnMock;

  beforeEach(() => {
    checkRapidRewardAndUpdatePassengerFnMock = jest.fn();
    pushMock = jest.fn();
    setReLoginCallbackFunctionsFnMock = jest.fn();
    showDialogFnMock = jest.fn();
    specialAssistanceAnalyticsFnMock = jest.fn();
    submitPassengerFormFnMock = jest.fn();
    transitionToFrequentTravelerPageFnMock = jest.fn();
    updateFormDataValueFnMock = jest.fn();
    updateFrequentTravelerSelectionFnMock = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should contain passengerInfoEditForm', () => {
    const { container: passengerInfoEditForm } = createComponent();

    expect(passengerInfoEditForm).toMatchSnapshot();
  });

  it('should show the modal when the passenger name is missing and user clicks international travel', () => {
    const instance = React.createRef();

    createComponentWithMissingName({ ref: instance });
    instance.current._goToPassengerPassport();

    expect(showDialogFnMock).toHaveBeenCalled();
  });

  it('should not show the modal when the passenger name is entered and user clicks international travel', () => {
    jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValueOnce('air/booking');
    const instance = React.createRef();

    createComponent({ ref: instance });
    instance.current._goToPassengerPassport(passengerInfo.firstName, false);

    expect(showDialogFnMock).not.toHaveBeenCalled();
    expect(pushMock).toHaveBeenCalledWith('/air/booking/passenger/0/passport', null, {
      passengerName: passengerInfo.firstName,
      isLapChild: false
    });
  });

  it('should trigger checkRapidRewardAndUpdatePassengerFn and updateFormDataValueFn when user click the done button', () => {
    const instance = React.createRef();

    createComponent({ ref: instance });
    instance.current._onSubmit(passengerInfo);

    expect(checkRapidRewardAndUpdatePassengerFnMock).toHaveBeenCalled();
    expect(updateFormDataValueFnMock).toHaveBeenCalledWith(
      'AIRBOOKING_PASSENGER_PERSONAL_INFO_FORM_ADULT_0',
      passengerInfo
    );
  });

  it('should transition to special assistance page when click special assistance block', () => {
    jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValueOnce('air/booking');
    const instance = React.createRef();

    createComponent({ ref: instance });
    instance.current._goToSpecialAssistance();

    expect(pushMock).toHaveBeenCalledWith('/air/booking/passenger/0/special-assistance');
  });

  it('should contain FrequentTravelerButton when showFrequentTravelerButton', () => {
    const { container: passengerInfoEditForm } = createComponent(
      {
        showFrequentTravelerButton: true
      },
      {},
      true
    );

    expect(passengerInfoEditForm.querySelector('.frequent-traveler--button')).toBeInTheDocument();
  });

  it('should transition to frequent traveler page when click frequent traveler block', () => {
    const { container: passengerInfoEditForm } = createComponent(
      {
        showFrequentTravelerButton: true
      },
      {}
    );

    fireEvent.click(passengerInfoEditForm.querySelector('.frequent-traveler--button'));

    expect(transitionToFrequentTravelerPageFnMock).toHaveBeenCalledWith(0, 'AIRBOOKING_PASSENGER_INFO_EDIT');
  });

  describe('webview', () => {
    it('should transform the dob to YYYY-MM-DD', () => {
      const instance = React.createRef();

      createComponent({ ref: instance });
      instance.current._onSubmit(passengerInfo);

      expect(checkRapidRewardAndUpdatePassengerFnMock).toHaveBeenCalledWith(
        [
          {
            departureDate: '2015-02-01',
            passengerInfo,
            passengerReference: 0,
            passportAndEmergencyContact: { key: 'value' },
            type: 'adult'
          }
        ],
        passengerInfo,
        0
      );
    });
  });

  describe('FrequentTraveler', () => {
    it('should clear the passenger form when user clicks on the add frequent traveler button', () => {
      const { container: passengerInfoEditForm } = createComponent(
        {
          selectedFrequentTravelers: [
            {
              addFrequentTravelerToggle: true,
              frequentTravelerId: 'ACCOUNT',
              paxNumber: 0
            }
          ],
          params: {
            paxNumber: 0
          },
          accountInfo: {
            allowAddFrequentTraveler: true
          }
        },
        {},
        true
      );

      expect(passengerInfoEditForm).toMatchSnapshot();
    });

    it('should not clear the passenger form when there is no frequent traveler selected', () => {
      const { container: passengerInfoEditForm } = createComponent(
        {
          params: {
            paxNumber: 0
          }
        },
        {}
      );

      expect(passengerInfoEditForm).toMatchSnapshot();
    });

    it('should save and update frequent traveler with saveAsFrequentTraveler', () => {
      const frequentTravelerInfo = {
        frequentTravelerId: 'ACCOUNT',
        frequentTravelerToken: 'ACCOUNT'
      };
      const instance = React.createRef();

      createComponent({
        ref: instance,
        selectedFrequentTravelers: [
          {
            addFrequentTravelerToggle: false,
            ...frequentTravelerInfo,
            paxNumber: 0
          }
        ]
      });

      instance.current._onSubmit(passengerInfo);

      expect(submitPassengerFormFnMock).toHaveBeenCalledWith(
        [
          {
            passengerReference: 0,
            type: 'adult',
            departureDate: '2015-02-01',
            passengerInfo: { ...passengerInfo, ...frequentTravelerInfo, saveAsFrequentTraveler: false },
            passportAndEmergencyContact: { key: 'value' }
          }
        ],
        { ...passengerInfo, ...frequentTravelerInfo, saveAsFrequentTraveler: false },
        0,
        true
      );
      expect(updateFrequentTravelerSelectionFnMock).toHaveBeenCalled();
    });

    it('should save and update frequent traveler without saveAsFrequentTraveler', () => {
      const frequentTravelerInfo = {
        frequentTravelerId: '',
        frequentTravelerToken: ''
      };
      const instance = React.createRef();

      createComponent({
        ref: instance,
        selectedFrequentTravelers: [
          {
            addFrequentTravelerToggle: false,
            ...frequentTravelerInfo,
            paxNumber: 0
          }
        ]
      });

      instance.current._onSubmit(passengerInfo);

      expect(submitPassengerFormFnMock).toHaveBeenCalledWith(
        [
          {
            passengerReference: 0,
            type: 'adult',
            departureDate: '2015-02-01',
            passengerInfo: { ...passengerInfo, ...frequentTravelerInfo },
            passportAndEmergencyContact: { key: 'value' }
          }
        ],
        { ...passengerInfo, ...frequentTravelerInfo },
        0,
        true
      );
      expect(updateFrequentTravelerSelectionFnMock).toHaveBeenCalled();
    });

    it('should display save frequent traveler checkbox', () => {
      const { container: passengerPersonalInfoForm } = createComponent(
        {
          selectedFrequentTravelers: [],
          frequentTravelerList: [],
          params: {
            paxNumber: '0'
          },
          accountInfo: { allowAddFrequentTraveler: true }
        },
        {}
      );

      expect(passengerPersonalInfoForm).toMatchSnapshot();
    });

    it('should not call submitPassengerFormFnMock if there is no change on passenger edit page', () => {
      const instance = React.createRef();

      createComponent({
        ref: instance
      });

      instance.current._onSubmit(passengerInfo);

      expect(submitPassengerFormFnMock).not.toHaveBeenCalled();
    });

    it('should call submitPassengerFormFnMock when user click back from empty parent guardian form', () => {
      const instance = React.createRef();

      createComponent({
        ref: instance,
        youngTravelerPageInfo: 'youngTravelerPageInfo'
      });

      instance.current._onSubmit(passengerInfo);

      expect(submitPassengerFormFnMock).toHaveBeenCalled();
    });
  });

  const createComponent = (props, store) => {
    const defaultProps = {
      checkRapidRewardAndUpdatePassengerFn: checkRapidRewardAndUpdatePassengerFnMock,
      formData: { AIRBOOKING_PASSENGER_PERSONAL_INFO_FORM_ADULT_0: { firstname: 'abc' } },
      frequentTravelerList: [],
      isInternationalBooking: true,
      isLoggedIn: false,
      params: { paxNumber: '0' },
      passengerInfos: [
        {
          departureDate: '2015-02-01',
          passengerInfo,
          passportAndEmergencyContact: {
            key: 'value'
          },
          passengerReference: 0,
          type: 'adult'
        }
      ],
      push: pushMock,
      selectedFrequentTravelers: props?.selectedFrequentTravelers ?? [],
      setReLoginCallbackFunctionsFn: setReLoginCallbackFunctionsFnMock,
      showDialogFn: showDialogFnMock,
      showFrequentTravelerButton: false,
      specialAssistanceAnalyticsFn: specialAssistanceAnalyticsFnMock,
      submitPassengerFormFn: submitPassengerFormFnMock,
      transitionToFrequentTravelerPageFn: transitionToFrequentTravelerPageFnMock,
      updateFormDataValueFn: updateFormDataValueFnMock,
      updateFrequentTravelerSelectionFn: updateFrequentTravelerSelectionFnMock
    };

    const updatedProps = { ...defaultProps, ...props };
    const Component = <PassengerInfoEdit {...updatedProps} />;

    return render(<Provider store={createMockedFormStore(store)}>{Component}</Provider>);
  };

  const createComponentWithMissingName = (props) =>
    render(
      <Provider store={createMockedFormStore()}>
        <PassengerInfoEdit
          passengerInfos={[
            {
              passengerReference: 1,
              type: 'adult',
              departureDate: '2015-02-01',
              passengerInfo,
              passportAndEmergencyContact: {}
            }
          ]}
          selectedFrequentTravelers={[]}
          showFrequentTravelerButton={false}
          checkRapidRewardAndUpdatePassengerFn={checkRapidRewardAndUpdatePassengerFnMock}
          updateFrequentTravelerSelectionFn={updateFrequentTravelerSelectionFnMock}
          params={{ paxNumber: '0' }}
          isInternationalBooking
          isLoggedIn={false}
          push={pushMock}
          specialAssistanceAnalyticsFn={specialAssistanceAnalyticsFnMock}
          showDialogFn={showDialogFnMock}
          {...props}
        />
      </Provider>
    );
});
