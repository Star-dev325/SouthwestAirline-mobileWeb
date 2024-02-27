// @flow
import React from 'react';
import dayjs from 'dayjs';
import formatDateRange from 'src/shared/helpers/formatDateRange';
import Icon from 'src/shared/components/icon';
import { FLIGHT, CAR } from 'src/myAccount/constants/upcomingTripType';
import { MEDIUM_DATE_FORMAT } from 'src/shared/constants/dateConstants';
import i18n from '@swa-ui/locale';

export type TripCardHeaderProps = {
  tripType: string,
  dates: {
    first: string,
    second: ?string
  },
  destinationDescription: string,
  confirmationNumber?: string,
  showConfirmationNumber?: boolean,
  displayWeekday?: boolean,
  departureDate?: string
};

const TripCardHeader = (props: TripCardHeaderProps) => {
  const {
    tripType,
    dates: { first, second },
    destinationDescription,
    displayWeekday,
    departureDate
  } = props;
  const e = (element) => `trip-card-header--${element}`; // e = the "element" in BEM
  const m = (element, modifier) => `${e(element)} ${e(element)}_${modifier}`; // m = the "modifier" in BEM

  const _renderDate = () => {
    const dateAsString = displayWeekday ? dayjs(departureDate, MEDIUM_DATE_FORMAT).format('ddd, MMM D') : formatDateRange(first, second);

    return <span className={e('trip-date')}>{dateAsString}</span>;
  };

  const _renderDestination = () => <span className={e('destination-airport')}>{destinationDescription}</span>;

  const _renderDestinationAndDate = () => (
    <div className={e('date-and-destination')}>
      {_renderDestination()}
      {_renderDate()}
    </div>
  );

  const _renderTripIconOrConfirmationNumber = () => {
    let tripIndicator = (
      <span className={e('icons')}>
        {tripType === CAR && <Icon type="car" className={e('icon')} />}
        {tripType === FLIGHT && <Icon type="airplane-depart" className={m('icon', 'air')} />}
      </span>
    );

    if (props.showConfirmationNumber) {
      tripIndicator = (
        <span className={e('confirmation-number')}>
          <span className={e('confirmation-number_label')}>{i18n('MY_ACCOUNT__CONFIRMATION_NUMBER')}</span>
          <span className={e('confirmation-number_number')}>{props.confirmationNumber}</span>
        </span>
      );
    }

    return tripIndicator;
  };

  return (
    <div className="trip-card-header">
      {_renderDestinationAndDate()}
      <div className={e('icon-or-confirmation-number')}>{_renderTripIconOrConfirmationNumber()}</div>
    </div>
  );
};

export default TripCardHeader;
