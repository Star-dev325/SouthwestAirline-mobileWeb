// @flow
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import i18n from '@swa-ui/locale';

import SearchableList from 'src/shared/components/searchableList';
import withHideGlobalHeader from 'src/shared/enhancers/withHideGlobalHeader';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import type {
  FrequentTravelerType,
  SelectedFrequentTravelerType,
  Passenger,
  PassengerInfos
} from 'src/shared/flow-typed/shared.types';
import * as AirBookingActions from 'src/airBooking/actions/airBookingActions';
import * as FormDataActions from 'src/shared/actions/formDataActions';
import {
  AIRBOOKING_PASSENGER_PERSONAL_INFO_FORM,
  AIRBOOKING_PASSENGER_INFO_EDIT,
  AIRBOOKING__PASSPORT_FORM
} from 'src/shared/constants/formIds';
import {
  findSelectedFrequentTravelersByPax,
  getPassengerInfos,
  getPassengerInfoFormId,
  updateEmailReceiptTo
} from 'src/shared/helpers/passengerInfoHelper';
import { transformPassengerInfo } from 'src/airBooking/transformers/passengerInfoTransformer';
import validator from 'src/shared/form/formValidators/validator';
import PassengerTypes from 'src/shared/constants/passengerTypes';

const { LAPCHILD } = PassengerTypes;

type Props = {
  passengerInfos: PassengerInfos,
  accountInfo: ?Passenger,
  frequentTravelerList: Array<FrequentTravelerType>,
  selectedFrequentTravelers: Array<SelectedFrequentTravelerType>,
  isWebView?: boolean,
  params: { paxNumber: string },
  query: {
    formId: string
  },
  departureDate: string,
  returnDate: string,
  goBack: () => void,
  updateFrequentTravelerSelectionFn: ({
    paxNumber: number,
    frequentTravelerId: string,
    frequentTravelerToken: string,
    addFrequentTravelerToggle: boolean
  }) => void,
  updatePassengerByClearingSpecialAssistanceFn: (number) => {},
  clearFormDataByIdFn: (string) => {},
  updateFormDataValueFn: (string, *) => {},
  resetPassengerPassportFn: (number) => void,
  selectedFrequentTravelerAnalyticsFn: () => void
};

