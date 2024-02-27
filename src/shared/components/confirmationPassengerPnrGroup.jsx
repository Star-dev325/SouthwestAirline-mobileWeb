// @flow
import React from 'react';
import cx from 'classnames';

import Icon from 'src/shared/components/icon';
import { parsePassengers } from 'src/shared/helpers/formatPassengerHelper';
import type { ConfirmationPassengers, ConfirmedPassenger } from 'src/shared/flow-typed/shared.types';
import i18n from '@swa-ui/locale';
import LapChildConfirmation from 'src/shared/components/lapChildConfirmation';

type Props = {
  pnrs: Array<ConfirmationPassengers>
};

const ConfirmationPassengerPnrGroup = (props: Props) => {
  const { pnrs } = props;

  return (
    <div className="confirmation-trip-header-passenger-list">
      <div className="confirmation-trip-header-passenger-list--header">
        <div className="table-cell">{i18n('SHARED__PASSENGER_RESERVATION_TITLE__PASSENGERS')}</div>
        <div className="table-cell">{i18n('SHARED__PASSENGER_RESERVATION_TITLE__CONFIRMATION')}</div>
      </div>
      {pnrs.map((pnr: ConfirmationPassengers, index: number) => {
        const { passengers, recordLocator } = pnr;
        const { greyBoxMessage: { body = '' } = {} } = pnr;
        const parsedPassengers = parsePassengers(passengers);

        return (
          <div className="table-row" key={index}>
            <div className="confirmation-trip-header-passenger-list--passenger-names">
              {parsedPassengers.map((passenger: ConfirmedPassenger, passengerIndex: number) => {
                const { displayName, hasExtraSeat, accountNumber, specialAssistanceMessage, lapInfant } = passenger;

                return (
                  <div key={passengerIndex}>
                    <div className="confirmation-trip-header--passenger-name">{displayName}</div>
                    {hasExtraSeat && (
                      <div className="confirmation-trip-header--passenger-extra-seat">
                        {i18n('SHARED__SPECIAL_ASSISTANCE__EXTRA_SEAT')}
                      </div>
                    )}
                    {accountNumber && <div className="confirmation-trip-header--account-number">{accountNumber}</div>}
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
            <div className={cx('confirmation-trip-header--record-locator', 'green')}>{recordLocator}</div>
          </div>
        );
      })}
    </div>
  );
};

export default ConfirmationPassengerPnrGroup;
