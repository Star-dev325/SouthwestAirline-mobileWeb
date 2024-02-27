import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';

import PassengerPersonalInfoForm from 'src/airBooking/components/passengerPersonalInfoForm';
import { AIRBOOKING_PASSENGER_PERSONAL_INFO_FORM } from 'src/shared/constants/formIds';
import SharedConstants from 'src/shared/constants/sharedConstants';
import GenderTypes from 'src/shared/form/constants/genderTypes';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import _ from 'lodash';
import * as AppSelector from 'src/shared/selectors/appSelector';

const { ON_FILE } = SharedConstants;

describe('PassengerPersonalInfoForm', () => {
  let clickFrequentTravelerMethodFnStub,
    clickInternationalTravelInfoFnStub,
    clickSpecialAssistanceFnStub,
    onSubmitStub,
    pushStub,
    reLoginCallbackFunctionsFnStub,
    resetAirBookingPurchaseDataFnStub;

  const defaultInitialFormData = {
    firstName: 'Cannon',
    middleName: '',
    lastName: 'Claw',
    suffix: '',
    dateOfBirth: '1986-11-13',
    gender: 'F',
    emailReceiptTo: 'abc@example.com',
    knownTravelerNumber: '981234567',
    rapidRewardsNumber: '',
    redressNumber: '1231234',
    frequentTravelerId: '1-30MU1D9',
    frequentTravelerToken: 'y6aOQD5N_'
  };

  beforeEach(() => {
    const noop = () => {};

    onSubmitStub = jest.fn(noop);
    pushStub = jest.fn(noop);
    clickInternationalTravelInfoFnStub = jest.fn(noop);
    clickSpecialAssistanceFnStub = jest.fn(noop);
    clickFrequentTravelerMethodFnStub = jest.fn(noop);
    reLoginCallbackFunctionsFnStub = jest.fn(noop);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('render', () => {
    it('should render passengerPersonalInfoForm', () => {
      const { container } = createComponent();

      expect(container.querySelector('.passenger-personal-info-form')).toBeInTheDocument();
    });

    describe('Edit mode', () => {
      it('should not render contractMethods in EditMode', () => {
        const { container } = createComponent({ isEditMode: true });

        expect(container.querySelector('.form-fields--receipt-email')).toBeInTheDocument();
      });

      it('should render PageHeaderWithButtons in EditMode', () => {
        const { container } = createComponent({ isEditMode: true });

        expect(container.querySelector('.action-bar')).toBeInTheDocument();
        expect(container.querySelector('.action-bar--container')).toBeInTheDocument();
      });

      it('should not render continue button in EditMode', () => {
        const { container } = createComponent({ isEditMode: true });

        expect(container.querySelector('.continue')).not.toBeInTheDocument();
      });

      it('should not render save frequent traveler checkbox if CHAPI indicates its not allowed', () => {
        const { baseElement } = createComponent(
          { allowAddFrequentTraveler: true, reLoginCallbackFunctionsFn: reLoginCallbackFunctionsFnStub },
          { ...defaultInitialFormData, frequentTravelerId: 'active' },
          {},
          true
        );

        expect(baseElement).toMatchSnapshot();
      });

      it('should display edit instruction and does not render save frequent traveler checkbox if a frequent traveler has been selected', () => {
        defaultInitialFormData.frequentTravelerId = 'active';
        const { baseElement } = createComponent(
          {
            formData: defaultInitialFormData,
            reLoginCallbackFunctionsFn: reLoginCallbackFunctionsFnStub
          },
          defaultInitialFormData,
          {},
          true
        );

        expect(baseElement).toMatchSnapshot();
      });

      it('should render save frequent traveler checkbox if CHAPI indicates its allowed and a frequent traveler has not been selected', () => {
        const { baseElement } = createComponent({ allowAddFrequentTraveler: true }, {});

        expect(baseElement).toMatchSnapshot();
      });

      it('should display LapChildDisclosure when isEditMode and lap child is in booking', () => {
        const { container } = createComponent({ isEditMode: true, isLapChildInBooking: true, type: 'adult' });
        const lapChildDisclosure = container.querySelector('.lap-child-personal-info--text-above');

        expect(lapChildDisclosure).toMatchSnapshot();
      });

      it('should not display LapChildDisclosure when isEditMode and lap child is not in booking', () => {
        const { container } = createComponent({ isEditMode: true, isLapChildInBooking: false });
        const lapChildDisclosure = container.querySelector('.lap-child-personal-info');

        expect(lapChildDisclosure).toMatchSnapshot();
      });
    });
  });

  describe('when form submit', () => {
    it('should call onSubmit when data is valid', () => {
      const { container } = createComponent();
      const submitButton = container.querySelector('.continue');

      fireEvent.click(submitButton);
      expect(onSubmitStub).toHaveBeenCalledWith({
        dateOfBirth: '1986-11-13',
        emailReceiptTo: 'abc@example.com',
        firstName: 'Cannon',
        gender: 'F',
        knownTravelerNumber: '981234567',
        lastName: 'Claw',
        middleName: '',
        suffix: '',
        rapidRewardsNumber: '',
        redressNumber: '1231234'
      });

      expect(reLoginCallbackFunctionsFnStub).toHaveBeenCalled();
    });

    it('should call reLoginCallbackFunctionsFnStub if submit button is clicked', () => {
      jest.spyOn(AppSelector, 'getCurrentAppFlow')
        .mockReturnValueOnce('air/booking');
      resetAirBookingPurchaseDataFnStub = jest.fn();
      const continueAsGuestFnStub = jest.fn();
      const reLoginCallbackFunctionsFnStub = jest.fn(({ continueAsGuestFn }) => {
        continueAsGuestFn();
      });

      resetAirBookingPurchaseDataFnStub.mockReturnValue({ continueAsGuestFn: continueAsGuestFnStub });
      const { container } = createComponent({
        push: pushStub,
        reLoginCallbackFunctionsFn: reLoginCallbackFunctionsFnStub,
        resetAirBookingPurchaseDataFn: resetAirBookingPurchaseDataFnStub
      });
      const submitButton = container.querySelector('.continue');

      fireEvent.click(submitButton);
      expect(reLoginCallbackFunctionsFnStub).toHaveBeenCalled();
      expect(pushStub).toHaveBeenCalledWith('/air/booking/price.html');
      expect(resetAirBookingPurchaseDataFnStub).toHaveBeenCalled();
    });

    it('should not call onSubmit when format of firstName is not valid', () => {
      const { container } = createComponent({}, { ...defaultInitialFormData, firstName: '#$%^&&**' });
      const submitButton = container.querySelector('.continue');

      fireEvent.click(submitButton);
      expect(onSubmitStub).not.toHaveBeenCalled();
    });

    it('should not call onSubmit when lastName is less than 2 letters', () => {
      const { container } = createComponent({}, { ...defaultInitialFormData, lastName: 'p' });
      const submitButton = container.querySelector('.continue');

      fireEvent.click(submitButton);

      expect(onSubmitStub).not.toHaveBeenCalled();
    });

    describe('when dateOfBirth', () => {
      it('should call onSubmit when the date of birth is ISO date format', () => {
        const { container } = createComponent({}, { ...defaultInitialFormData, dateOfBirth: '1993-04-05' });
        const submitButton = container.querySelector('.continue');

        fireEvent.click(submitButton);

        expect(onSubmitStub).toHaveBeenCalled();
      });

      it('should not call onSubmit when the date of birth is not ISO date format', () => {
        const { container } = createComponent({}, { ...defaultInitialFormData, dateOfBirth: '04/05/1993' });
        const submitButton = container.querySelector('.continue');

        fireEvent.click(submitButton);

        expect(onSubmitStub).not.toHaveBeenCalled();
      });

      describe('when webview', () => {
        describe('should call onSubmit', () => {
          describe('when the date of birth', () => {
            it('is a valid date', () => {
              const { container } = createComponent(
                { isWebView: true },
                { ...defaultInitialFormData, dateOfBirth: '04/05/1993' }
              );
              const submitButton = container.querySelector('.continue');

              fireEvent.click(submitButton);
              expect(onSubmitStub).toHaveBeenCalled();
            });
          });
        });

        describe('should not call onSubmit', () => {
          describe('when the date of birth', () => {
            it('is not a valid date', () => {
              const { container } = createComponent(
                { isWebView: true },
                { ...defaultInitialFormData, dateOfBirth: '20/05/5919' }
              );
              const submitButton = container.querySelector('.continue');

              fireEvent.click(submitButton);

              expect(onSubmitStub).not.toHaveBeenCalled();
            });

            it('is over 100 years', () => {
              const { container } = createComponent(
                { isWebView: true },
                { ...defaultInitialFormData, dateOfBirth: '04/05/1919' }
              );

              const submitButton = container.querySelector('.continue');

              fireEvent.click(submitButton);

              expect(onSubmitStub).not.toHaveBeenCalled();
            });

            it('is in the future', () => {
              const { container } = createComponent(
                { isWebView: true },
                { ...defaultInitialFormData, dateOfBirth: '04/05/2050' }
              );
              const submitButton = container.querySelector('.continue');

              fireEvent.click(submitButton);

              expect(onSubmitStub).not.toHaveBeenCalled();
            });

            it('does not include leading zeros', () => {
              const { container } = createComponent(
                { isWebView: true },
                { ...defaultInitialFormData, dateOfBirth: '45/1993/' }
              );

              const submitButton = container.querySelector('.continue');

              fireEvent.click(submitButton);

              expect(onSubmitStub).not.toHaveBeenCalled();
            });

            it('does not contain 10 characters', () => {
              const { container } = createComponent(
                { isWebView: true },
                { ...defaultInitialFormData, dateOfBirth: '11/11' }
              );
              const submitButton = container.querySelector('.continue');

              fireEvent.click(submitButton);

              expect(onSubmitStub).not.toHaveBeenCalled();
            });

            it('is blank', () => {
              const { container } = createComponent(
                { isWebView: true },
                { ...defaultInitialFormData, dateOfBirth: '' }
              );
              const submitButton = container.querySelector('.continue');

              fireEvent.click(submitButton);

              expect(onSubmitStub).not.toHaveBeenCalled();
            });
          });
        });
      });
    });

    it('should call onSubmit when redress number is less than or equal to 13 digits if filled', () => {
      const { container } = createComponent({}, { ...defaultInitialFormData, redressNumber: '1234567890123' });
      const submitButton = container.querySelector('.continue');

      fireEvent.click(submitButton);

      expect(onSubmitStub).toHaveBeenCalled();
    });

    it('should not call onSubmit when redress number is more than 13 digits', () => {
      const { container } = createComponent({}, { ...defaultInitialFormData, redressNumber: '12345678901234' });
      const submitButton = container.querySelector('.continue');

      fireEvent.click(submitButton);

      expect(onSubmitStub).not.toHaveBeenCalled();
    });

    it('should not call onSubmit when known traveler number is between 8 and 25 if filled', () => {
      const { container } = createComponent({}, { ...defaultInitialFormData, knownTravelerNumber: '123' });
      const submitButton = container.querySelector('.continue');

      fireEvent.click(submitButton);

      expect(onSubmitStub).not.toHaveBeenCalled();
    });

    it('should not call onSubmit when format of name suffix is not valid', () => {
      const { container } = createComponent({}, { ...defaultInitialFormData, suffix: 'NotASuffix' });
      const submitButton = container.querySelector('.continue');

      fireEvent.click(submitButton);
      expect(onSubmitStub).not.toHaveBeenCalled();
    });

    it('should call onSubmit when format of name suffix is valid', () => {
      const { container } = createComponent({}, { ...defaultInitialFormData, suffix: 'CEO' });
      const submitButton = container.querySelector('.continue');

      fireEvent.click(submitButton);
      expect(onSubmitStub).toHaveBeenCalled();
    });

    it('should not call onSubmit when gender is not valid', () => {
      const { container } = createComponent({}, { ...defaultInitialFormData, gender: GenderTypes.UNAVAILABLE });
      const submitButton = container.querySelector('.continue');

      fireEvent.click(submitButton);
      expect(onSubmitStub).not.toHaveBeenCalled();
    });

    it('should call onSubmit when gender is valid', () => {
      const { container } = createComponent({}, { ...defaultInitialFormData, gender: GenderTypes.FEMALE });
      const submitButton = container.querySelector('.continue');

      fireEvent.click(submitButton);
      expect(onSubmitStub).toHaveBeenCalled();
    });
  });

  describe('isInternationalBooking', () => {
    it('should display international travel information', () => {
      const { container } = createComponent({ isInternationalBooking: true, isLapChild: false });

      expect(container.querySelector('.form-fields--international-travel-info')).toBeInTheDocument();
      expect(container.querySelector('.passenger-personal-info-form--international-travel-text')).toHaveTextContent(
        'AIR_BOOKING__PASSENGERS_INTERNATIONAL_TRAVEL__INFORMATION_TEXT'
      );
    });

    it('should show international nav item with filledPassportForCurrentPassenger as false', () => {
      const { container } = createComponent({
        isInternationalBooking: true
      });
      const navItem = container.querySelector('.form-fields--international-travel-info');

      expect(navItem).toMatchSnapshot();
    });

    it('should show international nav item with filledPassportForCurrentPassenger as true', () => {
      const { container } = createComponent({
        isInternationalBooking: true,
        isPassportInfoFilled: true
      });
      const navItem = container.querySelector('.form-fields--international-travel-info');

      expect(navItem).toMatchSnapshot();
    });

    it('should trigger clickInternationalTravelInfo when clicked', () => {
      const { container } = createComponent({
        isInternationalBooking: true
      });
      const navItem = container.querySelector('.form-fields--international-travel-info');

      fireEvent.click(navItem.querySelector('.international-travel-info-item'));
      expect(clickInternationalTravelInfoFnStub).toHaveBeenCalled();
    });
  });

  describe('ShareItineraryEmail', () => {
    it('should not show ShareItineraryEmail if it is not the first passenger', () => {
      const { container } = createComponent({ disableContactInfo: true });

      expect(container.querySelector('[data-qa="share-itinerary-email"]')).not.toBeInTheDocument();
    });

    it('should show ShareItineraryEmail if it is the first passenger', () => {
      const { container } = createComponent({ disableContactInfo: false, isLapChild: false });

      expect(container.querySelector('[data-qa="share-itinerary-email"]')).toBeInTheDocument();
    });

    describe('webview', () => {
      it('should not render', () => {
        const store = {
          app: {
            webView: {
              isWebView: true
            }
          }
        };
        const { container } = createComponent(null, { ...defaultInitialFormData }, store);

        expect(container.querySelector('[data-qa="share-itinerary-email"]')).not.toBeInTheDocument();
      });
    });
  });

  describe('Associated Adults', () => {
    it('should show associatedAdultsInfo if it is a lap child form', () => {
      const { container } = createComponent({ isLapChild: true });

      expect(container.querySelector('[name="associatedAdult"]')).toBeInTheDocument();
    });

    it('should not show associatedAdultsInfo if it is not a lap child form', () => {
      const { container } = createComponent({ isLapChild: false });

      expect(container.querySelector('[name="associatedAdult"]')).not.toBeInTheDocument();
    });
  });

  describe('SpecialAssistance', () => {
    it('should render SpecialAssistanceNavItem', () => {
      const { container } = createComponent();

      expect(container.querySelector('.special-assistance-item')).toBeInTheDocument();
    });

    it('should navigate to SpecialAssistance page when NavItem is clicked', () => {
      const { container } = createComponent();

      fireEvent.click(container.querySelector('.special-assistance-item'));
      expect(clickSpecialAssistanceFnStub).toHaveBeenCalled();
    });
  });

  describe('Frequent Traveler', () => {
    it('should render FrequentTravelerButton when showFrequentTravelerButton prop is set to true', () => {
      const { baseElement } = createComponent(
        { showFrequentTravelerButton: true, reLoginCallbackFunctionsFn: reLoginCallbackFunctionsFnStub },
        defaultInitialFormData,
        {},
        true
      );

      expect(baseElement).toMatchSnapshot();
    });

    it('should navigate to frequent traveler page when NavItem is clicked', () => {
      const { container } = createComponent({ showFrequentTravelerButton: true }, defaultInitialFormData, {});

      fireEvent.click(container.querySelector('.frequent-traveler--button'));
      expect(clickFrequentTravelerMethodFnStub).toHaveBeenCalled();
    });

    it('should show save frequent traveler checkbox only when add frequent traveler button is clicked', () => {
      const { container } = createComponent(
        { showFrequentTravelerButton: true, allowAddFrequentTraveler: true },
        defaultInitialFormData,
        {},
        false
      );

      expect(container.querySelector('.save-frequent-traveler--checkbox-field')).toMatchSnapshot();
    });

    it('should show save frequent traveler disclaimer only when save frequent traveler checkbox is checked', () => {
      const { container } = createComponent(
        { showFrequentTravelerButton: true, allowAddFrequentTraveler: true },
        defaultInitialFormData,
        {},
        false
      );

      expect(container.querySelector('.save-frequent-traveler--disclaimer')).not.toBeInTheDocument();

      fireEvent.click(container.querySelector("div[name='saveAsFrequentTraveler']"));

      expect(container.querySelector('.save-frequent-traveler--disclaimer')).toMatchSnapshot();
    });
  });

  describe('when focus and blur inside onFile fields', () => {
    it('should call onChange with empty string when redressNumber and knownTravelerNumber field is focussed and clear the value if initial value is On File', () => {
      defaultInitialFormData.redressNumber = ON_FILE;
      defaultInitialFormData.knownTravelerNumber = ON_FILE;

      const onChange = jest.fn();
      const { container } = createComponent({ onChange });

      const redressField = container.querySelector('[name="redressNumber"]');
      const knownTravelerNumberField = container.querySelector('[name="knownTravelerNumber"]');

      redressField.focus();
      expect(onChange).toHaveBeenCalledWith('redressNumber', '');
      // expect(redressField.value).toEqual(undefined);

      knownTravelerNumberField.focus();
      expect(onChange).toHaveBeenCalledWith('knownTravelerNumber', '');
    });

    it('should call onChange with string On File when redressNumber and knownTravelerNumber field is blurred and fill the value if initial value is On File', () => {
      defaultInitialFormData.redressNumber = ON_FILE;
      defaultInitialFormData.knownTravelerNumber = ON_FILE;

      const onChange = jest.fn();
      const { container } = createComponent({
        formData: {
          ...defaultInitialFormData,
          redressNumber: ''
        },
        onChange
      });

      const redressField = container.querySelector('[name="redressNumber"]');
      const knownTravelerNumberField = container.querySelector('[name="knownTravelerNumber"]');

      fireEvent.change(redressField, { target: { value: '' } });
      redressField.focus();

      expect(onChange).toHaveBeenCalledWith('redressNumber', ON_FILE);

      fireEvent.change(knownTravelerNumberField, { target: { value: '' } });
      knownTravelerNumberField.focus();

      expect(onChange).toHaveBeenCalledWith('knownTravelerNumber', ON_FILE);
    });

    it('should not call onChange initialFormData is empty', () => {
      const onChange = jest.fn(() => {});
      const { container } = createComponent(
        {
          formData: {
            ...defaultInitialFormData,
            redressNumber: ''
          },
          onChange
        },
        {}
      );

      const redressField = container.querySelector('[name="redressNumber"]');

      fireEvent.change(redressField, { target: { value: '' } });
      redressField.focus();

      expect(onChange).not.toHaveBeenCalledWith();
    });
  });

  const createComponent = (props = {}, initialFormData = defaultInitialFormData, store = {}) => {
    const defaultProps = {
      onSubmit: onSubmitStub,
      initialFormData,
      disableContactInfo: false,
      departureDate: '2018-01-01',
      passengerType: 'adult',
      formId: AIRBOOKING_PASSENGER_PERSONAL_INFO_FORM,
      clickInternationalTravelInfo: clickInternationalTravelInfoFnStub,
      clickSpecialAssistanceFn: clickSpecialAssistanceFnStub,
      clickFrequentTravelerMethodFn: clickFrequentTravelerMethodFnStub,
      reLoginCallbackFunctionsFn: reLoginCallbackFunctionsFnStub,
      passengerInfos: [
        {
          departureDate: '2022-01-01',
          passengerReference: 2,
          type: 'adult',
          passengerInfo: {
            firstName: 'First',
            lastName: 'Adult'
          }
        }
      ]
    };

    const updatedProps = _.merge({}, defaultProps, props);
    const Component = () => (
      <Provider store={createMockedFormStore(store)}>
        <PassengerPersonalInfoForm {...updatedProps} />
      </Provider>
    );

    return render(<Component />);
  };
});
