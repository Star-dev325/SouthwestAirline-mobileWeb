// @flow
import i18n from '@swa-ui/locale';
import cx from 'classnames';
import React from 'react';
import Currency from 'src/shared/components/currency';
import FlightTimes from 'src/shared/components/flightTimes';
import LabelContainer from 'src/shared/components/labelContainer';
import MultiDayIndicator from 'src/shared/components/multiDayIndicator';
import type { FlightProductCard } from 'src/shared/flow-typed/shared.types';
import { calculateFlightNumberFontSize } from 'src/shared/helpers/flightInfoHelper';

type Props = {
  flightProductCard: FlightProductCard,
  isAirChangeOrReaccom?: boolean,
  isExpand?: boolean,
  isPromoCodeApplied?: boolean,
  isSameDay?: boolean,
  onProductSelected: (FlightProductCard) => void
};

export default class FlightProduct extends React.Component<Props> {
  static defaultProps = {
    isExpand: false,
    isPromoCodeApplied: false,
    onProductSelected: () => {}
  };

  renderHeader(flightProductCard: FlightProductCard, onProductSelected: *) {
    const {
      arrivalTime,
      departureTime,
      duration,
      hasLowestFare,
      isNextDayArrival,
      isOvernight,
      shortStopDescription,
      stopCity
    } = flightProductCard;

    return (
      <div
        className="flight-product--container"
        data-qa="flightProducts"
        data-testid="flightProducts"
        onClick={flightProductCard.reasonIfUnavailable ? () => {} : onProductSelected.bind(this, flightProductCard)}
      >
        <div className="main-col">
          <FlightTimes departureTime={departureTime} arrivalTime={arrivalTime} hideIsNextDay isStretched />
          <div className="flight-data">
            <div className="flags">
              <div
                className={cx('data-object stops-flag', {
                  nonstop: shortStopDescription === i18n('SHARED__COMMON__NONSTOP')
                })}
              >
                <span className="stops">{shortStopDescription}</span>
                {!!stopCity && <span>, {stopCity}</span>}
              </div>
              {hasLowestFare && <div className="data-object low-fare-flag">{i18n('AIR_BOOKING__LOW_FARE')}</div>}
              <div className="time-info data-object">{duration}</div>
              <div className="time-info data-object next-day-overnight" data-qa="is-next-day-or-overnight">
                <MultiDayIndicator isNextDay={isNextDayArrival} isOvernight={isOvernight} />
              </div>
            </div>
          </div>
        </div>
        <div className="fare-col">
          {flightProductCard.reasonIfUnavailable
            ? this._renderUnavailablePricing()
            : this._renderAvailablePricing(flightProductCard)}
        </div>
      </div>
    );
  }

  _renderAvailablePricing(flightProductCard: FlightProductCard) {
    const {
      dynamicWaiverAvailabilityText,
      startingFromPrice,
      discountedStartingFromPrice,
      discountedStartingFromPriceTax,
      startingFromPricePointTax,
      startingFromPriceDifference,
      startingFromPriceDiffPointsTax,
      labelText,
      flightNumbers
    } = flightProductCard;

    const { isAirChangeOrReaccom, isPromoCodeApplied, isSameDay, isExpand } = this.props;

    if (dynamicWaiverAvailabilityText) {
      return (
        <div className="fare-container">
          <div className="fare-content dynamic-waiver" data-qa="dynamic-waiver-fare">
            {dynamicWaiverAvailabilityText}
          </div>
        </div>
      );
    }

    if (isAirChangeOrReaccom && startingFromPriceDifference) {
      return (
        <div className="fare-container">
          <div className="fare-content" data-qa="diff-price-fare">
            <div>From</div>
            <Currency {...startingFromPriceDifference} />
            {!!startingFromPriceDiffPointsTax && (
              <div className="intl-points-taxes">
                <Currency className="intl-points-taxes--currency" {...startingFromPriceDiffPointsTax} />
              </div>
            )}
          </div>
        </div>
      );
    } else if (startingFromPrice) {
      const shouldShowDiscountedFare = !!isPromoCodeApplied && !!discountedStartingFromPrice;
      const _fareTaxes = discountedStartingFromPriceTax ? discountedStartingFromPriceTax : startingFromPricePointTax;

      return (
        <div className="fare-container">
          <div className="fare-content" data-qa="regular-price-fare">
            {!shouldShowDiscountedFare && <div>From</div>}
            <Currency {...startingFromPrice} strikeThrough={shouldShowDiscountedFare} />
            {shouldShowDiscountedFare && <Currency {...discountedStartingFromPrice} />}
            {!!_fareTaxes && (
              <div className="intl-points-taxes">
                +<Currency className="intl-points-taxes--currency" {..._fareTaxes} />
              </div>
            )}
          </div>
        </div>
      );
    } else if (isSameDay) {
      return (
        <>
          {!isExpand && (
            <div className="fare-container">
              <div className="fare-content-sameday" data-qa="diff-price-fare">
                <div className={cx('label-text', labelText !== i18n('SHARED__COMMON__SEE_OPTIONS') && 'currency')}>
                  <span data-qa="total-amount">{labelText}</span>
                </div>
              </div>
            </div>
          )}
          {isExpand && (
            <div className="flight-number-group">
              <LabelContainer labelText={`${i18n('SHARED__COMMON__FLIGHT')} #`} />
              <span className={`flight-number ${calculateFlightNumberFontSize(flightNumbers)}`}>{flightNumbers}</span>
            </div>
          )}
        </>
      );
    }
  }

  _renderUnavailablePricing() {
    return (
      <div className="fare-container unavailable">
        <div className="fare-content unavailable">Unavailable</div>
      </div>
    );
  }

  render() {
    const { flightProductCard, onProductSelected } = this.props;

    return (
      <div className="flight-product-panel rd2 px3 py4 bgwhite" data-qa="flightProductItem">
        {this.renderHeader(flightProductCard, onProductSelected)}
      </div>
    );
  }
}
