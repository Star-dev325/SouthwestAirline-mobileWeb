// @flow
import React from 'react';
import _ from 'lodash';
import EarlyBirdBound from 'src/shared/components/earlyBirdBound';
import Currency from 'src/shared/components/currency';
import i18n from '@swa-ui/locale';
import cx from 'classnames';

import type { EarlyBirdEligibility } from 'src/airBooking/flow-typed/airBooking.types';

type Props = {
  isRadioButtonChecked: ?boolean,
  earlyBirdSelected?: boolean,
  earlyBirdEligibility: ?EarlyBirdEligibility,
  EARLY_BIRD_AB_TESTING: boolean
};

export class EarlyBirdInPathBreakdown extends React.Component<Props> {
  render() {
    const { earlyBirdEligibility, isRadioButtonChecked, earlyBirdSelected, EARLY_BIRD_AB_TESTING } = this.props;
    const { totalPrice, bounds, ineligibilityReasons } = earlyBirdEligibility || {};
    const shouldShowSelectedEarlyBird = EARLY_BIRD_AB_TESTING ? !!earlyBirdSelected : !!isRadioButtonChecked;

    return (
      shouldShowSelectedEarlyBird && (
        <div className="early-bird-in-path-breakdown">
          <div
            className={cx('early-bird-in-path-breakdown--message', { bdt: EARLY_BIRD_AB_TESTING })}
            data-qa="add-early-bird-check-in--message"
          >
            {i18n('SHARED__EARLY_BIRD__CHECK_IN_MESSAGE')}
          </div>
          {_.map(bounds, (bound, index: number) => (
            <EarlyBirdBound key={index} bound={bound} />
          ))}
          {ineligibilityReasons && (
            <div
              className="early-bird-in-path-breakdown--eligibility-verbiage-reasons"
              data-qa="add-early-bird-check-in--eligibility-verbiage-reasons"
            >
              {_.map(ineligibilityReasons, (reason, index: number) => (
                <p key={index}>{reason}</p>
              ))}
            </div>
          )}
          <div className="flex bgwhite py4 px5 flex-cross-center">
            <span className="larger flex7 gray5">{i18n('SHARED__EARLY_BIRD__CHECK_IN_ESTIMATED_TOTAL')}</span>
            <div className="flex5 align-right">
              <Currency {...totalPrice} className="bold" />
            </div>
          </div>
        </div>
      )
    );
  }
}

export default EarlyBirdInPathBreakdown;
