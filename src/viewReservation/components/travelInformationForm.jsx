// @flow
import React from 'react';
import _ from 'lodash';
import dayjs from 'dayjs';

import withForm from 'src/shared/form/enhancers/withForm';
import Form from 'src/shared/form/components/form';
import Fields from 'src/shared/components/fields';
import Button from 'src/shared/components/button';
import Segments from 'src/shared/components/segments';
import Segment from 'src/shared/components/segment';
import CountryNavItemField from 'src/shared/form/fields/countryNavItemField';
import FormDatePickerField from 'src/shared/form/fields/formDatePickerField';
import FullScreenModal from 'src/shared/components/fullScreenModal/fullScreenModal';
import FormInputMaskField from 'src/shared/form/fields/formInputMaskField';
import FormInputField from 'src/shared/form/fields/formInputField';
import PhoneNumberFields from 'src/shared/form/fields/phoneNumberFields';
import PhoneCountryCodeList from 'src/shared/components/phoneCountryCodeList';
import CountryList from 'src/shared/components/countryList';
import SpecialAssistanceNavItem from 'src/shared/components/specialAssistanceNavItem';

import { getMaskProps } from 'src/shared/form/helpers/formHelper';
import travelInformationFormValidator from 'src/shared/form/formValidators/travelInformationFormValidator';
import {
  hideFullScreenModal,
  showFullScreenModal
} from 'src/shared/components/fullScreenModal/helpers/fullScreenModalHelper';
import i18n from '@swa-ui/locale';

import type { TravelInformationFormData } from 'src/viewReservation/flow-typed/viewReservation.types';
import type { SpecialAssistanceType, MessageType } from 'src/shared/flow-typed/shared.types';

export type TravelInformationFormProps = {
  formId: string,
  initialFormData: ?TravelInformationFormData,
  formData: ?TravelInformationFormData,
  isInternational: boolean,
  onSubmit: (event: Event) => void,
  onChange: (fieldName: string, fieldValue: *) => void,
  onPassPortNumberFocus: () => void,
  disableNationalityItem: boolean,
  clickSpecialAssistanceFn: () => void,
  specialAssistanceSelections?: SpecialAssistanceType,
  isEditablePassengerFirstMiddleName: boolean,
  isEditablePassengerLastName: boolean,
  editNamesMessage: ?MessageType
};

const COUNTRY_CODE_MODAL_ID = 'countryCode';
const COUNTRY_LIST_MODAL_ID = 'countryList';

class TravelInformationForm extends React.Component<TravelInformationFormProps> {
  static defaultProps = {
    onPassPortNumberFocus: _.noop,
    disableNationalityItem: false,
    specialAssistanceSelections: {}
  };

  currentField: *;

  _updateCountryCode = ({ countryCode }: { countryCode: string }) => {
    const { onChange } = this.props;

    hideFullScreenModal(COUNTRY_CODE_MODAL_ID);

    onChange('emergencyContactCountryCode', countryCode);
    onChange('emergencyContactPhoneNumber', '');
  };

  _onCountrySelected = (fieldData: *) => {
    const { onChange } = this.props;

    hideFullScreenModal(COUNTRY_LIST_MODAL_ID);

    onChange(this.currentField, fieldData);
  };

  _getSelectedIsoCountryCode = () => _.get(this.props, `formData.${this.currentField}`) || '';

  _showFullScreenModal = (currentField: *, modalId: string) => {
    this.currentField = currentField;
    showFullScreenModal(modalId);
  };

