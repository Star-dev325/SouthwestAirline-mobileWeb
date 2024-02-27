// @flow
import _ from 'lodash';
import React from 'react';
import i18n from '@swa-ui/locale';
import FormCheckboxField from 'src/shared/form/fields/formCheckboxField';

import type { UpgradedBoardingPassenger } from 'src/upgradedBoarding/flow-typed/upgradedBoarding.types';

type Props = {
  passengers: Array<UpgradedBoardingPassenger>,
  UPGRADED_BOARDING_BY_SEGMENT: boolean
};

const UpgradedBoardingPaxInfo = (props: Props) => {
  const { passengers, UPGRADED_BOARDING_BY_SEGMENT } = props;

  const _renderPaxInfo = (passenger: UpgradedBoardingPassenger) => (
    <React.Fragment>
      <div className="ub-eligible-flight-pax-info">{passenger.name}</div>
      <div className="ub-eligible-flight-pax-rr">{passenger.accountNumber}</div>
    </React.Fragment>
  );

  return (
    <div className="ub-eligible-flight-pax-section">
      <div className="ub-eligible-flight-pax-title">{i18n('UPGRADE_BOARDING_FOR')}</div>
      {passengers.map((passenger, key) =>
        (UPGRADED_BOARDING_BY_SEGMENT ? (
          _renderPaxInfo(passenger)
        ) : (
          <FormCheckboxField key={key} name={_.get(passenger, '_meta.productId')}>
            {_renderPaxInfo(passenger)}
          </FormCheckboxField>
        ))
      )}

      <div className="ub-eligible-flight-available-position-text">
        {i18n('UB_BEST_AVAILABLE_POSITION_TEXT')}{' '}
        <span className="ub-eligible-flight-available-position">{i18n('UB_BEST_AVAILABLE_POSITION')}</span>
      </div>
    </div>
  );
};

export default UpgradedBoardingPaxInfo;
