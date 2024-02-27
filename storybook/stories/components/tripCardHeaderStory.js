import React from 'react';
import { storiesOf } from '@storybook/react';
import TripCardHeader from 'src/myAccount/components/tripCardHeader';

const wrapperStyles = { backgroundColor: '#FFF' };

storiesOf('components/tripCardHeader', module)
  .add('default', () => {
    return (
      <div style={wrapperStyles}>
        <TripCardHeader
          tripType="FLIGHT"
          dates={{
            first: '2017-12-08',
            second: null
          }}
          destinationDescription="Denver"
          confirmationNumber="KJQ3II"
          displayDestinationFirst={false}
        />
      </div>
    );
  })
  .add('car', () => {
    return (
      <div style={wrapperStyles}>
        <TripCardHeader
          tripType="CAR"
          dates={{
            first: '2017-12-08',
            second: null
          }}
          destinationDescription="Denver"
          confirmationNumber="KJQ3II"
          displayDestinationFirst={false}
        />
      </div>
    );
  })
  .add('default with confirmation number', () => {
    return (
      <div style={wrapperStyles}>
        <TripCardHeader
          tripType="FLIGHT"
          dates={{
            first: '2017-12-08',
            second: null
          }}
          destinationDescription="Denver"
          confirmationNumber="KJQ3II"
          showConfirmationNumber
        />
      </div>
    );
  })
  .add('with confirmation number and display destination first', () => {
    return (
      <div style={wrapperStyles}>
        <TripCardHeader
          tripType="FLIGHT"
          dates={{
            first: '2017-12-08',
            second: null
          }}
          destinationDescription="Denver"
          confirmationNumber="KJQ3II"
          showConfirmationNumber
          displayDestinationFirst
        />
      </div>
    );
  })
  .add('with confirmation number and display destination first - long city name', () => {
    return (
      <div style={wrapperStyles}>
        <TripCardHeader
          tripType="FLIGHT"
          dates={{
            first: '2017-12-08',
            second: null
          }}
          destinationDescription="Panama City Beach asdfasdfsadfasdfasdfasdfasd"
          confirmationNumber="KJQ3II"
          showConfirmationNumber
          displayDestinationFirst
        />
      </div>
    );
  })
  .add('with roundtrip when trip card is collapsed', () => {
    return (
      <div style={wrapperStyles}>
        <TripCardHeader
          tripType="FLIGHT"
          dates={{
            first: '2017-12-08',
            second: '2017-12-10'
          }}
          destinationDescription="Panama City Beach"
          confirmationNumber="KJQ3II"
          displayDestinationFirst
        />
      </div>
    );
  })
  .add('with date displayed as weekday', () => {
    return (
      <div style={wrapperStyles}>
        <TripCardHeader
          tripType="FLIGHT"
          dates={{
            first: '2017-12-08',
            second: '2017-12-10'
          }}
          destinationDescription="Panama City Beach"
          confirmationNumber="KJQ3II"
          showConfirmationNumber
          displayDestinationFirst
          displayWeekday
          departureDate="2017-12-29"
        />
      </div>
    );
  });
