import React from 'react';
import { storiesOf } from '@storybook/react';
import CarReservation from 'src/shared/components/carReservation';

storiesOf('components/carReservation', module).add('default', () => {
  const carReservationProps = {
    carReservationItinerary: {
      pickUpTime: '2016-03-01T11:00:00.000',
      dropOffTime: '2016-03-04T11:00:00.000',
      pickUpDate: 'Tuesday, Mar 16, 2016',
      dropOffDate: 'Friday, Mar 16, 2016',
      pickUpAirport: {
        airportCode: 'DAL',
        airportName: 'Dallas (Love Field)',
        cityName: 'Dallas (Love Field)',
        cityState: 'TX'
      },
      dropOffAirport: {
        airportCode: 'DAL',
        airportName: 'Dallas (Love Field)',
        cityName: 'Dallas (Love Field)',
        cityState: 'TX'
      }
    },
    carReservationDetail: {
      carType: 'Economy',
      baseRate: 14100,
      dailyRate: {
        cents: 4700,
        perQuantity: '3 Days'
      },
      vendorImage: '/content/mkt/images/car_vendors/Avis_Logo_results.png',
      rrIncentiveText: 'Earn up to 600 points',
      mileage: 'Unlimited',
      rentalDeskLocation: 'Rental Counter is located outside of the Airport Terminal. Shuttle is provided.'
    }
  };
  return <CarReservation {...carReservationProps} />;
});
