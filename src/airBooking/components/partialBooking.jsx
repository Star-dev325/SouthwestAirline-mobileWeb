// @flow
import React from 'react';
import _ from 'lodash';
import Message from 'src/shared/components/message';
import Container from 'src/shared/components/container';
import YellowButton from 'src/shared/components/yellowButton';
import i18n from '@swa-ui/locale';

type Props = {
  failedPassengers: Array<string>,
  onSearchFlightClick: () => void
};

const PartialBooking = (props: Props) => {
  const { onSearchFlightClick, failedPassengers } = props;

  return (
    <div data-qa="partial-booking">
      <Container inverted>
        <Message status="error" className="p0">
          <h3 className="xxlarge bold white inline-block">{i18n('AIR_BOOKING__PARTIAL_BOOKING__HEADER')}</h3>
        </Message>
        <div className="mt4">
          <p className="medium white">{i18n('AIR_BOOKING__PARTIAL_BOOKING__MAIN_INSTRUCTION')}</p>
          <p className="medium white mt2">{i18n('AIR_BOOKING__PARTIAL_BOOKING__SUB_INSTRUCTION')}</p>
        </div>
      </Container>

      <div className="bgwhite m3 p5">
        <div className="gray5 mb5">{i18n('SHARED__PASSENGER_RESERVATION_TITLE__PASSENGERS')}</div>
        {_.map(failedPassengers, (failedPassenger, key: number) => (
          <span className="mb5 xlarge block nowrap overflow-hidden ellipsis" key={key}>
            {failedPassenger}
          </span>
        ))}
        <div className="gray5 mb5">{i18n('AIR_BOOKING__PARTIAL_BOOKING__NOT_CONFIRMED_HINT')}</div>
        <YellowButton
          onClick={onSearchFlightClick}
          title={i18n('AIR_BOOKING__PARTIAL_BOOKING__BUTTON_TEXT')}
          data-qa="search-flight"
        />
      </div>
    </div>
  );
};

export default PartialBooking;
