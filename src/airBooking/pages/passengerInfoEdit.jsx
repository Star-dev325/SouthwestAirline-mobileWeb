// @flow
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

import i18n from '@swa-ui/locale';
import * as AirBookingActions from 'src/airBooking/actions/airBookingActions';
import PassengerPersonalInfoForm from 'src/airBooking/components/passengerPersonalInfoForm';
import { getAirBookingContactMethodContent } from 'src/airBooking/selectors/airBookingContactMethodSelectors';
import { shouldShowFrequentTravelers } from 'src/airBooking/selectors/frequentTravelerSelector';
import { transformPassengerInfo } from 'src/airBooking/transformers/passengerInfoTransformer';
import { setReLoginCallbackFunctions } from 'src/login/actions/reLoginModalActions';
import type { ReLoginCallbackFunctionsType } from 'src/login/flow-typed/reLoginModal.types';
import { showDialog } from 'src/shared/actions/dialogActions';
import * as FormDataActions from 'src/shared/actions/formDataActions';
import * as AnalyticsActions from 'src/shared/analytics/actions/analyticsActions';
import { AIRBOOKING_PASSENGER_INFO_EDIT, AIRBOOKING_PASSENGER_PERSONAL_INFO_FORM } from 'src/shared/constants/formIds';
import PassengerTypes from 'src/shared/constants/passengerTypes';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import {
  getIsLapChildInBooking,
  getPassengerInfoFormId,
  getPassengerInfos,
  getSelectedFrequentTravelerByPax,
  getSelectedFrequentTravelerDetails,
  updatePassengerForm
} from 'src/shared/helpers/passengerInfoHelper';
import { buildPathWithParamAndQuery } from 'src/shared/helpers/pathUtils';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';

import type { YoungTravelerPageInfoType } from 'src/airBooking/flow-typed/airBooking.types';
import type {
  FrequentTravelerType,
  ParentOrGuardianFormDataType,
  Passenger,
  Push,
  SelectedFrequentTravelerType,
  SpecialAssistanceType
} from 'src/shared/flow-typed/shared.types';

const { LAPCHILD } = PassengerTypes;

type Props = {
  accountInfo: ?Passenger,
  checkRapidRewardAndUpdatePassengerFn: (passengerInfos: *, passengerInfo: Passenger, paxNumber: number) => void,
  contactMethodContent: ?string,
  frequentTravelerList: Array<FrequentTravelerType>,
  isInternationalBooking: boolean,
  isWebView?: boolean,
  params: {
    paxNumber: string
  },
  parentOrGuardianFormDataInfo: ParentOrGuardianFormDataType,
  passengerInfos: Array<{
    departureDate: string,
    passengerInfo: Passenger,
    passportAndEmergencyContact: ?*,
    specialAssistance?: SpecialAssistanceType,
    type: string
  }>,
  push: Push,
  resetAirBookingPurchaseDataFn?: (*) => void,
  selectedFrequentTravelers: Array<SelectedFrequentTravelerType>,
  setReLoginCallbackFunctionsFn?: (reLoginCallbackFunctions: ReLoginCallbackFunctionsType) => void,
  showDialogFn: (*) => Promise<*>,
  showFrequentTravelerButton: boolean,
  specialAssistanceAnalyticsFn: (boolean) => void,
  submitPassengerFormFn: (passengerInfos: *, passengerInfo: Passenger, paxNumber: number, isEditingPax?: boolean) => *,
  transitionToFrequentTravelerPageFn: (paxNumber: number, formId: string) => void,
  updateFormDataValueFn: (string, *) => {},
  updateFrequentTravelerSelectionFn: ({
    addFrequentTravelerToggle: boolean,
    frequentTravelerId: string,
    frequentTravelerToken: string,
    paxNumber: number
  }) => void,
  youngTravelerPageInfo: YoungTravelerPageInfoType
};
export class PassengerInfoEdit extends React.Component<Props> {
  static defaultProps = {
    isInternationalBooking: false,
    showFrequentTravelerButton: false
  };

  componentDidMount() {
    const { accountInfo, selectedFrequentTravelers, updateFrequentTravelerSelectionFn, isWebView } = this.props;
    const paxNumber = +this.props.params.paxNumber;
    const selectedFrequentTraveler = getSelectedFrequentTravelerByPax(selectedFrequentTravelers, paxNumber);
    const transformedAccountInfo =
      isWebView && accountInfo ? transformPassengerInfo(accountInfo, 'YYYY-MM-DD') : accountInfo;

    updatePassengerForm({
      paxNumber,
      selectedFrequentTraveler,
      accountInfo: transformedAccountInfo,
      updateFrequentTravelerSelectionFn
    });
  }

