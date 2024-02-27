import React from 'react';
import { shallow } from 'enzyme';
import PassengerDocumentStatus from 'src/shared/components/passengerDocumentStatus';

describe('PassengerDocumentStatus', () => {
  context('passenger is checked in', () => {
    it('should show `checked in` with green text', () => {
      const component = shallow(<PassengerDocumentStatus isCheckedIn hasCompletePassportInfo />);

      expect(component).to.have.text('Checked In');
      expect(component).to.have.className('green');
    });
  });

  context('passenger is not checked in', () => {
    it('should show `Passport Information Complete` with green text when passenger has completed passport info', () => {
      const component = shallow(<PassengerDocumentStatus isCheckedIn={false} hasCompletePassportInfo />);

      expect(component).to.have.text('Passport Information Complete');
      expect(component).to.have.className('green');
    });

    it("should show `Passport Information Incomplete` with green text when passenger hasn't complete passport info", () => {
      const component = shallow(<PassengerDocumentStatus isCheckedIn={false} hasCompletePassportInfo={false} />);

      expect(component).to.have.text('Passport Information Incomplete');
      expect(component).to.have.className('red');
    });

    it('should not show any message when not international', () => {
      const component = shallow(<PassengerDocumentStatus isCheckedIn={false} isInternational={false} />);

      expect(component).to.have.text('');
    });
  });
});