  _getPassport() {
    const { onPassPortNumberFocus, disableNationalityItem } = this.props;

    return (
      <Segment ordinality="secondary" className="passport-form--info">
        <span className="travel-information-form--title">{i18n('SHARED__PLACEHOLDER__PASSPORT_INFORMATION')}</span>
        <FormInputMaskField
          name={'passportNumber'}
          onFocus={onPassPortNumberFocus}
          placeholder={i18n('SHARED__PLACEHOLDER__PASSPORT_NUMBER')}
          {...getMaskProps({ rule: '*', repeat: 15 })}
        />
        <CountryNavItemField
          name={'passportIssuedBy'}
          onNavItemClick={() => this._showFullScreenModal('passportIssuedBy', COUNTRY_LIST_MODAL_ID)}
          placeholder={i18n('SHARED__PLACEHOLDER__PASSPORT_ISSUE_BY')}
        />
        <CountryNavItemField
          name={'nationality'}
          onNavItemClick={() => this._showFullScreenModal('nationality', COUNTRY_LIST_MODAL_ID)}
          placeholder={i18n('SHARED__PLACEHOLDER__NATIONALITY')}
          disabled={disableNationalityItem}
        />

        <Fields type="grouped" label="Expiration Date">
          <FormDatePickerField
            name={'passportExpirationDate'}
            defaultDate={dayjs().add(1, 'year').toDate()}
            min={dayjs().toDate()}
            max={dayjs().add(20, 'year').toDate()}
          />
        </Fields>

        <CountryNavItemField
          name={'countryOfResidence'}
          onNavItemClick={() => this._showFullScreenModal('countryOfResidence', COUNTRY_LIST_MODAL_ID)}
          placeholder={i18n('SHARED__PLACEHOLDER__COUNTRY_OF_RESIDENCE')}
        />
      </Segment>
    );
  }

  _getEmergencyContact() {
    return (
      <Segment ordinality="secondary" className="passport-form--emergency-contact">
        <span className="travel-information-form--title">
          {i18n('SHARED__PLACEHOLDER__EMERGENCY_CONTACT_OPTIONAL')}
        </span>
        <div className="pt2">
          <FormInputField name={'emergencyContactName'} placeholder="Name" />
          <PhoneNumberFields
            names={['emergencyContactPhoneNumber', 'emergencyContactCountryCode']}
            nameForPhoneNumber="emergencyContactPhoneNumber"
            nameForPhoneCountryCode="emergencyContactCountryCode"
            className="phone-number-field mt4 phone-number-field--international"
            onLabelClick={() => this._showFullScreenModal('emergencyContactCountryCode', COUNTRY_CODE_MODAL_ID)}
          />
        </div>
      </Segment>
    );
  }

  _onSecurityInformationSelected = (field: string) => {
    const { onChange, formData } = this.props;

    formData && formData[field] === 'On File' && onChange(field, '');
  };

