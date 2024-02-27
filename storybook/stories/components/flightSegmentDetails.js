const { storiesOf } = require('@storybook/react');
const React = require('react');
const FlightSegmentDetails = require('src/shared/components/flightSegmentDetails');

const wrapperStyles = { backgroundColor: '#FFF' };

storiesOf('components/flightSegmentDetails', module)
  .add('default', () => {
    return (
      <div style={wrapperStyles}>
        <FlightSegmentDetails
          departureTime="08:55"
          arrivalTime="11:14"
          flightNumber="12"
          departureAirport="Dallas (Love Field), TX - DAL"
          arrivalAirport="Minneapolis/St Paul (Terminal 2), MN - MSP"
        />
      </div>
    );
  })
  .add('PM permutation', () => {
    return (
      <div style={wrapperStyles}>
        <FlightSegmentDetails
          departureTime="13:55"
          arrivalTime="19:14"
          flightNumber="12"
          departureAirport="Dallas (Love Field), TX - DAL"
          arrivalAirport="Minneapolis/St Paul (Terminal 2), MN - MSP"
        />
      </div>
    );
  });
