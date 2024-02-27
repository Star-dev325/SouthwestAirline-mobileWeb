import React from 'react';
import { storiesOf } from '@storybook/react';
import ManageCarReservation from 'src/shared/components/manageCarReservation';

const defaultProps = {
  manageCarReservationDetails: {
    driver: 'HX LIN',
    confirmationNumber: '05201297US3',
    isCancelled: false
  },
  carReservationItinerary: {
    pickUpTime: '2016-03-23T11:30',
    dropOffTime: '2016-03-26T11:30',
    pickUpDate: 'Wednesday, Mar 23, 2016',
    dropOffDate: 'Saturday, Mar 26, 2016',
    pickUpAirport: { airportCode: 'ABI', airportName: 'Abilene', cityName: 'Abilene', cityState: 'TX' },
    dropOffAirport: { airportCode: 'ABI', airportName: 'Abilene', cityName: 'Abilene', cityState: 'TX' },
    vendorImage: '/content/mkt/images/car_vendors/Avis_Logo_results.png'
  }
};

storiesOf('components/manageCarReservation', module).add('default', () => {
  return <ManageCarReservation {...defaultProps} />;
});