export const FrequentTravelers = ({
  passengerInfos: originalPassengerInfos,
  accountInfo,
  frequentTravelerList,
  selectedFrequentTravelers,
  isWebView,
  params,
  query,
  departureDate,
  returnDate,
  goBack,
  updateFrequentTravelerSelectionFn,
  clearFormDataByIdFn,
  updateFormDataValueFn,
  updatePassengerByClearingSpecialAssistanceFn,
  resetPassengerPassportFn,
  selectedFrequentTravelerAnalyticsFn
}: Props) => {
  const [localSelectedFrequentTraveler, setLocalSelectedFrequentTraveler] = useState([]);

  useEffect(() => {
    setLocalSelectedFrequentTraveler(selectedFrequentTravelers);
  }, []);

  const paxNumber = +params.paxNumber;
  const passengerInfos = getPassengerInfos(isWebView, originalPassengerInfos);
  const { type } = passengerInfos[paxNumber];
  const selectedFrequentTravelersByPax = findSelectedFrequentTravelersByPax(
    localSelectedFrequentTraveler,
    passengerInfos
  );
  const isoFrequentTravelerList = _.flatMap(
    frequentTravelerList,
    ({ firstName, middleName, lastName, frequentTravelerId, dateOfBirth }) => {
      const formattedMiddleName = middleName ? ` ${middleName.charAt(0)}. ` : ' ';
      const isFrequentTravelerSelected = _.some(
        selectedFrequentTravelersByPax,
        (frequentTraveler) => frequentTraveler.frequentTravelerId === frequentTravelerId
      );
      const isLapChildFrequentTraveler = validator.isValidLapChildDate(dateOfBirth, departureDate, returnDate);
      const isLessThanFourteenDaysOldLapChild = validator.isLessThanFourteenDaysOld(dateOfBirth, departureDate);

      if (
        (type === LAPCHILD && !isLapChildFrequentTraveler) ||
        isLessThanFourteenDaysOldLapChild
      ) {
        return [];
      }

      return [
        {
          label: `${firstName}${formattedMiddleName}${lastName}`,
          code: frequentTravelerId,
          disabled: isFrequentTravelerSelected
        }
      ];
    }
  );

  const onTravelerSelected = (selectedCard) => {
    const [selectedFrequentTraveler] = frequentTravelerList.filter(
      (frequentTraveler) => frequentTraveler.frequentTravelerId === selectedCard.code
    );
    const { frequentTravelerId, frequentTravelerToken } = selectedFrequentTraveler;
    const isFirstPassenger = paxNumber === 0;
    let updatedSelectedFrequentTraveler = updateEmailReceiptTo(
      isFirstPassenger,
      accountInfo,
      _.cloneDeep(selectedFrequentTraveler)
    );

    updatedSelectedFrequentTraveler = isWebView
      ? transformPassengerInfo(updatedSelectedFrequentTraveler, 'YYYY-MM-DD')
      : updatedSelectedFrequentTraveler;
    updateFormDataValueFn(query.formId, updatedSelectedFrequentTraveler);
    updatePassengerByClearingSpecialAssistanceFn(paxNumber);
    clearFormDataByIdFn(`${AIRBOOKING__PASSPORT_FORM}_${paxNumber}`);
    passengerInfos[paxNumber].passportAndEmergencyContact && resetPassengerPassportFn(paxNumber);
    goBack();
    updateFrequentTravelerSelectionFn({
      paxNumber,
      frequentTravelerId,
      frequentTravelerToken,
      addFrequentTravelerToggle: false
    });
    selectedFrequentTravelerAnalyticsFn();
  };

  const _getAlternateNavItemLinkProps = () => ({
    onClick: () => {
      goBack();
      clearFormDataByIdFn(AIRBOOKING_PASSENGER_INFO_EDIT);
      clearFormDataByIdFn(`${AIRBOOKING__PASSPORT_FORM}_${paxNumber}`);
      passengerInfos[paxNumber].passportAndEmergencyContact && resetPassengerPassportFn(paxNumber);
      clearFormDataByIdFn(getPassengerInfoFormId(AIRBOOKING_PASSENGER_PERSONAL_INFO_FORM, type, paxNumber));
      updatePassengerByClearingSpecialAssistanceFn(paxNumber);
      updateFrequentTravelerSelectionFn({
        paxNumber,
        frequentTravelerId: '',
        frequentTravelerToken: '',
        addFrequentTravelerToggle: true
      });
    }
  });

  return (
    <React.Fragment>
      {isoFrequentTravelerList && (
        <SearchableList
          title={i18n('AIR_BOOKING__FREQUENT_TRAVELER__PAGE_HEADER')}
          itemList={isoFrequentTravelerList}
          onItemSelect={onTravelerSelected}
          onCancel={goBack}
          codeFieldName={''}
          showSectionHeaders={false}
          alternateNavItemLinkProps={_getAlternateNavItemLinkProps()}
          alternateNavItemTitle={i18n('AIR_BOOKING__FREQUENT_TRAVELER__ADD_NEW_BUTTON')}
          alternateItemAllowed
          hideAlphabetSelector
        />
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  accountInfo: _.get(state, 'app.airBooking.accountInfo', null),
  frequentTravelerList: _.get(state, 'app.airBooking.accountInfo.frequentTravelerList', []),
  selectedFrequentTravelers: _.get(state, 'app.airBooking.selectedFrequentTravelers', []),
  passengerInfos: state.app.airBooking.passengerInfos,
  isWebView: _.get(state, 'app.webView.isWebView'),
  departureDate: _.get(state, 'app.airBooking.searchRequest.departureDate'),
  returnDate: _.get(state, 'app.airBooking.searchRequest.returnDate')
});

const mapDispatchToProps = {
  updateFrequentTravelerSelectionFn: AirBookingActions.updateFrequentTravelerSelection,
  clearFormDataByIdFn: FormDataActions.clearFormDataById,
  updateFormDataValueFn: FormDataActions.updateFormDataValue,
  updatePassengerByClearingSpecialAssistanceFn: AirBookingActions.updatePassengerByClearingSpecialAssistance,
  resetPassengerPassportFn: AirBookingActions.resetPassengerPassport,
  selectedFrequentTravelerAnalyticsFn: AirBookingActions.selectedFrequentTravelerAnalytics
};

const enhancers = _.flowRight(
  withConnectedReactRouter,
  withHideGlobalHeader,
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhancers(FrequentTravelers);
