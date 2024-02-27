// @flow

import cx from 'classnames';
import _ from 'lodash';
import React from 'react';

import InternationalTravelInfoNavItem from 'src/airBooking/components/internationalTravelInfoNavItem';
import Button from 'src/shared/components/button';
import Fields from 'src/shared/components/fields';
import HideForWebView from 'src/shared/components/hideForWebView';
import LapChildDisclosure from 'src/shared/components/lapChildDisclosure';
import NavItemLink from 'src/shared/components/navItemLink';
import PageHeaderWithButtons from 'src/shared/components/pageHeaderWithButtons';
import Segment from 'src/shared/components/segment';
import Segments from 'src/shared/components/segments';
import SpecialAssistanceNavItem from 'src/shared/components/specialAssistanceNavItem';
import PassengerTypes from 'src/shared/constants/passengerTypes';
import SharedConstants from 'src/shared/constants/sharedConstants';
import Form from 'src/shared/form/components/form';
import withForm from 'src/shared/form/enhancers/withForm';
import FormCheckboxField from 'src/shared/form/fields/formCheckboxField';
import FormInputField from 'src/shared/form/fields/formInputField';
import FormSelectField from 'src/shared/form/fields/formSelectField';
import PersonalInfoFields from 'src/shared/form/fields/personalInfoFields';
import RedressAndKnownTravelerFields from 'src/shared/form/fields/redressAndKnownTravelerFields';
import ShareItineraryEmailFields from 'src/shared/form/fields/shareItineraryEmailFields';
import passengerPersonalInfoFormValidator from 'src/shared/form/formValidators/passengerPersonalInfoFormValidator';
import OptionsHelper from 'src/shared/helpers/optionsHelper';
import { filterPassengerInformationByPassengerType } from 'src/shared/helpers/passengerInfoHelper';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';

import i18n from '@swa-ui/locale';

import type { ReLoginCallbackFunctionsType } from 'src/login/flow-typed/reLoginModal.types';
import type { PassengerInfos, SpecialAssistanceType } from 'src/shared/flow-typed/shared.types';
import type { FormData } from 'src/shared/form/flow-typed/form.types';

const { ADULT, LAPCHILD } = PassengerTypes;

type Props = {
  onSubmit: () => void,
  onChange: (fieldName: string, fieldValue: *) => void,
  formData: FormData,
  initialFormData: FormData,
  departureDate: string,
  returnDate: string,
  disableContactInfo: boolean,
  showSaveContactMethod: boolean,
  isInternationalBooking: boolean,
  clickInternationalTravelInfo?: (passengerName: string, isLapChild: boolean) => void,
  isPassportInfoFilled: boolean,
  clickSpecialAssistanceFn: () => void,
  push: (*) => void,
  resetAirBookingPurchaseDataFn: () => void,
  reLoginCallbackFunctionsFn: (reLoginCallbackFunctions: ReLoginCallbackFunctionsType) => void,
  declineNotifications: boolean,
  formId: string,
  isEditMode: boolean,
  paxNumber: number,
  paxTotalNumber: number,
  specialAssistanceSelections?: SpecialAssistanceType,
  isWebView?: boolean,
  showFrequentTravelerButton: boolean,
  clickFrequentTravelerMethodFn: () => void,
  allowAddFrequentTraveler?: boolean,
  addFrequentTravelerDisclaimerText?: string,
  isLapChild: boolean,
  passengerInfos: PassengerInfos,
  isLapChildInBooking: boolean,
  type: string
};

type State = {
  showSaveFrequentTravelerDisclaimer: boolean
};

