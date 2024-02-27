// @flow
import React from 'react';
import _ from 'lodash';
import PriceLine from 'src/shared/components/priceLine';
import PriceTotalLine from 'src/shared/components/priceTotalLine';
import i18n from '@swa-ui/locale';

import type {
  CarReservationDetailType,
  CarTaxWithCurrencyCodeType
} from 'src/viewReservation/flow-typed/viewReservation.types';

type Props = {
  carReservationDetail: CarReservationDetailType
};

const CarBookingTotalPriceDetails = (props: Props) => {
  const {
    carReservationDetail: { totalWithCurrencyCode, taxesWithCurrencyCode, totalWithTaxesAndCurrencyCode }
  } = props;

  return (
    <div className="price-details">
      <div className="price-details-segment">
        <PriceLine title={i18n('CAR_BOOKING__CAR_RESERVATION__BASE_RATE')} total={totalWithCurrencyCode} />
        {_.map(taxesWithCurrencyCode, (tax: CarTaxWithCurrencyCodeType, key: number) => (
          <PriceLine key={key} title={tax.type} total={tax.taxWithCurrencyCode} sign={'+'} />
        ))}
      </div>

      <div className="price-details-segment total-per-segment">
        <PriceTotalLine
          type={'totalPerSection'}
          title={i18n('CAR_BOOKING__RESULT__TOTAL')}
          total={totalWithTaxesAndCurrencyCode}
        />
      </div>
    </div>
  );
};

export default CarBookingTotalPriceDetails;
