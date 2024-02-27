// @flow
import i18n from '@swa-ui/locale';
import pluralize from 'pluralize';
import React from 'react';
import CarBookingEnterCodesForm from 'src/carBooking/components/carBookingEnterCodesForm';
import { CAR_BOOKING_DISCOUNT_MODAL_ID, DEFAULT_PROMO_DISCOUNT_COUNT } from 'src/carBooking/constants/carBookingConstants';
import { hasDuplicatePromoCode } from 'src/carBooking/helpers/carBookingSearchRequestHelper';
import type { CarVendorType, PromoType } from 'src/carBooking/flow-typed/carBooking.types';
import { transformToDiscountValue } from 'src/carBooking/transformers/promoCodesFormTransformer';
import FullScreenModal from 'src/shared/components/fullScreenModal/fullScreenModal';
import {
  hideFullScreenModal,
  showFullScreenModal
} from 'src/shared/components/fullScreenModal/helpers/fullScreenModalHelper';
import { CAR_BOOKING_DISCOUNT_FORM } from 'src/shared/constants/formIds';
import withField from 'src/shared/form/enhancers/withField';
import BrowserObject from 'src/shared/helpers/browserObject';

const { history } = BrowserObject;

type Props = {
  value?: Array<PromoType>,
  carVendors: Array<CarVendorType>,
  onChange: (*) => void,
  isWebView?: boolean
};

const promoToSearchParams = (promo, index) => [
  { key: `carCodeVendor-${index}`, value: promo.vendor },
  { key: `carCodeType-${index}`, value: promo.type },
  { key: `carCode-${index}`, value: promo.code }
];

class CarBookingPromoCodeSelectorField extends React.Component<Props> {
  _onEnterCodesFormSubmitted = (formFields: *) => {
    const promos = transformToDiscountValue(formFields);

    this.props.onChange(promos);
    hideFullScreenModal(CAR_BOOKING_DISCOUNT_MODAL_ID).then(() => {
      const url = new URL(BrowserObject.location);

      promos.map(promoToSearchParams).forEach((promoParams) => {
        promoParams.map(({ key, value }) => {
          value && url.searchParams.set(key, value);
        });
      });

      history.pushState({}, '', url);
    });
  };

  _renderSelectedPromoCount = () => {
    const { value } = this.props;
    const num = hasDuplicatePromoCode(value)
      ? DEFAULT_PROMO_DISCOUNT_COUNT
      : value && value.filter((promo) => promo.vendor && promo.type && promo.code).length;

    return (
      <div className="gray4 regular car-booking-promo-code--select-count">
        {num ? `${num} ${pluralize('Code', num)} Entered` : i18n('CAR_BOOKING__PROMO_CODE_FORM__VIEW')}
      </div>
    );
  };

  render() {
    const { value, carVendors, isWebView } = this.props;

    return (
      <div>
        <div
          data-qa="promo-discounts"
          className="flex flex-main-between flex-cross-center px5"
          onClick={() => showFullScreenModal(CAR_BOOKING_DISCOUNT_MODAL_ID)}
        >
          <label className="xlarge">{i18n('CAR_BOOKING__PROMO_CODE_FORM__TITLE')}</label>
          {this._renderSelectedPromoCount()}
        </div>
        <FullScreenModal id={CAR_BOOKING_DISCOUNT_MODAL_ID}>
          <CarBookingEnterCodesForm
            formId={CAR_BOOKING_DISCOUNT_FORM}
            promos={value}
            carVendors={carVendors}
            onSubmit={this._onEnterCodesFormSubmitted}
            isWebView={isWebView}
          />
        </FullScreenModal>
      </div>
    );
  }
}

export default withField()(CarBookingPromoCodeSelectorField);
