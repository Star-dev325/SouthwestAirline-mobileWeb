import {
  transformToCarShoppingResultObject,
  transformToCarCompanyViewValue,
  transformToCarCompanyList,
  transformToCarPromotionSelectOption
} from 'src/carBooking/transformers/carVendorTransformer';

import Vendors from 'test/builders/apiResponse/v1/car-reservations/vendors';

describe('carVendorTransformer', () => {
  const carVendorList = new Vendors().build().vendors;

  context('transformToCarShoppingResultObject', () => {
    it('should create list for Rapid Rewards Members and all others', () => {
      const carVendorList = [
        { name: 'Budget', isRapidRewardsPartner: true },
        { name: 'Advantage', isRapidRewardsPartner: false }
      ];

      const carCompanySelect = transformToCarShoppingResultObject(carVendorList);

      expect(carCompanySelect.rapidRewardsPartners).to.have.lengthOf(1);
      expect(carCompanySelect.rapidRewardsPartners[0]).to.equal('Budget');
      expect(carCompanySelect.allOthers).to.have.lengthOf(1);
      expect(carCompanySelect.allOthers[0]).to.equal('Advantage');
    });
  });

  context('transformToCarCompanyViewValue', () => {
    it('should show Shop all when shop all', () => {
      const viewValue = transformToCarCompanyViewValue(carVendorList, 'Shop all');

      expect(viewValue).to.equal('Shop all');
    });

    it('should show RR partners when select value is equal rapid rewards partners value', () => {
      const allRapidRewardsMembers = 'BUDGET,DOLLAR,ZA,ALAMO,ZL,THRIFTY,AVIS,HERTZ';

      const viewValue = transformToCarCompanyViewValue(carVendorList, allRapidRewardsMembers);

      expect(viewValue).to.equal('RR partners');
    });

    it('should handle an array of selected car vendors', () => {
      const allRapidRewardsMembers = [
        { vendorId: 'BUDGET' },
        { vendorId: 'DOLLAR' },
        { vendorId: 'ZA' },
        { vendorId: 'ALAMO' },
        { vendorId: 'ZL' },
        { vendorId: 'THRIFTY' },
        { vendorId: 'AVIS' },
        { vendorId: 'HERTZ' }
      ];

      const viewValue = transformToCarCompanyViewValue(carVendorList, allRapidRewardsMembers);

      expect(viewValue).to.equal('RR partners');
    });

    it('should handle an empty car vendors list when an array of one selected car vendor is passed', () => {
      const allRapidRewardsMembers = [{ vendorId: 'ALAMO' }];

      const viewValue = transformToCarCompanyViewValue([], allRapidRewardsMembers);

      expect(viewValue).to.equal();
    });

    it('should show Shop all others when select value is equal shop all others list', () => {
      const allOtherVendors = 'AD,EZ,ET,FX';

      const viewValue = transformToCarCompanyViewValue(carVendorList, allOtherVendors);

      expect(viewValue).to.equal('Shop all others');
    });

    it('should show 5 options select when you select five vendors(rapid rewards members and others)', () => {
      const fiveOptionsSelected = 'BUDGET,DOLLAR,EZ,ET,FX';

      const viewValue = transformToCarCompanyViewValue(carVendorList, fiveOptionsSelected);

      expect(viewValue).to.equal('5 selected');
    });

    it('should show 7 option select when select value is all rapid rewards partners and some shop all others', () => {
      const sevenOptionsSelected = 'BUDGET,DOLLAR,ZA,ALAMO,EZ,ET,FX';

      const viewValue = transformToCarCompanyViewValue(carVendorList, sevenOptionsSelected);

      expect(viewValue).to.equal('7 selected');
    });

    it('should show car vendor name when select value is one car company', () => {
      const oneCompanySelected = 'FX';

      const viewValue = transformToCarCompanyViewValue(carVendorList, oneCompanySelected);

      expect(viewValue).to.equal('Fox');
    });
  });

  context('transformToCarCompanyList', () => {
    it('should show Shop all when shop all', () => {
      const carVendorsArray = transformToCarCompanyList(carVendorList, 'Shop all');

      const shopAll = carVendorsArray[0][0];
      const allRapidRewards = carVendorsArray[1][0];
      const allOtherVendors = carVendorsArray[2][0];

      expect(shopAll.isSelected).to.be.true;
      expect(allRapidRewards.isSelected).to.be.true;
      expect(allOtherVendors.isSelected).to.be.true;
    });

    it('should show RR partners when select value is equal rapid rewards partners value', () => {
      const allRapidRewardsMembers = 'BUDGET,DOLLAR,ZA,ALAMO,ZL,THRIFTY,AVIS,HERTZ';

      const carVendorsArray = transformToCarCompanyList(carVendorList, allRapidRewardsMembers);

      const allRapidRewards = carVendorsArray[1][0];
      const allOthers = carVendorsArray[2][0];

      expect(allRapidRewards.isSelected).to.be.true;
      expect(allOthers.isSelected).to.be.false;
    });

    it('should handle an array of selected car vendors', () => {
      const allRapidRewardsMembers = [
        { vendorId: 'BUDGET' },
        { vendorId: 'DOLLAR' },
        { vendorId: 'ZA' },
        { vendorId: 'ALAMO' },
        { vendorId: 'ZL' },
        { vendorId: 'THRIFTY' },
        { vendorId: 'AVIS' },
        { vendorId: 'HERTZ' }
      ];

      const carVendorsArray = transformToCarCompanyList(carVendorList, allRapidRewardsMembers);

      const allRapidRewards = carVendorsArray[1][0];
      const allOthers = carVendorsArray[2][0];

      expect(allRapidRewards.isSelected).to.be.true;
      expect(allOthers.isSelected).to.be.false;
    });

    it('should show Shop all others when select value is equal shop all others list', () => {
      const allOtherVendors = 'AD,EZ,ET,FX';

      const carVendorsArray = transformToCarCompanyList(carVendorList, allOtherVendors);

      const allRapidRewards = carVendorsArray[1][0];
      const allOthers = carVendorsArray[2][0];

      expect(allRapidRewards.isSelected).to.be.false;
      expect(allOthers.isSelected).to.be.true;
    });

    it('should show Budget option selected when selected value is BUDGET', () => {
      const carVendorsArray = transformToCarCompanyList(carVendorList, 'BUDGET');

      const budget = carVendorsArray[1][3];

      expect(budget.isSelected).to.be.true;
    });

    it('should show Budget and Fox option select when select value is BUDGET and FX', () => {
      const carVendorsArray = transformToCarCompanyList(carVendorList, 'BUDGET,FX');

      const budget = carVendorsArray[1][3];
      const fox = carVendorsArray[2][4];

      expect(budget.isSelected).to.be.true;
      expect(fox.isSelected).to.be.true;
    });

    it('should sort vendor by name', () => {
      const carVendorsArray = transformToCarCompanyList(carVendorList, 'Shop all');

      const firstRRVendor = carVendorsArray[1][1];
      const secondRRVendor = carVendorsArray[1][2];
      const thirdRRVendor = carVendorsArray[1][3];

      expect(firstRRVendor.name).to.be.equal('Alamo');
      expect(secondRRVendor.name).to.be.equal('Avis');
      expect(thirdRRVendor.name).to.be.equal('Budget');
    });
  });

  context('transformToCarPromotionSelectOption', () => {
    it('should contain 4 child when every child of acceptedDiscounts have value', () => {
      const carVendorList = [
        {
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
        }
      ];

      const promoCodeList = transformToCarPromotionSelectOption(carVendorList);

      expect(promoCodeList[0].carCompany).to.deep.equal({ label: 'Alamo', value: 'ALAMO' });
      expect(promoCodeList[0].promoTypeList.length).to.equal(4);
      expect(promoCodeList[0].promoTypeList).to.deep.equal([
        { label: 'Alamo Insiders ID', value: 'FREQUENT_RENTER' },
        { label: 'Corporate ID', value: 'CORPORATE_RATE' },
        { label: 'Rate Code', value: 'RATE_CODE' },
        { label: 'Assoc ID/Promo Code/Coupon Code', value: 'PROMOTIONAL_CODE' }
      ]);
    });

    it('should sort vendor list by vendor name', () => {
      const carVendorList = [
        {
          name: 'Budget',
          acceptedDiscounts: {
            frequentRenterNumber: {
              name: 'Budget Insiders ID'
            }
          }
        },
        {
          name: 'Alamo',
          acceptedDiscounts: {
            frequentRenterNumber: {
              name: 'Alamo Insiders ID'
            }
          }
        }
      ];

      const promoCodeList = transformToCarPromotionSelectOption(carVendorList);

      expect(promoCodeList[0].carCompany.label).to.be.equal('Alamo');
      expect(promoCodeList[1].carCompany.label).to.be.equal('Budget');
    });

    it('should not contain the rateCode when rateCode is null', () => {
      const carVendorList = [
        {
          name: 'Budget',
          vendorId: 'BUDGET',
          acceptedDiscounts: {
            frequentRenterNumber: {
              name: 'Budget Customer #(BCN)'
            },
            corporateRate: {
              name: 'Budget Customer Discount (BCD)'
            },
            rateCode: null,
            promotionalCode: {
              name: 'Coupon Number'
            }
          }
        }
      ];

      const promoCodeList = transformToCarPromotionSelectOption(carVendorList);

      expect(promoCodeList[0].carCompany).to.deep.equal({ label: 'Budget', value: 'BUDGET' });
      expect(promoCodeList[0].promoTypeList).to.deep.equal([
        { label: 'Budget Customer #(BCN)', value: 'FREQUENT_RENTER' },
        { label: 'Budget Customer Discount (BCD)', value: 'CORPORATE_RATE' },
        { label: 'Coupon Number', value: 'PROMOTIONAL_CODE' }
      ]);
    });

    it('should not contain the object when child of acceptedDiscounts is null', () => {
      const carVendorList = [
        {
          name: 'Budget',
          vendorId: 'BUDGET',
          acceptedDiscounts: {
            frequentRenterNumber: {
              name: 'Budget Customer #(BCN)'
            },
            corporateRate: {
              name: 'Budget Customer Discount (BCD)'
            },
            rateCode: null,
            promotionalCode: {
              name: 'Coupon Number'
            }
          }
        },
        {
          name: 'EZ',
          vendorId: 'EZ',
          isRapidRewardsPartner: false,
          acceptedDiscounts: {
            frequentRenterNumber: null,
            corporateRate: null,
            rateCode: null,
            promotionalCode: null
          }
        }
      ];

      const promoCodeList = transformToCarPromotionSelectOption(carVendorList);

      expect(promoCodeList.length).to.equal(1);
      expect(promoCodeList[0].carCompany).to.deep.equal({ label: 'Budget', value: 'BUDGET' });
      expect(promoCodeList[0].promoTypeList).to.deep.equal([
        { label: 'Budget Customer #(BCN)', value: 'FREQUENT_RENTER' },
        { label: 'Budget Customer Discount (BCD)', value: 'CORPORATE_RATE' },
        { label: 'Coupon Number', value: 'PROMOTIONAL_CODE' }
      ]);
    });
  });
});
