// @flow
import type { cancelConfirmationStandbyType } from 'src/standby/flow-typed/standby.types';

class standbyCancelConfirmationBuilder {
  cancelStandbyListingPage: cancelConfirmationStandbyType;

  constructor() {
    this.cancelStandbyListingPage = {
      _links: {
        standbyListPolicies: null,
        sameDayUpdates: {
          href: '/v1/mobile-air-operations/page/same-day/3UTGJS',
          method: 'POST',
          labelText: 'List for standby on another flight',
          body: {
            passengerSearchToken:
              'dN1KUvERCMyyWMbKjBQ_DORayw_9dThrwuFq1dQC8PywPCCwa_iCtGJi40Wcv-UvXaRqmaCnNU5_pBaDntdriEduflBvQOrGp8fKJonMhEiuDTCD25nOQyS7ZuWkF1CXtUUlvBiKjvX4IMqwzzc7'
          }
        }
      },
      headerMessage: {
        key: 'CANCEL_STANDBY_LISTING_CONFIRMATION_HEADER_MESSAGE',
        header: 'You have cancelled your stand by listing for the flight below',
        body: "You're good to go! No need to do anything further.",
        icon: 'NONE',
        textColor: 'DEFAULT',
        backgroundColor: 'DEFAULT'
      },
      standbyFlight: {
        labelDescription: 'CANCELLED STANDBY LISTING',
        date: '2023-01-04',
        departsTime: '15:30',
        arrivesTime: '18:30',
        fromAirportCode: 'PHX',
        toAirportCode: 'DEN',
        flightNumbers: '439',
        passengers: [
          {
            name: 'Tesla Awesome',
            accountNumber: '601655902'
          },
          {
            name: 'Clarence Clayborn',
            accountNumber: null
          },
          {
            name: 'Ryan Clayborn',
            accountNumber: null
          },
          {
            name: 'Mounica Rachakonda',
            accountNumber: null
          },
          {
            name: 'Abdul Wahab',
            accountNumber: null
          }
        ]
      }
    };

    return this;
  }

  withOutSameDayUpdateLabelText() {
    this.cancelStandbyListingPage._links.sameDayUpdates = null;

    return this;
  }

  build() {
    return this.cancelStandbyListingPage;
  }
}

export default standbyCancelConfirmationBuilder;
