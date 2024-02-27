import _ from 'lodash';
import { transformPassengerInfos } from 'src/airBooking/transformers/passengerInfosTransformer';
import { formatDateOfBirthToMonthDayYear } from 'src/airBooking/helpers/passengerInfoHelper';

export const getPassengerInfoFormId = (id, type, paxNumber) => `${id}_${_.toUpper(type)}_${paxNumber}`;

export const getPassengerInfos = (isWebView, originalPassengerInfos) =>
  (isWebView ? transformPassengerInfos(originalPassengerInfos, 'YYYY-MM-DD') : originalPassengerInfos);

export const updatePassengerForm = ({
  paxNumber,
  selectedFrequentTraveler,
  accountInfo,
  updateFrequentTravelerSelectionFn
}) => {
  const isFirstPassenger = paxNumber === 0;
  const { frequentTravelerId, frequentTravelerToken = '' } = accountInfo || {};

  if (frequentTravelerId && isFirstPassenger && !selectedFrequentTraveler) {
    updateFrequentTravelerSelectionFn({
      paxNumber,
      frequentTravelerId,
      frequentTravelerToken,
      addFrequentTravelerToggle: false
    });
  }
};

export const updateEmailReceiptTo = (isFirstPassenger, accountInfo, updatedSelectedFrequentTraveler) => {
  const isSameFirstTraveler =
    isFirstPassenger && accountInfo?.frequentTravelerId === updatedSelectedFrequentTraveler.frequentTravelerId;

  return { ...updatedSelectedFrequentTraveler, emailReceiptTo: isSameFirstTraveler ? accountInfo?.emailReceiptTo : '' };
};

export const getSelectedFrequentTravelerByPax = (selectedFrequentTravelers, paxNumber) => {
  const [selectedFrequentTraveler] = selectedFrequentTravelers.filter(
    (frequentTraveler) => frequentTraveler.paxNumber === paxNumber
  );

  return selectedFrequentTraveler;
};

export const findSelectedFrequentTravelersByPax = (selectedFrequentTravelers, passengerInfos) =>
  _.reduce(
    passengerInfos,
    (result, currentPassenger, index) => {
      const getSelectedFrequentTraveler = selectedFrequentTravelers.find(
        (frequentTraveler) => frequentTraveler.paxNumber === index
      );

      getSelectedFrequentTraveler && result.push(getSelectedFrequentTraveler);

      return result;
    },
    []
  );

export const shouldRemoveFrequentTravelerAtIndex = (selectedFrequentTravelers, paxNumber) => {
  const selectedFrequentTraveler = selectedFrequentTravelers.find(
    (frequentTraveler) => frequentTraveler.paxNumber === paxNumber
  );

  return !!selectedFrequentTraveler;
};

export const getSelectedFrequentTravelerDetails = (selectedFrequentTraveler, frequentTravelerList, isWebView) => {
  let selectedFrequentTravelerDetails =
    selectedFrequentTraveler &&
    frequentTravelerList.find(
      (frequentTraveler) => frequentTraveler.frequentTravelerId === selectedFrequentTraveler.frequentTravelerId
    );

  const dateOfBirth = _.get(selectedFrequentTravelerDetails, 'dateOfBirth');

  selectedFrequentTravelerDetails =
    dateOfBirth && isWebView
      ? { ...selectedFrequentTravelerDetails, dateOfBirth: formatDateOfBirthToMonthDayYear(dateOfBirth) }
      : selectedFrequentTravelerDetails;

  return selectedFrequentTravelerDetails || {};
};

export const getAllSelectedFrequentTravelers = (selectedFrequentTravelers) =>
  selectedFrequentTravelers.filter((frequentTraveler) => frequentTraveler.frequentTravelerId);

export const getIsLapChildInBooking = (passengerInfos, LAPCHILD) =>
  passengerInfos.some((passenger) => passenger.type === LAPCHILD);

export const filterPassengerInformationByPassengerType = (passengerInfos, passengerType) => passengerInfos.filter((passenger) => passenger.type === passengerType);
