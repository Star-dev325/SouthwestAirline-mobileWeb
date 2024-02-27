// @flow

import React from 'react';
import _ from 'lodash';
import FlightInfo from 'src/shared/constants/flightInfo';
import LabelContainer from 'src/shared/components/labelContainer';
import FormattedName from 'src/shared/components/formattedName';
import Fields from 'src/shared/components/fields';
import type { ConfirmedPassenger } from 'src/shared/flow-typed/shared.types';
import { parsePassengers } from 'src/shared/helpers/formatPassengerHelper';
import i18n from '@swa-ui/locale';

const { CONFIRMATION } = FlightInfo;

type Props = {
  className?: string,
  hideLabelText?: boolean,
  passengers: Array<ConfirmedPassenger>,
  recordLocator: string,
  recordLocatorLabel?: string,
  showHeading?: boolean
};

const RefundSummaryPassengers = ({
  className,
  hideLabelText,
  passengers,
  recordLocator,
  recordLocatorLabel = CONFIRMATION,
  showHeading
}: Props) => (
  <div className={`refund-summary-passengers ${className || ''}`}>
    {showHeading && (
      <Fields
        type="grouped"
        className="field-label--heading"
        label={i18n('SHARED__PURCHASE_SUMMARY_FORM__PASSENGERS')}
      ></Fields>
    )}
    <div className="bgwhite flex flex-main-between p5">
      <LabelContainer
        className="passenger-name"
        hideLabelText={hideLabelText}
        labelText={i18n('SHARED__PASSENGER_RESERVATION_TITLE__PASSENGERS')}
      >
        <div>
          {_.map(parsePassengers(passengers), (passenger, index: number) => (
            <div key={index}>
              <FormattedName className="xlarge nowrap block" name={passenger.displayName} />
              {passenger.hasExtraSeat && (
                <p className="nowrap block gray5">{i18n('SHARED__SPECIAL_ASSISTANCE__EXTRA_SEAT')}</p>
              )}
              {passenger.accountNumber && <p className="nowrap block gray5">{passenger.accountNumber}</p>}
            </div>
          ))}
        </div>
      </LabelContainer>
      <LabelContainer labelText={recordLocatorLabel}>
        <div data-qa="confirmation-number" className="xlarge align-right green">
          {recordLocator}
        </div>
      </LabelContainer>
    </div>
  </div>
);

export default RefundSummaryPassengers;
