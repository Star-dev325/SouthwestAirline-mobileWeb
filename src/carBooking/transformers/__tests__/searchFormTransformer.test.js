import i18n from '@swa-ui/locale';
import transformSearchRequestToCarShoppingApi from 'src/carBooking/transformers/searchFormTransformer';

describe('transformSearchRequestToApi', () => {
  it('should return the correct request with drop off time and drop off location for find car api', () => {
    const request = {
      carCompany: i18n('CAR_BOOKING__CAR_VENDOR__SHOP_ALL_HINT'),
      dropOff: 'AGU',
      dropOffDate: '2016-03-08',
      dropOffTime: '11:30AM',
      pickUp: 'AGU',
      pickUpDate: '2016-03-05',
      pickUpTime: '11:30AM',
      discount: [
        {
          vendorName: 'Alamo',
          vendor: 'ALAMO',
          type: 'CORPORATE_RATE',
          code: '333333'
        }
      ]
    };

    expect(transformSearchRequestToCarShoppingApi(request)).toEqual({
      discount: [
        {
          code: '333333',
          type: 'CORPORATE_RATE',
          vendor: 'Alamo'
        }
      ],
      'pickup-datetime': '2016-03-05T11:30',
      'pickup-location': 'AGU',
      'return-datetime': '2016-03-08T11:30',
      'return-location': 'AGU'
    });
  });

  it('should use the vendor name in order to filter the response for specific vendors', () => {
    const request = {
      carCompany: [
        { vendorId: 'AVIS', vendorName: 'Avis' },
        { vendorId: 'FX', vendorName: 'FX' },
        {
          vendorId: 'EZ',
          vendorName: 'Payless'
        }
      ],
      dropOff: 'AGU',
      dropOffDate: '2016-03-08',
      dropOffTime: '11:30AM',
      pickUp: 'AGU',
      pickUpDate: '2016-03-05',
      pickUpTime: '11:30AM'
    };

    expect(transformSearchRequestToCarShoppingApi(request)).toEqual({
      'pickup-datetime': '2016-03-05T11:30',
      'pickup-location': 'AGU',
      'return-datetime': '2016-03-08T11:30',
      'return-location': 'AGU',
      vendor: ['Avis', 'FX', 'Payless']
    });
  });
});
