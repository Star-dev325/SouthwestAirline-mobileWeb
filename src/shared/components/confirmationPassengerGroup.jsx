// @flow
import React from 'react';
import _ from 'lodash';

import Icon from 'src/shared/components/icon';
import { formatAccountNumber } from 'src/shared/helpers/accountNumberFormatter';
import { parsePassengers } from 'src/shared/helpers/formatPassengerHelper';
import i18n from '@swa-ui/locale';
import EarlybirdIconGroup from 'src/shared/components/earlyBirdIconGroup';
import LapChildConfirmation from 'src/shared/components/lapChildConfirmation';

import type { ConfirmedPassenger, GreyBoxMessage } from 'src/shared/flow-typed/shared.types';

type Props = {
  passengers: Array<ConfirmedPassenger>,
  greyBoxMessage?: GreyBoxMessage
};

const ConfirmationPassengerGroup = (props: Props) => {
  const { greyBoxMessage: { body = '' } = {} } = props;
  const passengers = parsePassengers(props.passengers);

  return (
    <div className="trip-passenger-info p4">
      <div data-qa="passenger-label" className="medium gray5 mb2">
        {i18n('SHARED__PASSENGER_RESERVATION_TITLE__PASSENGERS')}
      </div>
      {passengers.map((passenger, index) => {
        const { displayName, hasExtraSeat, accountNumber, specialAssistanceMessage, hasAnyEarlyBird, lapInfant } =
          passenger;

        return (
          <div key={index} className="passenger-pnr-group flex flex-column">
            <span className="confirmation-trip-header--passenger-name xlarge block nowrap overflow-hidden ellipsis">
              {displayName}
            </span>
            {hasExtraSeat && !hasAnyEarlyBird && (
              <div className="confirmation-trip-header--passenger-extra-seat">
                {i18n('SHARED__SPECIAL_ASSISTANCE__EXTRA_SEAT')}
              </div>
            )}
            {hasExtraSeat && hasAnyEarlyBird && (
              <div className="flex my1">
                <div className="confirmation-trip-header--passenger-extra-seat pr2">
                  {i18n('SHARED__SPECIAL_ASSISTANCE__EXTRA_SEAT')}
                </div>
                <EarlybirdIconGroup />
              </div>
            )}
            {!hasExtraSeat && hasAnyEarlyBird && (
              <div className="my1">
                <EarlybirdIconGroup />
              </div>
            )}
            {!_.isEmpty(accountNumber) && (
              <span data-qa="passenger-rapid-rewards" className="gray5 mr4 confirmation-trip-header--account-number">
                {formatAccountNumber(accountNumber)}
              </span>
            )}
            {specialAssistanceMessage && (
              <div className="flex confirmation-trip-header--special-assistance">
                <Icon type="exclamation-circle" className="pblue xxlarge" />
                <p className="special-assistance-message">{specialAssistanceMessage.body}</p>
              </div>
            )}
            {lapInfant && <LapChildConfirmation lapInfant={lapInfant} body={body} />}
          </div>
        );
      })}
    </div>
  );
};

export default ConfirmationPassengerGroup;
