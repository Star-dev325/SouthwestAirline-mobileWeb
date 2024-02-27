// @flow

import React from 'react';
import _ from 'lodash';
import CompanyNameBanner from 'src/shared/components/companyNameBanner';
import { connect } from 'react-redux';
import {
  fetchSavedCCsAndPassengerInfoWithExpressCheckOut,
  generatePassengerPageInfo,
  resetAirBookingPurchaseData,
  setExpressCheckoutFromPassengerPage,
  submitPassengerForm,
  transitionToFrequentTravelerPage,
  updateFrequentTravelerSelection
} from 'src/airBooking/actions/airBookingActions';
import * as WebViewActions from 'src/shared/actions/webViewActions';
import ProgressionBar from 'src/shared/components/progressionBar';
import PassengerPersonalInfoForm from 'src/airBooking/components/passengerPersonalInfoForm';
import { shouldShowFrequentTravelers } from 'src/airBooking/selectors/frequentTravelerSelector';
import LoginBanner from 'src/airBooking/components/loginBanner';
import { showDialog } from 'src/shared/actions/dialogActions';
import i18n from '@swa-ui/locale';
import { setReLoginCallbackFunctions } from 'src/login/actions/reLoginModalActions';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import withHideLoginButton from 'src/shared/enhancers/withHideLoginButton';
import withExpressCheckout from 'src/airBooking/enhancers/withExpressCheckout';
import { getAirBookingContactMethodContent } from 'src/airBooking/selectors/airBookingContactMethodSelectors';
import { AIRBOOKING_PASSENGER_PERSONAL_INFO_FORM } from 'src/shared/constants/formIds';
import { shouldShowChaseInstantCreditCard } from 'src/airBooking/selectors/paymentPageSelectors';
import * as AnalyticsActions from 'src/shared/analytics/actions/analyticsActions';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import { transformPassengerInfo } from 'src/airBooking/transformers/passengerInfoTransformer';
import {
  getPassengerInfos,
  getPassengerInfoFormId,
  getSelectedFrequentTravelerByPax,
  updatePassengerForm,
  getSelectedFrequentTravelerDetails,
  getIsLapChildInBooking
} from 'src/shared/helpers/passengerInfoHelper';
import { createNewObjectReplacingNullValues } from 'src/shared/helpers/formDataHelper';
import { getPassengerInfosForForm } from 'src/airBooking/selectors/passengerInfosSelectors';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';

import type {
  Push,
  Passenger,
  SelectedFrequentTravelerType,
  PassengerInfos,
  FrequentTravelerType
} from 'src/shared/flow-typed/shared.types';
import type {
  FlightPricingPageResponse,
  FlightProductSearchRequest,
  PassengerInfoRequest
} from 'src/airBooking/flow-typed/airBooking.types';
import PassengerTypes from 'src/shared/constants/passengerTypes';
import type { ReLoginCallbackFunctionsType } from 'src/login/flow-typed/reLoginModal.types';
import { airBookingRoutes } from 'src/airBooking/constants/airBookingRoutes.js';
import { buildPathWithParamAndQuery } from 'src/shared/helpers/pathUtils';

const { LAPCHILD } = PassengerTypes;

type Props = {
  flightPricingResponse: FlightPricingPageResponse,
  searchRequest: FlightProductSearchRequest,
  params: { paxNumber: string },
  passengerInfos: PassengerInfos,
  accountInfo: ?Passenger,
  frequentTravelerList: Array<FrequentTravelerType>,
  isInternationalBooking: boolean,
  contactMethodContent: ?string,
  declineNotifications: ?boolean,
  selectedFrequentTravelers: Array<SelectedFrequentTravelerType>,
  push: Push,
  submitPassengerFormFn: (passengerInfos: *, passengerInfo: Passenger, paxNumber: number) => *,
  setExpressCheckoutFromPassengerPageFn: (isExpressCheckoutFromPassengerPage: boolean) => *,
  generatePassengerPageInfoFn: (PassengerInfoRequest) => void,
  isLoggedIn: boolean,
  isWebView: boolean,
  resetAirBookingPurchaseDataFn: (*) => void,
  setReLoginCallbackFunctionsFn: (reLoginCallbackFunctions: ReLoginCallbackFunctionsType) => void,
  specialAssistanceAnalyticsFn: (boolean) => void,
  showDialogFn: (*) => Promise<*>,
  showNativeAppLoginFn: () => void,
  selectedCompanyName: ?string,
  showFrequentTravelerButton: boolean,
  updateFrequentTravelerSelectionFn: ({
    paxNumber: number,
    frequentTravelerId: string,
    frequentTravelerToken: string,
    addFrequentTravelerToggle: boolean
  }) => void,
  transitionToFrequentTravelerPageFn: (paxNumber: number, formId: string) => void
};
export class PassengerInformation extends React.Component<Props> {
  componentDidMount() {
    this.setUpPassengerPage(true);
  }

