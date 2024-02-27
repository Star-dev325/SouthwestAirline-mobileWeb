const getTravelInformationPageDomestic = require('mocks/templates/reservation/PPUWKZ/getTravelInformationPageDomestic');
const getTravelInformationPageInternational = require('mocks/templates/reservation/MTCO7D/getTravelInformationPageInternational');
const getTravelInformationPageWithSpecialAssistance = require('mocks/templates/reservation/SPESHL/getTravelInformationPageWithSpecialAssistance');
const getTravelInformationPageCheckedIn = require('mocks/templates/reservation/RDOCHK/getTravelInformationPageCheckedIn');
const getTravelInformationPage = require('mocks/templates/reservation/RDO2CH/getTravelInformationPage');

module.exports = [
  {
    path: '/chapi/v1/mobile-air-booking/page/view-reservation/edit-pnr-passenger/PPUWKZ',
    method: 'GET',
    cache: false,
    template: getTravelInformationPageDomestic
  },
  {
    path: '/chapi/v1/mobile-air-booking/feature/reservation/edit-pnr-passenger/PPUWKZ',
    method: 'POST',
    cache: false,
    template: () => ({ body: { passengerReference: '2', firstName: 'JOHN', lastName: 'DOE' } })
  },
  {
    path: '/chapi/v1/mobile-air-booking/page/view-reservation/edit-pnr-passenger/MTCO7D',
    method: 'GET',
    cache: false,
    template: getTravelInformationPageInternational
  },
  {
    path: '/chapi/v1/mobile-air-booking/feature/reservation/edit-pnr-passenger/MTCO7D',
    method: 'POST',
    cache: false,
    template: () => ({ body: { passengerReference: '2', firstName: 'JOHN', lastName: 'DOE' } })
  },
  {
    path: '/chapi/v1/mobile-air-booking/page/view-reservation/edit-pnr-passenger/SPESHL',
    method: 'GET',
    cache: false,
    template: getTravelInformationPageWithSpecialAssistance
  },
  {
    path: '/chapi/v1/mobile-air-booking/feature/reservation/edit-pnr-passenger/SPESHL',
    method: 'POST',
    cache: false,
    template: () => ({ body: { passengerReference: '2', firstName: 'SA PASSENGER', lastName: 'VIEWREZERTON' } })
  },
  {
    path: '/chapi/v1/mobile-air-booking/page/view-reservation/edit-pnr-passenger/RDOCHK',
    method: 'GET',
    cache: false,
    template: getTravelInformationPageCheckedIn
  },
  {
    path: '/chapi/v1/mobile-air-booking/feature/reservation/edit-pnr-passenger/RDOCHK',
    method: 'POST',
    cache: false,
    template: () => ({ body: { passengerReference: '2', firstName: 'Cannon', lastName: 'Biggs' } })
  },
  {
    path: '/chapi/v1/mobile-air-booking/page/view-reservation/edit-pnr-passenger/RDO2CH',
    method: 'GET',
    cache: false,
    template: getTravelInformationPage
  },
  {
    path: '/chapi/v1/mobile-air-booking/feature/reservation/edit-pnr-passenger/RDO2CH',
    method: 'POST',
    cache: false,
    template: () => ({ body: { passengerReference: '2', firstName: 'Carol', lastName: 'Biggs' } })
  }
];
