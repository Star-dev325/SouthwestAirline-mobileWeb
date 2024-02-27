// @flow

import React from 'react';
import _ from 'lodash';
import cx from 'classnames';

import Currency from 'src/shared/components/currency';
import type { EarlyBirdInPathBound } from 'src/airBooking/flow-typed/airBooking.types';

type Props = {
  bound: EarlyBirdInPathBound
};

const EarlyBirdBound = (props: Props) => {
  const { bound } = props;
  const { flightNumbers, passengersGroups, isEligible } = bound;

  return (
    <div className="flex flex-main-between bgwhite px5 py3 bdb">
      <div className="flex4">
        <div
          data-qa="early-bird-bound--flight-info"
          className={cx('larger', { sdkblue: isEligible, gray4: !isEligible })}
        >
          {bound.originDestinationAirports}
        </div>
        <div data-qa="early-bird-bound--flight-number" className="gray4 medium">
          {flightNumbers}
        </div>
      </div>
      <div className="flex8">
        {_.map(passengersGroups, (passenger, index: number) => (
          <div
            key={index}
            className={cx('flex flex-main-between early-bird-bound--passenger', {
              mt3: index !== 0,
              'early-bird-bound--passenger_ineligible': !passenger.canPurchaseEarlyBird
            })}
          >
            <div>
              <div data-qa="early-bird-bound--pax-type" className="sdkblue larger passenger-type">
                {passenger.decisionDescription}
                {passenger.isAlist && <i className="icon_a-list right" />}
              </div>
              <div data-qa="early-bird-bound--fare-product-type" className="gray4 italic medium">
                {passenger.fareType}
              </div>
            </div>
            <div className="early-bird-bound--currency sdkblue">
              <Currency {...passenger.price} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EarlyBirdBound;