  _onSubmit = (passengerInfo: Passenger) => {
    const {
      checkRapidRewardAndUpdatePassengerFn,
      isWebView,
      params,
      parentOrGuardianFormDataInfo,
      passengerInfos,
      selectedFrequentTravelers,
      specialAssistanceAnalyticsFn,
      submitPassengerFormFn,
      updateFormDataValueFn,
      updateFrequentTravelerSelectionFn,
      youngTravelerPageInfo
    } = this.props;
    const paxNumber = +params.paxNumber;
    const updatedPassengerInfo = isWebView ? transformPassengerInfo(passengerInfo, 'MM/DD/YYYY') : passengerInfo;
    const selectedFrequentTraveler = getSelectedFrequentTravelerByPax(selectedFrequentTravelers, paxNumber);
    const selectedFrequentTravelerInfo = selectedFrequentTraveler
      ? {
        frequentTravelerId: selectedFrequentTraveler.frequentTravelerId,
        frequentTravelerToken: selectedFrequentTraveler.frequentTravelerToken,
        ...(selectedFrequentTraveler.frequentTravelerId ? { saveAsFrequentTraveler: false } : {})
      }
      : {};
    const { type } = passengerInfos[paxNumber];
    const formId = getPassengerInfoFormId(AIRBOOKING_PASSENGER_PERSONAL_INFO_FORM, type, paxNumber);
    const mergedPassengerInfo = { ...updatedPassengerInfo, ...selectedFrequentTravelerInfo };

    updateFormDataValueFn(formId, passengerInfo);
    specialAssistanceAnalyticsFn(false);

    if (
      !passengerInfos.some((passenger) => _.isEqual(passenger.passengerInfo, mergedPassengerInfo)) ||
      (youngTravelerPageInfo && !parentOrGuardianFormDataInfo)
    ) {
      const updatePassengerInfos = passengerInfos.map((passenger, passengerIndex) => (
        paxNumber === passengerIndex ? { ...passenger, passengerInfo: mergedPassengerInfo } : passenger
      ));

      submitPassengerFormFn(updatePassengerInfos, mergedPassengerInfo, paxNumber, true);
    } else {
      checkRapidRewardAndUpdatePassengerFn(passengerInfos, mergedPassengerInfo, paxNumber);
    }

    if (selectedFrequentTraveler) {
      const { frequentTravelerId = '', frequentTravelerToken = '' } = selectedFrequentTraveler;

      updateFrequentTravelerSelectionFn({
        paxNumber,
        frequentTravelerId,
        frequentTravelerToken,
        addFrequentTravelerToggle: false
      });
    }
  };

  _showMissingPassengerNamePopup() {
    const { showDialogFn } = this.props;

    showDialogFn({
      name: 'fill-passenger-name',
      message: i18n('AIR_BOOKING__FILL_PASSENGER_NAME')
    });
  }

  _goToPassengerPassport = (passengerName: string, isLapChild: boolean) => {
    if (_.isEmpty(passengerName)) {
      this._showMissingPassengerNamePopup();
    } else {
      const currentPaxIndex = +this.props.params.paxNumber;

      this.props.push(`${getNormalizedRoute({ routeName: 'passengers' })}/${currentPaxIndex}/passport`, null, {
        passengerName,
        isLapChild
      });
    }
  };

  _goToSpecialAssistance = () => {
    const currentPaxIndex = +this.props.params.paxNumber;

    this.props.push(
      buildPathWithParamAndQuery(getNormalizedRoute({ routeName: 'passengersWithSpecialAssistance' }), {
        paxNumber: currentPaxIndex
      })
    );
  };

  _goToFrequentTraveler = () => {
    const { transitionToFrequentTravelerPageFn, params } = this.props;
    const paxNumber = +params.paxNumber;

    transitionToFrequentTravelerPageFn(paxNumber, AIRBOOKING_PASSENGER_INFO_EDIT);
  };

