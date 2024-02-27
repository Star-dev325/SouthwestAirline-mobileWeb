import { storiesOf } from '@storybook/react';
import _ from 'lodash';
import React from 'react';
import FlightProduct from 'src/shared/components/flightProduct';
import { OUTBOUND } from 'src/shared/constants/flightBoundTypes';
import PassengerTypes from 'src/shared/constants/passengerTypes';
import FlightProductBudiler from 'test/builders/model/flightProductBuilder';

const { ADULT } = PassengerTypes;

storiesOf('components/flightProduct', module)
  .add('default', () => {
    const defaultFlightProduct = new FlightProductBudiler()
      .withStopDescription({
        stopDescription: '1 Stop, HOU',
        stopDescriptionOnSelect: '1 Stop, change planes HOU',
        shortStopDescription: '1 Stop',
        stopCity: 'HOU'
      })
      .build();

    return (
      <FlightProduct
        flightProductCard={defaultFlightProduct}
        onProductSelected={_.noop}
        onFareDetailsClick={_.noop}
        boundType={OUTBOUND}
        paxType={ADULT}
      />
    );
  })
  .add('all fares are unavailable', () => (
    <FlightProduct
      flightProductCard={new FlightProductBudiler().withAllFaresUnavailableWithReason().build()}
      onProductSelected={_.noop}
      onFareDetailsClick={_.noop}
      boundType={OUTBOUND}
      paxType={ADULT}
    />
  ))
  .add('points with promo code applied', () => (
    <FlightProduct
      flightProductCard={new FlightProductBudiler().withPoints().build()}
      onProductSelected={_.noop}
      onFareDetailsClick={_.noop}
      boundType={OUTBOUND}
      paxType={ADULT}
      isPromoCodeApplied
    />
  ))
  .add('dollars with promo code applied', () => (
    <FlightProduct
      flightProductCard={new FlightProductBudiler().build()}
      onProductSelected={_.noop}
      onFareDetailsClick={_.noop}
      boundType={OUTBOUND}
      paxType={ADULT}
      isPromoCodeApplied
    />
  ))
  .add('points with promo code applied, with stop, lowest fare, and next day', () => (
    <FlightProduct
      flightProductCard={new FlightProductBudiler()
        .withPoints()
        .withStopDescription({
          stopDescription: '1 Stop, HOU',
          stopDescriptionOnSelect: '1 Stop, change planes HOU',
          shortStopDescription: '1 Stop',
          stopCity: 'HOU'
        })
        .withLowestFlight()
        .withNextDayArrival()
        .build()}
      onProductSelected={_.noop}
      onFareDetailsClick={_.noop}
      boundType={OUTBOUND}
      paxType={ADULT}
      isPromoCodeApplied
    />
  ))
  .add('dollars with overnight', () => {
    <FlightProduct
      flightProductCard={new FlightProductBudiler().withOvernight().build()}
      onProductSelected={_.noop}
      onFareDetailsClick={_.noop}
      boundType={OUTBOUND}
      paxType={ADULT}
    />;
  })
  .add('points with overnight', () => {
    <FlightProduct
      flightProductCard={new FlightProductBudiler().withPoints().withOvernight().build()}
      onProductSelected={_.noop}
      onFareDetailsClick={_.noop}
      boundType={OUTBOUND}
      paxType={ADULT}
    />;
  });
