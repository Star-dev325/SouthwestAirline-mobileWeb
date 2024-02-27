// @flow
import React from 'react';
import pluralize from 'pluralize';
import _ from 'lodash';
import i18n from '@swa-ui/locale';
import MyAccountPanel from 'src/myAccount/components/myAccountPanel';
import Segments from 'src/shared/components/segments';
import Segment from 'src/shared/components/segment';
import MyAccountNavItem from 'src/myAccount/components/myAccountNavItem';
import List from 'src/shared/components/list';
import ListItem from 'src/shared/components/listItem';
import formatDateRange from 'src/shared/helpers/formatDateRange';

type Props = {
  numberOfUpcomingTrips: number,
  onClickUpcomingTripCount: () => void,
  onClickNextTrip: () => void,
  onClickBookATrip: () => void,
  onClickFindATrip: () => void,
  nextTrip?: *,
  onClickSavedFlights: () => void,
  onClickPastFlights: () => void,
  upcomingTripsApiResponseWasReceived: boolean
};

const MyTripsPanel = (props: Props) => {
  const hasNextTrip = !!props.nextTrip;
  const upcomingTripsClassName = {
    'my-trips-panel': true,
    'my-trips-panel--with-trips': hasNextTrip,
    'my-trips-panel--without-trips': !hasNextTrip
  };

  const nextTrip = props.nextTrip || {};
  const nextTripDateRange = _.get(nextTrip, 'dates.first')
    ? formatDateRange(nextTrip.dates.first, nextTrip.dates.second)
    : '';

  return (
    <MyAccountPanel heading={i18n('MY_ACCOUNT__MY_TRIPS_PANEL__MY_TRIPS_PANEL_HEADING')}>
      <Segments>
        <Segment className={upcomingTripsClassName}>
          {hasNextTrip ? (
            <MyAccountNavItem onClick={props.onClickNextTrip}>
              <p className="my-trips-panel--next-trip-label">{i18n('MY_ACCOUNT__MY_TRIPS_PANEL__UP_NEXT')}</p>
              <p className="my-trips-panel--next-trip-date">{nextTripDateRange}</p>
              <p className="my-trips-panel--next-trip-title">{nextTrip.destinationDescription}</p>
            </MyAccountNavItem>
          ) : (
            <MyAccountNavItem onClick={props.onClickBookATrip}>
              <p className="my-trips-panel--book-trip-call-to-action">{i18n('MY_ACCOUNT__MY_TRIPS_PANEL__LETS_GO')}</p>
              <p>{i18n('MY_ACCOUNT__MY_TRIPS_PANEL__BOOK_A_TRIP_MESSAGE')}</p>
            </MyAccountNavItem>
          )}
          {!hasNextTrip && (
            <MyAccountNavItem
              onClick={props.onClickFindATrip}
              className="my-trips-panel--find-a-trip my-account-nav-item-border-top"
            >
              {i18n('MY_ACCOUNT__MY_TRIPS_PANEL__FIND_A_TRIP')}
            </MyAccountNavItem>
          )}
          {props.upcomingTripsApiResponseWasReceived && props.numberOfUpcomingTrips !== 1 && (
            <MyAccountNavItem
              className="my-trips-panel--upcoming-trip-count my-account-nav-item-border-top"
              onClick={props.onClickUpcomingTripCount}
            >
              {props.numberOfUpcomingTrips} {pluralize('Upcoming Trip', props.numberOfUpcomingTrips)}
            </MyAccountNavItem>
          )}
        </Segment>
        <Segment verticalFill className="py0">
          <List className="my-trips-panel--past-and-saved-links" divided horizontal>
            <ListItem>
              <MyAccountNavItem className="my-trips-panel--past-flights-button py5" onClick={props.onClickPastFlights}>
                {i18n('MY_ACCOUNT__MY_TRIPS_PANEL__PAST_FLIGHTS_LABEL')}
              </MyAccountNavItem>
            </ListItem>
            <ListItem>
              <MyAccountNavItem
                className="my-trips-panel--saved-flights-button py5"
                onClick={props.onClickSavedFlights}
              >
                {i18n('MY_ACCOUNT__MY_TRIPS_PANEL__SAVED_LABEL')}
              </MyAccountNavItem>
            </ListItem>
          </List>
        </Segment>
      </Segments>
    </MyAccountPanel>
  );
};

export default MyTripsPanel;
