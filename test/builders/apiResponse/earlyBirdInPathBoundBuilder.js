export default class EarlyBirdInPathApiResponseBuilder {
  constructor() {
    this.originDestinationAirports = 'AUS - DAL';
    this.productId = 'mockProductId';
    this.flightNumbers = '#2795';
    this.productNotEligible = {
      productId: this.productId,
      passengerReference: null,
      fare: null
    };
    this.products = {
      adult: this._productEligible()
    };
    this.isEligible = true;
    this.notEBE = {
      canPurchaseEarlyBird: false,
      decisionDescription: 'Included*',
      fareType: 'Wanna Get Away',
      price: null,
      isAlist: true
    };
    this.passenger = (num = 1, fareType = 'Adult') => ({
      canPurchaseEarlyBird: true,
      decisionDescription: `${num} ${fareType}`,
      fareType: 'Wanna Get Away',
      price: {
        amount: `${num * 15}.00`,
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      isAlist: false
    });
  }

  _withCurrency(amount) {
    return {
      amount: `${amount}.00`,
      currencyCode: 'USD',
      currencySymbol: '$'
    };
  }

  _productEligible(ref = ['2'], unitPrice = 15) {
    return {
      productId: this.productId,
      passengerReference: ref,
      fare: {
        baseFare: this._withCurrency(unitPrice),
        totalTaxesAndFees: this._withCurrency(0),
        totalFare: this._withCurrency(unitPrice)
      }
    };
  }

  _boundGenerator(data = {}) {
    return {
      originDestinationAirports: data.originDestinationAirports || this.originDestinationAirports,
      flightNumbers: data.flightNumbers || this.flightNumbers,
      passengersGroups: data.passengersGroups || [
        this.passenger(1)
      ],
      isEligible: data.isEligible === false ? false : this.isEligible,
      _meta: {
        products: data._meta.products || this.products
      }
    };
  }

  singleAdultOneWayNotEligibleEarlyBird() {
    this.bounds = [this._boundGenerator({
      passengersGroups: [
        this.notEBE
      ],
      isEligible: false,
      _meta: {
        products: {
          adult: this.productNotEligible
        }
      }
    })];

    return this;
  }

  singleAdultRoundTripNotEligibleEarlyBird() {
    this.bounds = [
      this._boundGenerator({
        passengersGroups: [
          this.notEBE
        ],
        isEligible: false,
        _meta: {
          products: {
            adult: this.productNotEligible
          }
        }
      }),
      this._boundGenerator({
        passengersGroups: [
          this.notEBE
        ],
        isEligible: false,
        _meta: {
          products: {
            adult: this.productNotEligible
          }
        }
      })
    ];

    return this;
  }

  singleAdultOneWayEligibleEarlyBird() {
    this.bounds = [this._boundGenerator({
      passengersGroups: [
        this.passenger(1)
      ],
      _meta: {
        products: {
          adult: this._productEligible()
        }
      }
    })];

    return this;
  }

  inEligibleEarlyBird() {
    this.bounds = [this._boundGenerator({
      isEligible: false,
      passengersGroups: [
        this.passenger(1),
        this.passenger(2)
      ],
      _meta: {
        products: {
          adult: this._productEligible()
        }
      }
    })];

    return this;
  }

  singleAdultRoundTripEligibleEarlyBird() {
    this.bounds = [
      this._boundGenerator({
        passengersGroups: [
          this.passenger(1)
        ],
        _meta: {
          products: {
            adult: this._productEligible()
          }
        }
      }),
      this._boundGenerator({
        passengersGroups: [
          this.passenger(1)
        ],
        _meta: {
          products: {
            adult: this._productEligible(['2'], 25)
          }
        }
      })
    ];

    return this;
  }

  multipleAdultOneWayEligibleEarlyBird() {
    this.bounds = [this._boundGenerator({
      passengersGroups: [
        this.passenger(2)
      ],
      _meta: {
        products: {
          adult: this._productEligible()
        }
      }
    })];

    return this;
  }

  multipleAdultRoundTripEligibleEarlyBird() {
    this.bounds = [this._boundGenerator({
      passengersGroups: [
        this.passenger(2)
      ],
      _meta: {
        products: {
          adult: this._productEligible(['2', '3'], 15)
        }
      }
    }),
    this._boundGenerator({
      passengersGroups: [
        this.passenger(2)
      ],
      _meta: {
        products: {
          adult: this._productEligible(['2', '3'], 25)
        }
      }
    })];

    return this;
  }

  multipleAdultOneWayPatialEligible() {
    this.bounds = [this._boundGenerator({
      passengersGroups: [
        this.notEBE,
        this.passenger(1)
      ],
      isEligible: true,
      _meta: {
        products: {
          adult: this._productEligible(['3'])
        }
      }
    })];

    return this;
  }

  build() {
    return {
      bounds: this.bounds
    };
  }
}
