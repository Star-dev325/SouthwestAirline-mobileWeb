import {
  transformGenderFromChapiToWapi,
  transformPassengerInfo
} from 'src/airBooking/transformers/passengerInfoTransformer';
import PassengerInfoBuilder from 'test/builders/model/passengerInfoBuilder';

describe('passengerInfoTransformerSpecs', () => {
  context('transformGenderFromChapiToWapi', () => {
    it('should return F when api response gender as Female', () => {
      expect(transformGenderFromChapiToWapi('F')).to.equal('Female');
    });

    it('should return M when api response gender as Male', () => {
      expect(transformGenderFromChapiToWapi('M')).to.equal('Male');
    });

    it('should return empty string when api response gender as UNAVAILABLE', () => {
      expect(transformGenderFromChapiToWapi('UNAVAILABLE')).to.equal('');
    });
  });

  context('transformPassengerInfo', () => {
    const dobMonthDayYear = '12/22/1975';
    const dobYearMonthDay = '1975-12-22';

    it('should transform dateOfBirth from YYYY-MM-DD to MM/DD/YYYY format', () => {
      const passenger = new PassengerInfoBuilder().withDateOfBirth(dobMonthDayYear).build();

      expect(transformPassengerInfo(passenger.passengerInfo, 'MM/DD/YYYY').dateOfBirth).to.equal(dobYearMonthDay);
    });

    it('should transform dateOfBirth from MM/DD/YYYY to YYYY-MM-DD format', () => {
      const passenger = new PassengerInfoBuilder().withDateOfBirth(dobYearMonthDay).build();

      expect(transformPassengerInfo(passenger.passengerInfo, 'YYYY-MM-DD').dateOfBirth).to.equal(dobMonthDayYear);
    });

    it('should keep format when both dateOfBirth and format are MM/DD/YYYY', () => {
      const passenger = new PassengerInfoBuilder().withDateOfBirth(dobMonthDayYear).build();

      expect(transformPassengerInfo(passenger.passengerInfo, 'YYYY-MM-DD').dateOfBirth).to.equal(dobMonthDayYear);
    });

    it('should keep format when both dateOfBirth and format are YYYY-MM-DD', () => {
      const passenger = new PassengerInfoBuilder().withDateOfBirth(dobYearMonthDay).build();

      expect(transformPassengerInfo(passenger.passengerInfo, 'MM/DD/YYYY').dateOfBirth).to.equal(dobYearMonthDay);
    });
  });
});
