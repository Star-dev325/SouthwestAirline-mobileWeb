import _ from 'lodash';
import { createNewObjectReplacingNullValues } from 'src/shared/helpers/formDataHelper';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';

const getRawPassengerInfos = (state) => state?.app?.airBooking?.passengerInfos;

export const getPassengerInfosForForm = createSelector(
  [getRawPassengerInfos],
  (passengerInfos) =>
    passengerInfos?.map?.(passengerInfo => {
      const newPassengerInfo = { ...passengerInfo };

      if (!_.isEmpty(passengerInfo.passengerInfo)) {
        const updatedPassengerPersonalInfo = createNewObjectReplacingNullValues(newPassengerInfo.passengerInfo);

        newPassengerInfo.passengerInfo = updatedPassengerPersonalInfo;

        if (updatedPassengerPersonalInfo.frequentTravelerList?.length > 0) {
          updatedPassengerPersonalInfo.frequentTravelerList = updatedPassengerPersonalInfo.frequentTravelerList
            .map(frequentTraveler => createNewObjectReplacingNullValues(frequentTraveler));
        }
      }

      return newPassengerInfo;
    })
);
