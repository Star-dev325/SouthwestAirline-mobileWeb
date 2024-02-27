// @flow
import React from 'react';
import _ from 'lodash';
import dayjs from 'dayjs';
import cx from 'classnames';
import withForm from 'src/shared/form/enhancers/withForm';
import Form from 'src/shared/form/components/form';
import Button from 'src/shared/components/button';
import FormInputMaskField from 'src/shared/form/fields/formInputMaskField';
import FormRadioField from 'src/shared/form/fields/formRadioField';
import Segments from 'src/shared/components/segments';
import Segment from 'src/shared/components/segment';
import PhoneNumberFields from 'src/shared/form/fields/phoneNumberFields';
import Fields from 'src/shared/components/fields';
import FormInputField from 'src/shared/form/fields/formInputField';
import CountryNavItemField from 'src/shared/form/fields/countryNavItemField';
import FormDatePickerField from 'src/shared/form/fields/formDatePickerField';
import FullScreenModal from 'src/shared/components/fullScreenModal/fullScreenModal';
import passportFormValidator from 'src/shared/form/formValidators/passportFormValidator';
import PhoneCountryCodeList from 'src/shared/components/phoneCountryCodeList';
import { getMaskProps } from 'src/shared/form/helpers/formHelper';
import CountryList from 'src/shared/components/countryList';
import {
  hideFullScreenModal,
  showFullScreenModal,
  hideModalAndUpdateFormField
} from 'src/shared/components/fullScreenModal/helpers/fullScreenModalHelper';
import i18n from '@swa-ui/locale';

import type { PassportFormData } from 'src/shared/flow-typed/shared.types';

type Props = {
  formData: PassportFormData,
  onSubmit: (*) => void,
  onChange: (fieldName: string, fieldValue: *) => void,
  onPassPortNumberFocus: () => void,
  formId: string,
  passengerName: ?string,
  enableUserToHideEmergencyContact: boolean,
  shouldShowSaveEmergencyContactForAll: boolean,
  passportSubmitButtonText: string,
  disableNationalityItem: boolean,
  isEmergencyContactRequired?: boolean,
  isLapChild?: string
};

const COUNTRY_CODE_MODAL_ID = 'countryCode';
const PASSPORT_ISSUED_BY_MODAL_ID = 'passportIssuedBy';
const NATIONALITY_MODAL_ID = 'nationality';
const COUNTRY_OF_RESIDENCE_MODAL_ID = 'countryOfResidence';

class PassportForm extends React.Component<Props> {
  static defaultProps = {
    onPassPortNumberFocus: _.noop,
    enableUserToHideEmergencyContact: false,
    shouldShowSaveEmergencyContactForAll: false,
    passportSubmitButtonText: i18n('SHARED__PLACEHOLDER__SAVE_BUTTON'),
    disableNationalityItem: false
  };

  UNSAFE_componentWillReceiveProps(nextProps: Props) {
    // TODO: MOB-13174 add e2e test to cover this scenario
    const {
      formId,
      formData: { emergencyContactCountryCode },
      onChange
    } = this.props;
    const {
      formId: nextFormId,
      formData: { emergencyContactCountryCode: nextPhoneCountryCode }
    } = nextProps;
    const isCountryDialingCodeUpdated = formId === nextFormId && emergencyContactCountryCode !== nextPhoneCountryCode;

    isCountryDialingCodeUpdated && onChange('emergencyContactPhoneNumber', '');
  }

  _updateCountryCode = ({ countryCode }: { countryCode: string }) => {
    const { onChange } = this.props;

    hideFullScreenModal(COUNTRY_CODE_MODAL_ID);

    onChange('emergencyContactCountryCode', countryCode);
  };

  _renderCountrySelectModal = (modalId: string) => (
    <CountryList
      title="Select Country"
      selectedIsoCountryCode={_.get(this.props, `formData.${modalId}`, '')}
      onCancel={() => hideFullScreenModal(modalId)}
      onSelectedCountry={(value: ?string) => hideModalAndUpdateFormField(modalId, modalId, value, this.props.onChange)}
    />
  );

