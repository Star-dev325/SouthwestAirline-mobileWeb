import { getCarCancelInfo } from 'src/carCancel/selectors/carCancelConfirmationPageSelector';
import carReservationBuilder from 'test/builders/model/carReservationBuilder';

describe('carCancelConfirmationPageSelector', () => {
  it('should transform carReservations to cancelled car info', () => {
    const carReservation = {
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

    const state = {
      app: {
        viewReservation: {
          carReservation
        }
      }
    };
    const carCancelInfo = getCarCancelInfo(state);

    const expectedResponse = {
      driver: {
        firstName: 'HX',
        lastName: 'LIN'
      },
      confirmationNumber: '61805258COUNT',
      vendorImage: '/content/mkt/images/car_vendors/Avis_Logo_results.png',
      pickUpTime: '2016-03-01T11:00:00.000',
      cityName: 'Dallas (Love Field)',
      cityState: 'TX'
    };

    expect(carCancelInfo).toEqual(expectedResponse);
  });

  it('should return an empty object if the carReservation object is empty', () => {
    const carReservation = {};

    const state = {
      app: {
        viewReservation: {
          carReservation
        }
      }
    };
    const carCancelInfo = getCarCancelInfo(state);

    const expectedResponse = {};

    expect(carCancelInfo).toEqual(expectedResponse);
  });
});
