// @flow

import React, { Component } from 'react';
import cx from 'classnames';
import _ from 'lodash';

import Form from 'src/shared/form/components/form';
import withForm from 'src/shared/form/enhancers/withForm';
import FormCheckboxField from 'src/shared/form/fields/formCheckboxField';
import ContactMethodRadioGroupField from 'src/shared/form/fields/contactMethodRadioGroupField';
import { TRAVEL_MANAGER_OPTIONS } from 'src/shared/constants/contactMethodOptions';
import optionsHelper from 'src/shared/helpers/optionsHelper';
import PhoneNumberFields from 'src/shared/form/fields/phoneNumberFields';
import FormInputField from 'src/shared/form/fields/formInputField';
import {
  hideFullScreenModal,
  showFullScreenModal
} from 'src/shared/components/fullScreenModal/helpers/fullScreenModalHelper';
import FullScreenModal from 'src/shared/components/fullScreenModal/fullScreenModal';
import PhoneCountryCodeList from 'src/shared/components/phoneCountryCodeList';
import contactMethodFormValidator from 'src/shared/form/formValidators/contactMethodFormValidator';
import PageHeaderWithButtons from 'src/shared/components/pageHeaderWithButtons';
import i18n from '@swa-ui/locale';
import countryCodes from 'src/shared/constants/countryCode';
import { AIR_BOOKING_INFO_CONTACT_TRAVEL_MANAGER_FORM } from 'src/shared/constants/formIds';

import type { FormData } from 'src/shared/form/flow-typed/form.types';

const COUNTRY_CODE_MODAL_ID = 'countryCode';
const contactMethodKeys = optionsHelper.keyMirror(TRAVEL_MANAGER_OPTIONS);

type Props = {
  formId: string,
  onSubmit: () => void,
  isAirBooking?: boolean,
  isLoggedIn?: boolean,
  formData: FormData,
  onChange: (fieldName: string, fieldValue: *) => void,
  goBack: () => void
};

class ContactInfoTravelManagerForm extends Component<Props> {
  componentDidUpdate(nextProps: Props) {
    const {
      formData: { phoneCountryCode },
      onChange
    } = this.props;
    const {
      formData: { phoneCountryCode: nextPhoneCountryCode }
    } = nextProps;
    const isCountryDialingCodeUpdated = phoneCountryCode !== nextPhoneCountryCode;

    isCountryDialingCodeUpdated && onChange('phoneNumber', '');
  }

  _getNotificationValue = () => {
    const {
      formData: { declineNotifications }
    } = this.props;

    return !declineNotifications;
  };

  _renderNotificationInputFields = () => {
    const {
      isAirBooking,
      formData: { declineNotifications }
    } = this.props;

    return (
      <div className="notification-field">
        {isAirBooking && (
          <FormCheckboxField
            className="contact-method-item flex-cross-center flex-row-reverse"
            name="declineNotifications"
            noChildrenLeftMargin
            clickableChildren
            size="large"
          >
            <p className={cx({ pdkblue: declineNotifications, gray5: !declineNotifications })}>
              {i18n('SHARED_PLACEHOLDER_CONTACT_INFO_TRAVEL_MANAGER_TOGGLE')}
            </p>
          </FormCheckboxField>
        )}
      </div>
    );
  };

  _renderContactMethodInputField = () => {
    const {
      isAirBooking,
      formData: { contactMethod, declineNotifications }
    } = this.props;

    switch (contactMethod) {
      case contactMethodKeys.EMAIL_ME:
        return (
          <div className="contact-method-fields">
            {isAirBooking && (
              <label className="fields--label">{i18n('SHARED__CONTACT_METHOD_FIELD_LABELS__EMAIL')}</label>
            )}
            <FormInputField name="email" className="contact-email-field" placeholder="Email address" />
          </div>
        );
      case contactMethodKeys.CALL_ME:
        return (
          <div className="contact-method-fields">
            {isAirBooking && (
              <label className="fields--label">{i18n('SHARED__CONTACT_METHOD_FIELD_LABELS__PHONE_NUMBER')}</label>
            )}
            <PhoneNumberFields
              names={['phoneNumber', 'phoneCountryCode']}
              className="phone-number-field phone-number-field--international"
              onLabelClick={!declineNotifications ? () => showFullScreenModal(COUNTRY_CODE_MODAL_ID) : _.noop}
              isISOCountryCode={false}
            />
          </div>
        );
      default:
        return null;
    }
  };

  _updateCountryCode = ({ countryCode }: { countryCode: string }) => {
    const { onChange } = this.props;

    hideFullScreenModal(COUNTRY_CODE_MODAL_ID);
    onChange('phoneCountryCode', `${countryCodes[countryCode]}`);
    onChange('phoneNumber', '');
  };

  render() {
    const { formId, formData, isAirBooking, onSubmit, goBack } = this.props;
    const leftButtons = [
      {
        name: i18n('SHARED__BUTTON_TEXT__CANCEL'),
        onClick: goBack
      }
    ];
    const rightButtons = [
      {
        name: i18n('SHARED__BUTTON_TEXT__DONE'),
        type: 'submit'
      }
    ];

    const { declineNotifications, disclaimerText } = formData;

    const isContactMethodHybridDesignAirBooking = formId === AIR_BOOKING_INFO_CONTACT_TRAVEL_MANAGER_FORM;

    return (
      <>
        <Form
          formId={formId}
          className={cx('contact-method', {
            'contact-method--decline-notifications': declineNotifications && !isContactMethodHybridDesignAirBooking,
            'contact-method-hybrid-design-air-booking': isContactMethodHybridDesignAirBooking
          })}
          onSubmit={() => onSubmit()}
        >
          <PageHeaderWithButtons
            title={i18n('SHARED__CONTACT_INFO_TRAVEL_MANAGER__PAGE_HEADER_TITLE')}
            leftButtons={leftButtons}
            rightButtons={rightButtons}
          />
          <div className="contact-method--content">
            <div className={cx({ mt6: !isAirBooking })}>{this._renderNotificationInputFields()}</div>
            {this._getNotificationValue() && (
              <div className="contact-method-communication">
                {isAirBooking && (
                  <label className="fields--label">{i18n('SHARED__CONTACT_METHOD_FIELD_LABELS__CHOOSE_METHOD')}</label>
                )}
                <ContactMethodRadioGroupField
                  name="contactMethod"
                  className="contact-method-options"
                  isAirBooking={isAirBooking}
                  radioGroupOptions={TRAVEL_MANAGER_OPTIONS}
                />
              </div>
            )}
            {this._getNotificationValue() && this._renderContactMethodInputField()}
          </div>
        </Form>
        <FullScreenModal id={COUNTRY_CODE_MODAL_ID}>
          <PhoneCountryCodeList
            onCountryCodeSelect={(countryInfo) => this._updateCountryCode(countryInfo)}
            onCancel={() => hideFullScreenModal(COUNTRY_CODE_MODAL_ID)}
          />
        </FullScreenModal>
        {this._getNotificationValue() && disclaimerText && (
          <div className="contact-method--disclaimer-text dom-message">
            <p>{disclaimerText}</p>
          </div>
        )}
      </>
    );
  }
}

export default withForm({
  formValidator: contactMethodFormValidator,
  defaultValues: () => ({ phoneCountryCode: '1', disclaimerText: '' }),
  fieldsToValidateOnChange: ['declineNotifications']
})(ContactInfoTravelManagerForm);
