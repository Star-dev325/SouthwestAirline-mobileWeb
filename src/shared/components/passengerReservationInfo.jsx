// @flow

import React from 'react';
import FormattedName from 'src/shared/components/formattedName';
import PassengerAdditionalInfo from 'src/shared/components/passengerAdditionalInfo';
import _ from 'lodash';
import Icon from 'src/shared/components/icon';
import i18n from '@swa-ui/locale';

type Props = {
  reservationGroups: Array<*>,
  onClickPassengerName?: (*) => void,
  shouldDisplayTsaPrecheck: boolean
};

const PassengerReservationInfo = (props: Props) => {
  const { reservationGroups, onClickPassengerName, shouldDisplayTsaPrecheck } = props;

  const _onPassengerNameClick = (passengerReferrence) => {
    onClickPassengerName && onClickPassengerName(passengerReferrence);
  };

  const _renderPassengers = (passengers, recordLocator, reservationGroup) =>
    passengers.map((passenger, index) => {
      const isFirstReservationGroup = reservationGroup === 0;
      const isFirstPassenger = index === 0;
      const passengerReference = _.get(passenger, 'passengerReference');

      return (
        <div className="flex flex-main-between" key={index}>
          <div
            className="flex7 nowrap overflow-hidden ellipsis"
            onClick={_onPassengerNameClick.bind(null, passengerReference)}
          >
            {isFirstReservationGroup && isFirstPassenger && (
              <div data-qa="passenger-label" className="medium gray5 pb2">
                {i18n('SHARED__PASSENGER_RESERVATION_TITLE__PASSENGERS')}
              </div>
            )}
            {_renderPassengerNameAndPrefixContent(passenger)}
          </div>
          {isFirstPassenger && (
            <div className="align-right">
              {isFirstReservationGroup && (
                <div className="medium gray5 pb2">{i18n('SHARED__PASSENGER_RESERVATION_TITLE__CONFIRMATION')}</div>
              )}
              <div data-qa="passenger-record-locator" className="xlarge passenger-record-locator align-left">
                {recordLocator}
              </div>
            </div>
          )}
        </div>
      );
    });

  const _renderPassengerNameAndPrefixContent = (passenger) => {
    const prefixContent = _renderPassengerNamePrefixContent(passenger);

    return (
      <div>
        <FormattedName className="xlarge" name={passenger.secureFlightName} prefixContent={prefixContent} />
        <PassengerAdditionalInfo passenger={passenger} shouldDisplayTsaPrecheck={shouldDisplayTsaPrecheck} />
      </div>
    );
  };

  const _renderPassengerNamePrefixContent = (passenger) => {
    let prefixContent = null;

    if (passenger.isEarlyBird) {
      prefixContent = (
        <span className="align-middle yellow mx2 mr4">
          <Icon type="early-bird" />
        </span>
      );
    }

    return prefixContent;
  };

  return (
    <div>
      {reservationGroups.map((reservationGroup, id) => (
        <div key={id} data-qa="passenger-reservation-info" className="mb2">
          {_renderPassengers(reservationGroup.passengers, reservationGroup.recordLocator, id)}
        </div>
      ))}
    </div>
  );
};

export default PassengerReservationInfo;
