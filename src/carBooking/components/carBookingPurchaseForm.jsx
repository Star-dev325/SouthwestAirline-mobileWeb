// @flow
import React from 'react';
import Form from 'src/shared/form/components/form';
import withForm from 'src/shared/form/enhancers/withForm';
import Fields from 'src/shared/components/fields';
import Button from 'src/shared/components/button';
import Segment from 'src/shared/components/segment';
import FormInputField from 'src/shared/form/fields/formInputField';
import optionsHelper from 'src/shared/helpers/optionsHelper';
import PhoneNumberFields from 'src/shared/form/fields/phoneNumberFields';
import PhoneCountryCodeList from 'src/shared/components/phoneCountryCodeList';
import FullScreenModal from 'src/shared/components/fullScreenModal/fullScreenModal';
import purposeOfTravelTypes from 'src/shared/constants/purposeOfTravelTypes';
import FormSelectField from 'src/shared/form/fields/formSelectField';
import PriceTotalLine from 'src/shared/components/priceTotalLine';
import DriverInfoFields from 'src/carBooking/components/driverInfoFields';
import PassengerInfoSummary from 'src/carBooking/components/passengerInfoSummary';
import { raiseSatelliteEvent } from 'src/shared/analytics/helpers/analyticsEventHelper';
import {
  hideFullScreenModal,
  showFullScreenModal
} from 'src/shared/components/fullScreenModal/helpers/fullScreenModalHelper';
import CarBookingPurchaseFormValidator from 'src/shared/form/formValidators/carBookingPurchaseFormValidator';
import i18n from '@swa-ui/locale';

import type { FormData } from 'src/shared/form/flow-typed/form.types';
import type { DriverInfoType, CarBookingContactInfoType } from 'src/carBooking/flow-typed/carBooking.types';
import type { CurrencyType } from 'src/shared/flow-typed/shared.types';

type Props = {
  formId: string,
  totalWithTaxesAndCurrencyCode: CurrencyType,
  driverInfo: ?DriverInfoType,
  initialFormData: ?CarBookingContactInfoType,
  onSubmit: (FormData) => void,
  onChange: (fieldName: string, fieldValue: *) => void,
  onDriverInfoClick: (*) => void,
  isUserLoggedIn: boolean
};

const COUNTRY_CODE_MODAL_ID = 'countryCode';

class CarBookingPurchaseForm extends React.Component<Props> {
  _updateCountryCode = ({ countryCode }: { countryCode: string }) => {
    const { onChange } = this.props;

    hideFullScreenModal(COUNTRY_CODE_MODAL_ID);

    onChange('driverIsoCountryCode', countryCode);
    onChange('driverPhoneNumber', '');
  };

  render() {
    const { formId, totalWithTaxesAndCurrencyCode, driverInfo, onDriverInfoClick, onSubmit, isUserLoggedIn } =
      this.props;

    return (
      <div>
        <Form
          formId={formId}
          name="car-booking-purchase-form"
          className="car-booking-purchase-form"
          onSubmit={onSubmit}
        >
          {!isUserLoggedIn && <DriverInfoFields />}
          {isUserLoggedIn && driverInfo && (
            <Segment ordinality="secondary">
              <div className="mt5">
                <label className="label large mb5 block gray5 bold">{i18n('CAR_BOOKING__DRIVER_TITLE')}</label>
                <PassengerInfoSummary onClick={onDriverInfoClick} passengerInfos={[driverInfo]} />
              </div>
            </Segment>
          )}

          <Segment ordinality="secondary">
            <Fields type="grouped" label={i18n('CAR_BOOKING__PURCHASE_FORM__PHONE_NUMBER')}>
              <PhoneNumberFields
                names={['driverPhoneNumber', 'driverIsoCountryCode']}
                nameForPhoneNumber="driverPhoneNumber"
                nameForPhoneCountryCode="driverIsoCountryCode"
                className="phone-number-field"
                data-qa="car-booking-purchase-form-phone-number"
                onLabelClick={() => showFullScreenModal(COUNTRY_CODE_MODAL_ID)}
                onFocus={() => raiseSatelliteEvent('form:phonenumber')}
              />
            </Fields>
          </Segment>

          <Segment ordinality="secondary">
            <Fields type="grouped" label={i18n('CAR_BOOKING__PURCHASE_FORM__CONFIRMATION_EMAIL')}>
              <FormInputField
                name="confirmationEmail"
                placeholder="Email address"
                type="email"
                onFocus={() => raiseSatelliteEvent('form:emailaddress')}
              />
            </Fields>
          </Segment>

          <Segment ordinality="secondary">
            <Fields type="grouped" label={i18n('CAR_BOOKING__PURCHASE_FORM__TRAVEL_PURPOSE')} className="mb5">
              <FormSelectField
                name="purposeOfTravel"
                placeholder="Select (optional)"
                options={optionsHelper.getOptionsByMeta(purposeOfTravelTypes)}
                onFocus={() => raiseSatelliteEvent('form:purposeoftravel')}
              />
            </Fields>
          </Segment>

          <div className="bgpblue p4 bdb bdpdkblue white xlarge">
            <PriceTotalLine
              title={i18n('CAR_BOOKING__PURCHASE_FORM__TOTAL')}
              type={'total'}
              total={totalWithTaxesAndCurrencyCode}
              className="mb4"
            />

            <PriceTotalLine
              title={i18n('CAR_BOOKING__PURCHASE_FORM__DUE_NOW')}
              type={'total'}
              total={{ amount: '0.00', currencyCode: 'USD' }}
            />
          </div>

          <div className="bgpblue p4">
            <div className="white medium lineheight14 mb5">
              <p className="bold">{i18n('CAR_BOOKING__PURCHASE_FORM__NOTE_TITLE')}</p>
              <p data-qa="purchase-note">{i18n('CAR_BOOKING__PURCHASE_FORM__NOTE_CONTENT')}</p>
            </div>
            <Button size="large" color="yellow" type="submit" role="submit" fluid>
              {i18n('CAR_BOOKING__RESERVE')}
            </Button>
          </div>
        </Form>
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
  formValidator: CarBookingPurchaseFormValidator,
  defaultValues: () => ({
    driverIsoCountryCode: 'US'
  })
})(CarBookingPurchaseForm);
