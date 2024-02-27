// @flow
import _ from 'lodash';
import cx from 'classnames';
import FlightNumber from 'src/shared/components/flightNumber';
import FlightTimes from 'src/shared/components/flightTimes';
import i18n from '@swa-ui/locale';
import LabelContainer from 'src/shared/components/labelContainer';
import React from 'react';
import StandbyLink from 'src/shared/components/standbyLink';

export type StandbyFlightProps = {
  arrivalAirportCode: string,
  arrivalTime: string,
  departureTime: string,
  enhancedStandbyList: Link,
  enhancedStandbyListMessage: string,
  flightNumber: string,
  viewStandbyList: Link,
};

type Props = {
  isNonRevPnr?: boolean,
  onClickStandbyList: ({ isNonRevPnr: boolean, link: Link }) => void,
  standbyFlight: StandbyFlightProps,
  useEnhancedStandbyList?: boolean,
};

const StandbyCard = ({ isNonRevPnr = false, onClickStandbyList, useEnhancedStandbyList, standbyFlight }: Props) => {
  const {
    arrivalAirportCode,
    enhancedStandbyList,
    enhancedStandbyListMessage,
    flightNumber,
    departureTime,
    arrivalTime,
    viewStandbyList
  } = standbyFlight;

  const shouldShowFlightDetails = !isNonRevPnr && !(useEnhancedStandbyList && enhancedStandbyListMessage);

  const getLabelText = () => {
    const defaultLabelText = i18n('STANDBY__CARD_TITLE') + arrivalAirportCode;
    const nonRevLabelText = isNonRevPnr && _.get(viewStandbyList, 'labelText', defaultLabelText);
    const enhancedStandbyLabelText = useEnhancedStandbyList && enhancedStandbyListMessage;

    return enhancedStandbyLabelText || nonRevLabelText || defaultLabelText;
  };

  return (
    <div className="standby-card">
      <div className={cx('standby-card--title', { 'hide-details': !shouldShowFlightDetails })}>{getLabelText()}</div>

      {shouldShowFlightDetails && (
        <div className="flex">
          <LabelContainer className="flex3" labelText="Flight">
            <FlightNumber className="xlarge bold" flightNumber={flightNumber} />
          </LabelContainer>
          <FlightTimes departureTime={departureTime} arrivalTime={arrivalTime} isNextDay={false} />
        </div>
      )}
      <StandbyLink
        enhancedStandbyList={useEnhancedStandbyList ? enhancedStandbyList : null}
        isNonRevPnr={isNonRevPnr}
        onClickStandbyList={onClickStandbyList}
        viewStandbyList={viewStandbyList}
      />
    </div>
  );
};

export default StandbyCard;