export class PassengerPersonalInfoForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showSaveFrequentTravelerDisclaimer: false
    };
  }

  static defaultProps = {
    reLoginCallbackFunctionsFn: () => {},
    disableContactInfo: false,
    showSaveContactMethod: false,
    isInternationalBooking: false,
    isPassportInfoFilled: false,
    clickSpecialAssistanceFn: _.noop,
    declineNotifications: false,
    isEditMode: false,
    paxNumber: 1,
    paxTotalNumber: 1,
    specialAssistanceSelections: {},
    showFrequentTravelerButton: false,
    clickFrequentTravelerMethodFn: _.noop,
    isLapChild: false,
    departureDate: '',
    returnDate: '',
    isLapChildInBooking: false
  };

  _clickInternationalTravelInfo = () => {
    const {
      formData: { firstName, lastName },
      clickInternationalTravelInfo,
      isLapChild
    } = this.props;
    const passengerName = !!firstName && !!lastName ? `${firstName} ${lastName}` : '';

    clickInternationalTravelInfo && clickInternationalTravelInfo(passengerName, isLapChild);
  };

  _clickSpecialAssistance = () => {
    const { clickSpecialAssistanceFn } = this.props;

    clickSpecialAssistanceFn && clickSpecialAssistanceFn();
  };

  _onSaveFrequentravelerChange = () => {
    !this.state.showSaveFrequentTravelerDisclaimer && this.setState({ showSaveFrequentTravelerDisclaimer: true });
  };

  _onSecurityInformationSelected = (field: string, isFocus?: boolean) => {
    const { onChange, formData = {}, initialFormData = {} } = this.props;
    const { ON_FILE } = SharedConstants;

    if (isFocus && formData[field] === ON_FILE) {
      onChange(field, '');
    } else if (initialFormData[field] === ON_FILE && !formData[field]) {
      onChange(field, ON_FILE);
    }
  };

  _handleContinueClick = () => {
    const { reLoginCallbackFunctionsFn, onSubmit, resetAirBookingPurchaseDataFn, push } = this.props;

    reLoginCallbackFunctionsFn({
      continueAsGuestFn: () => {
        [resetAirBookingPurchaseDataFn(), push(getNormalizedRoute({ routeName: 'price' }))];
      }
    });
    onSubmit();
  };

  render() {
    const {
      formId,
      disableContactInfo,
      isInternationalBooking,
      isPassportInfoFilled,
      paxNumber,
      paxTotalNumber,
      isEditMode,
      formData,
      specialAssistanceSelections,
      isWebView,
      showFrequentTravelerButton,
      clickFrequentTravelerMethodFn,
      allowAddFrequentTraveler,
      addFrequentTravelerDisclaimerText,
      isLapChild,
      passengerInfos,
      departureDate,
      type,
      isLapChildInBooking
    } = this.props;
    const { saveAsFrequentTraveler, frequentTravelerId } = formData;
    const associatedAdultsInfo = filterPassengerInformationByPassengerType(passengerInfos, ADULT);
    const lapChildInfo = filterPassengerInformationByPassengerType(passengerInfos, LAPCHILD);

    return (
      <Form
        formId={formId}
        className={cx('passenger-personal-info-form', { 'absolute t0 l0 r0': isEditMode })}
        onSubmit={this._handleContinueClick}
      >
        {isEditMode && (
          <PageHeaderWithButtons
            title={i18n('AIR_BOOKING__PASSENGERS__TITLE')}
            subTitle={`${paxNumber} of ${paxTotalNumber}`}
            rightButtons={[{ name: 'Done', type: 'submit' }]}
          />
        )}
        {showFrequentTravelerButton && (
          <div className="frequent-traveler--container">
            <NavItemLink className="frequent-traveler--button" onClick={clickFrequentTravelerMethodFn}>
              {i18n('AIR_BOOKING__PASSENGER_PERSONAL_INFO_FORM__FREQUENT_TRAVELER_BUTTON')}
            </NavItemLink>
          </div>
        )}
        <Segments>
          <Segment ordinality="secondary">
            {frequentTravelerId && !isLapChild && (
              <p className="helper-text">
                {i18n('AIR_BOOKING__PASSENGER_PERSONAL_INFO_FORM__FREQUENT_TRAVELER_EDIT_INSTRUCTION')}
              </p>
            )}
            {isLapChildInBooking && (
              <LapChildDisclosure
                paxNumber={isEditMode ? paxNumber : paxNumber + 1}
                type={type}
                frequentTravelerId={frequentTravelerId}
              />
            )}
            <PersonalInfoFields
              id={`${formId}_personalInfoFields`}
              departureDate={departureDate}
              isLapChild={isLapChild}
              returnDate
              names={['firstName', 'middleName', 'lastName', 'suffix', 'gender', 'dateOfBirth']}
              isWebView={isWebView}
            />
            {!isLapChild && (
              <>
                <Fields type="grouped" label={i18n('AIR_BOOKING__PASSENGERS__RAPID_REWARDS_NUMBER')}>
                  <FormInputField
                    id={`${formId}_rapidRewardsNumber`}
                    name="rapidRewardsNumber"
                    placeholder={i18n('SHARED__PLACEHOLDER__RAPID_REWARDS_ACCOUNT_NUMBER')}
                    type="tel"
                    onFocus={() => this._onSecurityInformationSelected('rapidRewardsNumber', true)}
                    onBlur={() => this._onSecurityInformationSelected('rapidRewardsNumber')}
                  />
                </Fields>
              </>
            )}
            {isInternationalBooking && (
              <>
                <Fields type="grouped" className="form-fields--international-travel-info">
                  <InternationalTravelInfoNavItem
                    onClick={this._clickInternationalTravelInfo}
                    filledPassportForCurrentPassenger={isPassportInfoFilled}
                  />
                </Fields>
                <div className="passenger-personal-info-form--international-travel-text">
                  {i18n('AIR_BOOKING__PASSENGERS_INTERNATIONAL_TRAVEL__INFORMATION_TEXT')}
                </div>
              </>
            )}
            {!isLapChild && (
              <>
                {!disableContactInfo && (
                  <div>
                    <Fields
                      type="grouped"
                      label={i18n('AIR_BOOKING__PASSENGERS__EMAIL_RECEIPT_TO')}
                      className="form-fields--receipt-email"
                    >
                      <FormInputField
                        id={`${formId}_emailReceiptTo`}
                        name="emailReceiptTo"
                        placeholder={i18n('SHARED__PLACEHOLDER__EMAIL_ADDRESS')}
                        type="email"
                      />
                    </Fields>
                    <HideForWebView>
                      <ShareItineraryEmailFields names={['shareItineraryEmail']} />
                    </HideForWebView>
                  </div>
                )}
                <RedressAndKnownTravelerFields
                  id={`${formId}_redressAndKnownTravelerFields`}
                  names={['redressNumber', 'knownTravelerNumber']}
                  onFocusAndBlur={this._onSecurityInformationSelected}
                />
                <SpecialAssistanceNavItem
                  onClick={this._clickSpecialAssistance}
                  specialAssistanceSelections={specialAssistanceSelections ? specialAssistanceSelections : {}}
                />
              </>
            )}
            {isLapChild && (
              <Fields type="grouped" label={i18n('AIR_BOOKING_PASSENGERS_ASSOCIATED_ADULT')}>
                <FormSelectField
                  className="no-shadow"
                  id={`${formId}_associatedAdult`}
                  name="associatedAdult"
                  options={OptionsHelper.getAssociatedAdultsOptions(
                    associatedAdultsInfo,
                    lapChildInfo,
                    formData,
                    isEditMode
                  )}
                  disablePlaceholder
                />
              </Fields>
            )}
            {allowAddFrequentTraveler && (
              <Fields type="grouped">
                <FormCheckboxField
                  name="saveAsFrequentTraveler"
                  className="save-frequent-traveler--checkbox-field"
                  clickableChildren
                  onChange={this._onSaveFrequentravelerChange}
                >
                  {i18n('AIR_BOOKING__PASSENGER_PERSONAL_INFO_FORM__SAVE_FREQUENT_TRAVELER')}
                </FormCheckboxField>
                {(this.state.showSaveFrequentTravelerDisclaimer || saveAsFrequentTraveler) && (
                  <div className="save-frequent-traveler--disclaimer">{addFrequentTravelerDisclaimerText}</div>
                )}
              </Fields>
            )}
          </Segment>
          {!isEditMode && (
            <Segment color="blue" inverted>
              <Button className="continue" type="submit" color="yellow" size="huge" fluid>
                Continue
              </Button>
            </Segment>
          )}
        </Segments>
      </Form>
    );
  }
}

export default withForm({
  formValidator: passengerPersonalInfoFormValidator,
  defaultValues: () => ({
    middleName: '',
    suffix: '',
    saveAsFrequentTraveler: false
  })
})(PassengerPersonalInfoForm);