  componentDidUpdate() {
    this.setUpPassengerPage();
  }

  setUpPassengerPage = (shouldCallGeneratePassengerPage?: boolean) => {
    const {
      accountInfo,
      flightPricingResponse,
      isWebView,
      params,
      selectedFrequentTravelers,
      searchRequest,
      isLoggedIn,
      updateFrequentTravelerSelectionFn,
      generatePassengerPageInfoFn
    } = this.props;
    const paxNumber = +params.paxNumber;
    const isFirstPassenger = paxNumber === 0;
    const { prefill } = flightPricingResponse;

    if (isFirstPassenger) {
      const selectedFrequentTraveler = getSelectedFrequentTravelerByPax(selectedFrequentTravelers, paxNumber);
      const transformedAccountInfo =
        isWebView && accountInfo ? transformPassengerInfo(accountInfo, 'YYYY-MM-DD') : accountInfo;

      if (shouldCallGeneratePassengerPage) {
        generatePassengerPageInfoFn({
          searchRequest,
          ...(isLoggedIn ? {} : { chaseCardHolder: _.get(prefill, 'chaseCardHolder') })
        });
      }

      updatePassengerForm({
        paxNumber,
        selectedFrequentTraveler,
        accountInfo: transformedAccountInfo,
        updateFrequentTravelerSelectionFn
      });
    }
  };