  render() {
    const {
      formId,
      initialFormData = {},
      onSubmit,
      isInternational,
      clickSpecialAssistanceFn,
      specialAssistanceSelections,
      isEditablePassengerFirstMiddleName,
      isEditablePassengerLastName,
      editNamesMessage
    } = this.props;
    const shouldDisableRapidRewardsNumber = !_.isEmpty(_.get(initialFormData, 'rapidRewardsNumber'));
    const saFormData = !_.isEmpty(specialAssistanceSelections)
      ? specialAssistanceSelections
      : _.get(initialFormData, 'specialAssistance');
    const disableSpecialAssistance = _.get(initialFormData, 'disableSpecialAssistance');
    const knownTravelerNumber = 'knownTravelerNumber';
    const redressNumber = 'redressNumber';
    const exitNamesMessageText = _.get(editNamesMessage, 'body', '');

    return (
      <div>
        <Form formId={formId} className="travel-information-form" name={'travel-info'} onSubmit={onSubmit}>
          <Segments>
            <Segment className="travel-information-form--info">
              <Fields>
                <span className="travel-information-form--title" >{i18n('VIEW_RESERVATION__TRAVEL_INFORMATION__PASSENGER_INFORMATION')}</span>
                <FormInputField
                  name="firstName"
                  disabled={!isEditablePassengerFirstMiddleName}
                  placeholder={i18n('SHARED__PLACEHOLDER__FIRST_NAME')}
                />
                <FormInputField
                  name="middleName"
                  disabled={!isEditablePassengerFirstMiddleName}
                  placeholder={i18n('SHARED__PLACEHOLDER__MIDDLE_NAME')}
                />
                <FormInputField
                  name="lastName"
                  disabled={!isEditablePassengerLastName}
                  placeholder={i18n('SHARED__PLACEHOLDER__LAST_NAME')}
                />
                <FormInputField
                  name="suffix"
                  disabled
                  placeholder={i18n('SHARED__PLACEHOLDER__SUFFIX')}
                />
                {exitNamesMessageText &&
                  <p className="sa-flight-in-progress-message" data-qa="edit-names-message">
                    {exitNamesMessageText}
                  </p>
                }
                <span className="travel-information-form--title" >
                  {i18n('VIEW_RESERVATION__TRAVEL_INFORMATION__PASSENGER_DATE_OF_BIRTH')}</span>
                <FormInputField
                  name="dateOfBirth"
                  disabled
                  placeholder={i18n('SHARED__PLACEHOLDER__DATE_OF_BIRTH_TEXT')}
                />
                <span className="travel-information-form--title" >{i18n('VIEW_RESERVATION__TRAVEL_INFORMATION__PASSENGER_GENDER')}</span>
                <FormInputField
                  name="gender"
                  disabled
                  placeholder={i18n('SHARED__PLACEHOLDER__GENDER')}
                />
              </Fields>
            </Segment>
            <Segment className="travel-information-form--info">
              <span className="travel-information-form--title">
                {i18n('AIR_BOOKING__PASSENGERS__RAPID_REWARDS_NUMBER')}
              </span>
              <FormInputField
                name="rapidRewardsNumber"
                placeholder={i18n('SHARED__PLACEHOLDER__OPTIONAL')}
                type="tel"
                disabled={shouldDisableRapidRewardsNumber}
              />

              <Fields type="grouped" data-qa="security-info-label">
                <span className="travel-information-form--title">
                  {i18n('VIEW_RESERVATION__TRAVEL_INFORMATION_PAGE__SECURITY_INFORMATION')}
                </span>
                <span>
                  <p className="travel-information-form--ktn-redress-subtitle">
                    {i18n('SHARED__PLACEHOLDER__KNOWN_TRAVELER_NUMBER')}
                  </p>
                </span>
                <FormInputField
                  name={knownTravelerNumber}
                  placeholder={i18n('SHARED__PLACEHOLDER__KNOWN_TRAVELER_NUMBER')}
                  onFocus={() => this._onSecurityInformationSelected(knownTravelerNumber)}
                />
                <span>
                  <p className="travel-information-form--ktn-redress-subtitle">
                    {i18n('SHARED__PLACEHOLDER__REDRESS_NUMBER')}
                  </p>
                </span>
                <FormInputField
                  name={redressNumber}
                  placeholder={i18n('SHARED__PLACEHOLDER__REDRESS_NUMBER')}
                  type="tel"
                  onFocus={() => this._onSecurityInformationSelected(redressNumber)}
                />
              </Fields>
            </Segment>

            {isInternational && this._getPassport()}
            {isInternational && this._getEmergencyContact()}

            <Segment ordinality="secondary" className="travel-information-form--special-assistance">
              <SpecialAssistanceNavItem
                name="specialAssistanceNavItem"
                onClick={clickSpecialAssistanceFn}
                specialAssistanceSelections={saFormData}
                disabled={disableSpecialAssistance}
              />
            </Segment>

            <Segment className="travel-information-form--save-button">
              <Button data-qa="form-submit-button" type="submit" color="yellow" size="huge" fluid>
                {i18n('SHARED__PLACEHOLDER__SAVE_BUTTON')}
              </Button>
            </Segment>
          </Segments>
        </Form>

        <FullScreenModal id={COUNTRY_LIST_MODAL_ID}>
          <CountryList
            title="Select Country"
            selectedIsoCountryCode={this._getSelectedIsoCountryCode}
            onCancel={() => hideFullScreenModal(COUNTRY_LIST_MODAL_ID)}
            onSelectedCountry={this._onCountrySelected}
          />
        </FullScreenModal>
        <FullScreenModal id={COUNTRY_CODE_MODAL_ID}>
          <PhoneCountryCodeList
            onCountryCodeSelect={this._updateCountryCode}
            onCancel={() => hideFullScreenModal(COUNTRY_CODE_MODAL_ID)}
          />
        </FullScreenModal>
      </div>
    );
  }
}

export default withForm({
  formValidator: travelInformationFormValidator
})(TravelInformationForm);
