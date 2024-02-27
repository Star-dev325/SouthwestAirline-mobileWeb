// @flow

import React from 'react';
import _ from 'lodash';

import BriefBound from 'src/shared/components/flightSummary/briefBound';
import EarlyBirdPassengerCheckbox from 'src/shared/form/fields/earlyBirdPassengerCheckbox';

import type { EarlyBirdBoundDetailsType, EarlyBirdPassengerType } from 'src/earlyBird/flow-typed/earlyBird.types';
import type {
  onClickIneligibleLabelType,
  onChangeEBCheckboxType
} from 'src/shared/form/fields/earlyBirdPassengerCheckbox';

type Props = {
  boundDetail: EarlyBirdBoundDetailsType,
  onClickIneligibleLabel: onClickIneligibleLabelType,
  onChangeEBCheckbox: onChangeEBCheckboxType,
  boundOrder: string
};

const EarlyBirdBoundDetailCard = (props: Props) => {
  const { onClickIneligibleLabel, boundDetail, onChangeEBCheckbox, boundOrder } = props;
  const { boundType, passengers, boundBrief } = boundDetail;

  return (
    <div className="early-bird-origin-destination-card">
      <p className="early-bird-origin-destination-card--title">{boundType}</p>
      <div className="early-bird-origin-destination-card--detail">
        <BriefBound {...boundBrief} />
        {_.map(passengers, (passenger: EarlyBirdPassengerType, key: number) => (
          <EarlyBirdPassengerCheckbox
            key={key}
            fieldName={`${boundOrder}_ebPaxCheckBox_${key}`}
            passenger={passenger}
            onClickIneligibleLabel={onClickIneligibleLabel}
            onChangeEBCheckbox={onChangeEBCheckbox}
          />
        ))}
      </div>
    </div>
  );
};

export default EarlyBirdBoundDetailCard;
