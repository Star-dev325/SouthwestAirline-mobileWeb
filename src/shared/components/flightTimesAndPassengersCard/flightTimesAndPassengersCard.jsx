// @flow
import dayjs from 'dayjs';
import React from 'react';
import util from 'util';
import i18n from '@swa-ui/locale';
import Icon from 'src/shared/components/icon';
import MultiDayIndicator from 'src/shared/components/multiDayIndicator';
import type { FlightCard } from 'src/sameDay/flow-typed/sameDay.types';

type Props = {
  card: FlightCard
};

export const FlightTimesAndPassengersCard = ({ card }: Props) => {
  const { arrivesTime, date, departsTime, fromAirportCode, passengers, toAirportCode, isNextDayArrival, isOvernight } = card;
  const dateParsed = dayjs(date);
  const departsTimeParsed = dayjs(departsTime, 'hh:mm');
  const arrivesTimeParsed = dayjs(arrivesTime, 'hh:mm');

  return (
    <div className="flight-time-passengers-card">
      <div className="flight-time-passengers-card--title">
        <div className="flight-time-passengers-card--date">
          <div className="flight-time-passengers-card--month">{dateParsed.format('MMM DD')}</div>
          <div className="flight-time-passengers-card--day">{dateParsed.format('dddd')}</div>
        </div>
        <div className="flight-time-passengers-card--flight">
          <div className="flight-time-passengers-card--from">
            <div className="flight-time-passengers-card--place">{fromAirportCode}</div>
            <div className="flight-time-passengers-card--time">{departsTimeParsed.format('hh:mm a').toUpperCase()}</div>
          </div>
          <div className="flight-time-passengers-card--icon-col flight-time-passengers-card-flight-icon">
            <Icon type="airplane" className="icon-airplane" />
          </div>
          <div className="flight-time-passengers-card--to">
            <div className="flight-time-passengers-card--place">{toAirportCode}</div>
            <div className="flight-time-passengers-card--time">{arrivesTimeParsed.format('hh:mm a').toUpperCase()}
              <MultiDayIndicator isNextDay={isNextDayArrival} isOvernight={isOvernight} />
            </div>
          </div>
        </div>
      </div>
      <div className="flight-time-passengers-card--divider"></div>
      <div className="flight-time-passengers-card--passenger-title">{i18n('SAME_DAY__PRICING_TITLE__PASSENGERS')}</div>
      <div className="flight-time-passengers-card--section">
        {passengers.map(({ accountNumber, name }, index) => (
          <div key={`${name}-${index}`} className="flight-time-passengers-card--passengers">
            <div className="flight-time-passengers-card--passengers-detail">
              <div className="flight-time-passengers-card--passengers-detail-name">{name}</div>
              {accountNumber && (
                <div className="flight-time-passengers-card--passengers-detail-number">
                  {util.format(i18n('MY_ACCOUNT__HEADER__RR_NUMBER'), accountNumber)}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