  render() {
    const {
      passengerInfos: originalPassengerInfos,
      isInternationalBooking,
      isWebView,
      showFrequentTravelerButton,
      accountInfo,
      contactMethodContent,
      selectedFrequentTravelers,
      frequentTravelerList,
      push,
      setReLoginCallbackFunctionsFn,
      resetAirBookingPurchaseDataFn
    } = this.props;
    const paxNumber = +this.props.params.paxNumber;
    const selectedFrequentTraveler = getSelectedFrequentTravelerByPax(selectedFrequentTravelers, paxNumber);
    const passengerInfos = getPassengerInfos(isWebView, originalPassengerInfos);
    const { departureDate, passengerInfo, passportAndEmergencyContact } = passengerInfos[paxNumber];
    const paxTotalNumber = passengerInfos.length;
    const specialAssistanceSelections = passengerInfos[paxNumber].specialAssistance;
    const selectedFrequentTravelerDetails = getSelectedFrequentTravelerDetails(
      selectedFrequentTraveler,
      frequentTravelerList,
      isWebView
    );
    let initialFormData;
    const { type } = passengerInfos[paxNumber];

    if (!selectedFrequentTraveler?.addFrequentTravelerToggle) {
      initialFormData = {
        contactMethodContent,
        ...passengerInfo,
        ...(selectedFrequentTraveler &&
        !selectedFrequentTraveler?.addFrequentTravelerToggle &&
        selectedFrequentTravelerDetails &&
        selectedFrequentTraveler.frequentTravelerId !== passengerInfo.frequentTravelerId
          ? selectedFrequentTravelerDetails
          : {})
      };
    }

    return (
      <div>
        <PassengerPersonalInfoForm
          isEditMode
          formId={AIRBOOKING_PASSENGER_INFO_EDIT}
          onSubmit={this._onSubmit}
          departureDate={departureDate}
          initialFormData={initialFormData}
          disableContactInfo={paxNumber !== 0}
          paxNumber={paxNumber + 1}
          paxTotalNumber={paxTotalNumber}
          push={push}
          reLoginCallbackFunctionsFn={setReLoginCallbackFunctionsFn}
          resetAirBookingPurchaseDataFn={resetAirBookingPurchaseDataFn}
          isInternationalBooking={isInternationalBooking}
          clickInternationalTravelInfo={this._goToPassengerPassport}
          clickSpecialAssistanceFn={this._goToSpecialAssistance}
          isPassportInfoFilled={!_.isEmpty(passportAndEmergencyContact)}
          specialAssistanceSelections={specialAssistanceSelections}
          isWebView={isWebView}
          showFrequentTravelerButton={showFrequentTravelerButton}
          clickFrequentTravelerMethodFn={this._goToFrequentTraveler}
          allowAddFrequentTraveler={
            !!accountInfo?.allowAddFrequentTraveler && !selectedFrequentTraveler?.frequentTravelerId
          }
          addFrequentTravelerDisclaimerText={accountInfo?.addFrequentTravelerDisclaimerText || ''}
          isLapChild={type === LAPCHILD}
          type={type}
          passengerInfos={passengerInfos}
          isLapChildInBooking={getIsLapChildInBooking(passengerInfos, LAPCHILD)}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  contactMethodContent: getAirBookingContactMethodContent(state),
  parentOrGuardianFormDataInfo: state?.app?.formData?.AIR_BOOKING_PARENT_OR_GUARDIAN_FORM,
  passengerInfos: state.app.airBooking.passengerInfos,
  isInternationalBooking: state.app.airBooking.isInternationalBooking,
  isWebView: _.get(state, 'app.webView.isWebView'),
  showFrequentTravelerButton: shouldShowFrequentTravelers(state),
  accountInfo: state.app.airBooking?.accountInfo,
  frequentTravelerList: _.get(state, 'app.airBooking.accountInfo.frequentTravelerList'),
  selectedFrequentTravelers: _.get(state, 'app.airBooking.selectedFrequentTravelers', []),
  youngTravelerPageInfo: state?.app?.airBooking?.passengerValidationDetails?.youngTraveler?.youngTravelerPageInfo
});

const mapDispatchToProps = {
  checkRapidRewardAndUpdatePassengerFn: AirBookingActions.checkRapidRewardAndUpdatePassenger,
  resetAirBookingPurchaseDataFn: AirBookingActions.resetAirBookingPurchaseData,
  setReLoginCallbackFunctionsFn: setReLoginCallbackFunctions,
  showDialogFn: showDialog,
  specialAssistanceAnalyticsFn: AnalyticsActions.specialAssistanceAnalytics,
  submitPassengerFormFn: AirBookingActions.submitPassengerForm,
  transitionToFrequentTravelerPageFn: AirBookingActions.transitionToFrequentTravelerPage,
  updateFormDataValueFn: FormDataActions.updateFormDataValue,
  updateFrequentTravelerSelectionFn: AirBookingActions.updateFrequentTravelerSelection
};

const enhancers = _.flowRight(
  withConnectedReactRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withBodyClass('passenger-info-edit-page')
);

export default enhancers(PassengerInfoEdit);
