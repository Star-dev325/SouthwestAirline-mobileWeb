import React from 'react';
import { mount } from 'enzyme';

import FlightNumberList from 'src/shared/components/flightNumberList';

describe('FlightNumberList', () => {
  const render = (props) => mount(<FlightNumberList {...props} />);

  context('when rendered', () => {
    context('aircraft view res toggle is ON', () => {
      let flightNumberList;

      beforeEach(() => {
        flightNumberList = render({
          AIRCRAFT_TYPE_VIEWRES: true,
          flights: [
            {
              flightNumber: '1',
              aircraftInfo: {
                aircraftType: 'Boeing 777'
              }
            },
            {
              flightNumber: '2',
              aircraftInfo: {
                aircraftType: 'Boeing 777'
              }
            }
          ]
        });
      });
      it('should show aircraft type next to flight number', () => {
        expect(flightNumberList.find('.aircraft-type').at(0)).to.exist;
      });
    });

    context('aircraft view res toggle is ON but no aircraft type', () => {
      let flightNumberList;

      beforeEach(() => {
        flightNumberList = render({
          AIRCRAFT_TYPE_VIEWRES: true,
          flights: [
            {
              flightNumber: '1',
              aircraftInfo: {
                aircraftType: null
              }
            },
            {
              flightNumber: '2',
              aircraftInfo: {
                aircraftType: null
              }
            }
          ]
        });
      });

      it('should not show aircraft type next to flight number', () => {
        expect(flightNumberList.find('.aircraft-type').at(0)).to.not.exist;
      });
    });
  });
});
