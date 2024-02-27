import dayjs from 'dayjs';
import { transformToMultiSelectGroupRequest } from 'src/shared/transformers/multiSelectGroupRequestTransformer';

describe('multiSelectGroupRequestTransformer', () => {
  let searchRequest;

  beforeEach(() => {
    searchRequest = {
      origin: 'origin',
      destination: 'dest',
      departureDate: dayjs('2015-05-13'),
      numberOfAdults: 1
    };
  });

  describe('transformToMultiSelectGroupRequest', () => {
    it('should include multipleOriginationAirportGroupName and multipleOriginationAirports in request', () => {
      const updatedSearchRequest = {
        ...searchRequest,
        multipleOriginationAirportGroupName: 'BOSTON',
        multipleOriginationAirports: ['BDL', 'PVT']
      };
      const apiRequest = transformToMultiSelectGroupRequest(updatedSearchRequest);

      expect(apiRequest.body['multipleOriginationAirportGroupName']).toEqual('BOSTON');
      expect(apiRequest.body['multipleOriginationAirports']).toEqual(['BDL', 'PVT']);
    });

    it('should include multipleDestinationAirportGroupName and multipleDestinationAirports in request', () => {
      const updatedSearchRequest = {
        ...searchRequest,
        multipleDestinationAirportGroupName: 'BOSTON',
        multipleDestinationAirports: ['BDL', 'PVT']
      };
      const apiRequest = transformToMultiSelectGroupRequest(updatedSearchRequest);

      expect(apiRequest.body['multipleDestinationAirportGroupName']).toEqual('BOSTON');
      expect(apiRequest.body['multipleDestinationAirports']).toEqual(['BDL', 'PVT']);
    });

    it('should populate the required fields for a round trip', () => {
      const updatedSearchRequest = {
        ...searchRequest,
        returnDate: dayjs('2015-05-18')
      };
      const apiRequest = transformToMultiSelectGroupRequest(updatedSearchRequest);

      expect(apiRequest.body['returnDate']).toEqual(updatedSearchRequest.returnDate.format('YYYY-MM-DD'));
    });

    describe('origin and destination are enabled', () => {
      it('should include empty returnDate', () => {
        const updatedSearchRequest = {
          ...searchRequest,
          returnDate: dayjs('2015-05-18')
        };
        const apiRequest = transformToMultiSelectGroupRequest(updatedSearchRequest);

        expect(apiRequest.body['departureDate']).toEqual('2015-05-13');
        expect(apiRequest.body['returnDate']).toEqual('2015-05-18');
      });

      it('should not include returnDate', () => {
        const apiRequest = transformToMultiSelectGroupRequest(searchRequest);

        expect(apiRequest.body['departureDate']).toEqual('2015-05-13');
      });

      it('should include empty departureDate if not provided', () => {
        const updatedSearchRequest = {
          ...searchRequest,
          departureDate: null
        };
        const apiRequest = transformToMultiSelectGroupRequest(updatedSearchRequest);

        expect(apiRequest.body['departureDate']).toEqual('');
      });

      it('should use returnDate value for departureDate if returnDate is provided and departureDate is not provided', () => {
        const updatedSearchRequest = {
          ...searchRequest,
          departureDate: null,
          returnDate: dayjs('2015-05-19')
        };
        const apiRequest = transformToMultiSelectGroupRequest(updatedSearchRequest);

        expect(apiRequest.body['departureDate']).toEqual('2015-05-19');
      });

      it('should include empty origin and destination airport values if not provided', () => {
        const updatedSearchRequest = {
          ...searchRequest,
          origin: null,
          destination: null
        };
        const apiRequest = transformToMultiSelectGroupRequest(updatedSearchRequest);

        expect(apiRequest.body['originationAirport']).toEqual('');
        expect(apiRequest.body['destinationAirport']).toEqual('');
      });

      it('should include numberAdultPassengers as 0 if not provided', () => {
        const updatedSearchRequest = {
          ...searchRequest,
          numberOfAdults: null
        };
        const apiRequest = transformToMultiSelectGroupRequest(updatedSearchRequest);

        expect(apiRequest.body['numberAdultPassengers']).toEqual(0);
      });
    });

    describe('promoCode', () => {
      it('should omit promo code', () => {
        const updatedSearchRequest = {
          ...searchRequest,
          returnDate: dayjs('2015-05-18')
        };
        const apiRequest = transformToMultiSelectGroupRequest(updatedSearchRequest);

        expect(apiRequest['promoCode']).not.toBe('test');
      });

      it('should have promo code', () => {
        const updatedSearchRequest = {
          ...searchRequest,
          returnDate: dayjs('2015-05-18'),
          promoCode: 'test'
        };
        const apiRequest = transformToMultiSelectGroupRequest(updatedSearchRequest);

        expect(apiRequest.body['promoCode']).toEqual('test');
      });
    });

    describe('numberOfLapInfants provided', () => {
      it('should include numberOfLapInfants in request', () => {
        const updatedSearchRequest = {
          ...searchRequest,
          returnDate: dayjs('2015-05-18'),
          numberOfAdults: 1,
          numberOfLapInfants: 1
        };
        const apiRequest = transformToMultiSelectGroupRequest(updatedSearchRequest);

        expect(apiRequest.body['numberLapInfantPassengers']).toEqual(1);
      });
    });
  });
});
