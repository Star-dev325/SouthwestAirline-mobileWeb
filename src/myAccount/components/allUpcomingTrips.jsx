// @flow
import React from 'react';
import _ from 'lodash';
import CompactTripCard from 'src/myAccount/components/compactTripCard';
import DetailedTripCard from 'src/myAccount/components/detailedTripCard';

import type { UpcomingTripPage } from 'src/shared/flow-typed/shared.types';

type Props = {
  trips: Array<UpcomingTripPage>,
  onClickTripCard: (UpcomingTripPage, number) => void,
  onCheckInButtonClick: (string) => void,
  onViewBoardingPositionsButtonClick: (Link) => void,
  onViewBoardingPassButtonClickCb: (string) => void,
  onSelectNewFlightForCancelledFlight: (string) => void,
  onClickStandbyList: ({ isNonRevPnr: boolean, link: Link, enhancedLink?: Link }) => void,
  UPGRADED_BOARDING: boolean,
  onUpgradedBoardingButtonClick?: (link: Link) => void
};

const AllUpcomingTrips = (props: Props) => {
  const {
    trips,
    onClickTripCard,
    onCheckInButtonClick,
    onViewBoardingPositionsButtonClick,
    onViewBoardingPassButtonClickCb,
    onSelectNewFlightForCancelledFlight,
    onClickStandbyList,
    UPGRADED_BOARDING,
    onUpgradedBoardingButtonClick
  } = props;
  const detailedTripCardProps = {
    onCheckInButtonClick,
    onViewBoardingPositionsButtonClick,
    onViewBoardingPassButtonClickCb,
    onSelectNewFlightForCancelledFlight,
    UPGRADED_BOARDING,
    onUpgradedBoardingButtonClick
  };

  const _renderTripCard = (trip: UpcomingTripPage, index: number) => {
    const needShowDetailTrip = trip.isWithin48Hours && !_.isEmpty(trip.pages);
    const { dates, tripType, pages, confirmationNumber, _links } = trip;

    return (
      <div className="trip-card" key={index}>
        {needShowDetailTrip ? (
          <DetailedTripCard
            dates={dates}
            tripType={tripType}
            pages={pages}
            confirmationNumber={confirmationNumber}
            _links={_links}
            {..._.omit(detailedTripCardProps, 'trip')}
            onClickStandbyList={onClickStandbyList}
            onClickDetailsButton={() => onClickTripCard(trip, index)}
          />
        ) : (
          <div onClick={() => onClickTripCard(trip, index)}>
            <CompactTripCard {...trip} />
          </div>
        )}
      </div>
    );
  };

  return <div>{trips.map((trip: UpcomingTripPage, index: number) => _renderTripCard(trip, index))}</div>;
};

export default AllUpcomingTrips;
