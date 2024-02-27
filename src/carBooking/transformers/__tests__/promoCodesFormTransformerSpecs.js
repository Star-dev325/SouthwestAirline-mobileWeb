import * as PromoCodesFormTransformer from 'src/carBooking/transformers/promoCodesFormTransformer';

describe('Promo Codes Transformer', () => {
  let transformer;

  beforeEach(() => {
    transformer = PromoCodesFormTransformer;
  });

  context('transformToDiscountValue', () => {
    it('should convert promo code object from form data', () => {
      const formData = {
        vendor1: 'ABC',
        type1: 'DDD',
        code1: '1234',
        vendor2: 'CCC',
        type2: 'XXX',
        code2: '4321'
      };
      const result = transformer.transformToDiscountValue(formData);

      expect(result).to.deep.equal([
        { vendor: 'ABC', type: 'DDD', code: '1234' },
        {
          vendor: 'CCC',
          type: 'XXX',
          code: '4321'
        }
      ]);
    });

    it('should convert promo code object with empty value if code is empty', () => {
      const formData = {
        code1: '',
        code2: '1234',
        type1: '',
        type2: 'DDD',
        vendor1: '',
        vendor2: 'ABC'
      };
      const result = transformer.transformToDiscountValue(formData);

      expect(result).to.deep.equal([
        { vendor: 'ABC', type: 'DDD', code: '1234' },
        { vendor: '', type: '', code: '' }
      ]);
    });
  });

  context('transformVendorsIdsToVendorNameList', () => {
    it('should return vendors list with vendorName property', () => {
      const vendors = [{ vendorId: 'AVIS' }];
      const result = transformer.transformVendorsIdsToVendorNameList(vendors, [{ vendorId: 'AVIS', name: 'Avis' }]);

      expect(result).to.deep.equal([
        {
          vendorId: 'AVIS',
          vendorName: 'Avis'
        }
      ]);
    });
  });

  context('transformSelectedSearchRequestToDiscountValue', () => {
    it('should convert promo code object from search request', () => {
      const searchRequest = {
        carCodeVendor1: 'ABC',
        carCodeType1: 'DDD',
        carCode1: '1234',
        carCodeVendor2: 'CCC',
        carCodeType2: 'XXX',
        carCode2: '4321'
      };
      const result = transformer.transformSelectedSearchRequestToDiscountValue(searchRequest);

      expect(result).to.deep.equal([
        { vendor: 'ABC', type: 'DDD', code: '1234' },
        {
          vendor: 'CCC',
          type: 'XXX',
          code: '4321'
        }
      ]);
    });

    it('should convert promo code object when search request is null', () => {
      const searchRequest = null;
      const result = transformer.transformSelectedSearchRequestToDiscountValue(searchRequest);

      expect(result).to.deep.equal([
        {
          code: '',
          type: '',
          vendor: ''
        },
        {
          code: '',
          type: '',
          vendor: ''
        }
      ]);
    });

    it('should convert promo code object with empty value if code is empty', () => {
      const searchRequest = {
        carCode1: '',
        carCode2: '1234',
        carCodeType1: '',
        carCodeType2: 'DDD',
        carCodeVendor1: '',
        carCodeVendor2: 'ABC'
      };
      const result = transformer.transformSelectedSearchRequestToDiscountValue(searchRequest);

      expect(result).to.deep.equal([
        { vendor: 'ABC', type: 'DDD', code: '1234' },
        { vendor: '', type: '', code: '' }
      ]);
    });
  });

  context('transformToFormData', () => {
    it('should transform to form data when no promos passed', () => {
      const promos = [];
      const result = transformer.transformToFormData(promos);

      expect(result).to.deep.equal({
        code1: '',
        code2: '',
        type1: '',
        type2: '',
        vendor1: '',
        vendor2: ''
      });
    });
    it('should transform to form data', () => {
      const promos = [
        { code: '1234', type: 'DDD', vendor: 'ABC' },
        { code: '4321', type: 'XXX', vendor: 'CCC' }
      ];
      const result = transformer.transformToFormData(promos);

      expect(result).to.deep.equal({
        vendor1: 'ABC',
        type1: 'DDD',
        code1: '1234',
        vendor2: 'CCC',
        type2: 'XXX',
        code2: '4321'
      });
    });
  });
});
