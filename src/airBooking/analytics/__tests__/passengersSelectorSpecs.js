import { getPassengers as passengersSelector } from 'src/airBooking/analytics/passengersSelector';
import PassengerInfoBuilder from 'test/builders/model/passengerInfoBuilder';

describe('passengersSelector', () => {
  it('should generate passenger information based on passengerInfo', () => {
    const state = {
      app: {
        airBooking: {
          passengerInfos: [
            new PassengerInfoBuilder()
              .withRapidRewardsNumber('111111111')
              .withDateOfBirth('1990-06-08')
              .withGender('M')
              .withEmailReceiptTo('111@wnco.com')
              .build(),
            new PassengerInfoBuilder()
              .withRapidRewardsNumber('222222222')
              .withDateOfBirth('1980-06-08')
              .withGender('F')
              .withEmailReceiptTo('222@wnco.com')
              .build()
          ]
        }
      }
    };

    const passengers = passengersSelector(state);

    expect(passengers).to.deep.equal([
      {
        accountNumber: '111111111',
        birthYear: '1990',
        gender: 'Male',
        receiptEmail: '3fabbae5a3cfbd642ad78242a66acf304a63ce73f5284437b4f587952ff6cdcc'
      },
      {
        accountNumber: '222222222',
        birthYear: '1980',
        gender: 'Female',
        receiptEmail: '3fabbae5a3cfbd642ad78242a66acf304a63ce73f5284437b4f587952ff6cdcc'
      }
    ]);
  });
});
