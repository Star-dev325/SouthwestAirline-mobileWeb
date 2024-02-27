import lowFareCalendarInterceptor from 'src/shared/interceptors/flowInterceptors/lowFareCalendarInterceptor';

describe('lowFareCalendarInterceptor', () => {
  it('should match the config object', () => {
    const config = {
      name: 'lowFareCalendar',
      path: '/air/low-fare-calendar',
      pages: {
        lowFarCalendarPage: '/air/low-far-calendar/select-dates.html'
      }
    };

    expect(lowFareCalendarInterceptor).toEqual(config);
  });
});
