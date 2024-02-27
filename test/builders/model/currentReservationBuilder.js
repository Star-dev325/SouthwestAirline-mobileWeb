// @flow
import type { CurrentReservationType } from 'src/airChange/flow-typed/airChange.types';

class CurrentReservationBuilder {
  data: CurrentReservationType;

  constructor() {
    this.data = {
      arrivesTime: '07:05',
      date: '2018-05-04',
      departsTime: '06:10',
      flight: '127',
      flightTime: '0h 55m',
      isNextDayArrival: false,
      isOvernight: false,
      shortStopDescription: 'Nonstop',
      stopCity: null,
      stopDescription: 'Nonstop'
    };
  }

  withDate(date: string) {
    this.data.date = date;

    return this;
  }

  withNextDay() {
    this.data.isNextDayArrival = true;

    return this;
  }

  withOvernight() {
    this.data.isOvernight = true;

    return this;
  }

  build(): CurrentReservationType {
    return { ...this.data };
  }
}

export default CurrentReservationBuilder;
