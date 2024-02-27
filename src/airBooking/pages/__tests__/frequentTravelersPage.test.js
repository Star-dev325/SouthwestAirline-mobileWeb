import React from 'react';
import { Provider } from 'react-redux';
import _ from 'lodash';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import frequentTravelerList from 'mocks/templates/airReservation/frequentTravelersList';
import { FrequentTravelers } from 'src/airBooking/pages/frequentTravelersPage';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import PassengerTypes from 'src/shared/constants/passengerTypes';
import PassengerInfoBuilder from 'test/builders/model/passengerInfoBuilder';
import { getFrequentTravelerPassengerInfos } from 'test/builders/model/passengerInfosBuilder';

const accountInfo = new PassengerInfoBuilder().getAccountInfoWithFrequentTravelerList(frequentTravelerList);
const passengerInfos = getFrequentTravelerPassengerInfos();

describe('frequent Travelers', () => {
  let goBackStub;
  let updateFormDataValueStub;
  let clearFormDataByIdStub;
  let updateFrequentTravelerSelectionStub;
  let resetPassengerInfoStub;
  let updatePassengerByClearingSpecialAssistanceStub;
  let resetPassengerPassportFnStub;
  let selectedFrequentTravelerAnalyticsStub;

  beforeEach(() => {
    goBackStub = jest.fn();
    updateFormDataValueStub = jest.fn();
    clearFormDataByIdStub = jest.fn();
    updateFrequentTravelerSelectionStub = jest.fn();
    resetPassengerInfoStub = jest.fn();
    updatePassengerByClearingSpecialAssistanceStub = jest.fn();
    resetPassengerPassportFnStub = jest.fn();
    selectedFrequentTravelerAnalyticsStub = jest.fn();
  });

  it('should create frequent travelers list', () => {
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });

  it('should not filter the frequentTraveler', () => {
    const { container } = createComponent({
      params: {
        paxNumber: 1
      }
    });

    expect(container).toMatchSnapshot();
  });

  it('should call goBackStub', () => {
    const { getByText } = createComponent();

    fireEvent.click(getByText('Cancel'));

    expect(goBackStub).toHaveBeenCalled();
  });

  it('should clear the frequent traveler form', () => {
    const { container } = createComponent();

    fireEvent.click(container.querySelector('.nav-item-link'));

    expect(updateFrequentTravelerSelectionStub).toHaveBeenCalled();
    expect(clearFormDataByIdStub).toHaveBeenCalled();
    expect(updatePassengerByClearingSpecialAssistanceStub).toHaveBeenCalled();
    expect(updatePassengerByClearingSpecialAssistanceStub).toHaveBeenCalledWith(0);
    expect(resetPassengerPassportFnStub).toHaveBeenCalled();
  });

  it('should select frequent traveler', () => {
    const { container } = createComponent();
    const travelerSelect = container.querySelectorAll('.searchable-list-code--item');

    fireEvent.click(travelerSelect[2]);

    expect(goBackStub).toHaveBeenCalled();
    expect(updateFormDataValueStub).toHaveBeenCalled();
    expect(updateFrequentTravelerSelectionStub).toHaveBeenCalled();
    expect(resetPassengerPassportFnStub).toHaveBeenCalled();
    expect(clearFormDataByIdStub).toHaveBeenCalled();
    expect(selectedFrequentTravelerAnalyticsStub).toHaveBeenCalled();
  });

  it('should select frequent traveler with webview false', () => {
    const { container } = createComponent();
    const travelerSelect = container.querySelectorAll('.searchable-list-code--item');

    fireEvent.click(travelerSelect[1]);

    expect(goBackStub).toHaveBeenCalled();
    expect(updateFormDataValueStub).toHaveBeenCalled();
    expect(updateFrequentTravelerSelectionStub).toHaveBeenCalled();
    expect(clearFormDataByIdStub).toHaveBeenCalled();
  });

  it('should call special assistance upon frequent traveler selection', () => {
    const { container } = createComponent();
    const travelerSelect = container.querySelectorAll('.searchable-list-code--item');

    fireEvent.click(travelerSelect[1]);

    expect(updatePassengerByClearingSpecialAssistanceStub).toHaveBeenCalled();
  });

  it('should disable selected traveler', () => {
    const { container } = createComponent({
      selectedFrequentTravelers: [
        {
          addFrequentTravelerToggle: false,
          frequentTravelerId: 'ACCOUNT',
          paxNumber: 0
        }
      ]
    });

    expect(container).toMatchSnapshot();
  });

  describe('isoFrequentTravelerList', () => {
    const { LAPCHILD } = PassengerTypes;
    const passengerInfosWithLapChild = _.cloneDeep(passengerInfos);
    const frequentTravelerListWithLapChild = _.cloneDeep(frequentTravelerList.frequentTravelerResponse);
    const lapChildFrequentTraveler = {
      firstName: 'Baby',
      middleName: 'Jane',
      lastName: 'Haynes',
      suffix: null,
      dateOfBirth: '2021-06-02',
      gender: 'F',
      rapidRewardsNumber: 'On File',
      redressNumber: null,
      knownTravelerNumber: null,
      frequentTravelerId: '1-109BABY'
    };

    describe('when passenger type is lapChild', () => {
      passengerInfosWithLapChild[0].type = LAPCHILD;

      it('should not render other frequent travelers list', () => {
        const { container } = createComponent({
          passengerInfos: passengerInfosWithLapChild,
          frequentTravelerList: frequentTravelerListWithLapChild
        });
        const travelerSelect = container.querySelectorAll('.searchable-list-code--item');

        expect(travelerSelect.length).toEqual(0);
      });

      it('should render only lap child frequent travelers list', () => {
        frequentTravelerListWithLapChild.push(lapChildFrequentTraveler);

        const { container } = createComponent({
          passengerInfos: passengerInfosWithLapChild,
          frequentTravelerList: frequentTravelerListWithLapChild
        });
        const travelerSelect = container.querySelectorAll('.searchable-list-code--item');

        expect(travelerSelect.length).toEqual(1);
      });

      it('should not render less than fourteen days old lap child frequent travelers', () => {
        frequentTravelerListWithLapChild[4].dateOfBirth = '2022-05-22';

        const { container } = createComponent({
          passengerInfos: passengerInfosWithLapChild,
          frequentTravelerList: frequentTravelerListWithLapChild
        });
        const travelerSelect = container.querySelectorAll('.searchable-list-code--item');

        expect(travelerSelect.length).toEqual(0);
      });
    });
  });

  const createComponent = (props = {}, store = {}) => {
    const defaultProps = {
      params: {
        paxNumber: 0
      },
      isWebView: true,
      query: {
        formId: 'form'
      },
      loggedInUserFrequentTravelerId: 'account',
      passengerInfos,
      accountInfo,
      frequentTravelerList: props.frequentTravelerList
        ? props.frequentTravelerList
        : frequentTravelerList.frequentTravelerResponse,
      formData: [],
      selectedFrequentTravelers: [],
      departureDate: '2022-06-02',
      returnDate: '2022-06-09',
      updateFormDataValueFn: updateFormDataValueStub,
      goBack: goBackStub,
      clearFormDataByIdFn: clearFormDataByIdStub,
      updateFrequentTravelerSelectionFn: updateFrequentTravelerSelectionStub,
      resetPassengerInfoFn: resetPassengerInfoStub,
      updatePassengerByClearingSpecialAssistanceFn: updatePassengerByClearingSpecialAssistanceStub,
      resetPassengerPassportFn: resetPassengerPassportFnStub,
      selectedFrequentTravelerAnalyticsFn: selectedFrequentTravelerAnalyticsStub
    };

    const combinedProps = _.merge({}, defaultProps, props);
    const Component = () => (
      <Provider store={createMockedFormStore(store)}>
        <FrequentTravelers {...combinedProps} />
      </Provider>
    );

    return render(<Component />);
  };
});
