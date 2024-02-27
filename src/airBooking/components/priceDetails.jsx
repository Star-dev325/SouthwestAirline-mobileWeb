// @flow
import React from 'react';
import _ from 'lodash';
import PriceTotalLine from 'src/shared/components/priceTotalLine';
import PriceLine from 'src/shared/components/priceLine';
import EarlyBirdInPathPriceTotal from 'src/shared/components/earlyBirdInPathPriceTotal';
import { transformToEarlyBirdPriceDetails } from 'src/airBooking/transformers/transformToEarlyBirdPriceDetails';
import i18n from '@swa-ui/locale';

import type { EarlyBirdEligibility } from 'src/airBooking/flow-typed/airBooking.types';
import type {
  Fee,
  PassengerFare,
  EarlyBirdPriceDetailType,
  MoneyTotalType,
  TotalPerPassenger
} from 'src/shared/flow-typed/shared.types';

export type PriceDetailsPropsType = {
  adultFare: PassengerFare,
  adultPassengerType: string,
  earlyBirdEligibility?: ?EarlyBirdEligibility,
  infantFare?: ?PassengerFare,
  lapChildPassengerType: string,
  moneyTotal: MoneyTotalType,
  showEarlyBirdInFareBreakdown?: boolean,
  taxesAndFees?: Array<Fee>,
  totalPerPassenger?: ?TotalPerPassenger
};

const priceBreakdown = (
  passengerFare,
  passengerType,
  earlyBirdEligibility,
  showEarlyBirdInFareBreakdown,
  totalText,
  calculateFundsTaxAndFees,
  totalPerPassenger,
  isAdultFare = true
) => {
  const {
    baseFare: { fare, discount, totalBaseFare },
    paxTypeTotal,
    earlyBirdPriceDetails
  } = passengerFare;
  const { pointsTotal } = paxTypeTotal;
  const ebPriceDetails = !_.isEmpty(earlyBirdEligibility)
    ? transformToEarlyBirdPriceDetails(earlyBirdEligibility)
    : earlyBirdPriceDetails;
  const totalPerPassengerPoints = totalPerPassenger?.points ?? passengerFare?.totalPerPassenger?.points;
  const taxesAndFees = calculateFundsTaxAndFees ? calculateFundsTaxAndFees : passengerFare?.taxesAndFees;
  const totalPerPassengerMoney = totalPerPassenger?.money ?? passengerFare?.totalPerPassenger?.money;
  const passengerCount = totalPerPassenger?.passengerCount ?? passengerFare?.totalPerPassenger?.passengerCount;

  return (
    <>
      <div className="price-details-segment">
        <PriceLine
          title={`${passengerType} ${i18n('SHARED__PRICE_LINE_TITLES__PASSENGER_BASE_FARE')}`}
          total={fare}
          sign=""
        />
        {discount && <PriceLine title={i18n('SHARED__PRICE_LINE_TITLES__FARE_DISCOUNT')} total={discount} sign={'-'} />}
        {totalBaseFare && !pointsTotal && <PriceTotalLine title={''} type="addup" total={totalBaseFare} />}
      </div>
      <div className={`price-details-segment ${taxesAndFees ? '' : 'no-taxes'}`}>
        {_.map(taxesAndFees, (fees, index: number) => (
          <PriceLine title={fees.description} total={fees.fee} sign="+" key={index} />
        ))}
      </div>
      <div className="price-details-segment">
        <PriceTotalLine
          passengerCount={passengerCount}
          passengerType={passengerType}
          pointsTotal={totalPerPassengerPoints}
          priceTitleClass="fare-total-class"
          title={i18n(totalText)}
          total={totalPerPassengerMoney}
          type="totalPerPersonType"
        />
        {showEarlyBirdInFareBreakdown &&
          isAdultFare &&
          _.map(
            ebPriceDetails,
            (earlyBirdPriceDetail: EarlyBirdPriceDetailType, index: number) =>
              !!_.get(earlyBirdPriceDetail, 'purchasedCount') && (
                <EarlyBirdInPathPriceTotal {...earlyBirdPriceDetail} key={index} />
              )
          )}
      </div>
    </>
  );
};

const PriceDetails = ({
  adultFare,
  infantFare,
  adultPassengerType,
  lapChildPassengerType,
  earlyBirdEligibility,
  showEarlyBirdInFareBreakdown,
  moneyTotal,
  taxesAndFees,
  totalPerPassenger
}: PriceDetailsPropsType) => {
  const { pointsTotal } = adultFare.paxTypeTotal;
  const formattedPassengerType = i18n('SHARED__PRICE_LINE_TITLES__TOTAL_PASSENGER');
  const dollarTitle = pointsTotal ? i18n('SHARED__PRICE_LINE_TITLES__DOLLAR_TOTAL') : formattedPassengerType;

  return (
    <div className="price-details">
      {priceBreakdown(
        adultFare,
        adultPassengerType,
        earlyBirdEligibility,
        showEarlyBirdInFareBreakdown,
        'SHARED__PRICE_LINE_TITLES__TOTAL_PER_PASSENGER',
        taxesAndFees,
        totalPerPassenger
      )}
      {infantFare &&
        priceBreakdown(
          infantFare,
          lapChildPassengerType,
          earlyBirdEligibility,
          showEarlyBirdInFareBreakdown,
          'SHARED__PRICE_LINE_TITLES__TOTAL_PER_LAP_CHILD',
          taxesAndFees,
          totalPerPassenger,
          false
        )}
      <div className="price-details-segment total-per-segment">
        {pointsTotal && (
          <PriceTotalLine
            title={i18n('SHARED__PRICE_LINE_TITLES__POINTS_TOTAL')}
            type="totalPerSection"
            total={pointsTotal}
          />
        )}
        <PriceTotalLine title={dollarTitle} type="totalPerSection" total={moneyTotal} />
      </div>
    </div>
  );
};

export default PriceDetails;
