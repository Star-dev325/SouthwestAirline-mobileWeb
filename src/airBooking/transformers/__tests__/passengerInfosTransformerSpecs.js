import PassengerInfosBuilder from 'test/builders/model/passengerInfosBuilder';
import { transformPassengerInfos } from 'src/airBooking/transformers/passengerInfosTransformer';

describe('passengerInfosTransformerSpecs', () => {
  context('transformPassengerInfos', () => {
    it("should return the passenger's date of birth in the YYYY-MM-DD format when second parameter is MM/DD/YYYY", () => {
      const passengerInfos = PassengerInfosBuilder.getPassengerInfosWithInputDOBFormat();

      expect(transformPassengerInfos(passengerInfos, 'MM/DD/YYYY')[0].passengerInfo.dateOfBirth).to.equal('1977-05-06');
    });

    it("should return the passenger's date of birth in the MM/DD/YYYY format when second parameter is YYYY-MM-DD", () => {
      const passengerInfos = PassengerInfosBuilder.getPassengerInfosWithInputDOBFormat();

      expect(transformPassengerInfos(passengerInfos, 'YYYY-MM-DD')[0].passengerInfo.dateOfBirth).to.equal('05/06/1977');
    });

    it("should return multiple passenger's date of birth in the YYYY-MM-DD format when second parameter is MM/DD/YYYY", () => {
      const multiplePassengerInfos = PassengerInfosBuilder.getMultipleAdultPassengersWithInputDOBFormat();

      expect(transformPassengerInfos(multiplePassengerInfos, 'MM/DD/YYYY')[0].passengerInfo.dateOfBirth).to.equal(
        '1977-05-06'
      );
      expect(transformPassengerInfos(multiplePassengerInfos, 'MM/DD/YYYY')[1].passengerInfo.dateOfBirth).to.equal(
        '2008-12-14'
      );
    });

    it("should return multiple passenger's date of birth in the MM/DD/YYYY format when second parameter is YYYY-MM-DD", () => {
      const multiplePassengerInfos = PassengerInfosBuilder.getMultipleAdultPassengersWithInputDOBFormat();

      expect(transformPassengerInfos(multiplePassengerInfos, 'YYYY-MM-DD')[0].passengerInfo.dateOfBirth).to.equal(
        '05/06/1977'
      );
      expect(transformPassengerInfos(multiplePassengerInfos, 'YYYY-MM-DD')[1].passengerInfo.dateOfBirth).to.equal(
        '12/14/2008'
      );
    });
  });
});
