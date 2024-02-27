// @flow
import i18n from '@swa-ui/locale';
import cx from 'classnames';
import React, { Component } from 'react';
import Form from 'src/shared/form/components/form';
import FullScreenModal from 'src/shared/components/fullScreenModal/fullScreenModal';
import {
  hideFullScreenModal,
  showFullScreenModal
} from 'src/shared/components/fullScreenModal/helpers/fullScreenModalHelper';
import PageHeaderWithButtons from 'src/shared/components/pageHeaderWithButtons';
import PhoneCountryCodeList from 'src/shared/components/phoneCountryCodeList';
import { AIR_BOOKING_CONTACT_METHOD_FORM, DAY_OF_TRAVEL_CONTACT_METHOD_FORM } from 'src/shared/constants/formIds';
import { DOMESTIC_OPTIONS, INTERNATIONAL_OPTIONS, LANGUAGES } from 'src/shared/constants/contactMethodOptions';
import countryCodes from 'src/shared/constants/countryCode';
import withForm from 'src/shared/form/enhancers/withForm';
import ContactMethodRadioGroupField from 'src/shared/form/fields/contactMethodRadioGroupField';
import FormCheckboxField from 'src/shared/form/fields/formCheckboxField';
import FormInputField from 'src/shared/form/fields/formInputField';
import ContactMethodRadioInputField from 'src/shared/form/fields/formRadioField';
import PhoneNumberFields from 'src/shared/form/fields/phoneNumberFields';
import SwitchRadioField from 'src/shared/form/fields/switchRadioField';
import optionsHelper from 'src/shared/helpers/optionsHelper';
import contactMethodFormValidator from 'src/shared/form/formValidators/contactMethodFormValidator';
import * as contactMethodHelper from 'src/shared/helpers/contactMethodHelper';

import type { FormData } from 'src/shared/form/flow-typed/form.types';

const ContactMethodKeys = optionsHelper.keyMirror(DOMESTIC_OPTIONS);
const ContactMethodLanguageKeys = optionsHelper.keyMirror(LANGUAGES);
const COUNTRY_CODE_MODAL_ID = 'countryCode';

type Props = {
  formId: string,
  onSubmit: () => void,
  isAirBooking?: boolean,
  isInternationalBooking: boolean,
  isAlreadyHasContactMethod?: boolean,
  isLoggedIn?: boolean,
  formData: FormData,
  onChange: (fieldName: string, fieldValue: *) => void,
  goBack: () => void,
  message?: ?string
};

class ContactMethodForm extends Component<Props> {
  UNSAFE_componentWillReceiveProps(nextProps: Props) {
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
      isAirBooking,
      isInternationalBooking,
      formData: { declineNotifications, isNotificationsEnabled }
    } = this.props;

