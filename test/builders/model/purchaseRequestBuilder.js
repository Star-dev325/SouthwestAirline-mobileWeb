function PurchaseRequestBuilder() {
  this.contactInformation = {};
  this.payments = {};
  this.promoCode = '';
  this.purposeOfTravel = '';
  this.receiptEmail = '';
  this.reservationGroups = [];

  this.withReservationGroups = function(groups) {
    this.reservationGroups = groups;

    return this;
  };

  this.withChaseInstantCard = function() {
    this.payments = {
      chaseInstantCreditCard: { chaseCardId: 'sessions:3217829138902318902389' }
    };

    return this;
  };

  this.withDefaultValue = function() {
    this.contactInformation = {
      email: 'test@test.com',
      phone: {
        number: '1231231234',
        countryCode: '1'
      },
      contactMethod: 'EMAIL'
    };

    this.payments = {
      billingContactInfo: {
        firstName: 'Amber',
        lastName: 'Awesome',
        address: {
          addressLine1: '123 Somewhere Lane',
          addressLine2: '',
          city: 'Metropolis',
          stateProvinceRegion: 'TN',
          zipOrPostalCode: '12345',
          addressType: 'HOME',
          isoCountryCode: 'US'
        },
        phone: {
          number: '1231231234',
          countryCode: '1'
        }
      },
      creditCard: {
        creditCardType: 'VISA',
        cardNumber: '4111118336811111',
        expiration: '2018-06'
      }
    };

    this.purposeOfTravel = 'Business';
    this.receiptEmail = 'receipt@example.com';

    this.reservationGroups = [
      {
        passengerType: 'ADULT',
        amount: {
          amountCents: 82496
        },
        passengers: [
          {
            secureFlightName: {
              firstName: 'Amber',
              lastName: 'Awesome',
              middleName: 'is',
              suffix: 'CEO'
            },
            birthDate: '1985-06-25',
            gender: 'F'
          }
        ],
        products: [
          {
            productId: 'S1pCUHxBbWVyaWNhL05ld19Zb3JrfDIwMTUxMjE2MTYwNSwyMDE1MTIxNjE5MzV8QVRMLURBTCxEQUwtQVVTfFdONDcsV04xNTh8S3xBRFR8NzMzLDczVw=='
          },
          {
            productId: 'S1pCUHxBbWVyaWNhL0NoaWNhZ298MjAxNTEyMTkxNDMwLDIwMTUxMjE5MjAzNXxBVVMtRkxMLEZMTC1BVEx8V04zNjY3LFdOMjUxM3xLfEFEVHw3M0gsNzNI'
          }
        ]
      }
    ];

    return this;
  };

  this.withSessionId = function(sessionId) {
    this.reservationGroups.map((reservation) => {
      reservation.sessionId = sessionId;
    });

    return this;
  };

  this.build = function() {
    return {
      contactInformation: this.contactInformation,
      payments: this.payments,
      promoCode: this.promoCode,
      purposeOfTravel: this.purposeOfTravel,
      receiptEmail: this.receiptEmail,
      reservationGroups: this.reservationGroups
    };
  };
}

PurchaseRequestBuilder.getOneAdultRequest = function() {
  return new PurchaseRequestBuilder().withDefaultValue().build();
};

PurchaseRequestBuilder.withChaseInstantCard = function() {
  return new PurchaseRequestBuilder().withDefaultValue().withChaseInstantCard().build();
};

PurchaseRequestBuilder.getOneAdultRequestWithSessionId = function() {
  return new PurchaseRequestBuilder().withDefaultValue().withSessionId('sessions:698BDD254F034D87A1E238D79A8B9876').build();
};

PurchaseRequestBuilder.getTwoAdultRequest = function() {
  return new PurchaseRequestBuilder().withDefaultValue().withReservationGroups([
    {
      passengerType: 'ADULT',
      amount: {
        amountCents: 82496
      },
      passengers: [
        {
          secureFlightName: {
            firstName: 'Amber',
            lastName: 'Awesome',
            middleName: 'is',
            suffix: 'CEO'
          },
          birthDate: '1985-06-25',
          gender: 'F'
        },
        {
          secureFlightName: {
            firstName: 'John',
            lastName: 'Awesome',
            middleName: 'is',
            suffix: 'CEO'
          },
          birthDate: '1985-06-25',
          gender: 'F'
        }
      ],
      products: [
        {
          productId: 'S1pCUHxBbWVyaWNhL05ld19Zb3JrfDIwMTUxMjE2MTYwNSwyMDE1MTIxNjE5MzV8QVRMLURBTCxEQUwtQVVTfFdONDcsV04xNTh8S3xBRFR8NzMzLDczVw=='
        },
        {
          productId: 'S1pCUHxBbWVyaWNhL0NoaWNhZ298MjAxNTEyMTkxNDMwLDIwMTUxMjE5MjAzNXxBVVMtRkxMLEZMTC1BVEx8V04zNjY3LFdOMjUxM3xLfEFEVHw3M0gsNzNI'
        }
      ]
    }
  ]).build();
};

PurchaseRequestBuilder.getMixPaxRequest = function() {
  return new PurchaseRequestBuilder().withDefaultValue().withReservationGroups([
    {
      passengerType: 'ADULT',
      amount: {
        amountCents: 82496
      },
      passengers: [
        {
          secureFlightName: {
            firstName: 'Amber',
            lastName: 'Awesome',
            middleName: 'is',
            suffix: 'CEO'
          },
          birthDate: '1985-06-25',
          gender: 'F'
        }
      ],
      products: [
        {
          productId: 'S1pCUHxBbWVyaWNhL05ld19Zb3JrfDIwMTUxMjE2MTYwNSwyMDE1MTIxNjE5MzV8QVRMLURBTCxEQUwtQVVTfFdONDcsV04xNTh8S3xBRFR8NzMzLDczVw=='
        },
        {
          productId: 'S1pCUHxBbWVyaWNhL0NoaWNhZ298MjAxNTEyMTkxNDMwLDIwMTUxMjE5MjAzNXxBVVMtRkxMLEZMTC1BVEx8V04zNjY3LFdOMjUxM3xLfEFEVHw3M0gsNzNI'
        }
      ]
    },
    {
      passengerType: 'SENIOR',
      amount: {
        amountCents: 82496
      },
      passengers: [
        {
          secureFlightName: {
            firstName: 'John',
            lastName: 'Awesome',
            middleName: 'is',
            suffix: 'CEO'
          },
          birthDate: '1930-06-25',
          gender: 'F'
        }
      ],
      products: [
        {
          productId: 'S1pCUHxBbWVyaWNhL05ld19Zb3JrfDIwMTUxMjE2MTYwNSwyMDE1MTIxNjE5MzV8QVRMLURBTCxEQUwtQVVTfFdONDcsV04xNTh8S3xBRFR8NzMzLDczVw=='
        },
        {
          productId: 'S1pCUHxBbWVyaWNhL0NoaWNhZ298MjAxNTEyMTkxNDMwLDIwMTUxMjE5MjAzNXxBVVMtRkxMLEZMTC1BVEx8V04zNjY3LFdOMjUxM3xLfEFEVHw3M0gsNzNI'
        }
      ]
    }
  ]).build();
};

module.exports = PurchaseRequestBuilder;
