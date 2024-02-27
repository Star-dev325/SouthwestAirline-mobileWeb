// @flow
import React from 'react';
import cx from 'classnames';
import PriceTotalLine from 'src/shared/components/priceTotalLine';
import CarBookingTotalPriceDetails from 'src/carBooking/components/carBookingTotalPriceDetails';
import i18n from '@swa-ui/locale';

import type { CarReservationType } from 'src/carBooking/flow-typed/carBooking.types';

type Props = {
  carReservation: CarReservationType
};

type State = {
  showPriceBreakdown: boolean
};

class CarBookingTotalPrice extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showPriceBreakdown: false
    };
  }

  _togglePriceBreakdown = () => {
    this.setState({
      showPriceBreakdown: !this.state.showPriceBreakdown
    });
  };

  render() {
    const { carReservation } = this.props;
    const { showPriceBreakdown } = this.state;
    const { totalWithTaxesAndCurrencyCode } = carReservation.carReservationDetail;

    return (
      <div className="carbooking-total-price price-total">
        <div className="price-total--info">
          <PriceTotalLine
            title={i18n('CAR_BOOKING__PURCHASE_FORM__TOTAL')}
            type={'total'}
            total={totalWithTaxesAndCurrencyCode}
            className="bgpblue white pt3 xxlarge"
          />

          <div className="price-total--info-row">
            <div className={cx('price-total--info-col', 'price-total--info-col--dollar')}>
              <p>{i18n('CAR_BOOKING__PURCHASE_FORM__TOTAL_PRICE_NOTE_INCLUDE')}</p>
              <p>{i18n('CAR_BOOKING__PURCHASE_FORM__TOTAL_PRICE_NOTE_EXCLUDE')}</p>
            </div>
            <div
              className="price-total--info-col"
              data-qa="price-breakdown"
              ref="toggleBreakdown"
              onClick={this._togglePriceBreakdown}
            >
              <p ref="breakdownToggle">
                {showPriceBreakdown
                  ? i18n('CAR_BOOKING__PURCHASE_FORM__HIDE_PRICE_BREAKDOWN')
                  : i18n('CAR_BOOKING__PURCHASE_FORM__SHOW_PRICE_BREAKDOWN')}
              </p>
            </div>
          </div>
        </div>

        {showPriceBreakdown && (
          <div className="price-total--price-break-down">
            <CarBookingTotalPriceDetails carReservationDetail={carReservation.carReservationDetail} />
          </div>
        )}
      </div>
    );
  }
}

export default CarBookingTotalPrice;
