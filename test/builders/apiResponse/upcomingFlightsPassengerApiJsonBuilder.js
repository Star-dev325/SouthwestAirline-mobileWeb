class UpcomingFlightsPassengerApiJsonBuilder {
  constructor() {
    this.checkInEligibilities = [
      {
        checkinDocumentType: 'boardingPass',
        checkinDocumentReason: 'withinCheckinTimeWindow',
        boardingGroup: '',
        boardingPosition: '',
        segmentId: '201505201900-0500,201505202010-0500|DAL-HOU|WN51',
        _links: {
          checkin: {
            href: '/reservations/record-locator/FX4SOA/boarding-passes',
            method: 'POST'
          }
        }
      }
    ];
  }

  withCheckInEligibilities(...checkInEligibilities) {
    this.checkInEligibilities = checkInEligibilities;

    return this;
  }

  build() {
    return {
      firstName: 'RON',
      lastName: 'HACKMANN',
      loyaltyAccountNumber: '00000600597056',
      earlyBirdEligibilities: [
        {
          earlyBirdProductId: null,
          status: 'BUSINESS_SELECT',
          priceCents: 0,
          originationDestinationId: '201505201900-0500,201505202010-0500|DAL-HOU|WN51'
        }
      ],
      checkinEligibilities: this.checkInEligibilities
    };
  }
}

module.exports = UpcomingFlightsPassengerApiJsonBuilder;
