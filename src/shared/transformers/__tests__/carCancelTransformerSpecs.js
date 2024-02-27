import carReservationBuilder from 'test/builders/model/carReservationBuilder';
import { transformCarReservationToCancelRequest } from 'src/shared/transformers/carCancelTransformer';

describe('#transformToCarCancelRequest', () => {
  let carReservation;

  beforeEach(() => {
    carReservation = {
      ...new carReservationBuilder().build(),
      manageCarReservationDetails: {
        confirmationNumber: '61805258COUNT',
        driver: {
          firstName: 'HX',
          lastName: 'LIN'
        },
        isCancelled: false
      }
    };
  });

  it('should transform carReservations to cancel request', () => {
    const carCancelRequest = transformCarReservationToCancelRequest(carReservation);

    expect(carCancelRequest).to.deep.equal({
      confirmationNumber: '61805258COUNT',
      firstName: 'HX',
      lastName: 'LIN',
      pickUpDate: '2016-03-01'
    });
  });
});
