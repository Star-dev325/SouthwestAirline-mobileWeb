// @flow
import React from 'react';
import _ from 'lodash';
import cx from 'classnames';
import SuccessfulPromoBanner from 'src/carBooking/components/successfulPromoBanner';
import UnsuccessfulPromoBanner from 'src/carBooking/components/unsuccessfulPromoBanner';

import type { NotAppliedPromoType, PromoCodeType } from 'src/carBooking/flow-typed/carBooking.types';

type Props = {
  promoCodes: ?PromoCodeType
};

class PromoCodeBanner extends React.Component<Props> {
  render() {
    if (!this.props.promoCodes) {
      return null;
    }

    const { promoCodes } = this.props;
    const numberOfAppliedPromoCodes = _.get(promoCodes, 'numberOfAppliedPromoCodes', 0);
    const notAppliedPromoCodes = _.get(promoCodes, 'notAppliedPromoCodes', []);

    return (
      <div className="mt6" data-qa="promo-code-banner">
        {!!numberOfAppliedPromoCodes && <SuccessfulPromoBanner numberOfAppliedPromoCodes={numberOfAppliedPromoCodes} />}
        {_.map(notAppliedPromoCodes, (notAppliedPromoCode: NotAppliedPromoType, index: number) => (
          <UnsuccessfulPromoBanner
            className={cx({ 'bdt bdpdkblue': index > 0 })}
            key={index}
            numberOfPromoCode={notAppliedPromoCode.numberOfPromoCode}
            message={notAppliedPromoCode.message}
          />
        ))}
      </div>
    );
  }
}

export default PromoCodeBanner;
