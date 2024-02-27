import { transformToPassengers } from 'src/shared/analytics/transformers/airBooking/passengers/passengersTransformer';
import PassengerInfoBuilder from 'test/builders/model/passengerInfoBuilder';

describe('transformToPassengers', () => {
  it('should transform empty passengerInfo to empty array', () => {
    expect(transformToPassengers([])).to.be.deep.equal([]);
  });

  it('should ignore passengers with null passengerInfo', () => {
    expect(transformToPassengers([{ passengerInfo: null }])).to.be.deep.equal([]);
  });

  it('should transform passengerInfo.rapidRewardsNumber into accountNumber', () => {
    const passenger = new PassengerInfoBuilder().withRapidRewardsNumber('111111111').build();

    expect(transformToPassengers([passenger])[0].accountNumber).to.be.equal('111111111');
  });

  it('should transform passengerInfo.dateOfBirth into birthYear', () => {
    const passenger = new PassengerInfoBuilder().withDateOfBirth('1998-06-08').build();

    expect(transformToPassengers([passenger])[0].birthYear).to.be.equal('1998');
  });

  it('should transform gender', () => {
    const malePassenger = new PassengerInfoBuilder().withGender('M').build();
    const femalePassenger = new PassengerInfoBuilder().withGender('F').build();

    const transformedPassengers = transformToPassengers([malePassenger, femalePassenger]);

    expect(transformedPassengers[0].gender).to.be.equal('Male');
    expect(transformedPassengers[1].gender).to.be.equal('Female');
  });

  it('should transform emailReceiptTo to hash from the first passenger email for every passenger', () => {
    const passenger1 = new PassengerInfoBuilder().withEmailReceiptTo('sanc@wnco.com').build();
    const passenger2 = new PassengerInfoBuilder().withEmailReceiptTo(null).build();

    const transformedPassengers = transformToPassengers([passenger1, passenger2]);

    expect(transformedPassengers[0].receiptEmail).to.be.equal(
      '868ea10df272af345f4b6e809f3d120816a237ffe0a9124d36bb82438b23c3a3'
    );
    expect(transformedPassengers[1].receiptEmail).to.be.equal(
      '868ea10df272af345f4b6e809f3d120816a237ffe0a9124d36bb82438b23c3a3'
    );
  });
});
