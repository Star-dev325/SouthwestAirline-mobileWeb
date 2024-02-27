export default class EarlyBirdBoundsBuilder {
  constructor() {
    this.earlybirdBounds = [
      {
        arrivalAirportCode: 'ALB',
        arrivalTime: '13:35',
        boundType: 'DEPARTING',
        departureAirportCode: 'AUS',
        departureDate: '2018-06-08',
        departureTime: '05:30',
        earlyBirdBoundPrice: {
          amount: '15.00',
          currencyCode: 'USD',
          currencySymbol: '$',
          description: null
        },
        flight: '461/1125',
        isNextDayArrival: false,
        isOvernight: false,
        passengers: [
          {
            accountNumber: null,
            canPurchaseEarlyBird: true,
            decisionDescription: null,
            _meta: {
              productId: 'productId00'
            },
            name: 'PAUL LIU'
          },
          {
            accountNumber: '601534942',
            canPurchaseEarlyBird: false,
            decisionDescription: 'A-List',
            _meta: {
              productId: 'productId01'
            },
            name: 'HARRY POTTER'
          }
        ]
      },
      {
        arrivalAirportCode: 'AUS',
        arrivalTime: '16:00',
        boundType: 'RETURNING',
        departureAirportCode: 'ALB',
        departureDate: '2018-06-17',
        departureTime: '06:15',
        earlyBirdBoundPrice: {
          amount: '15.00',
          currencyCode: 'USD',
          currencySymbol: '$',
          description: null
        },
        flight: '461/1125',
        isNextDayArrival: false,
        isOvernight: false,
        passengers: [
          {
            accountNumber: null,
            canPurchaseEarlyBird: true,
            decisionDescription: null,
            _meta: {
              productId: 'productId10'
            },
            name: 'PAUL LIU'
          },
          {
            accountNumber: '601534942',
            canPurchaseEarlyBird: false,
            decisionDescription: 'A-List',
            _meta: {
              productId: 'productId11'
            },
            name: 'HARRY POTTER'
          }
        ]
      }
    ];
  }

  build() {
    return this.earlybirdBounds;
  }
}
