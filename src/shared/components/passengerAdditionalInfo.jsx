// @flow

import React from 'react';
import _ from 'lodash';
import { formatAccountNumber } from 'src/shared/helpers/accountNumberFormatter';
import Icon from 'src/shared/components/icon';

type Passenger = {
  knownTravelerId?: string,
  accountNumber?: string
};

type Props = {
  passenger: Passenger,
  shouldDisplayTsaPrecheck: boolean
};

const PassengerAdditionalInfo = (props: Props) => {
  const { shouldDisplayTsaPrecheck, passenger } = props;

  return (
    <div className="nowrap">
      {!_.isEmpty(passenger.accountNumber) && (
        <span data-qa="passenger-rapid-rewards" className="gray5 mr4">
          {formatAccountNumber(passenger.accountNumber)}
        </span>
      )}
      {shouldDisplayTsaPrecheck && !_.isEmpty(passenger.knownTravelerId) && (
        <span className="ml1">
          <Icon type="tsa-precheck" />
        </span>
      )}
    </div>
  );
};

PassengerAdditionalInfo.defaultProps = {
  shouldDisplayTsaPrecheck: false
};

export default PassengerAdditionalInfo;
