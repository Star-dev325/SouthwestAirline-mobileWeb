// @flow

import React from 'react';
import type { Node } from 'react';
import cx from 'classnames';
import i18n from '@swa-ui/locale';
import formatDateRange from 'src/shared/helpers/formatDateRange';
import ConfirmationPassengerGroup from 'src/shared/components/confirmationPassengerGroup';
import ConfirmationPassengerPnrGroup from 'src/shared/components/confirmationPassengerPnrGroup';
import TripDateAndDestCity from 'src/shared/components/tripDateAndDestCity';
import ConfirmationNumber from 'src/shared/components/confirmationNumber';
import withReservationDetailTransition from 'src/shared/enhancers/withReservationDetailTransition';
import Button from 'src/shared/components/button';
import Icon from 'src/shared/components/icon';

import type {
  ConfirmationDates,
  ConfirmationPassengers,
  FlightPricingBound,
  DisplayAirport
} from 'src/shared/flow-typed/shared.types';

type Props = {
  bounds: ?Array<FlightPricingBound>,
  dates: ConfirmationDates,
  destinationDescription?: string,
  pnrs: Array<ConfirmationPassengers>,
  onEarlyBirdButtonClick: () => void,
  _links?: {
    earlyBird?: Link
  },
  confirmationNumber?: string,
  shouldShowAddEarlyBirdButton?: boolean
};

const formatAirportName = (airport: DisplayAirport) => {
  const { name, state, country } = airport;

  if (!state && country) {
    return `${name}, ${country}`;
  } else if (state) {
    return `${name}, ${state}`;
  }
};

const ConfirmationTripHeader = (props: Props) => {
  const {
    bounds,
    dates,
    pnrs,
    destinationDescription,
    onEarlyBirdButtonClick,
    shouldShowAddEarlyBirdButton
  } = props;
  const { passengers, recordLocator, greyBoxMessage } = pnrs[0];

  const _renderAddEarlyBird = (): Node => (
    <Button
      className="confirmation--early-bird-button"
      size="large"
      color="yellow"
      onClick={onEarlyBirdButtonClick}
      fluid
    >
      <Icon type="early-bird" color="yellow" />
      {i18n('SHARED__EARLY_BIRD__CHECK_IN_TITLE')}
    </Button>
  );

  return (
    <div className={cx({ p4: !bounds }, 'confirmation-trip-header')}>
      {destinationDescription && bounds && (
        <div className={cx({ p4: !!bounds }, 'trip-airport-info bdb')}>
          <div className="flex flex-main-between">
            <TripDateAndDestCity
              date={formatDateRange(dates.first, dates.second)}
              cityName={destinationDescription}
              className="pblue"
            />
            <ConfirmationNumber confirmationNumber={recordLocator} />
          </div>
          {bounds && (
            <div className="airport-info--detail">
              {formatAirportName(bounds[0].departureAirport)} to
              <br />
              {formatAirportName(bounds[0].arrivalAirport)}
            </div>
          )}
          {shouldShowAddEarlyBirdButton && _renderAddEarlyBird()}
        </div>
      )}
      {bounds ? (
        <ConfirmationPassengerGroup passengers={passengers} greyBoxMessage={greyBoxMessage} />
      ) : (
        <ConfirmationPassengerPnrGroup pnrs={pnrs} />
      )}
    </div>
  );
};

export default withReservationDetailTransition(ConfirmationTripHeader);
