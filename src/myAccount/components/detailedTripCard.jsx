// @flow
import React from 'react';
import _ from 'lodash';

import TripCardHeader from 'src/myAccount/components/tripCardHeader';
import Carousel from 'src/shared/components/carousel';
import Banner from 'src/shared/components/banner';
import SegmentDetails from 'src/myAccount/components/segmentDetails';

import type { Segment } from 'src/myAccount/flow-typed/myAccount.types';
import type { ConfirmationDates } from 'src/shared/flow-typed/shared.types';

type Props = {
  dates: ConfirmationDates,
  tripType: string,
  pages: Array<Segment>,
  _links: Link,
  confirmationNumber: string,
  onCheckInButtonClick: (string) => void,
  onClickDetailsButton: () => void,
  onViewBoardingPositionsButtonClick: (Link) => void,
  onViewBoardingPassButtonClickCb: (string) => void,
  onSelectNewFlightForCancelledFlight: (string) => void,
  onClickStandbyList: ({ isNonRevPnr: boolean, link: Link }) => void,
  UPGRADED_BOARDING: boolean,
  onUpgradedBoardingButtonClick?: (link: Link) => void
};

const DetailedTripCard = (props: Props) => {
  const {
    dates,
    tripType,
    pages,
    _links,
    confirmationNumber,
    UPGRADED_BOARDING,
    onUpgradedBoardingButtonClick,
    ...restProps
  } = props;

  const _renderBanner = (segment) => {
    const { bannerText, bannerType, boardingTime } = segment;

    return bannerText && bannerType && <Banner type={bannerType} text={bannerText} boardingTime={boardingTime} />;
  };

  const shouldAllowSwiping = pages && pages.length > 1;
  const cardsForAllSegments = _.map(pages, (segment: Segment, index: number) => (
    <div key={index}>
      {_renderBanner(segment)}
      <div className="detailed-trip-card">
        <TripCardHeader
          dates={dates}
          tripType={tripType}
          confirmationNumber={confirmationNumber}
          destinationDescription={segment.destinationDescription}
          departureDate={segment.departureDate}
          showConfirmationNumber
          displayWeekday
        />
        <hr className="detailed-trip-card--divider" />
        <SegmentDetails
          confirmationNumber={confirmationNumber}
          isOvernight={segment.isOvernight}
          links={_links}
          onUpgradedBoardingButtonClick={onUpgradedBoardingButtonClick}
          segment={segment}
          UPGRADED_BOARDING={UPGRADED_BOARDING}
          {...restProps}
        />
      </div>
    </div>
  ));

  return (
    <div>
      {shouldAllowSwiping ? (
        <Carousel shouldAdjustHeightAtFirstChild dotsInFooter continuous={false}>
          {cardsForAllSegments}
        </Carousel>
      ) : (
        cardsForAllSegments
      )}
    </div>
  );
};

export default DetailedTripCard;