  _renderEmergencyContactSection = (
    enableUserToHideEmergencyContact,
    shouldShowEmergencyContact,
    shouldShowSaveEmergencyContactForAll
  ) => {
    const { isEmergencyContactRequired } = this.props;

    return (
      <Segment ordinality="secondary" className="passport-form--emergency-contact">
        {shouldShowEmergencyContact && (
          <div>
            <div className="passport-form--emergency-contact-header">
              {isEmergencyContactRequired
                ? i18n('SHARED__PLACEHOLDER__EMERGENCY_CONTACT')
                : i18n('SHARED__PLACEHOLDER__EMERGENCY_CONTACT_OPTIONAL')}
            </div>

            <FormInputField name={'emergencyContactName'} placeholder="Name" />
            <PhoneNumberFields
              names={['emergencyContactPhoneNumber', 'emergencyContactCountryCode']}
              nameForPhoneNumber="emergencyContactPhoneNumber"
              nameForPhoneCountryCode="emergencyContactCountryCode"
              className="phone-number-field mt4 phone-number-field--international"
              onLabelClick={() => showFullScreenModal(COUNTRY_CODE_MODAL_ID)}
            />
            <FormRadioField
              className={cx('mt5', { hide: !shouldShowSaveEmergencyContactForAll })}
              label={i18n('CHECK_IN__USE_FOR_ALL_PASSENGERS')}
              name="emergencyContactSaveForAllPassengers"
            />
          </div>
        )}
        <FormRadioField
          name="doNotWishToProvideAnEmergencyContact"
          className={cx('mt4', { hide: !enableUserToHideEmergencyContact })}
          label={i18n('SHARED__PLACEHOLDER__EMERGENCY_CONTACT_TOGGLE')}
        />
      </Segment>
    );
  };

  render() {
    const {
      formId,
      passengerName,
      onPassPortNumberFocus,
      onSubmit,
      enableUserToHideEmergencyContact,
      shouldShowSaveEmergencyContactForAll,
      formData,
      passportSubmitButtonText,
      disableNationalityItem,
      isLapChild
    } = this.props;

    const shouldShowEmergencyContact =
      !enableUserToHideEmergencyContact || !formData['doNotWishToProvideAnEmergencyContact'];
    const passportFormPassengerLabel = isLapChild
      ? 'VIEW_RESERVATION__BOARDING_INFO__LAP_CHILD_TITLE'
      : 'SHARED__PLACEHOLDER__PASSENGER';

    return (
      <div>
        <Form formId={formId} name={'passport'} className="passport-form" onSubmit={onSubmit}>
          {!_.isEmpty(passengerName) && (
            <div className="passport-form--passenger">
              <p className="passport-form--passenger-label">{i18n(passportFormPassengerLabel)}</p>
              <span className="passport-form--passenger-name">{passengerName}</span>
            </div>
          )}
          <Segments>
            <Segment ordinality="secondary" className="passport-form--info">
              <div className="gray5">{i18n('SHARED__PLACEHOLDER__PASSPORT_INFORMATION')}</div>
              <FormInputMaskField
                name={'passportNumber'}
                onFocus={onPassPortNumberFocus}
                placeholder="Passport Number"
                {...getMaskProps({ rule: '*', repeat: 15 })}
              />
              <CountryNavItemField
                name={'passportIssuedBy'}
                onNavItemClick={() => showFullScreenModal(PASSPORT_ISSUED_BY_MODAL_ID)}
                placeholder={'Passport was Issued by:'}
              />
              <CountryNavItemField
                name={'nationality'}
                onNavItemClick={() => showFullScreenModal(NATIONALITY_MODAL_ID)}
                placeholder={'Nationality'}
                disabled={disableNationalityItem}
              />

              <Fields type="grouped" label="Passport Expiration Date">
                <FormDatePickerField
                  name={'passportExpirationDate'}
                  defaultDate={dayjs().add(1, 'year').toDate()}
                  min={dayjs().toDate()}
                  max={dayjs().add(20, 'year').toDate()}
                />
              </Fields>

              <CountryNavItemField
                name={'countryOfResidence'}
                onNavItemClick={() => showFullScreenModal(COUNTRY_OF_RESIDENCE_MODAL_ID)}
                placeholder={'Country of Residence'}
              />
            </Segment>

            {!isLapChild &&
              this._renderEmergencyContactSection(
                enableUserToHideEmergencyContact,
                shouldShowEmergencyContact,
                shouldShowSaveEmergencyContactForAll
              )}
            <Segment className="passport-form--save-button">
              <Button className="continue " type="submit" color="yellow" size="huge" fluid>
                {passportSubmitButtonText}
              </Button>
            </Segment>
          </Segments>
        </Form>
        <FullScreenModal id={PASSPORT_ISSUED_BY_MODAL_ID}>
          {this._renderCountrySelectModal(PASSPORT_ISSUED_BY_MODAL_ID)}
        </FullScreenModal>
        <FullScreenModal id={NATIONALITY_MODAL_ID}>
          {this._renderCountrySelectModal(NATIONALITY_MODAL_ID)}
        </FullScreenModal>
        <FullScreenModal id={COUNTRY_OF_RESIDENCE_MODAL_ID}>
          {this._renderCountrySelectModal(COUNTRY_OF_RESIDENCE_MODAL_ID)}
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
  formValidator: passportFormValidator,
  defaultValues: () => ({ emergencyContactCountryCode: 'US' })
})(PassportForm);
