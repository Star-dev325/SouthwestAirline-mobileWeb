import {
  compareSearchRequest,
  getPromoTypeListOfSelectedVendor,
  hasDuplicatePromoCode,
  removeExtraKeys
} from 'src/carBooking/helpers/carBookingSearchRequestHelper';

describe('Car Booking Search Request Helper', () => {
  context('comparing search requests', () => {
    it('should be true if two search requests have the same values', () => {
      const firstSearchRequest = {
        dropOff: 'ABI',
        dropOffDate: '2016-03-15',
        dropOffTime: '11:30AM',
        pickUp: 'ABR',
        pickUpDate: '2016-03-12',
        pickUpTime: '11:30AM',
        vehicleType: 'Mid-size'
      };

      const secondSearchRequest = {
        dropOff: 'ABI',
        dropOffDate: '2016-03-15',
        dropOffTime: '11:30AM',
        pickUp: 'ABR',
        pickUpDate: '2016-03-12',
        pickUpTime: '11:30AM',
        vehicleType: 'Mid-size'
      };

      expect(compareSearchRequest(firstSearchRequest, secondSearchRequest)).to.be.true;
    });

    it('should be false if two search requests have different values', () => {
      const firstSearchRequest = {
        dropOff: 'ABI',
        dropOffDate: '2016-03-15',
        dropOffTime: '11:30AM',
        pickUp: 'ABR',
        pickUpDate: '2016-03-12',
        pickUpTime: '11:30AM',
        vehicleType: 'Mid-size'
      };

      const secondSearchRequest = {
        dropOff: 'ABI',
        dropOffDate: '2016-03-16',
        dropOffTime: '11:30AM',
        pickUp: 'ABR',
        pickUpDate: '2016-03-12',
        pickUpTime: '11:30AM',
        vehicleType: 'Mid-size'
      };

      expect(compareSearchRequest(firstSearchRequest, secondSearchRequest)).to.be.false;
    });

    it('should be false if we compare searchRequest and empty object', () => {
      const searchRequest = {
        dropOff: 'ABI',
        dropOffDate: '2016-03-15',
        dropOffTime: '11:30AM',
        pickUp: 'ABR',
        pickUpDate: '2016-03-12',
        pickUpTime: '11:30AM',
        vehicleType: 'Mid-size'
      };

      expect(compareSearchRequest(searchRequest, {})).to.be.false;
    });

    it('should be true if two search requests have the same values except for extra keys', () => {
      const searchRequestWithExtraKeys = {
        dropOff: 'ABI',
        dropOffDate: '2016-03-15',
        dropOffTime: '11:30AM',
        pickUp: 'ABR',
        pickUpDate: '2016-03-12',
        pickUpTime: '11:30AM',
        vehicleType: 'Mid-size',
        discount: 'promoCode',
        carCompany: 'carCompany',
        pickUpAirport: '',
        dropOffAirport: ''
      };

      const searchRequestWithoutExtraKeys = {
        dropOff: 'ABI',
        dropOffDate: '2016-03-15',
        dropOffTime: '11:30AM',
        pickUp: 'ABR',
        pickUpDate: '2016-03-12',
        pickUpTime: '11:30AM',
        vehicleType: 'Mid-size'
      };

      expect(compareSearchRequest(searchRequestWithExtraKeys, searchRequestWithoutExtraKeys)).to.be.true;
    });

    it('should remove the extra keys in searchRequest', () => {
      const searchRequestWithExtraKeys = {
        dropOff: 'ABI',
        dropOffDate: '2016-03-15',
        dropOffTime: '11:30AM',
        pickUp: 'ABR',
        pickUpDate: '2016-03-12',
        pickUpTime: '11:30AM',
        vehicleType: 'Mid-size',
        discount: 'discount',
        carCompany: 'carCompany',
        pickUpAirport: '',
        dropOffAirport: ''
      };

      const searchRequestWithoutExtraKeys = {
        dropOff: 'ABI',
        dropOffDate: '2016-03-15',
        dropOffTime: '11:30AM',
        pickUp: 'ABR',
        pickUpDate: '2016-03-12',
        pickUpTime: '11:30AM',
        vehicleType: 'Mid-size'
      };

      expect(removeExtraKeys(searchRequestWithExtraKeys)).to.deep.equal(searchRequestWithoutExtraKeys);
    });
  });
  context('hasDuplicatePromoCode', () => {
    it('should be false if the there are no promo codes', () => {
      expect(hasDuplicatePromoCode()).to.equal(false);
    });
    it('should be false if there are no promo codes', () => {
      expect(
        hasDuplicatePromoCode([
          {
            code: 'code1',
            type: 'TYPE1',
            vendor: 'VENDOR1'
          }
        ])
      ).to.equal(false);
    });

    it('should be false if promo codes are different', () => {
      expect(
        hasDuplicatePromoCode([
          {
            code: 'code1',
            type: 'TYPE1',
            vendor: 'VENDOR1'
          },
          {
            code: 'code1',
            type: 'TYPE2',
            vendor: 'VENDOR2'
          }
        ])
      ).to.equal(false);
    });

    it('should be false if promo codes type is different but vendor is same', () => {
      expect(
        hasDuplicatePromoCode([
          {
            code: 'code1',
            type: 'TYPE1',
            vendor: 'VENDOR1'
          },
          {
            code: 'code1',
            type: 'TYPE2',
            vendor: 'VENDOR1'
          }
        ])
      ).to.equal(false);
    });

    it('should be false if first promo code has no vendor', () => {
      expect(
        hasDuplicatePromoCode([
          {
            code: 'code1',
            type: 'TYPE1'
          }
        ])
      ).to.equal(false);
    });

    it('should be false if first promo code is empty', () => {
      expect(
        hasDuplicatePromoCode([
          {
            code: '',
            type: '',
            vendor: ''
          },
          {
            code: 'code1',
            type: 'TYPE1',
            vendor: 'VENDOR1'
          }
        ])
      ).to.equal(false);
    });

    it('should be true if promo codes has same vendor and type', () => {
      expect(
        hasDuplicatePromoCode([
          {
            code: 'code1',
            type: 'TYPE1',
            vendor: 'VENDOR1'
          },
          {
            code: 'code1',
            type: 'TYPE1',
            vendor: 'VENDOR1'
          }
        ])
      ).to.equal(true);
    });
  });
  context('getPromoTypeListOfSelectedVendor', () => {
    it('should return empty array if carPromoVendors is empty', () => {
      expect(getPromoTypeListOfSelectedVendor(null, 'AVIS').length).to.equal(0);
    });

    it('should return empty array if vendor is empty', () => {
      expect(getPromoTypeListOfSelectedVendor(null, null).length).to.equal(0);
    });

    it('should return empty array if car vendor is not valid', () => {
      expect(
        getPromoTypeListOfSelectedVendor(
          [
            {
              carCompany: {
                value: 'AVIS'
              },
              promoTypeList: {
                value: 'FREQUENT_RENTER'
              }
            }
          ],
          'ABC'
        ).length
      ).to.equal(0);
    });

    it('should return promoTypeList if car vendor is valid', () => {
      expect(
        getPromoTypeListOfSelectedVendor(
          [
            {
              carCompany: {
                value: 'AVIS'
              },
              promoTypeList: [
                {
                  value: 'FREQUENT_RENTER'
                }
              ]
            }
          ],
          'AVIS'
        ).length
      ).to.equal(1);
    });
  });
});
