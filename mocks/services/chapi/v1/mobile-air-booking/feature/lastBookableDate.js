const dayjs = require('dayjs');

export default {
  path: '/chapi/v1/mobile-air-booking/feature/last-bookable-date',
  method: 'GET',
  cache: false,
  template: {
    lastBookableDate: dayjs().add(6, 'months').format('YYYY-MM-DD')
  }
};
