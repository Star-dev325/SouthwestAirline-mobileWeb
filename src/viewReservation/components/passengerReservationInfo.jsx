// @flow

import React from 'react';
import _ from 'lodash';
import Icon from 'src/shared/components/icon';
import { formatAccountNumber } from 'src/shared/helpers/accountNumberFormatter';
import PassengerDocumentStatus from 'src/shared/components/passengerDocumentStatus';
import EarlyBirdIconGroup from 'src/shared/components/earlyBirdIconGroup';
import i18n from '@swa-ui/locale';

export type Passenger = {
  name: string,
  hasExtraSeat: ?boolean,
  isCheckedIn?: boolean,
  hasCompletePassportInfo?: boolean,
  passengerReference: string,
  accountNumber: ?string,
  hasAnyEarlyBird: boolean,
  lapInfant?: { name: string }
};

type Props = {
  index: number,
  passenger: Passenger,
  isInternational: boolean,
  onPassengerNameClick: (string) => void,
  showPassengerHeader: boolean
};

class PassengerReservationInfo extends React.Component<Props> {
  static _renderPassengerName(passenger: Passenger) {
    return (
      <span data-qa="userName" className="xlarge block nowrap overflow-hidden ellipsis">
        {passenger.name}
      </span>
    );
  }

  static _renderPassengerAdditionalInfo(passengerInfo: Passenger) {
    return (
      <div className="nowrap">
        {!_.isEmpty(passengerInfo.accountNumber) && (
          <span data-qa="passenger-rapid-rewards" className="gray5 mr4">
            {formatAccountNumber(passengerInfo.accountNumber)}
          </span>
        )}
      </div>
    );
  }

  static _renderUpdateTravelTitle() {
    return (
      <div className="nowrap">
        <span data-qa="update-travel-information" className="pdkblue mr4">
          {i18n('SHARED__RESERVATION_PASSENGER__MANAGE_TRAVELER_DETAILS')}
        </span>
      </div>
    );
  }

  static _renderExtraSeat(hasExtraSeat: ?boolean, hasAnyEarlyBird: ?boolean) {
    if (hasExtraSeat && hasAnyEarlyBird) {
      return (
        <div className="my1">
          <span className="medium gray5 pr2 nowrap overflow-hidden ellipsis">
            {i18n('SHARED__SPECIAL_ASSISTANCE__EXTRA_SEAT')}
          </span>
          <EarlyBirdIconGroup />
        </div>
      );
    } else if (hasExtraSeat) {
      return (
        <span className="medium gray5 nowrap overflow-hidden ellipsis">
          {i18n('SHARED__SPECIAL_ASSISTANCE__EXTRA_SEAT')}
        </span>
      );
    }
  }

  static defaultProps = {
    onPassengerNameClick: _.noop
  };

  render() {
    const { isInternational, ...passengerInfo } = this.props;
    const { index, passenger, onPassengerNameClick, showPassengerHeader } = passengerInfo;
    const { isCheckedIn, hasCompletePassportInfo } = passenger;
    const { passengerReference } = passenger;

    return (
      <div key={index}>
        {showPassengerHeader && (
          <div data-qa="passenger-label" className="medium gray5 mt4">
            {i18n('SHARED__PASSENGER_RESERVATION_TITLE__PASSENGERS')}
          </div>
        )}
        <div className="pt2">
          <div
            className="passenger-reservation-info--passenger-name"
            onClick={() => onPassengerNameClick(passengerReference)}
          >
            <div className="flex flex-cross-center flex-wrap">
              <div className="flex flex11 flex-column overflow-hidden">
                <div className="overflow-hidden ellipsis">
                  {PassengerReservationInfo._renderPassengerName(passenger)}
                  {PassengerReservationInfo._renderExtraSeat(passenger.hasExtraSeat, passenger.hasAnyEarlyBird)}
                  {passenger.hasAnyEarlyBird && !passenger.hasExtraSeat && (
                    <div className="my1">
                      <EarlyBirdIconGroup />
                    </div>
                  )}
                  {PassengerReservationInfo._renderPassengerAdditionalInfo(passenger)}
                  {!isInternational && PassengerReservationInfo._renderUpdateTravelTitle()}
                </div>
                <PassengerDocumentStatus
                  isCheckedIn={isCheckedIn}
                  hasCompletePassportInfo={hasCompletePassportInfo}
                  isInternational={isInternational}
                />
              </div>
              <Icon className="xxlarge sltblue flex1" type="pencil" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PassengerReservationInfo;