  _onSubmit = (passengerInfo: Passenger) => {
    const {
      isWebView,
      submitPassengerFormFn,
      params,
      passengerInfos,
      selectedFrequentTravelers,
      specialAssistanceAnalyticsFn,
      updateFrequentTravelerSelectionFn
    } = this.props;

    const paxNumber = +params.paxNumber;
    const selectedFrequentTraveler = getSelectedFrequentTravelerByPax(selectedFrequentTravelers, paxNumber);
    const updatedPassengerInfo = isWebView
      ? _.omit(transformPassengerInfo(passengerInfo, 'MM/DD/YYYY'), 'contactMethodContent')
      : _.omit(passengerInfo, 'contactMethodContent');
    const selectedFrequentTravelerInfo = selectedFrequentTraveler
      ? {
        frequentTravelerId: selectedFrequentTraveler.frequentTravelerId,
        frequentTravelerToken: selectedFrequentTraveler.frequentTravelerToken,
        ...(selectedFrequentTraveler.frequentTravelerId ? { saveAsFrequentTraveler: false } : {})
      }
      : {};

    specialAssistanceAnalyticsFn(false);
    submitPassengerFormFn(passengerInfos, { ...updatedPassengerInfo, ...selectedFrequentTravelerInfo }, paxNumber);

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

  _showLogin = () => {
    const { isWebView, showNativeAppLoginFn, setExpressCheckoutFromPassengerPageFn } = this.props;

    isWebView ? showNativeAppLoginFn() : this._goToSimpleLoginPage();
    setExpressCheckoutFromPassengerPageFn(true);
  };

  _goToSimpleLoginPage = () => {
    const currentPaxIndex = this.props.params.paxNumber;
    const currentPagePath = `${getNormalizedRoute({ routeName: 'passengers' })}/${currentPaxIndex}`;

    this.props.push('/login', null, { to: currentPagePath, simpleLogin: true });
  };

  _goToPassengerPassport = (passengerName: string, isLapChild: boolean) => {
    if (_.isEmpty(passengerName)) {
      this._showMissingPassengerNamePopup();
    } else {
      const currentPaxIndex = +this.props.params.paxNumber;

      this.props.push(buildPathWithParamAndQuery(getNormalizedRoute({ routeName: 'passengersWithPassport' }), { paxNumber: currentPaxIndex }), null, {
        passengerName,
        isLapChild
      });
    }
  };

  _goToSpecialAssistance = () => {
    const currentPaxIndex = +this.props.params.paxNumber;

    this.props.push(buildPathWithParamAndQuery(getNormalizedRoute({ routeName: 'passengersWithSpecialAssistance' }), { paxNumber: currentPaxIndex }));
  };

  _showMissingPassengerNamePopup() {
    const { showDialogFn } = this.props;

    showDialogFn({
      name: 'fill-passenger-name',
      message: i18n('AIR_BOOKING__FILL_PASSENGER_NAME')
    });
  }

  _goToContactMethod = () => {
    const { contactMethod } = airBookingRoutes;

    this.props.push(contactMethod);
  };

  _goToFrequentTraveler = () => {
    const { passengerInfos, transitionToFrequentTravelerPageFn, params } = this.props;
    const paxNumber = +params.paxNumber;
    const { type } = passengerInfos[paxNumber];

    transitionToFrequentTravelerPageFn(
      paxNumber,
      getPassengerInfoFormId(AIRBOOKING_PASSENGER_PERSONAL_INFO_FORM, type, paxNumber)
    );
  };

  render() {
    const paxNumber = +this.props.params.paxNumber;
    const {
      contactMethodContent,
      passengerInfos: originalPassengerInfos,
      isInternationalBooking,
      declineNotifications,
      isLoggedIn,
      selectedCompanyName,
      showFrequentTravelerButton,
      selectedFrequentTravelers,
      isWebView,
      accountInfo,
      frequentTravelerList,
      searchRequest: { returnDate }
    } = this.props;
    const passengerInfos = getPassengerInfos(isWebView, originalPassengerInfos);
    const selectedFrequentTraveler = getSelectedFrequentTravelerByPax(selectedFrequentTravelers, paxNumber);

    if (!_.isEmpty(passengerInfos)) {
      const { type } = passengerInfos[paxNumber];
      const isFirstPassenger = paxNumber === 0;
      const pageTitle = `Passenger ${paxNumber + 1} of ${passengerInfos.length}`;
      const { departureDate, passengerInfo, passportAndEmergencyContact } = passengerInfos[paxNumber];
      const specialAssistanceSelections = passengerInfos[paxNumber].specialAssistance;
      const selectedFrequentTravelerDetails = getSelectedFrequentTravelerDetails(
        selectedFrequentTraveler,
        frequentTravelerList,
        isWebView
      );
      let initialFormData;

      if (!selectedFrequentTraveler?.addFrequentTravelerToggle) {
        initialFormData = {
          contactMethodContent,
          ...passengerInfo,
          ...createNewObjectReplacingNullValues(selectedFrequentTravelerDetails)
        };
      }

      return (
        <div>
          <ProgressionBar totalStep={3} step={2} title={pageTitle} currentIconType="airplane" />
          {selectedCompanyName && <CompanyNameBanner selectedCompanyName={selectedCompanyName} />}
          {!isLoggedIn && isFirstPassenger && <LoginBanner onClick={this._showLogin} />}
          <PassengerPersonalInfoForm
            formId={getPassengerInfoFormId(AIRBOOKING_PASSENGER_PERSONAL_INFO_FORM, type, paxNumber)}
            onSubmit={this._onSubmit}
            reLoginCallbackFunctionsFn={this.props.setReLoginCallbackFunctionsFn}
            departureDate={departureDate}
            returnDate={returnDate}
            initialFormData={initialFormData}
            disableContactInfo={!isFirstPassenger}
            showSaveContactMethod={isLoggedIn}
            isInternationalBooking={isInternationalBooking}
            clickInternationalTravelInfo={this._goToPassengerPassport}
            clickSpecialAssistanceFn={this._goToSpecialAssistance}
            push={this.props.push}
            resetAirBookingPurchaseDataFn={this.props.resetAirBookingPurchaseDataFn}
            isPassportInfoFilled={!_.isEmpty(passportAndEmergencyContact)}
            clickContactMethodFn={this._goToContactMethod}
            declineNotifications={declineNotifications}
            specialAssistanceSelections={specialAssistanceSelections}
            isWebView={isWebView}
            showFrequentTravelerButton={showFrequentTravelerButton}
            clickFrequentTravelerMethodFn={this._goToFrequentTraveler}
            allowAddFrequentTraveler={
              !!accountInfo?.allowAddFrequentTraveler && !selectedFrequentTraveler?.frequentTravelerId
            }
            addFrequentTravelerDisclaimerText={accountInfo?.addFrequentTravelerDisclaimerText || ''}
            isLapChild={type === LAPCHILD}
            passengerInfos={passengerInfos}
            isEditMode={false}
            isLapChildInBooking={getIsLapChildInBooking(passengerInfos, LAPCHILD)}
            paxNumber={paxNumber}
            type={type}
          />
        </div>
      );
    } else return null;
  }
}

const mapStateToProps = (state) => ({
  flightPricingResponse: state.app.airBooking.flightPricingPage.response,
  searchRequest: state.app.airBooking.searchRequest,
  contactMethodContent: getAirBookingContactMethodContent(state),
  declineNotifications: _.toBoolean(_.get(state.app.airBooking, 'contactMethodInfo.declineNotifications')),
  passengerInfos: getPassengerInfosForForm(state),
  isInternationalBooking: state.app.airBooking.isInternationalBooking,
  isEligibleForExpressCheckout: state.app.airBooking.isEligibleForExpressCheckout,
  isExpressCheckoutFromPassengerPage: state.app.airBooking.isExpressCheckoutFromPassengerPage,
  accountInfo: state?.app?.airBooking?.accountInfo,
  isLoggedIn: state.app.account.isLoggedIn,
  shouldShowChaseInstantCreditCard: shouldShowChaseInstantCreditCard(state),
  showFrequentTravelerButton: shouldShowFrequentTravelers(state),
  isWebView: _.get(state, 'app.webView.isWebView'),
  webViewLoginStatus: _.get(state, 'app.webView.webViewLoginStatus'),
  selectedCompanyName: _.get(state, 'app.account.corporateInfo.selectedCompany.companyName'),
  selectedFrequentTravelers: _.get(state, 'app.airBooking.selectedFrequentTravelers', []),
  frequentTravelerList: _.get(state, 'app.airBooking.accountInfo.frequentTravelerList')
});

const mapDispatchToProps = {
  fetchSavedCCsAndPassengerInfoWithExpressCheckOutFn: fetchSavedCCsAndPassengerInfoWithExpressCheckOut,
  submitPassengerFormFn: submitPassengerForm,
  setExpressCheckoutFromPassengerPageFn: setExpressCheckoutFromPassengerPage,
  generatePassengerPageInfoFn: generatePassengerPageInfo,
  specialAssistanceAnalyticsFn: AnalyticsActions.specialAssistanceAnalytics,
  showNativeAppLoginFn: WebViewActions.showNativeAppLogin,
  showDialogFn: showDialog,
  setReLoginCallbackFunctionsFn: setReLoginCallbackFunctions,
  updateFrequentTravelerSelectionFn: updateFrequentTravelerSelection,
  transitionToFrequentTravelerPageFn: transitionToFrequentTravelerPage,
  resetAirBookingPurchaseDataFn: resetAirBookingPurchaseData
};

const enhancers = _.flowRight(
  withConnectedReactRouter,
  withHideLoginButton,
  connect(mapStateToProps, mapDispatchToProps),
  withExpressCheckout,
  withBodyClass('passenger-information-page')
);

export default enhancers(PassengerInformation);
