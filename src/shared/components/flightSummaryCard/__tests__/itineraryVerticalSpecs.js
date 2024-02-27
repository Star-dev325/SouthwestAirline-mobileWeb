import { shallow } from 'enzyme';
import _ from 'lodash';
import React from 'react';
import ItineraryVertical from 'src/shared/components/flightSummaryCard/itineraryVertical';

describe('itineraryVertical', () => {
  let arrivalDetail;
  let boundDetail;
  let departureDetail;
  let isReturn;
  let itineraryVertical;
  let stops;

  beforeEach(() => {
    arrivalDetail = {
      airportCode: 'PHX',
      airportName: 'Phoenix',
      arrivesNextDay: false,
      cityState: 'AZ',
      dateTime: '2015-04-28T19:15:00'
    };
    boundDetail = {
      arrivalAirport: {
        code: 'ATL',
        country: 'US',
        name: 'Atlanta',
        state: 'GA'
      },
      arrivalStatus: 'ON TIME',
      arrivalStatusType: 'POSITIVE',
      arrivalTime: '11:30',
      boundType: 'DEPARTING',
      departureAirport: {
        code: 'HAV',
        country: 'Cuba',
        name: 'Havana',
        state: 'MI'
      },
      departureDate: '2017-08-21',
      departureStatus: 'ON TIME',
      departureStatusType: 'POSITIVE',
      departureTime: '06:45',
      flights: [
        {
          number: '235',
          wifiOnBoard: false
        },
        {
          number: '1740',
          wifiOnBoard: false
        }
      ],
      isNextDayArrival: false,
      stops: [
        {
          airport: {
            code: 'DAL',
            country: null,
            name: 'Dallas (Love Field)',
            state: 'TX'
          },
          arrivalStatus: 'ON TIME',
          arrivalStatusType: 'POSITIVE',
          arrivalTime: '07:45',
          changePlanes: true,
          departureStatus: 'ON TIME',
          departureStatusType: 'POSITIVE',
          departureTime: '08:25',
          isOvernight: true
        }
      ],
      travelTime: '3h 45m'
    };
    departureDetail = {
      airportCode: 'DAL',
      airportName: 'Dallas (Love Field)',
      cityState: 'TX',
      dateTime: '2015-04-28T18:40:00'
    };
    isReturn = false;
    stops = [];

    itineraryVertical = createComponent({ departureDetail, arrivalDetail, stops, isReturn, boundDetail });
  });

  context('when initialize', () => {
    it('should render properly', () => {
      expect(itineraryVertical).to.be.present();
    });

    it('should render with correct class name', () => {
      expect(itineraryVertical.find('.itinerary-vertical')).to.be.present();
    });

    it('should show departure and arrival information of bound', () => {
      const departureTimeAndStatus = itineraryVertical.find('FlightTimeAndStatus').first();
      const arrivalTimeAndStatus = itineraryVertical.find('FlightTimeAndStatus').last();

      expect(departureTimeAndStatus).to.have.prop('timeString', '06:45');
      expect(departureTimeAndStatus).to.have.prop('flightStatus', 'ON TIME');
      expect(departureTimeAndStatus).to.have.prop('statusType', 'POSITIVE');
      expect(departureTimeAndStatus).to.have.prop('statusIconPosition', 'UNDER');
      expect(departureTimeAndStatus).to.have.prop('originalTime', null);

      expect(arrivalTimeAndStatus).to.have.prop('timeString', '11:30');
      expect(arrivalTimeAndStatus).to.have.prop('flightStatus', 'ON TIME');
      expect(arrivalTimeAndStatus).to.have.prop('statusType', 'POSITIVE');
      expect(arrivalTimeAndStatus).to.have.prop('statusIconPosition', 'UNDER');
      expect(arrivalTimeAndStatus).to.have.prop('originalTime', null);
      expect(arrivalTimeAndStatus).to.have.prop('isNextDay', false);
    });

    it('should show original times when flight is delayed', () => {
      const boundDetail = {
        actualArrivalTime: '11:45',
        actualDepartureTime: '07:00',
        arrivalAirport: {
          code: 'ATL',
          country: null,
          name: 'Atlanta',
          state: 'GA'
        },
        arrivalStatus: 'DELAYED',
        arrivalStatusType: 'NEGATIVE',
        arrivalTime: '11:30',
        boundType: 'DEPARTING',
        departureAirport: {
          code: 'HAV',
          country: 'Cuba',
          name: 'Havana',
          state: null
        },
        departureDate: '2017-08-21',
        departureStatus: 'DELAYED',
        departureStatusType: 'NEGATIVE',
        departureTime: '06:45',
        flights: [
          {
            number: '235',
            wifiOnBoard: false
          },
          {
            number: '1740',
            wifiOnBoard: false
          }
        ],
        isNextDayArrival: false,
        stops: [
          {
            actualArrivalTime: '08:00',
            actualDepartureTime: '08:40',
            airport: {
              code: 'DAL',
              country: null,
              name: 'Dallas (Love Field)',
              state: 'TX'
            },
            arrivalStatus: 'DELAYED',
            arrivalStatusType: 'NEGATIVE',
            arrivalTime: '07:45',
            changePlanes: true,
            departureStatus: 'DELAYED',
            departureStatusType: 'NEGATIVE',
            departureTime: '08:25'
          }
        ],
        travelTime: '3h 45m'
      };
      const delayedItineraryVertical = createComponent({
        arrivalDetail,
        boundDetail,
        departureDetail,
        isReturn,
        stops
      });

      const departureTimeAndStatus = delayedItineraryVertical.find('FlightTimeAndStatus').first();
      const arrivalTimeAndStatus = delayedItineraryVertical.find('FlightTimeAndStatus').last();

      expect(departureTimeAndStatus).to.have.prop('timeString', '07:00');
      expect(departureTimeAndStatus).to.have.prop('flightStatus', 'DELAYED');
      expect(departureTimeAndStatus).to.have.prop('statusType', 'NEGATIVE');
      expect(departureTimeAndStatus).to.have.prop('originalTime', '06:45');
      expect(departureTimeAndStatus).to.have.prop('statusIconPosition', 'UNDER');

      expect(arrivalTimeAndStatus).to.have.prop('timeString', '11:45');
      expect(arrivalTimeAndStatus).to.have.prop('flightStatus', 'DELAYED');
      expect(arrivalTimeAndStatus).to.have.prop('statusType', 'NEGATIVE');
      expect(arrivalTimeAndStatus).to.have.prop('originalTime', '11:30');
      expect(arrivalTimeAndStatus).to.have.prop('statusIconPosition', 'UNDER');
    });

    it('should show actual arrival times when a delayed flight is partially completed', () => {
      const boundDetail = {
        actualArrivalTime: '11:45',
        actualDepartureTime: '07:00',
        arrivalAirport: {
          code: 'ATL',
          country: null,
          name: 'Atlanta',
          state: 'GA'
        },
        arrivalStatus: 'LANDED',
        arrivalStatusType: 'POSITIVE',
        arrivalTime: '11:30',
        boundType: 'DEPARTING',
        departureAirport: {
          code: 'HAV',
          country: 'Cuba',
          name: 'Havana',
          state: null
        },
        departureDate: '2017-08-21',
        departureStatus: 'DELAYED',
        departureStatusType: 'NEGATIVE',
        departureTime: '06:45',
        flights: [
          {
            number: '235',
            wifiOnBoard: false
          },
          {
            number: '1740',
            wifiOnBoard: false
          }
        ],
        isNextDayArrival: false,
        stops: [
          {
            actualArrivalTime: '08:00',
            actualDepartureTime: '08:40',
            airport: {
              code: 'DAL',
              country: null,
              name: 'Dallas (Love Field)',
              state: 'TX'
            },
            arrivalStatus: 'LANDED',
            arrivalStatusType: 'POSITIVE',
            arrivalTime: '07:45',
            changePlanes: true,
            departureStatus: 'DELAYED',
            departureStatusType: 'NEGATIVE',
            departureTime: '08:25'
          }
        ],
        travelTime: '3h 45m'
      };
      const delayedItineraryVertical = createComponent({
        arrivalDetail,
        boundDetail,
        departureDetail,
        isReturn,
        stops
      });

      const departureTimeAndStatus = delayedItineraryVertical.find('FlightTimeAndStatus').first();
      const arrivalTimeAndStatus = delayedItineraryVertical.find('FlightTimeAndStatus').last();

      expect(departureTimeAndStatus).to.have.prop('timeString', '07:00');
      expect(departureTimeAndStatus).to.have.prop('flightStatus', 'DELAYED');
      expect(departureTimeAndStatus).to.have.prop('statusType', 'NEGATIVE');
      expect(departureTimeAndStatus).to.have.prop('originalTime', '06:45');
      expect(departureTimeAndStatus).to.have.prop('statusIconPosition', 'UNDER');

      expect(arrivalTimeAndStatus).to.have.prop('timeString', '11:45');
      expect(arrivalTimeAndStatus).to.have.prop('flightStatus', 'LANDED');
      expect(arrivalTimeAndStatus).to.have.prop('statusType', 'POSITIVE');
      expect(arrivalTimeAndStatus).to.have.prop('originalTime', null);
      expect(arrivalTimeAndStatus).to.have.prop('statusIconPosition', 'UNDER');
    });

    it('should show departure and arrival airports of bound', () => {
      const departureAirport = itineraryVertical.find('AirportInfo').first();
      const arrivalAirport = itineraryVertical.find('AirportInfo').last();

      expect(departureAirport).to.have.prop('airportInfo').to.deep.equal({
        airportCode: 'HAV',
        airportName: 'Havana',
        cityState: 'MI',
        country: 'Cuba'
      });

      expect(arrivalAirport).to.have.prop('airportInfo').to.deep.equal({
        airportCode: 'ATL',
        airportName: 'Atlanta',
        cityState: 'GA',
        country: 'US'
      });
    });
  });

  context('when bound is returning', () => {
    it('should render with correct class name', () => {
      const returningBound = _.set(_.clone(boundDetail), 'boundType', 'RETURNING');

      itineraryVertical = createComponent({
        arrivalDetail,
        boundDetail: returningBound,
        departureDetail,
        isReturn,
        stops
      });

      expect(itineraryVertical.find('.itinerary-vertical--return')).to.be.present();
    });
  });

  context('when bound does not have stop', () => {
    beforeEach(() => {
      const boundWithNoStops = _.set(_.clone(boundDetail), 'stops', []);

      itineraryVertical = createComponent({
        arrivalDetail,
        boundDetail: boundWithNoStops,
        departureDetail,
        isReturn,
        stops
      });
    });

    it('should not render stop', () => {
      expect(itineraryVertical.find('Stop')).to.not.be.present();
      const stopDetailsText = itineraryVertical.find('StopDetailsText');

      expect(stopDetailsText).to.have.prop('flightData').which.deep.equal({
        connectionAirportCode: null,
        isOvernight: false,
        numberOfStops: 0
      });
      expect(stopDetailsText).to.have.prop('withIcon').to.be.false;
    });
  });

  context('when bound does not have departureAirport', () => {
    beforeEach(() => {
      const boundWithNoSDepartureAirport = _.set(_.clone(boundDetail), 'departureAirport', {});

      itineraryVertical = createComponent({
        arrivalDetail,
        boundDetail: boundWithNoSDepartureAirport,
        departureDetail,
        isReturn,
        stops
      });
    });

    it('should not render departureAirport', () => {
      expect(itineraryVertical.find('airport-info--detail')).to.not.be.present();
    });
  });

  context('when bound does not have arrivalAirport', () => {
    beforeEach(() => {
      const boundWithNoArrivalAirport = _.set(_.clone(boundDetail), 'arrivalAirport', {});

      itineraryVertical = createComponent({
        arrivalDetail,
        boundDetail: boundWithNoArrivalAirport,
        departureDetail,
        isReturn,
        stops
      });
    });

    it('should not render arrivalAirport', () => {
      expect(itineraryVertical.find('airport-info--detail')).to.not.be.present();
    });
  });

  context('when bound has stops', () => {
    it('should render stops properly', () => {
      expect(itineraryVertical.find('Stop')).to.have.prop('stopsTotalNumber').which.equal(1);
      expect(itineraryVertical.find('Stop')).to.have.prop('stopNumber').which.equal(1);
      expect(itineraryVertical.find('Stop'))
        .to.have.prop('stop')
        .which.deep.equal({
          airport: {
            code: 'DAL',
            country: null,
            name: 'Dallas (Love Field)',
            state: 'TX'
          },
          arrivalStatus: 'ON TIME',
          arrivalStatusType: 'POSITIVE',
          arrivalTime: '07:45',
          changePlanes: true,
          departureStatus: 'ON TIME',
          departureStatusType: 'POSITIVE',
          departureTime: '08:25',
          isOvernight: true
        });
    });

    it('should render stopDetailsText correctly', () => {
      const panelHeader = itineraryVertical.find('Panel').prop('header');
      const headerWrapper = shallow(panelHeader);

      const stopDetailsText = headerWrapper.find('StopDetailsText');

      expect(stopDetailsText).to.have.prop('flightData').which.deep.equal({
        connectionAirportCode: 'DAL',
        isOvernight: true,
        numberOfStops: 1
      });
      expect(stopDetailsText).to.have.prop('withIcon').to.be.true;
    });
  });

  const createComponent = (props = {}) => shallow(<ItineraryVertical {...props} />);
});
