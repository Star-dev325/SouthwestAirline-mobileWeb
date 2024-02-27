// @flow
import type { BoundSelection } from 'src/shared/flow-typed/boundSelect.types';

export default class BoundSelectionBuilder {
  boundSelection: BoundSelection;

  constructor() {
    this.boundSelection = {
      boundReference: 'bound1',
      hasInactiveBags: false,
      flight: '194/285',
      flightType: 'Departure',
      fromAirport: 'Boise, ID - BOI',
      fromAirportCode: 'BOI',
      isSelectable: true,
      originalDate: '2018-04-17',
      productId: 'product1',
      showWarningIcon: false,
      timeArrives: '23:45',
      timeDeparts: '15:00',
      toAirport: 'Austin, TX - AUS',
      toAirportCode: 'AUS'
    };
  }

  withFlightType(flightType: string): BoundSelectionBuilder {
    this.boundSelection.flightType = flightType;

    return this;
  }

  withFlight(flight: string): BoundSelectionBuilder {
    this.boundSelection.flight = flight;

    return this;
  }

  withOriginalDate(originalDate: string): BoundSelectionBuilder {
    this.boundSelection.originalDate = originalDate;

    return this;
  }

  withFrom(airport: string, airportCode: string, isReaccomSelectable: boolean = false): BoundSelectionBuilder {
    this.boundSelection.fromAirport = airport;
    this.boundSelection.fromAirportCode = airportCode;

    if (isReaccomSelectable) {
      this.boundSelection.isSelectable = true;
    }

    return this;
  }

  withTo(airport: string, airportCode: string, isReaccomSelectable: boolean = false): BoundSelectionBuilder {
    this.boundSelection.toAirport = airport;
    this.boundSelection.toAirportCode = airportCode;

    if (isReaccomSelectable) {
      this.boundSelection.isSelectable = true;
    }

    return this;
  }

  withDynamicWaiver(value: boolean = true) {
    this.boundSelection.showWarningIcon = value;

    return this;
  }

  withReaccomBound(isSelectable: boolean = true, isFlown: boolean = false) {
    this.boundSelection.isSelectable = isSelectable;
    this.boundSelection.boundFlown = isFlown;

    return this;
  }

  withReaccomCoTerm() {
    this.boundSelection.alternateReaccomDestinationAirportCodes = ['LGA', 'JFK'];
    this.boundSelection.alternateReaccomOriginationAirportCodes = ['HOU', 'IAH'];
    this.boundSelection.multiSelectShoppingDates = {
      beginShoppingDate: '2018-04-15',
      endShoppingDate: '2018-05-01'
    };
    this.boundSelection.shoppingDates = {
      beginShoppingDate: '2018-04-15',
      endShoppingDate: '2018-05-01'
    };

    return this;
  }

  build(): BoundSelection {
    return { ...this.boundSelection };
  }
}
