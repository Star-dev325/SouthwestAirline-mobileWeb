export default class Vendors {
  constructor() {
    this.vendors = [{
      name: 'Budget',
      vendorId: 'BUDGET',
      isRapidRewardsPartner: true,
      acceptedDiscounts: {
        frequentRenterNumber: {
          name: 'Budget Customer #(BCN)'
        },
        corporateRate: {
          name: 'Budget Customer Discount (BCD)'
        },
        promotionalCode: {
          name: 'Coupon Number'
        }
      }
    }, {
      name: 'Dollar',
      vendorId: 'DOLLAR',
      isRapidRewardsPartner: true,
      acceptedDiscounts: {
        frequentRenterNumber: {
          name: 'Express ID'
        },
        corporateRate: {
          name: 'Corporate Discount (CD Number)'
        },
        promotionalCode: {
          name: 'Promotion Code'
        }
      }
    }, {
      name: 'Payless',
      vendorId: 'ZA',
      isRapidRewardsPartner: true,
      acceptedDiscounts: {
        frequentRenterNumber: null,
        corporateRate: {
          name: 'Promo Code'
        },
        promotionalCode: null
      }
    }, {
      name: 'Alamo',
      vendorId: 'ALAMO',
      isRapidRewardsPartner: true,
      acceptedDiscounts: {
        frequentRenterNumber: {
          name: 'Alamo Insiders ID'
        },
        corporateRate: {
          name: 'Corporate ID'
        },
        rateCode: {
          name: 'Rate Code'
        },
        promotionalCode: {
          name: 'Assoc ID/Promo Code/Coupon Code'
        }
      }
    }, {
      name: 'National',
      vendorId: 'ZL',
      isRapidRewardsPartner: true,
      acceptedDiscounts: {
        frequentRenterNumber: {
          name: 'Emerald Club Number'
        },
        corporateRate: {
          name: 'Contract ID'
        },
        promotionalCode: null
      }
    }, {
      name: 'Thrifty',
      vendorId: 'THRIFTY',
      isRapidRewardsPartner: true,
      acceptedDiscounts: {
        frequentRenterNumber: {
          name: 'Blue Chip Number'
        },
        corporateRate: {
          name: 'Corporate Discount Code'
        },
        promotionalCode: {
          name: 'Promotion Code'
        }
      }
    }, {
      name: 'EZ',
      vendorId: 'EZ',
      isRapidRewardsPartner: false,
      acceptedDiscounts: {
        frequentRenterNumber: null,
        corporateRate: null,
        promotionalCode: null
      }
    }, {
      name: 'Advantage',
      vendorId: 'AD',
      isRapidRewardsPartner: false,
      acceptedDiscounts: {
        frequentRenterNumber: null,
        corporateRate: null,
        promotionalCode: null
      }
    }, {
      name: 'Enterprise',
      vendorId: 'ET',
      isRapidRewardsPartner: false,
      acceptedDiscounts: {
        frequentRenterNumber: {
          name: 'Enterprise Plus Number'
        },
        corporateRate: {
          name: 'Customer Number'
        },
        promotionalCode: null
      }
    }, {
      name: 'Fox',
      vendorId: 'FX',
      isRapidRewardsPartner: false,
      acceptedDiscounts: {
        frequentRenterNumber: null,
        corporateRate: null,
        promotionalCode: null
      }
    }, {
      name: 'Avis',
      vendorId: 'AVIS',
      isRapidRewardsPartner: true,
      acceptedDiscounts: {
        frequentRenterNumber: {
          name: 'Wizard Number'
        },
        corporateRate: {
          name: 'Avis Worldwide Discount (AWD)'
        },
        promotionalCode: {
          name: 'Coupon Number'
        }
      }
    }, {
      name: 'Hertz',
      vendorId: 'HERTZ',
      isRapidRewardsPartner: true,
      acceptedDiscounts: {
        frequentRenterNumber: {
          name: 'Hertz Member Number'
        },
        corporateRate: {
          name: 'CDP'
        },
        promotionalCode: {
          name: 'Promotion Code'
        }
      }
    }];
  }

  build() {
    return {
      vendors: this.vendors
    };
  }
}