    return isAirBooking && isInternationalBooking ? isNotificationsEnabled : !declineNotifications;
  };

  _renderNotificationInputFields = () => {
    const {
      isAirBooking,
      isInternationalBooking,
      formData: { isNotificationsEnabled }
    } = this.props;

    return (
      <div className="notification-field">
        {isAirBooking && isInternationalBooking ? (
          <FormCheckboxField
            className="contact-method-item flex-cross-center flex-row-reverse"
            name="isNotificationsEnabled"
            noChildrenLeftMargin
            onChange={() => !isNotificationsEnabled}
            size="large"
          >
            <p className={cx({ pdkblue: isNotificationsEnabled, gray5: !isNotificationsEnabled })}>
              {i18n('SHARED__PLACEHOLDER__ENABLE_NOTIFICATIONS')}
            </p>
          </FormCheckboxField>
        ) : (
          <ContactMethodRadioInputField
            className="contact-method--radio-button"
            label={i18n('SHARED__PLACEHOLDER__NOTIFICATION_TOGGLE')}
            name="declineNotifications"
          />
        )}
      </div>
    );
  };

  _renderContactMethodInputField = () => {
    const {
      formData: { contactMethod, declineNotifications },
      isAirBooking
    } = this.props;

    switch (contactMethod) {
      case ContactMethodKeys.EMAIL:
        return (
          <div className="contact-method-fields">
            {isAirBooking && (
              <label className="fields--label">{i18n('SHARED__CONTACT_METHOD_FIELD_LABELS__EMAIL')}</label>
            )}
            <FormInputField className="contact-email-field" name="email" placeholder="Email address" />
          </div>
        );
      case ContactMethodKeys.TEXT:
      case ContactMethodKeys.CALL:
        return (
          <div className="contact-method-fields">
            {isAirBooking && (
              <label className="fields--label">{i18n('SHARED__CONTACT_METHOD_FIELD_LABELS__PHONE_NUMBER')}</label>
            )}
            <PhoneNumberFields
              className="phone-number-field phone-number-field--international"
              isISOCountryCode={false}
              names={['phoneNumber', 'phoneCountryCode']}
              onLabelClick={!declineNotifications ? () => showFullScreenModal(COUNTRY_CODE_MODAL_ID) : (() => {})}
            />
          </div>
        );
      default:
        return null;
    }
  };

  _updateCountryCode = ({ countryCode }: { countryCode: string }) => {
    const { onChange } = this.props;

    hideFullScreenModal(COUNTRY_CODE_MODAL_ID).then(() => {
      onChange('phoneCountryCode', `${countryCodes[countryCode]}`);
      onChange('phoneNumber', '');
    });
  };

  _renderSaveContactMethod = () => {
    const {
      formData: { saveContactMethod },
      isAirBooking,
      isAlreadyHasContactMethod
    } = this.props;

    return (
      <div className="save-contact-method-field">
        {isAirBooking ? (
          <FormCheckboxField
            className="contact-method-item flex-row-reverse flex-cross-center"
            name="saveContactMethod"
            noChildrenLeftMargin
            onChange={() => !saveContactMethod}
            size="large"
          >
            <p className={cx({ gray5: !saveContactMethod, pdkblue: saveContactMethod })}>
              {i18n('SHARED__CONTACT_METHOD__SAVE_CONTACT_METHOD')}
            </p>
          </FormCheckboxField>
        ) : (
          <SwitchRadioField
            label={
              isAlreadyHasContactMethod
                ? i18n('SHARED__CONTACT_METHOD__UPDATE_CONTACT_METHOD')
                : i18n('SHARED__CONTACT_METHOD__SAVE_CONTACT_METHOD')
            }
            name="saveContactMethod"
          />
        )}
      </div>
    );
  };

  render() {
    const {
      formData: { declineNotifications, contactMethod },
      formId,
      goBack,
      isAirBooking,
      isInternationalBooking,
      isLoggedIn,
      message,
      onSubmit
    } = this.props;
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

    return (
      <div>
        <Form
          className={cx('contact-method', {
            'contact-method--decline-notifications': declineNotifications && formId !== AIR_BOOKING_CONTACT_METHOD_FORM,
            'contact-method-hybrid-design-air-booking': formId === AIR_BOOKING_CONTACT_METHOD_FORM
          })}
          formId={formId}
          onSubmit={onSubmit}
        >
          <div>
            <PageHeaderWithButtons
              leftButtons={leftButtons}
              rightButtons={rightButtons}
              title={i18n('SHARED__CONTACT_METHOD__PAGE_HEADER_TITLE')}
            />

            <div className="contact-method--content">
              {isInternationalBooking && (
                <div className={cx({ mt6: !isAirBooking })}>
                  {this._renderNotificationInputFields()}
                  {message && <p className="pt3 pr5 gray5 medium int-message">{message}</p>}
                  {this._getNotificationValue() && (
                    <div>
                      {isAirBooking && (
                        <label className="fields--label">
                          {i18n('SHARED__CONTACT_METHOD_FIELD_LABELS__CHOOSE_LANGUAGE')}
                        </label>
                      )}
                      <ContactMethodRadioGroupField
                        className="contact-method-languages"
                        isAirBooking={isAirBooking}
                        name="preferredLanguage"
                        radioGroupOptions={LANGUAGES}
                      />
                    </div>
                  )}
                </div>
              )}

              {this._getNotificationValue() && (
                <div
                  className={cx('contact-method-communication', {
                    'contact-method-fields--first-group': !isInternationalBooking
                  })}
                >
                  {isAirBooking && (
                    <label className="fields--label">
                      {i18n('SHARED__CONTACT_METHOD_FIELD_LABELS__CHOOSE_METHOD')}
                    </label>
                  )}
                  <ContactMethodRadioGroupField
                    name="contactMethod"
                    className="contact-method-options"
                    isAirBooking={isAirBooking}
                    radioGroupOptions={isInternationalBooking ? INTERNATIONAL_OPTIONS : DOMESTIC_OPTIONS}
                  />
                  <div className="helper-text">
                    {contactMethod && contactMethodHelper.getContactMethodMessage(contactMethod)}
                  </div>
                </div>
              )}
              {!isInternationalBooking && message && <p className="day-of-travel-message">{message}</p>}
              {this._getNotificationValue() && this._renderContactMethodInputField()}
              {isLoggedIn &&
                this._getNotificationValue() &&
                formId !== DAY_OF_TRAVEL_CONTACT_METHOD_FORM &&
                this._renderSaveContactMethod()}
            </div>
          </div>
        </Form>
        <FullScreenModal id={COUNTRY_CODE_MODAL_ID}>
          <PhoneCountryCodeList
            onCancel={() => hideFullScreenModal(COUNTRY_CODE_MODAL_ID)}
            onCountryCodeSelect={(countryInfo) => this._updateCountryCode(countryInfo)}
          />
        </FullScreenModal>
      </div>
    );
  }
}

export default withForm({
  defaultValues: (props: Props) => {
    const { isInternationalBooking } = props;
    const initialFormData = { phoneCountryCode: '1', saveContactMethod: false };

    if (isInternationalBooking) {
      return { ...{
        declineNotifications: false,
        isNotificationsEnabled: true,
        preferredLanguage: ContactMethodLanguageKeys.EN
      }, ...initialFormData };
    }

    return initialFormData;
  },
  fieldsToValidateOnChange: ['declineNotifications', 'isNotificationsEnabled'],
  formValidator: contactMethodFormValidator
})(ContactMethodForm);
