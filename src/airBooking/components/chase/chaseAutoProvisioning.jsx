// @flow
import React from 'react';
import { CHASE_AUTO_PROVISIONING } from 'src/airBooking/constants/airBookingConstants';

type Props = {
  cardOrEmail: string,
  header: string,
  body: string
};

const ChaseAutoProvisioning = (props: Props) => {
  const { cardOrEmail, header, body } = props;

  return (
    <div className="chase-auto-provisioning">
      {
        cardOrEmail === CHASE_AUTO_PROVISIONING.CHASE_CARD_PROVISION &&
          <img src="/content/mkt/images/landing_pages/chase/chase-credit-card.svg" />
      }
      {
        cardOrEmail === CHASE_AUTO_PROVISIONING.CHASE_EMAIL_PROVISION &&
          <img src="/content/mkt/images/landing_pages/chase/chase-envelope.svg" />
      }
      <div className="chase--text-container">
        <span className="chase--header">{header}</span>
        {body && <div className="chase--body">{body}</div>}
      </div>
    </div>
  );
};

export default ChaseAutoProvisioning;
