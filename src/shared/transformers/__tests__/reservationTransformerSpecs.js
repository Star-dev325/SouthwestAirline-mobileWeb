import { transformResponseToViewReservationDetail } from 'src/shared/transformers/reservationTransformer';
import ViewReservationBuilder from 'test/builders/model/viewReservationBuilder';
import TransformedReservationDetailResponseBuilder from 'test/builders/apiResponse/transformedReservationDetailResponseBuilder';

describe('reservationTransformer', () => {
  context('transformResponseToViewReservationDetail', () => {
    it('should transform international flight reservation response', () => {
      const response = new ViewReservationBuilder().withInternationalFlight().build();

      expect(transformResponseToViewReservationDetail(response)).to.deep.equal(
        new TransformedReservationDetailResponseBuilder().withInternationalFlight().build()
      );
    });

    it('should transform domestic flight reservation response', () => {
      const response = new ViewReservationBuilder().build();

      expect(transformResponseToViewReservationDetail(response)).to.deep.equal(
        new TransformedReservationDetailResponseBuilder().build()
      );
    });
  });
});
