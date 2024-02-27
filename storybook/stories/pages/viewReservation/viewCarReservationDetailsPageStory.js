import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';
import configureMockStore from 'redux-mock-store';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { ViewCarReservationDetailsPage } from 'src/viewReservation/pages/viewCarReservationDetailsPage';

const store = configureMockStore()({});

const carReservation = {
  manageCarReservationDetails: {
    driver: {
      firstName: 'Cannon',
      lastName: 'Biggs'
    },
    confirmationNumber: '08172185US0',
    isCancelled: false
  },
  carReservationItinerary: {
    pickUpTime: '2017-09-16T11:30',
    dropOffTime: '2017-09-19T11:30',
    pickUpDate: 'Saturday, Sep 16, 2017',
    dropOffDate: 'Tuesday, Sep 19, 2017',
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
    },
    vendorImage: '/content/mkt/images/car_vendors/Avis_Logo_results.png'
  },
  carReservationDetail: {
    carType: 'Mid-size',
    baseRate: 21900,
    dailyRate: {
      cents: 7300,
      perQuantity: '3 Days'
    },
    promoCodeApplied: false,
    selectedCarExtras: [
      {
        description: 'Toddler Seat (20 to 40 lbs.)',
        type: 'Toddler Seat (20 to 40 lbs.)'
      },
      {
        description: 'Booster Seat (40 to 80 lbs.)',
        type: 'Booster Seat (40 to 80 lbs.)'
      }
    ],
    totalPrice: 27709,
    showTotalPrice: true,
    vendorImage: '/content/mkt/images/car_vendors/Avis_Logo_results.png',
    mileage: {
      cents: 0,
      freeMileage: 'Unlimited',
      per: ''
    },
    rentalDeskLocation: 'Rental Counter is at the terminal. Shuttle is provided to pick up your car.',
    dailyRateWithCurrencyCode: {
      amount: '73.00',
      currencyCode: 'USD'
    },
    totalWithCurrencyCode: {
      amount: '219.00',
      currencyCode: 'USD'
    },
    totalWithTaxesAndCurrencyCode: {
      amount: '277.09',
      currencyCode: 'USD'
    },
    taxesWithCurrencyCode: [
      {
        taxWithCurrencyCode: {
          amount: '0.10',
          currencyCode: 'USD'
        },
        type: 'Tax'
      },
      {
        taxWithCurrencyCode: {
          amount: '0.10',
          currencyCode: 'USD'
        },
        type: 'AIRPORT CONCESSION RECOVERY:'
      }
    ]
  }
};
const defaultProps = {
  carReservation,
  setFlowStatusFn: () => {},
  cancelCarReservationAndTransitionToConfirmationPageFn: () => {}
};

storiesOf('pages/viewReservation/viewCarReservationDetailsPage', module)
  .addDecorator(StoryReduxProvider(store))
  .addDecorator(StoryRouter())
  .add('default', () => {
    return <ViewCarReservationDetailsPage {...defaultProps} />;
  });
