class CarVendorsCommonBuilder {
  constructor() {
    this.revision = '20151104094209697';
    this.car_vendors = [
      {
        vendorName: 'Advantage',
        logoImage: '/content/mkt/images/car_vendors/Advantage_Logo_results.png',
        logoImageAltText: 'Advantage'
      },
      {
        vendorName: 'Alamo',
        logoImage: '/content/mkt/images/car_vendors/Alamo_Logo_results.png',
        logoImageAltText: 'Alamo',
        rrIncentiveText: 'Earn up to 600 points'
      },
      {
        vendorName: 'Avis',
        logoImage: '/content/mkt/images/car_vendors/Avis_Logo_results.png',
        logoImageAltText: 'Avis',
        rrIncentiveText: 'Earn up to 600 points'
      },
      {
        vendorName: 'Budget',
        logoImage: '/content/mkt/images/car_vendors/Budget_Logo_results.png',
        logoImageAltText: 'Budget',
        rrIncentiveText: 'Earn up to 600 points'
      },
      {
        vendorName: 'Dollar',
        logoImage: '/content/mkt/images/car_vendors/Dollar_Logo_results.png',
        logoImageAltText: 'Dollar',
        rrIncentiveText: 'Earn up to 600 points'
      },
      {
        vendorName: 'Enterprise',
        logoImage: '/content/mkt/images/car_vendors/Enterprise_Logo_results.png',
        logoImageAltText: 'Enterprise'
      },
      {
        vendorName: 'EZ',
        logoImage: '/content/mkt/images/car_vendors/EZ_Logo_results_price.png',
        logoImageAltText: 'EZ'
      },
      {
        vendorName: 'Fox',
        logoImage: '/content/mkt/images/car_vendors/Fox_Logo_results.png',
        logoImageAltText: 'Fox'
      },
      {
        vendorName: 'Hertz',
        logoImage: '/content/mkt/images/car_vendors/Hertz_Logo_results.png',
        logoImageAltText: 'Hertz',
        rrIncentiveText: 'Earn up to 600 points'
      },
      {
        vendorName: 'National',
        logoImage: '/content/mkt/images/car_vendors/National_Logo_results.png',
        logoImageAltText: 'National',
        rrIncentiveText: 'Earn up to 600 points'
      },
      {
        vendorName: 'Payless',
        logoImage: '/content/mkt/images/car_vendors/Payless_Logo_results.png',
        logoImageAltText: 'Payless',
        rrIncentiveText: 'Earn up to 600 points'
      },
      {
        vendorName: 'Thrifty',
        logoImage: '/content/mkt/images/car_vendors/Thrifty_Logo_results.png',
        logoImageAltText: 'Thrifty',
        rrIncentiveText: 'Earn up to 600 points'
      }
    ];
  }

  build() {
    return {
      revision: this.revision,
      car_vendors: this.car_vendors
    };
  }
}

module.exports = CarVendorsCommonBuilder;
