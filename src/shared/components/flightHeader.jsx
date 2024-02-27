// @flow
import i18n from '@swa-ui/locale';
import React from 'react';
import FlightTime from 'src/shared/components/flightTime';
import Icon from 'src/shared/components/icon';
import LabelContainer from 'src/shared/components/labelContainer';

type Props = {
  arrivalTime: string,
  departureTime: string,
  flightNumbers: string,
  hideIsNextDay?: boolean,
  isNextDay?: boolean,
  isOvernight?: boolean,
  stopDescription?: string
};

const FlightHeader = (props: Props) => {
  const { arrivalTime, departureTime, flightNumbers, hideIsNextDay, isNextDay, isOvernight, stopDescription } = props;

  return (
    <div className="flight-header">
      <div className="flight-header--col flight-header--col-label" data-qa="departs">
        <LabelContainer labelText="Departs">
          <FlightTime timeString={departureTime} />
        </LabelContainer>
      </div>
      <div className="flight-header--col flight-header--col-label">
        <LabelContainer labelText={'Flight#'} className={'flight-header--flight-numbers-col'}>
          <div className={'flight-header--flight-number'}>{flightNumbers}</div>
          <div className={'flight-header--stops'}>{stopDescription}</div>
        </LabelContainer>
      </div>
      <div className="flight-header--col flight-header--col-label">
        <LabelContainer labelText="Arrives" className={'flight-header--arrives-col'}>
          <FlightTime timeString={arrivalTime}>
            {isNextDay && !hideIsNextDay && !isOvernight && (
              <p className="flight-header--next-day" data-qa="next-day">
                {i18n('SHARED__COMMON__NEXT_DAY')}
              </p>
            )}
          </FlightTime>
        </LabelContainer>
        {isOvernight && (
          <div className="flight-header--overnight">
            <Icon className="flight-header--overnight-icon" type="next-day-indicator" />
            <p className="flight-header--overnight-label">{i18n('AIR_BOOKING__SHOPPING__OVERNIGHT')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightHeader;
