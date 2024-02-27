// @flow
import React from 'react';
import _ from 'lodash';
import BriefBound from 'src/shared/components/flightSummary/briefBound';

import type { BriefBoundType } from 'src/shared/flow-typed/shared.types';

type Props = {
  flightDetails: Array<BriefBoundType>
};

const FlightInfoSummary = ({ flightDetails }: Props) => (
  <div className="flight-info-summary">
    {_.map(flightDetails, (flightDetail, index: number) => (
      <BriefBound key={index} {...flightDetail} />
    ))}
  </div>
);

export default FlightInfoSummary;
