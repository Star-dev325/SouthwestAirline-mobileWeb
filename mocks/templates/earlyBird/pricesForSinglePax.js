module.exports = {
  earlyBirdEligibility: {
    bounds: [
      {
        originDestinationAirports: 'ALB - AUS',
        flightNumbers: '#138/2025',
        passengersGroups: [
          {
            canPurchaseEarlyBird: true,
            decisionDescription: '1 Adult',
            fareType: 'Anytime',
            price: {
              amount: '15.00',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            isAlist: false
          }
        ],
        isEligible: true,
        _meta: {
          products: {
            adult: {
              productId:
                'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMLFksQUxCLE1EVywyMDE4LTAzLTIzVDA1OjUwLTA0OjAwLDIwMTgtMDMtMjNUMDc6MTAtMDU6MDAsV04sV04sMTM4LDczSHxZTCxZLE1EVyxBVVMsMjAxOC0wMy0yM1QwODo1MC0wNTowMCwyMDE4LTAzLTIzVDExOjM1LTA1OjAwLFdOLFdOLDIwMjUsNzNXIiwicXVvdGVkUHJpY2UiOiI1NjYuNzgiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZSwiZmFyZVR5cGUiOiJBTlkiLCJmYXJlUHJpY2luZ1R5cGUiOiJBRFVMVCJ9',
              passengerReference: ['2'],
              fare: {
                baseFare: {
                  amount: '15.00',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                totalTaxesAndFees: {
                  amount: '0.00',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                totalFare: {
                  amount: '15.00',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                }
              }
            },
            senior: null
          }
        }
      }
    ],
    totalPrice: {
      amount: '15.00',
      currencyCode: 'USD',
      currencySymbol: '$'
    },
    unitPrice: {
      amount: '15.00',
      currencyCode: 'USD',
      currencySymbol: '$',
      description: 'per passenger, each way'
    },
    adultProductsCount: '1',
    seniorProductsCount: '0',
    ineligibilityReasons: null,
    _meta: {
      passengers: [
        {
          name: {
            firstName: 'Andrew',
            lastName: 'Tangrila',
            middleName: ''
          },
          passengerReference: '2',
          accountNumber: null,
          gender: 'M',
          dateOfBirth: '1986-09-18'
        }
      ]
    }
  }
};
