// @flow
import React from 'react';
import _ from 'lodash';

import HorizontalLabelContainer from 'src/shared/components/horizontalLabelContainer';
import WcmStyledPageImage from 'src/wcm/components/wcmStyledPageImage';
import { dollarsFromCents } from 'src/shared/helpers/currencyUnitConversionHelper';
import { formatCurrency } from 'src/shared/helpers/formatCurrencyHelper';
import Currency from 'src/shared/components/currency';
import SpecialRate from 'src/carBooking/components/specialRate';
import i18n from '@swa-ui/locale';

import type { CarReservationDetailType, MileageType } from 'src/viewReservation/flow-typed/viewReservation.types';

type Props = CarReservationDetailType;

class CarReservationDetail extends React.Component<Props> {
  static defaultProps = {
    selectedCarExtras: []
  };

  _formatMileage = (mileage: MileageType) => {
    const { cents, freeMileage, per } = mileage;
    const extraChargeForMileage = cents !== 0 && !_.isEmpty(per);

    if (extraChargeForMileage) {
      const dollars = dollarsFromCents(cents);
      const formattedCents = formatCurrency(dollars, true);

      return (
        <span>
          {freeMileage} Free - <sup className="dollar-sign smaller">$</sup>
          {formattedCents} per {per}
        </span>
      );
    } else {
      return freeMileage;
    }
  };

  _specialRateMarker = (promoCodeApplied: boolean) => (promoCodeApplied ? <SpecialRate className="mt2 small" /> : null);

  _carExtrasLine = (selectedCarExtras: Array<*> = []) => {
    if (_.isEmpty(selectedCarExtras)) {
      return null;
    }

    return (
      <HorizontalLabelContainer label="Rental Extras" data-qa="car-booking-extras-container">
        {_.map(selectedCarExtras, (value, index: number) => (
          <span className="block align-right" key={index} dangerouslySetInnerHTML={{ __html: value.description }} />
        ))}
      </HorizontalLabelContainer>
    );
  };

  render() {
    const {
      carType,
      promoCodeApplied,
      selectedCarExtras,
      dailyRate,
      vendorImage,
      rrIncentiveText,
      showTotalPrice,
      rentalDeskLocation,
      mileage,
      dailyRateWithCurrencyCode,
      totalWithCurrencyCode,
      totalWithTaxesAndCurrencyCode,
      baseRate,
      totalPrice
    } = this.props;
    const dailyRatePrice = dailyRate && dailyRate.price instanceof Object ? dailyRate.price : dailyRateWithCurrencyCode;
    const baseRatePrice = baseRate instanceof Object ? baseRate : totalWithCurrencyCode;
    const totalPriceWithTaxes = totalPrice instanceof Object ? totalPrice : totalWithTaxesAndCurrencyCode;

    return (
      <div className="car-reservation-detail mt4 pt5 bdt">
        <div>
          <div className="flex flex-cross-center">
            <div className="flex6">
              <WcmStyledPageImage className="car-reservation--vendor-logo" image={vendorImage} />
            </div>
            {!!rrIncentiveText && <div className="green flex6 align-right large">{rrIncentiveText}</div>}
          </div>
          <div className="gray5 my2">{rentalDeskLocation}</div>
        </div>
        <HorizontalLabelContainer label={i18n('CAR_BOOKING__CAR_RESERVATION__CAR_TYPE')}>
          {carType}
        </HorizontalLabelContainer>
        {this._carExtrasLine(selectedCarExtras)}
        {this._specialRateMarker(promoCodeApplied)}
        <HorizontalLabelContainer label={i18n('CAR_BOOKING__CAR_RESERVATION__DAILY_RATE')}>
          <div>
            <span>{dailyRate.perQuantity}</span> {i18n('CAR_BOOKING__CAR_RESERVATION__SYMBOL')}
            <Currency {...dailyRatePrice} className="car-reservation-detail--currency" />
          </div>
        </HorizontalLabelContainer>
        <HorizontalLabelContainer label={i18n('CAR_BOOKING__CAR_RESERVATION__BASE_RATE')}>
          <Currency {...baseRatePrice} className="car-reservation-detail--currency" />
        </HorizontalLabelContainer>
        <HorizontalLabelContainer label={i18n('CAR_BOOKING__CAR_RESERVATION__MILEAGE')}>
          {this._formatMileage(mileage)}
        </HorizontalLabelContainer>
        {!!showTotalPrice && (
          <HorizontalLabelContainer label={i18n('CAR_BOOKING__RESULT__TOTAL')}>
            <Currency {...totalPriceWithTaxes} className="car-reservation-detail--currency" />
          </HorizontalLabelContainer>
        )}
      </div>
    );
  }
}

export default CarReservationDetail;
