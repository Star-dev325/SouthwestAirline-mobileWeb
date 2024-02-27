import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

import { AirBookingSpecialAssistancePage } from 'src/airBooking/pages/airBookingSpecialAssistancePage';
import { AIR_BOOKING_SPECIAL_ASSISTANCE_FORM } from 'src/shared/constants/formIds';

describe('AirBookingSpecialAssistancePage', () => {
  let clearFormDataByIdFnMock;
  let goBackMock;
  let specialAssistanceAnalyticsFnMock;
  let updatePassengerWithSpecialAssistanceFnMock;

  beforeEach(() => {
    goBackMock = jest.fn();
    updatePassengerWithSpecialAssistanceFnMock = jest.fn();
    clearFormDataByIdFnMock = jest.fn();
    specialAssistanceAnalyticsFnMock = jest.fn();
  });

  afterEach(() => jest.clearAllMocks());

  it('it should render the correct components', () => {
    expect(createComponent().baseElement).toMatchSnapshot();
  });

  describe('when submitting', () => {
    it('should save companion passenger info and back to purchase summary page when submit', () => {
      const instance = React.createRef();
      const expectedPaxNumber = '0';

      createComponent({
        ref: instance,
        specialAssistanceFormData: { BLIND: true }
      });

      instance.current._onFormSubmit();

      expect(updatePassengerWithSpecialAssistanceFnMock)
        .toHaveBeenCalledWith({ BLIND: true }, expectedPaxNumber);
      expect(clearFormDataByIdFnMock).toHaveBeenCalledWith(`${AIR_BOOKING_SPECIAL_ASSISTANCE_FORM}_0`);
      expect(specialAssistanceAnalyticsFnMock).toHaveBeenCalledWith(true);
    });
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      goBack: goBackMock,
      updatePassengerWithSpecialAssistanceFn: updatePassengerWithSpecialAssistanceFnMock,
      updateFormDataValueFn: () => {},
      clearFormDataByIdFn: clearFormDataByIdFnMock,
      params: { paxNumber: '0' },
      specialAssistanceFormData: {},
      passengerInfos: [
        {
          type: '',
          passengerReference: 2,
          departureDate: '',
          passengerInfo: {
            firstName: '',
            lastName: '',
            dateOfBirth: '',
            gender: ''
          },
          specialAssistance: {}
        }
      ],
      specialAssistanceAnalyticsFn: specialAssistanceAnalyticsFnMock
    };
    const store = configureMockStore()({
      app: {
        errorHeader: {
          hasError: false,
          errorMessage: null
        }
      },
      router: {
        location: {
          search: 'search'
        }
      }
    });
    const mergedProps = { ...defaultProps, ...props };

    return render(
      <Provider store={store}>
        <AirBookingSpecialAssistancePage {...mergedProps} />
      </Provider>
    );
  };
});
