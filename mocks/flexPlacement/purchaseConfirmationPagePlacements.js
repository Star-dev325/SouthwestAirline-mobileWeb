export const bottomPromo1 = {
  viewPortThreshold: 10,
  shouldObserveViewPort: true,
  contentBlockId: 'mock-value',
  isChasePrequal: true,
  isChaseCombo: true,
  isChasePlacement: true,
  displayType: 'flex-placement',
  placement: {
    templateKeys: ['checkinDate', 'checkoutDate'],
    flexSettings: {
      disableAbsolutePositioning: true,
      shouldScalePlacement: true
    },
    childContent: [
      {
        flexSettings: {
          disableAbsolutePositioning: true,
          shouldScalePlacement: true
        },
        childContent: [
          {
            styles: {
              top: '0px',
              left: '8px',
              width: '120px',
              position: 'absolute',
              height: '70px'
            },
            type: 'img',
            props: {
              src: '/content/mkt/images/airport_info/LAS_airport_info.jpg',
              alt: 'hotel',
              id: 'graphic_antseeh7ra'
            }
          },
          {
            childContent: [
              {
                childContent: [
                  {
                    textContent: 'Need a hotel?',
                    type: 'span',
                    translate: 'false',
                    props: {}
                  }
                ]
              }
            ],
            styles: {
              color: '#ffbf27',
              top: '5px',
              left: '150px',
              fontSize: '22px',
              position: 'absolute',
              'text-align': 'left'
            },
            type: 'Heading',
            props: {
              id: 'heading_isq1ob9kzq'
            }
          },
          {
            childContent: [
              {
                textContent: 'Explore some options.',
                type: 'span',
                translate: 'false',
                props: {}
              }
            ],
            styles: {
              color: '#ffffff',
              top: '40px',
              left: '150px',
              width: '220px',
              fontSize: '16px',
              position: 'absolute',
              'text-align': 'left'
            },
            props: {
              id: 'text_block_t22lo9ssv5s'
            }
          },
          {
            childContent: [
              {
                textContent: 'Explore',
                type: 'span',
                translate: 'false',
                props: {}
              }
            ],
            styles: {
              color: '#ffffff',
              top: '95px',
              left: '300px',
              fontSize: '12px',
              position: 'absolute',
              'text-align': 'left'
            },
            props: {
              id: 'text_block_wdfka3ypto8'
            }
          }
        ],
        styles: {
          backgroundColor: '#304cb2',
          width: '355px',
          position: 'relative',
          height: '120px'
        },
        type: 'div',
        props: {
          id: 'flex_content_dm7fu6x7wtm'
        }
      }
    ],
    styles: {
      backgroundColor: '#304cb2',
      width: '355px',
      height: '120px'
    },
    type: 'a',
    props: {
      display: 'block',
      id: 'flex_ok0lx1kh6ue',
      href: 'https://www.southwesthotels.com/searchresults.html?aid=2194863&label=mobconf-ban-2194863&iata=${IATA}&checkin=${checkinDate}&checkout=${checkoutDate}&clk=6421032&cbid=6421032',
      command: 'PLACEMENT_LINK'
    }
  },
  placementData: {
    linkType: 'webview'
  }
};

export const defaultBounds = [
  {
    boundType: 'DEPARTING',
    departureDate: '2021-11-07',
    flights: [
      {
        number: '4965',
        wifiOnBoard: true
      },
      {
        number: '828',
        wifiOnBoard: true
      }
    ],
    departureTime: '06:00',
    departureAirport: {
      name: 'Houston (Hobby)',
      state: 'TX',
      code: 'HOU',
      country: null
    },
    arrivalTime: '13:55',
    arrivalAirport: {
      name: 'Cancun',
      state: null,
      code: 'CUN',
      country: 'Mexico'
    },
    passengers: [
      {
        type: 'Passenger',
        count: 1,
        fareType: 'Wanna Get Away®',
        bookingCode: null
      }
    ],
    stops: [
      {
        arrivalTime: null,
        departureTime: null,
        changePlanes: false,
        airport: {
          name: 'Tampa',
          state: 'FL',
          code: 'TPA',
          country: null
        }
      },
      {
        arrivalTime: '10:35',
        departureTime: '11:50',
        changePlanes: true,
        airport: {
          name: 'Fort Lauderdale',
          state: 'FL',
          code: 'FLL',
          country: null
        }
      }
    ],
    fareProductDetails: {
      label: 'Wanna Get Away®',
      fareRulesUrl: 'https://mobile.dev1.southwest.com/fare-rules/wanna-get-away',
      fareProductId: 'WGA'
    },
    isNextDayArrival: false,
    travelTime: '6h 55m'
  },
  {
    boundType: 'RETURNING',
    departureDate: '2021-11-10',
    flights: [
      {
        number: '328',
        wifiOnBoard: true
      }
    ],
    departureTime: '08:30',
    departureAirport: {
      name: 'Cancun',
      state: null,
      code: 'CUN',
      country: 'Mexico'
    },
    arrivalTime: '09:55',
    arrivalAirport: {
      name: 'Houston (Hobby)',
      state: 'TX',
      code: 'HOU',
      country: null
    },
    passengers: [
      {
        type: 'Passenger',
        count: 1,
        fareType: 'Wanna Get Away®',
        bookingCode: null
      }
    ],
    stops: [],
    fareProductDetails: {
      label: 'Wanna Get Away®',
      fareRulesUrl: 'https://mobile.dev1.southwest.com/fare-rules/wanna-get-away',
      fareProductId: 'WGA'
    },
    isNextDayArrival: false,
    travelTime: '2h 25m'
  }
];
