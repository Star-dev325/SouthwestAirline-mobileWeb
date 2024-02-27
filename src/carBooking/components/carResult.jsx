// @flow
import i18n from '@swa-ui/locale';
import React from 'react';
import AvailableCarVendor from 'src/carBooking/components/availableCarVendor';
import SpecialRate from 'src/carBooking/components/specialRate';
import UnavailableCarVendor from 'src/carBooking/components/unavailableCarVendor';
import { noop } from 'src/shared/helpers/jsUtils';
import WcmStyledPageImage from 'src/wcm/components/wcmStyledPageImage';

import type { CarResultVehicleType } from 'src/carBooking//flow-typed/carBooking.types';

type Props = {
  carResult: CarResultVehicleType,
  onClickFn: (CarResultVehicleType) => void
};

const CarResult = (props: Props) => {
  const { carResult, onClickFn } = props;
  const dataQaName = carResult?.isUnavailable ? 'car-result-unavailable' : 'car-result-available';
  const onClick = carResult?.isUnavailable ? noop : onClickFn;

  return (
    <div className="car-result" data-qa={dataQaName} onClick={() => onClick(carResult)}>
      <div className="bgwhite rdl2 flex8 flex flex-column flex-main-between">
        <div className="flex">
          <div className="flex5">
            <div className="flex flex-cross-center car-vendor-logo-container">
              <WcmStyledPageImage className="car-vendor-logo ml3" image={carResult.imageUrl} />
            </div>
          </div>
          {carResult.promoCodeApplied && <SpecialRate className="flex7 flex flex-main-center flex-cross-center" />}
        </div>
        {!!carResult.incentiveText && <div className="pl3 green pb2">{carResult.incentiveText}</div>}
        {!!carResult.isRapidRewardsPartner && (
          <div className="rapid-rewards-partners">{i18n('CAR_BOOKING__RAPID_REWARDS_PARTNERS__COPY')}</div>
        )}
      </div>
      {!carResult.isUnavailable && (
        <AvailableCarVendor
          dailyRateWithCurrencyCode={carResult.dailyRateWithCurrencyCode}
          totalWithTaxesAndCurrencyCode={carResult.totalWithTaxesAndCurrencyCode}
        />
      )}
      {carResult.isUnavailable && <UnavailableCarVendor />}
    </div>
  );
};

export default CarResult;
