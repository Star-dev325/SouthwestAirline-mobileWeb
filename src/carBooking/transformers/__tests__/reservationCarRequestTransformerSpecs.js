import TransformReservationCarRequestToApi from 'src/carBooking/transformers/reservationCarRequestTransformer';

describe('transformReservationCarRequestToApi', () => {
  const selectedCarResult = {
    totalCentsWithTaxes: 13400,
    productId: 'Product-Id-1'
  };

  context('purposeOfTravel', () => {
    it('should return the right format data for reserve car api when field has no value', () => {
      const ReserveCarRequestWithoutPurposeOfTravel = buildReserveCarRequest('');
      const transformedRequest = expectedTransformedRequest(null);

      expect(
        TransformReservationCarRequestToApi(ReserveCarRequestWithoutPurposeOfTravel, selectedCarResult)
      ).to.deep.equal(transformedRequest);
    });

    it('should return the right format data for reserve car api when field has value', () => {
      const ReserveCarRequestWithPurposeOfTravel = buildReserveCarRequest('Business');
      const transformedRequest = expectedTransformedRequest('BUSINESS');

      expect(
        TransformReservationCarRequestToApi(ReserveCarRequestWithPurposeOfTravel, selectedCarResult)
      ).to.deep.equal(transformedRequest);
    });
  });

  context('selectedExtras', () => {
    it('should return empty array if there is no selectedExtras', () => {
      expect(TransformReservationCarRequestToApi(buildReserveCarRequest(), selectedCarResult).extras).to.deep.equal([]);
    });

    it('should return selectedExtras with right format if there is selectedExtras', () => {
      const selectedExtras = ['SKI_RACK'];

      expect(
        TransformReservationCarRequestToApi(buildReserveCarRequest(), selectedCarResult, selectedExtras).extras
      ).to.deep.equal([{ type: 'SKI_RACK' }]);
    });
  });

  context('discounts', () => {
    it('should return empty array if there is no discount', () => {
      selectedCarResult.appliedDiscount = undefined;

      expect(TransformReservationCarRequestToApi(buildReserveCarRequest(), selectedCarResult).discounts).to.deep.equal(
        []
      );
    });

    it('should return array with discount object if there is applied discount', () => {
      selectedCarResult.appliedDiscount = {
        code: 'K024740',
        type: 'CORPORATE_RATE'
      };

      expect(TransformReservationCarRequestToApi(buildReserveCarRequest(), selectedCarResult).discounts).to.deep.equal([
        selectedCarResult.appliedDiscount
      ]);
    });
  });

  function buildReserveCarRequest(purposeOfTravel = null) {
    return {
      accountNumber: '888888',
      city: 'Dallas',
      confirmationEmail: 'sdf@sfesf.com',
      expiration: '2017-04',
      firstName: 'HX',
      isoCountryCode: 'US',
      lastName: 'LIN',
      middleName: '',
      phoneNumber: '222-222-2222',
      purposeOfTravel
    };
  }

  function expectedTransformedRequest(purposeOfTravel = null, selectedExtras = []) {
    return {
      driver: {
        firstName: 'HX',
        lastName: 'LIN',
        accountNumber: '888888',
        flightNumber: null,
        phone: {
          countryCode: undefined,
          number: undefined
        }
      },
      product: { productId: 'Product-Id-1' },
      receiptEmail: 'sdf@sfesf.com',
      purposeOfTravel,
      extras: selectedExtras,
      discounts: []
    };
  }
});
