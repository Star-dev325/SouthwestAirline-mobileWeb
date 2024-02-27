// @flow
import React from 'react';
import _ from 'lodash';
import ContentLink from 'src/shared/components/contentLink';

type Props = {
  passengerCount?: number,
  passengerType?: string,
  fareLabel?: ?string,
  fareRulesUrl?: ?string,
  passengerCountFullString?: string
};

const PassengerPrice = ({
  passengerCount,
  passengerType,
  fareLabel,
  fareRulesUrl,
  passengerCountFullString
}: Props) => {
  if (passengerCount === 0 || (passengerCount && passengerCount <= 0)) return null;

  const showFareType = passengerType !== 'Lap Child' && passengerType !== 'Lap Children';

  return (
    <div className="passenger-price">
      <div className="passenger-price--info">
        {!passengerCountFullString && (
          <span className="passenger-price--number-and-type" data-qa="passenger-price-passengers--number-and-type">
            {passengerCount} {_.startCase(_.toLower(passengerType))}
          </span>
        )}
        {passengerCountFullString && (
          <span className="passenger-price--number-and-type" data-qa="passenger-price-passengers--string">
            {passengerCountFullString}
          </span>
        )}
        {showFareType && (<ContentLink className="passenger-price--fare-type" href={fareRulesUrl} dataQa="passenger-price--fare-type">
          {fareLabel}
        </ContentLink>)}
      </div>
    </div>
  );
};

export default PassengerPrice;
