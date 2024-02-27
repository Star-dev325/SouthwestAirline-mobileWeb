import _ from 'lodash';
import PromoCodeTransformer from 'src/carBooking/transformers/promoCodeTransformer';
import CarVendorsMobile from 'test/builders/apiResponse/v1/content-delivery/query/carVendorsMobile';

const { transformToResultsPromoCodes } = PromoCodeTransformer;

describe('Promo Code Transformer', () => {
  it('should return undefined if promo codes from API are undefined', () => {
    const searchRequest = createSearchRequestWithDiscount(undefined);
    const getPromoCodesResult = transformToResultsPromoCodes(searchRequest.discount);

    const result = getPromoCodesResult(undefined, allCarVendors());

    expect(result).to.be.undefined;
  });

  it('should return undefined if promo codes in search request are undefined', () => {
    const discount = [undefined, undefined];
    const appliedPromoCodeOne = createPromoCode(true, 'AVIS', 'FREQUENT_RENTER', 'ddd');
    const appliedPromoCodeTwo = createPromoCode(true, 'HERTZ', 'PROMOTIONAL_CODE', '222');
    const getPromoCodesResult = transformToResultsPromoCodes(discount);

    const result = getPromoCodesResult([appliedPromoCodeOne, appliedPromoCodeTwo], allCarVendors());

    expect(result.numberOfAppliedPromoCodes).to.equal(0);
  });

  context('all promo codes applied', () => {
    let result;

    beforeEach(() => {
      const appliedPromoCodeOne = createPromoCode(true, 'AVIS', 'FREQUENT_RENTER', 'ddd');
      const appliedPromoCodeTwo = createPromoCode(true, 'HERTZ', 'PROMOTIONAL_CODE', '222');
      const searchRequest = createSearchRequestWithDiscount([appliedPromoCodeOne, appliedPromoCodeTwo]);

      result = transformToResultsPromoCodes(searchRequest.discount)(
        [appliedPromoCodeOne, appliedPromoCodeTwo],
        allCarVendors()
      );
    });

    it('should return the codes count with 2', () => {
      expect(result.numberOfAppliedPromoCodes).to.equal(2);
    });

    it('should return appliedPromoCodes with 2 correct promo code object', () => {
      expect(result.appliedPromoCodes).to.deep.equal([
        {
          code: 'ddd',
          promoCodeApplied: true,
          type: 'FREQUENT_RENTER',
          vendor: 'AVIS'
        },
        {
          code: '222',
          promoCodeApplied: true,
          type: 'PROMOTIONAL_CODE',
          vendor: 'HERTZ'
        }
      ]);
    });

    it('should return notAppliedPromoCodes with empty array', () => {
      expect(result.notAppliedPromoCodes).to.deep.equal([]);
    });
  });

  context('partial promo codes applied', () => {
    let result;

    beforeEach(() => {
      const appliedPromoCodeOne = createPromoCode(true, 'AVIS', 'FREQUENT_RENTER', 'ddd');
      const appliedPromoCodeTwo = createPromoCode(false, 'HERTZ', 'PROMOTIONAL_CODE', '222');
      const searchRequest = createSearchRequestWithDiscount([appliedPromoCodeOne, appliedPromoCodeTwo]);

      result = transformToResultsPromoCodes(searchRequest.discount)(
        [appliedPromoCodeOne, appliedPromoCodeTwo],
        allCarVendors()
      );
    });

    it('should return the codes count with 1', () => {
      expect(result.numberOfAppliedPromoCodes).to.equal(1);
    });

    it('should return appliedPromoCodes with 1 applied promo code', () => {
      expect(result.appliedPromoCodes).to.deep.equal([
        {
          code: 'ddd',
          promoCodeApplied: true,
          type: 'FREQUENT_RENTER',
          vendor: 'AVIS'
        }
      ]);
    });

    it('should return notAppliedPromoCodes with 1 not applied promo code', () => {
      expect(result.notAppliedPromoCodes).to.deep.equal([
        {
          code: '222',
          message: 'Hertz, Promotion Code, 222',
          numberOfPromoCode: 2,
          vendor: 'HERTZ'
        }
      ]);
    });
  });

  context('all promo codes not applied', () => {
    let result;

    beforeEach(() => {
      const appliedPromoCodeOne = createPromoCode(false, 'AVIS', 'FREQUENT_RENTER', 'ddd');
      const appliedPromoCodeTwo = createPromoCode(false, 'HERTZ', 'PROMOTIONAL_CODE', '222');
      const searchRequest = createSearchRequestWithDiscount([appliedPromoCodeOne, appliedPromoCodeTwo]);

      result = transformToResultsPromoCodes(searchRequest.discount)(
        [appliedPromoCodeOne, appliedPromoCodeTwo],
        allCarVendors()
      );
    });

    it('should return the codes count with 0', () => {
      expect(result.numberOfAppliedPromoCodes).to.equal(0);
    });

    it('should return appliedPromoCodes with empty array', () => {
      expect(result.appliedPromoCodes).to.deep.equal([]);
    });

    it('should return notAppliedPromoCodes with 2 not applied promo code', () => {
      expect(result.notAppliedPromoCodes).to.deep.equal([
        {
          code: 'ddd',
          message: 'Avis, Wizard Number, ddd',
          numberOfPromoCode: 1,
          vendor: 'AVIS'
        },
        {
          code: '222',
          message: 'Hertz, Promotion Code, 222',
          numberOfPromoCode: 2,
          vendor: 'HERTZ'
        }
      ]);
    });
  });

  context('no promo code results', () => {
    let result;

    beforeEach(() => {
      const appliedPromoCodeOne = createPromoCode(false, 'AVIS', 'FREQUENT_RENTER', 'ddd');
      const appliedPromoCodeTwo = createPromoCode(false, 'HERTZ', 'PROMOTIONAL_CODE', '222');
      const searchRequest = createSearchRequestWithDiscount([appliedPromoCodeOne, appliedPromoCodeTwo]);

      result = transformToResultsPromoCodes(searchRequest.discount)([], allCarVendors());
    });

    it('should return the codes count with 0', () => {
      expect(result.numberOfAppliedPromoCodes).to.equal(0);
    });

    it('should return appliedPromoCodes with empty array', () => {
      expect(result.appliedPromoCodes).to.deep.equal([]);
    });

    it('should return notAppliedPromoCodes with empty array', () => {
      expect(result.notAppliedPromoCodes).to.deep.equal([]);
    });
  });

  context('extra invalid promo codes filtered out when sending invalid promo code', () => {
    let result;

    beforeEach(() => {
      const appliedPromoCodeOne = createPromoCode(false, 'AVIS', 'FREQUENT_RENTER', 'ddd');
      const appliedPromoCodeTwo = createPromoCode(false, 'HERTZ', 'PROMOTIONAL_CODE', '222');
      const searchRequest = createSearchRequestWithDiscount([appliedPromoCodeOne]);

      result = transformToResultsPromoCodes(searchRequest.discount)(
        [appliedPromoCodeOne, appliedPromoCodeTwo],
        allCarVendors()
      );
    });

    it('should return the codes count with 0', () => {
      expect(result.numberOfAppliedPromoCodes).to.equal(0);
    });

    it('should return appliedPromoCodes with empty array', () => {
      expect(result.appliedPromoCodes).to.deep.equal([]);
    });

    it('should return notAppliedPromoCodes with 1 not applied promo code (1 promo code filtered out)', () => {
      expect(result.notAppliedPromoCodes).to.deep.equal([
        {
          code: 'ddd',
          message: 'Avis, Wizard Number, ddd',
          numberOfPromoCode: 1,
          vendor: 'AVIS'
        }
      ]);
    });
  });

  context('extra invalid promo codes filtered out when sending valid promo code', () => {
    let result;

    beforeEach(() => {
      const appliedPromoCodeOne = createPromoCode(true, 'AVIS', 'FREQUENT_RENTER', 'ddd');
      const appliedPromoCodeTwo = createPromoCode(false, 'HERTZ', 'PROMOTIONAL_CODE', '222');
      const searchRequest = createSearchRequestWithDiscount([appliedPromoCodeOne]);

      result = transformToResultsPromoCodes(searchRequest.discount)(
        [appliedPromoCodeOne, appliedPromoCodeTwo],
        allCarVendors()
      );
    });

    it('should return the codes count with 1', () => {
      expect(result.numberOfAppliedPromoCodes).to.equal(1);
    });

    it('should return appliedPromoCodes with 1 applied promo code', () => {
      expect(result.appliedPromoCodes).to.deep.equal([
        {
          code: 'ddd',
          promoCodeApplied: true,
          type: 'FREQUENT_RENTER',
          vendor: 'AVIS'
        }
      ]);
    });

    it('should return notAppliedPromoCodes with empty array (1 promo code filtered out)', () => {
      expect(result.notAppliedPromoCodes).to.deep.equal([]);
    });
  });

  context('extra valid promo codes filtered out when sending invalid promo code', () => {
    let result;

    beforeEach(() => {
      const appliedPromoCodeOne = createPromoCode(false, 'AVIS', 'FREQUENT_RENTER', 'ddd');
      const appliedPromoCodeTwo = createPromoCode(true, 'HERTZ', 'PROMOTIONAL_CODE', '222');
      const searchRequest = createSearchRequestWithDiscount([appliedPromoCodeOne]);

      result = transformToResultsPromoCodes(searchRequest.discount)(
        [appliedPromoCodeOne, appliedPromoCodeTwo],
        allCarVendors()
      );
    });

    it('should return the codes count with 0', () => {
      expect(result.numberOfAppliedPromoCodes).to.equal(0);
    });

    it('should return appliedPromoCodes with empty array (1 promo code filtered out)', () => {
      expect(result.appliedPromoCodes).to.deep.equal([]);
    });

    it('should return notAppliedPromoCodes with 1 not applied promo code', () => {
      expect(result.notAppliedPromoCodes).to.deep.equal([
        {
          code: 'ddd',
          message: 'Avis, Wizard Number, ddd',
          numberOfPromoCode: 1,
          vendor: 'AVIS'
        }
      ]);
    });
  });

  context('extra valid promo codes filtered out when sending valid promo code', () => {
    let result;

    beforeEach(() => {
      const appliedPromoCodeOne = createPromoCode(true, 'AVIS', 'FREQUENT_RENTER', 'ddd');
      const appliedPromoCodeTwo = createPromoCode(true, 'HERTZ', 'PROMOTIONAL_CODE', '222');
      const searchRequest = createSearchRequestWithDiscount([appliedPromoCodeOne]);

      result = transformToResultsPromoCodes(searchRequest.discount)(
        [appliedPromoCodeOne, appliedPromoCodeTwo],
        allCarVendors()
      );
    });

    it('should return the codes count with 1', () => {
      expect(result.numberOfAppliedPromoCodes).to.equal(1);
    });

    it('should return appliedPromoCodes with 1 applied promo code (1 promo code filtered out)', () => {
      expect(result.appliedPromoCodes).to.deep.equal([
        {
          code: 'ddd',
          promoCodeApplied: true,
          type: 'FREQUENT_RENTER',
          vendor: 'AVIS'
        }
      ]);
    });

    it('should return notAppliedPromoCodes with empty array', () => {
      expect(result.notAppliedPromoCodes).to.deep.equal([]);
    });
  });
});

function createPromoCode(isPromoCodeApplied, vendor, promoCodeType, code) {
  code = code || '321';
  promoCodeType = promoCodeType || 'FREQUENT_RENTER';
  vendor = vendor || 'AVIS';
  isPromoCodeApplied = isPromoCodeApplied && true;

  return {
    code,
    promoCodeApplied: isPromoCodeApplied,
    type: promoCodeType,
    vendor
  };
}

function createSearchRequestWithDiscount(promoCodeArray) {
  return {
    discount: _.map(promoCodeArray, (promoCode) => {
      const { code, type, vendor } = promoCode;

      return {
        code,
        type,
        vendorName: _.capitalize(vendor),
        vendor: vendor.toUpperCase()
      };
    })
  };
}

function allCarVendors() {
  const { transformVendorResponse } = require('src/shared/api/transformers/carBookingApiTransformers');

  return transformVendorResponse(new CarVendorsMobile().build()).vendors;
}
