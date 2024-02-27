module.exports = function CarVendorsMobile() {
  this.success = true;
  this.errors = [];
  this.results = {
    modDate: 1481742207954,
    carVendors: [
      {
        rewardsPointsEarned: '0',
        code: 'AD',
        isRapidRewardsPartner: 'false',
        displayName: 'Advantage',
        promoCodes: {}
      },
      {
        rewardsPointsEarned: '600',
        code: 'ALAMO',
        isRapidRewardsPartner: 'true',
        displayName: 'Alamo',
        promoCodes: {
          FREQUENT_RENTER: 'Alamo Insiders ID',
          CORPORATE_RATE: 'Corporate ID',
          PROMOTIONAL_CODE: 'Assoc ID/Promo Code/Coupon Code',
          RATE_CODE: 'Rate Code'
        }
      },
      {
        rewardsPointsEarned: '600',
        code: 'AVIS',
        isRapidRewardsPartner: 'true',
        displayName: 'Avis',
        promoCodes: {
          FREQUENT_RENTER: 'Wizard Number',
          CORPORATE_RATE: 'Avis Worldwide Discount (AWD)',
          PROMOTIONAL_CODE: 'Coupon Number'
        }
      },
      {
        rewardsPointsEarned: '600',
        code: 'BUDGET',
        isRapidRewardsPartner: 'true',
        displayName: 'Budget',
        promoCodes: {
          FREQUENT_RENTER: 'Budget Customer #(BCN)',
          CORPORATE_RATE: 'Budget Customer Discount (BCD)',
          PROMOTIONAL_CODE: 'Coupon Number'
        }
      },
      {
        rewardsPointsEarned: '600',
        code: 'DOLLAR',
        isRapidRewardsPartner: 'true',
        displayName: 'Dollar',
        promoCodes: {
          FREQUENT_RENTER: 'Express ID',
          CORPORATE_RATE: 'Corporate Discount (CD Number)',
          PROMOTIONAL_CODE: 'Promotion Code'
        }
      },
      {
        rewardsPointsEarned: '0',
        code: 'ET',
        isRapidRewardsPartner: 'false',
        displayName: 'Enterprise',
        promoCodes: {
          FREQUENT_RENTER: 'Customer Number',
          CORPORATE_RATE: 'Enterprise Plus Number'
        }
      },
      {
        rewardsPointsEarned: '0',
        code: 'EZ',
        isRapidRewardsPartner: 'false',
        displayName: 'EZ',
        promoCodes: {}
      },
      {
        rewardsPointsEarned: '0',
        code: 'FX',
        isRapidRewardsPartner: 'false',
        displayName: 'Fox',
        promoCodes: {}
      },
      {
        rewardsPointsEarned: '600',
        code: 'HERTZ',
        isRapidRewardsPartner: 'true',
        displayName: 'Hertz',
        promoCodes: {
          FREQUENT_RENTER: 'Hertz Member Number',
          CORPORATE_RATE: 'CDP',
          PROMOTIONAL_CODE: 'Promotion Code'
        }
      },
      {
        rewardsPointsEarned: '600',
        code: 'ZL',
        isRapidRewardsPartner: 'true',
        displayName: 'National',
        promoCodes: {
          FREQUENT_RENTER: 'Emerald Club Number',
          CORPORATE_RATE: 'Contract ID'
        }
      },
      {
        rewardsPointsEarned: '600',
        code: 'ZA',
        isRapidRewardsPartner: 'true',
        displayName: 'Payless',
        promoCodes: {
          CORPORATE_RATE: 'Promo Code'
        }
      },
      {
        rewardsPointsEarned: '600',
        code: 'THRIFTY',
        isRapidRewardsPartner: 'true',
        displayName: 'Thrifty',
        promoCodes: {
          FREQUENT_RENTER: 'Blue Chip Number',
          CORPORATE_RATE: 'Corporate Discount Code',
          PROMOTIONAL_CODE: 'Promotion Code'
        }
      }
    ],
    sourceId: 'ivo07lj0'
  };

  this.build = function() {
    return {
      success: this.success,
      errors: this.errors,
      results: this.results
    };
  };
};
