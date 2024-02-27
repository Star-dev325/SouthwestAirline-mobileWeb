// @flow
import React from 'react';
import _ from 'lodash';
import cx from 'classnames';

import TravelFundsConstants from 'src/travelFunds/constants/travelFundsConstants';

import type { TravelFundsOptionsType } from 'src/travelFunds/flow-typed/travelFunds.types';

const { FUND_TYPES, FUND_TYPES_FORMATTED } = TravelFundsConstants;

type Props = {
  onClickSelector: (TravelFundsOptionsType) => void,
  selectedFund: TravelFundsOptionsType,
  fundTypes: Array<string>
};

const FundTypeSelector = (props: Props) => {
  const _fundTypeStringConverter = (fundType: string): TravelFundsOptionsType => {
    switch (fundType) {
      case FUND_TYPES[0]:
        return FUND_TYPES_FORMATTED[0];
      case FUND_TYPES[1]:
        return FUND_TYPES_FORMATTED[1];
      case FUND_TYPES[2]:
        return FUND_TYPES_FORMATTED[2];
      default:
        return FUND_TYPES_FORMATTED[0];
    }
  };

  return (
    <div className="fund-type-selector">
      {_.map(props.fundTypes, (fund, index: number) => {
        const fundType = _fundTypeStringConverter(fund);

        return (
          <div
            className={cx(
              {
                active: fundType === props.selectedFund,
                'center-button': index === 1
              },
              'selector-button'
            )}
            onClick={() => props.onClickSelector(fundType)}
            data-qa={`${fundType}-selector`}
            key={`${fundType}-selector`}
          >
            {fund}
          </div>
        );
      })}
    </div>
  );
};

export default FundTypeSelector;
