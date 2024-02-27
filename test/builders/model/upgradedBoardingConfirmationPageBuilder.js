class upgradedBoardingConfirmationPageBuilder {
  constructor() {
    this.upgradedBoardingConfirmationPageResponse = {
      recordLocator: '3NSCML',
      title: {
        key: 'UB_YOURE_UPGRADED',
        body: 'You\'re upgraded!',
        icon: 'SUCCESS',
        textColor: 'NORMAL'
      },
      upgradedBoardingRecords: [
        {
          flightNumber: '719',
          departureTime: '17:00',
          gate: 'E29',
          segmentType: 'DEPARTING',
          boundIndex: 0,
          passengers: [
            {
              name: 'Bobby Blaine',
              boardingGroup: 'A',
              boardingPosition: '14'
            },
            {
              name: 'Brenda Blaine',
              boardingGroup: 'A',
              boardingPosition: '15'
            }
          ]
        },
        {
          flightNumber: '919',
          departureTime: '04:00',
          gate: 'C29',
          segmentType: 'RETURNING',
          boundIndex: 1,
          passengers: [
            {
              name: 'Bobby Blaine',
              boardingGroup: 'A',
              boardingPosition: '12'
            },
            {
              name: 'Brenda Blaine',
              boardingGroup: 'A',
              boardingPosition: '13'
            }
          ]
        }
      ],
      _links: {
        checkInSessionToken: 'eyJwbnIiOnsiY29uZmlybWF0aW9uTnVtYmVyIjoiM05TQ01MIiwicGFzc2VuZ2VycyI6WyJC...',
        viewBoardingPositions: {
          href: '/v1/mobile-air-operations/page/check-in/view-boarding-details',
          method: 'POST',
          body: {
            recordLocator: '3NSCML',
            firstName: 'Bobby',
            lastName: 'Blaine',
            passengerSearchToken: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMhV3Km1'
          },
          labelText: 'Boarding details'
        }
      }
    };
  }

  build() {
    return { ...this.upgradedBoardingConfirmationPageResponse };
  }

  withSinglePaxSingleSegment() {
    return {
      ...this.upgradedBoardingConfirmationPageResponse,
      upgradedBoardingRecords: [{
        ...this.upgradedBoardingConfirmationPageResponse.upgradedBoardingRecords.shift(),
        passengers: [{
          ...this.upgradedBoardingConfirmationPageResponse.upgradedBoardingRecords[0].passengers.shift()
        }]
      }]
    };
  }
}

export default upgradedBoardingConfirmationPageBuilder;
