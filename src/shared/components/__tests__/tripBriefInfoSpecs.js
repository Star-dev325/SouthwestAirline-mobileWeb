import React from 'react';
import TripBriefInfo from 'src/shared/components/tripBriefInfo';

const reservation = JSON.parse(
  '{"recordLocator":"RLRNTH","passengerType":"ADULT","passengers":[{"secureFlightName":{"firstName":"xn","lastName":"liu","middleName":"","suffix":null},"birthDate":"1948-01-03","gender":"M","accountNumber":"","redressNumber":"","knownTravelerId":""}]}'
);

import { mount } from 'enzyme';

const defaultProps = {
  date: 'Mar 23',
  cityName: 'Dallas',
  reservationGroups: []
};

describe('tripBooked', () => {
  it('should render date and cityName', () => {
    const tripBriefInfo = render();

    expect(tripBriefInfo).to.contain.text(defaultProps.date);
    expect(tripBriefInfo).to.contain.text(defaultProps.cityName);
  });

  it('should render reservations', () => {
    const tripBriefInfo = render({
      reservationGroups: [reservation, reservation]
    });

    expect(tripBriefInfo.find('[data-qa="passenger-reservation-info"]')).to.be.lengthOf(2);
  });

  const render = (props) => {
    const finalProps = {
      ...defaultProps,
      ...props
    };

    return mount(<TripBriefInfo {...finalProps} />);
  };
});
