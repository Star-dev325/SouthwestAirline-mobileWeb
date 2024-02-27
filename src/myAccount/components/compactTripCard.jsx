// @flow
import React from 'react';
import TripCardHeader from 'src/myAccount/components/tripCardHeader';

import type { TripCardHeaderProps } from 'src/myAccount/components/tripCardHeader';

const CompactTripCard = (trip: TripCardHeaderProps) => (
  <div className="compact-trip-card">
    <TripCardHeader {...trip} />
  </div>
);

export default CompactTripCard;
