export default class FareDetailsBuilder {
  constructor() {
    this.fareDetails = {
      title: 'Fare Details',
      headings: [
        {
          fareName: 'Business Select®',
          stylizedFareName: undefined,
          amountOfPoints: '12x',
          pointsPerDollar: 'pts per dollar',
          backgroundColor: '#304cb2',
          textColor: 'white'
        },
        {
          fareName: 'Anytime',
          stylizedFareName: undefined,
          amountOfPoints: '10x',
          pointsPerDollar: 'pts per dollar',
          backgroundColor: '#a4baf2',
          textColor: '#000000'
        },
        {
          fareName: 'Wanna Get Away Plus',
          stylizedFareName: [
            {
              label: 'Wanna Get Away'
            },
            {
              label: ' plus',
              font: 'Fairwater Script'
            }
          ],
          amountOfPoints: '8x',
          pointsPerDollar: 'pts per dollar',
          backgroundColor: '#d5152e',
          textColor: '#ffffff'
        },
        {
          fareName: 'Wanna Get Away®',
          stylizedFareName: undefined,
          amountOfPoints: '6x',
          pointsPerDollar: 'pts per dollar',
          backgroundColor: '#ffbf27',
          textColor: '#000000'
        }
      ],
      categories: {
        'Two bags fly free®*--0': [
          {
            title: 'Two bags fly free®*--0',
            value: true,
            color: '#304cb2',
            description: 'First and second checked bags. Weight and size limits apply.'
          },
          {
            title: 'Two bags fly free®*--0',
            value: true,
            color: '#a4baf2',
            description: 'First and second checked bags. Weight and size limits apply.'
          },
          {
            title: 'Two bags fly free®*--0',
            value: true,
            color: '#d5152e',
            description: 'First and second checked bags. Weight and size limits apply.'
          },
          {
            title: 'Two bags fly free®*--0',
            value: true,
            color: '#ffbf27',
            description: 'First and second checked bags. Weight and size limits apply.'
          }
        ],
        'No change fees**--1': [
          {
            title: 'No change fees**--1',
            value: true,
            color: '#304cb2',
            description: 'Fare difference may apply.'
          },
          {
            title: 'No change fees**--1',
            value: true,
            color: '#a4baf2',
            description: 'Fare difference may apply.'
          },
          {
            title: 'No change fees**--1',
            value: true,
            color: '#d5152e',
            description: 'Fare difference may apply.'
          },
          {
            title: 'No change fees**--1',
            value: true,
            color: '#ffbf27',
            description: 'Fare difference may apply.'
          }
        ],
        'Reusable funds for up to 12 months--2': [
          {
            title: 'Reusable funds for up to 12 months--2',
            value: true,
            color: '#304cb2',
            description: 'If you cancel your flight, 100% of your ticket can be applied to future travel.'
          },
          {
            title: 'Reusable funds for up to 12 months--2',
            value: true,
            color: '#a4baf2',
            description: 'If you cancel your flight, 100% of your ticket can be applied to future travel.'
          },
          {
            title: 'Reusable funds for up to 12 months--2',
            value: true,
            color: '#d5152e',
            description: 'If you cancel your flight, 100% of your ticket can be applied to future travel.'
          },
          {
            title: 'Reusable funds for up to 12 months--2',
            value: true,
            color: '#ffbf27',
            description: 'If you cancel your flight, 100% of your ticket can be applied to future travel.'
          }
        ],
        'Transferable Flight Credit--3': [
          {
            title: 'Transferable Flight Credit--3',
            value: true,
            color: '#304cb2',
            description: 'Flight credit can be transferred to someone else.'
          },
          {
            title: 'Transferable Flight Credit--3',
            value: true,
            color: '#a4baf2',
            description: 'Flight credit can be transferred to someone else.'
          },
          {
            title: 'Transferable Flight Credit--3',
            value: true,
            color: '#d5152e',
            description: 'Flight credit can be transferred to someone else.'
          },
          {
            title: 'Transferable Flight Credit--3',
            value: false,
            color: '#ffbf27',
            description: 'Flight credit can be transferred to someone else.'
          }
        ],
        'Refundable (2) (That money is all yours.)--4': [
          {
            title: 'Refundable (2) (That money is all yours.)--4',
            value: true,
            color: '#304cb2',
            description:
              'Refundable, as long as you cancel your reservation at least ten (10) minutes prior to the scheduled departure of your flight. If you cancel, you’re eligible to receive 100% of your ticket value as a refund to your original form of payment. Southwest residual travel funds from a previous reservation that are applied toward a Business Select Fare will be refunded as residual travel funds. '
          },
          {
            title: 'Refundable (2) (That money is all yours.)--4',
            value: true,
            color: '#a4baf2',
            description:
              'Refundable, as long as you cancel your reservation at least ten (10) minutes prior to the scheduled departure of your flight. If you cancel, you’re eligible to receive 100% of your ticket value as a refund to your original form of payment. Southwest residual travel funds from a previous reservation that are applied toward a Business Select Fare will be refunded as residual travel funds. '
          },
          {
            title: 'Refundable (2) (That money is all yours.)--4',
            value: false,
            color: '#d5152e',
            description:
              'Refundable, as long as you cancel your reservation at least ten (10) minutes prior to the scheduled departure of your flight. If you cancel, you’re eligible to receive 100% of your ticket value as a refund to your original form of payment. Southwest residual travel funds from a previous reservation that are applied toward a Business Select Fare will be refunded as residual travel funds. '
          },
          {
            title: 'Refundable (2) (That money is all yours.)--4',
            value: false,
            color: '#ffbf27',
            description:
              'Refundable, as long as you cancel your reservation at least ten (10) minutes prior to the scheduled departure of your flight. If you cancel, you’re eligible to receive 100% of your ticket value as a refund to your original form of payment. Southwest residual travel funds from a previous reservation that are applied toward a Business Select Fare will be refunded as residual travel funds. '
          }
        ],
        'Same-day change (3)--5': [
          {
            title: 'Same-day change (3)--5',
            value: true,
            color: '#304cb2',
            description:
              'To take advantage of these benefits, see a Southwest agent at the airport. If there’s an open seat on a different flight on the same day as your original flight and it’s between the same cities, our agent can book a seat on the new flight for you free  of airline charges. If there isn’t an open seat, ask an agent to add you to the same-day standby list. If there are any government taxes and fees associated with these itinerary changes, you will be required to pay those. Your original boarding position is not guaranteed.'
          },
          {
            title: 'Same-day change (3)--5',
            value: true,
            color: '#a4baf2',
            description:
              'To take advantage of these benefits, see a Southwest agent at the airport. If there’s an open seat on a different flight on the same day as your original flight and it’s between the same cities, our agent can book a seat on the new flight for you free  of airline charges. If there isn’t an open seat, ask an agent to add you to the same-day standby list. If there are any government taxes and fees associated with these itinerary changes, you will be required to pay those. Your original boarding position is not guaranteed.'
          },
          {
            title: 'Same-day change (3)--5',
            value: false,
            color: '#d5152e',
            description:
              'To take advantage of these benefits, see a Southwest agent at the airport. If there’s an open seat on a different flight on the same day as your original flight and it’s between the same cities, our agent can book a seat on the new flight for you free  of airline charges. If there isn’t an open seat, ask an agent to add you to the same-day standby list. If there are any government taxes and fees associated with these itinerary changes, you will be required to pay those. Your original boarding position is not guaranteed.'
          },
          {
            title: 'Same-day change (3)--5',
            value: false,
            color: '#ffbf27',
            description:
              'To take advantage of these benefits, see a Southwest agent at the airport. If there’s an open seat on a different flight on the same day as your original flight and it’s between the same cities, our agent can book a seat on the new flight for you free  of airline charges. If there isn’t an open seat, ask an agent to add you to the same-day standby list. If there are any government taxes and fees associated with these itinerary changes, you will be required to pay those. Your original boarding position is not guaranteed.'
          }
        ],
        'Same-day standby (3)--6': [
          {
            title: 'Same-day standby (3)--6',
            value: true,
            color: '#304cb2',
            description:
              'To take advantage of these benefits, see a Southwest agent at the airport. If there’s an open seat on a different flight on the same day as your original flight and it’s between the same cities, our agent can book a seat on the new flight for you free  of airline charges. If there isn’t an open seat, ask an agent to add you to the same-day standby list. If there are any government taxes and fees associated with these itinerary changes, you will be required to pay those. Your original boarding position is not guaranteed.'
          },
          {
            title: 'Same-day standby (3)--6',
            value: true,
            color: '#a4baf2',
            description:
              'To take advantage of these benefits, see a Southwest agent at the airport. If there’s an open seat on a different flight on the same day as your original flight and it’s between the same cities, our agent can book a seat on the new flight for you free  of airline charges. If there isn’t an open seat, ask an agent to add you to the same-day standby list. If there are any government taxes and fees associated with these itinerary changes, you will be required to pay those. Your original boarding position is not guaranteed.'
          },
          {
            title: 'Same-day standby (3)--6',
            value: false,
            color: '#d5152e',
            description:
              'To take advantage of these benefits, see a Southwest agent at the airport. If there’s an open seat on a different flight on the same day as your original flight and it’s between the same cities, our agent can book a seat on the new flight for you free  of airline charges. If there isn’t an open seat, ask an agent to add you to the same-day standby list. If there are any government taxes and fees associated with these itinerary changes, you will be required to pay those. Your original boarding position is not guaranteed.'
          },
          {
            title: 'Same-day standby (3)--6',
            value: false,
            color: '#ffbf27',
            description:
              'To take advantage of these benefits, see a Southwest agent at the airport. If there’s an open seat on a different flight on the same day as your original flight and it’s between the same cities, our agent can book a seat on the new flight for you free  of airline charges. If there isn’t an open seat, ask an agent to add you to the same-day standby list. If there are any government taxes and fees associated with these itinerary changes, you will be required to pay those. Your original boarding position is not guaranteed.'
          }
        ],
        'Fly By® priority lane (4)--7': [
          {
            title: 'Fly By® priority lane (4)--7',
            value: true,
            color: '#304cb2',
            description:
              'This priority lane gets you to the front of the ticket counter faster. A-List or A-List Preferred Members already enjoy the Fly By® priority lane.\n'
          },
          {
            title: 'Fly By® priority lane (4)--7',
            value: false,
            color: '#a4baf2',
            description:
              'This priority lane gets you to the front of the ticket counter faster. A-List or A-List Preferred Members already enjoy the Fly By® priority lane.\n\n'
          },
          {
            title: 'Fly By® priority lane (4)--7',
            value: false,
            color: '#d5152e',
            description:
              'This priority lane gets you to the front of the ticket counter faster. A-List or A-List Preferred Members already enjoy the Fly By® priority lane.\n\n'
          },
          {
            title: 'Fly By® priority lane (4)--7',
            value: false,
            color: '#ffbf27',
            description:
              'This priority lane gets you to the front of the ticket counter faster. A-List or A-List Preferred Members already enjoy the Fly By® priority lane.\n'
          }
        ],
        'Fly By® security lane (4)--8': [
          {
            title: 'Fly By® security lane (4)--8',
            value: true,
            color: '#304cb2',
            description:
              'This priority lane gets you through the security line faster. A-List or A-List Preferred Members enjoy this benefit too.\n'
          },
          {
            title: 'Fly By® security lane (4)--8',
            value: false,
            color: '#a4baf2',
            description:
              'This priority lane gets you through the security line faster. A-List or A-List Preferred Members enjoy this benefit too.\n\n'
          },
          {
            title: 'Fly By® security lane (4)--8',
            value: false,
            color: '#d5152e',
            description:
              'This priority lane gets you through the security line faster. A-List or A-List Preferred Members enjoy this benefit too.\n\n'
          },
          {
            title: 'Fly By® security lane (4)--8',
            value: false,
            color: '#ffbf27',
            description:
              'This priority lane gets you through the security line faster. A-List or A-List Preferred Members enjoy this benefit too.'
          }
        ],
        'Complimentary premium drink--9': [
          {
            title: 'Complimentary premium drink--9',
            value: true,
            color: '#304cb2',
            description: null
          },
          {
            title: 'Complimentary premium drink--9',
            value: false,
            color: '#a4baf2',
            description: null
          },
          {
            title: 'Complimentary premium drink--9',
            value: false,
            color: '#d5152e',
            description: null
          },
          {
            title: 'Complimentary premium drink--9',
            value: false,
            color: '#ffbf27',
            description: 'Due to COVID-19, drink service is currently suspended.'
          }
        ],
        'Priority boarding A1-A15--10': [
          {
            title: 'Priority boarding A1-A15--10',
            value: true,
            color: '#304cb2',
            description: null
          },
          {
            title: 'Priority boarding A1-A15--10',
            value: false,
            color: '#a4baf2',
            description: null
          },
          {
            title: 'Priority boarding A1-A15--10',
            value: false,
            color: '#d5152e',
            description: null
          },
          {
            title: 'Priority boarding A1-A15--10',
            value: false,
            color: '#ffbf27',
            description: null
          }
        ]
      }
    };
  }

  build() {
    return this.fareDetails;
  }
}