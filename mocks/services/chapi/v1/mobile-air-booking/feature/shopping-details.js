const dayjs = require('dayjs');
const airStations = require('mocks/templates/airStations');
const productDefinitions = require('mocks/templates/productDefinitions');

export default {
  path: '/chapi/v1/mobile-air-booking/feature/shopping-details',
  method: 'GET',
  cache: false,
  template: {
    productDefinitions,
    lastBookableDate: dayjs().add(6, 'months').format('YYYY-MM-DD'),
    airStations,
    calendarScheduleMessage: 'Calendar schedule message'
  }
};
