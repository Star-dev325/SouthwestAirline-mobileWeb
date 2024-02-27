module.exports = {
  build() {
    return [
      { name: 'Advantage', vendorId: 'AD', isRapidRewardsPartner: false, acceptedDiscounts: {} },
      { name: 'Alamo', vendorId: 'ALAMO', isRapidRewardsPartner: true, acceptedDiscounts:
          { frequentRenterNumber: { name: 'Alamo Insiders ID' }, corporateRate: { name: 'Contract ID' } } },
      { name: 'Avis', vendorId: 'AVIS', isRapidRewardsPartner: true, acceptedDiscounts:
          { promotionalCode: { name: 'Coupon Number' }, frequentRenterNumber:
              { name: 'Wizard Number' }, corporateRate: { name: 'Avis Worldwide Discount (AWD)' } } },
      { name: 'Budget', vendorId: 'BUDGET', isRapidRewardsPartner: true, acceptedDiscounts:
          { promotionalCode: { name: 'Coupon Number' }, frequentRenterNumber:
              { name: 'Budget Customer #(BCN)' }, corporateRate: { name: 'Budget Customer Discount (BCD)' } } },
      { name: 'Dollar', vendorId: 'DOLLAR', isRapidRewardsPartner: true, acceptedDiscounts: { promotionalCode:
            { name: 'Promotion Code' }, frequentRenterNumber: { name: 'Express ID' }, corporateRate:
            { name: 'Corporate Discount (CD Number)' } } },
      { name: 'Enterprise',
        vendorId: 'ET', isRapidRewardsPartner: false, acceptedDiscounts: { frequentRenterNumber:
            { name: 'Customer Number' }, corporateRate: { name: 'Enterprise Plus Number' } } },
      { name: 'EZ', vendorId: 'EZ', isRapidRewardsPartner: false, acceptedDiscounts: {} },
      { name: 'Fox', vendorId: 'FX', isRapidRewardsPartner: false, acceptedDiscounts: {} },
      { name: 'Hertz', vendorId: 'HERTZ', isRapidRewardsPartner: true, acceptedDiscounts: { promotionalCode:
            { name: 'Promotion Code' }, frequentRenterNumber: { name: 'Hertz Member Number' }, corporateRate:
            { name: 'CDP' } } },
      { name: 'National', vendorId: 'ZL', isRapidRewardsPartner: true, acceptedDiscounts:
          { frequentRenterNumber: { name: 'Emerald Club Number' }, corporateRate: { name: 'Contract ID' } } },
      { name: 'Payless', vendorId: 'ZA', isRapidRewardsPartner: true, acceptedDiscounts:
          { corporateRate: { name: 'Promo Code' } } },
      { name: 'Thrifty', vendorId: 'THRIFTY', isRapidRewardsPartner: true, acceptedDiscounts: { promotionalCode:
            { name: 'Promotion Code' }, frequentRenterNumber: { name: 'Blue Chip Number' }, corporateRate:
            { name: 'Corporate Discount Code' } } }
    ];
  }
};
