import _ from 'lodash';

import AirBookingActionTypes from 'src/airBooking/actions/airBookingActionTypes';
import PassengerTypes from 'src/shared/constants/passengerTypes';

const { ADULT, LAPCHILD } = PassengerTypes;
const AIS_PASSENGER_REFERENCE_START_INDEX = 2;

const _defaultAdultFn = (action, index) => ({
  type: ADULT,
  passengerReference: AIS_PASSENGER_REFERENCE_START_INDEX + index,
  departureDate: action.searchRequest.departureDate
});

const _defaultChildFn = (action, index, lapChildStartingIndex) => ({
  type: LAPCHILD,
  passengerReference: lapChildStartingIndex + index,
  departureDate: action.searchRequest.departureDate
});

const _generatePassengerPageInfo = (action, passengers) => {
  const { numberOfAdults, numberOfLapInfants } = action.searchRequest;
  const adultInfo = _.times(numberOfAdults, (index) =>
    (_.isEmpty(passengers[index])
      ? _defaultAdultFn(action, index)
      : { ...passengers[index], ..._defaultAdultFn(action, index) })
  );
  const AIS_LAP_CHILD_REFERENCE_START_INDEX = adultInfo.length + AIS_PASSENGER_REFERENCE_START_INDEX;
  const lapInfantsInfo = _.times(numberOfLapInfants, (index) =>
    _defaultChildFn(action, index, AIS_LAP_CHILD_REFERENCE_START_INDEX)
  );

  return [...adultInfo, ...lapInfantsInfo];
};

export default (state = [], action = {}) => {
  switch (action.type) {
    case AirBookingActionTypes.AIR_BOOKING__GENERATE_PASSENGER_PAGE_INFO: {
      let passengerInfos = _.cloneDeep(state);

      passengerInfos = _.concat(_generatePassengerPageInfo(action, passengerInfos));

      const { chaseCardHolder } = action;

      if (chaseCardHolder) {
        const { accountNumber, firstName, lastName, middleName } = chaseCardHolder;

        passengerInfos[0].passengerInfo = _.merge({}, passengerInfos[0].passengerInfo, {
          rapidRewardsNumber: accountNumber,
          firstName,
          lastName,
          middleName
        });
      }

      return passengerInfos;
    }
    case AirBookingActionTypes.AIR_BOOKING__SAVE_PASSENGER: {
      const { passengerInfo, index } = action;
      const newState = _.cloneDeep(state);

      newState[index].passengerInfo = passengerInfo;

      return newState;
    }
    case AirBookingActionTypes.AIR_BOOKING__UPDATE_PASSENGER: {
      const { passengerInfo, index } = action;
      const newState = _.cloneDeep(state);

      newState[index].passengerInfo = { ...newState[index].passengerInfo, ...passengerInfo };

      return newState;
    }
    case AirBookingActionTypes.AIR_BOOKING__SAVE_PASSENGER_PASSPORT: {
      const { passportAndEmergencyContact, paxNumber } = action;
      const newState = _.cloneDeep(state);

      newState[paxNumber].passportAndEmergencyContact = passportAndEmergencyContact;

      if (_.isEmpty(passportAndEmergencyContact.passportNumber)) {
        newState[paxNumber].passportAndEmergencyContact.passportNumber =
          state[paxNumber].passportAndEmergencyContact.passportNumber;
      }

      return newState;
    }
    case AirBookingActionTypes.AIR_BOOKING__RESET_PASSENGER_PASSPORT: {
      const { paxNumber } = action;
      const newState = _.cloneDeep(state);

      if (!_.isEmpty(newState[paxNumber].passportAndEmergencyContact)) {
        delete newState[paxNumber].passportAndEmergencyContact;
      }

      return newState;
    }

    case AirBookingActionTypes.AIR_BOOKING__UPDATE_SPECIAL_ASSISTANCE: {
      const { specialAssistanceFormData, index } = action;
      const newState = _.cloneDeep(state);

      newState[index].specialAssistance = specialAssistanceFormData;

      return newState;
    }
    case AirBookingActionTypes.AIR_BOOKING__CLEAR_SPECIAL_ASSISTANCE: {
      const { index } = action;
      const newState = _.cloneDeep(state);

      delete newState[index].specialAssistance;

      return newState;
    }
    case AirBookingActionTypes.AIR_BOOKING__PREFILL_PASSENGER_INFO: {
      const { passengerDetailsPage } = action;

      const newState = _.cloneDeep(state);

      newState[0] = _.chain(newState[0])
        .merge({ passengerInfo: _.omit(passengerDetailsPage, 'contactMethod', 'contactPhone', 'contactEmail') })
        .omit('passportAndEmergencyContact')
        .value();

      return newState;
    }
    case AirBookingActionTypes.AIR_BOOKING__RESET_PASSENGER: {
      return [];
    }

    default:
      return state;
  }
};
