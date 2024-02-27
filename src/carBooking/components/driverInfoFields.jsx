// @flow
import React from 'react';
import Segment from 'src/shared/components/segment';
import FormInputField from 'src/shared/form/fields/formInputField';
import Fields from 'src/shared/components/fields';
import { raiseSatelliteEvent } from 'src/shared/analytics/helpers/analyticsEventHelper';
import i18n from '@swa-ui/locale';

const DriverInfoFields = () => (
  <div>
    <Segment ordinality="secondary">
      <Fields type="grouped" label={i18n('CAR_BOOKING__PURCHASE_FORM__DRIVER_INFO')}>
        <FormInputField
          name="firstName"
          placeholder={i18n('SHARED__PLACEHOLDER__FIRST_NAME')}
          onFocus={() => raiseSatelliteEvent('form:namedetail')}
        />
        <FormInputField name="middleName" placeholder={i18n('SHARED__PLACEHOLDER__MIDDLE_NAME_OPTIONAL')} />
        <FormInputField name="lastName" placeholder={i18n('SHARED__PLACEHOLDER__LAST_NAME')} />
      </Fields>
    </Segment>

    <Segment ordinality="secondary">
      <Fields type="grouped" label={i18n('CAR_BOOKING__PURCHASE_FORM__RAPID_REWARDS_NUMBER')}>
        <FormInputField
          name="accountNumber"
          placeholder={i18n('SHARED__PLACEHOLDER__RAPID_REWARDS_ACCOUNT_NUMBER')}
          type="tel"
          onFocus={() => raiseSatelliteEvent('form:membernumber')}
        />
      </Fields>
    </Segment>
  </div>
);

export default DriverInfoFields;
