import React from 'react';
import _ from 'lodash';
import { sandbox } from 'sinon';
import { mount } from 'enzyme';
import { click } from 'test/unit/helpers/enzymeFormTestUtils';
import PassengerReservationInfo from 'src/viewReservation/components/passengerReservationInfo';

const sinon = sandbox.create();

describe('PassengerReservationInfo', () => {
  let defaultProps;

  beforeEach(() => {
    defaultProps = {
      index: 0,
      isInternational: false,
      passenger: {
        accountNumber: '328329329',
        hasAnyEarlyBird: false,
        name: 'FunFun',
        isCheckedIn: false,
        hasCompletePassportInfo: false,
        hasExtraSeat: false,
        passengerReference: '2'
      },
      showPassengerHeader: false,
      onPassengerNameClick: sinon.stub()
    };
  });

  afterEach(() => {
    sinon.restore();
  });

  context('domestic reservation', () => {
    it('should render passenger properly with given passengerInfo', () => {
      const passengerReservationInfo = createComponent(defaultProps);

      expect(passengerReservationInfo.find('[data-qa="userName"]')).to.have.text('FunFun');
      expect(passengerReservationInfo.find('[data-qa="passenger-rapid-rewards"]')).to.have.text('328329329');
      expect(passengerReservationInfo).to.not.contain.text('EarlyBird');
    });

    it('should show PASSENGER(S) label when showPassengerHeader is true', () => {
      const passengerReservationInfo = createComponent(_.merge(defaultProps, { showPassengerHeader: true }));

      expect(passengerReservationInfo.find('[data-qa="passenger-label"]')).to.exist;
    });

    it('should not show PASSENGER(S) label when showPassengerHeader is false', () => {
      const passengerReservationInfo = createComponent(_.merge(defaultProps, { showPassengerHeader: false }));

      expect(passengerReservationInfo.find('[data-qa="passenger-label"]')).not.to.exist;
    });

    it('should render extra seat if the passenger has an extra seat', () => {
      defaultProps.passenger.hasExtraSeat = true;

      const passengerReservationInfo = createComponent(defaultProps);

      expect(passengerReservationInfo).to.contain.text('Extra Seat');
    });

    it('should not render extra seat if the passenger does not have an extra seat', () => {
      defaultProps.passenger.hasExtraSeat = false;

      const passengerReservationInfo = createComponent(defaultProps);

      expect(passengerReservationInfo).to.not.contain.text('Extra Seat');
    });

    it('should render extra seat and the early bird icon/messaging if passenger has both', () => {
      defaultProps.passenger.hasExtraSeat = true;
      defaultProps.passenger.hasAnyEarlyBird = true;
      const passengerReservationInfo = createComponent(defaultProps);

      expect(passengerReservationInfo).to.contain.text('Extra Seat');
      expect(passengerReservationInfo).to.contain.text('EarlyBird');
    });

    it('should render early bird icon/messaging if passenger has earlybird', () => {
      defaultProps.passenger.hasAnyEarlyBird = true;
      const passengerReservationInfo = createComponent(defaultProps);

      expect(passengerReservationInfo).to.contain.text('EarlyBird');
    });

    it('should not render early bird icon/messaging if passenger does not have earlybird', () => {
      const passengerReservationInfo = createComponent(defaultProps);

      expect(passengerReservationInfo).to.not.contain.text('EarlyBird');
    });

    it('should render checked in status when passenger is checked in', () => {
      defaultProps.passenger.isCheckedIn = true;

      const passengerReservationInfo = createComponent(defaultProps);

      expect(passengerReservationInfo.find('PassengerDocumentStatus')).to.have.text('Checked In');
    });

    it('should call onPassengerNameClick when click passenger name', () => {
      const passengerReservationInfo = createComponent(defaultProps);

      click(passengerReservationInfo.find('.passenger-reservation-info--passenger-name'));

      expect(defaultProps.onPassengerNameClick).to.have.been.called;
    });

    it('should show Update Travel Information label', () => {
      const passengerReservationInfo = createComponent(defaultProps);

      expect(passengerReservationInfo.find('[data-qa="update-travel-information"]')).to.exist;
    });

    it('should not show Update Travel Information label if PNR is international', () => {
      const passengerReservationInfo = createComponent(_.merge(defaultProps, { isInternational: true }));

      expect(passengerReservationInfo.find('[data-qa="update-travel-information"]')).to.not.exist;
    });
  });

  context('international reservation', () => {
    beforeEach(() => {
      defaultProps.isInternational = true;
      defaultProps.passenger.hasExtraSeat = false;
    });

    it('should render international reservation when pass isInternational is true', () => {
      const passengerReservationInfo = createComponent(defaultProps);

      expect(passengerReservationInfo.find('.passenger-reservation-info--passenger-name')).to.exist;
    });

    it('should render passenger properly with given passengerInfo', () => {
      const passengerReservationInfo = createComponent(defaultProps);

      expect(passengerReservationInfo.find('[data-qa="userName"]')).to.have.text('FunFun');
      expect(passengerReservationInfo.find('[data-qa="passenger-rapid-rewards"]')).to.have.text('328329329');
      expect(passengerReservationInfo).to.not.contain.text('EarlyBird');
    });

    it('should show PASSENGER(S) label when showPassengerHeader is true', () => {
      const passengerReservationInfo = createComponent(_.merge(defaultProps, { showPassengerHeader: true }));

      expect(passengerReservationInfo.find('[data-qa="passenger-label"]')).to.exist;
    });

    it('should not show PASSENGER(S) label when showPassengerHeader is false', () => {
      const passengerReservationInfo = createComponent(_.merge(defaultProps, { showPassengerHeader: false }));

      expect(passengerReservationInfo.find('[data-qa="passenger-label"]')).not.to.exist;
    });

    it('should show passenger document status', () => {
      const passengerReservationInfo = createComponent(defaultProps);

      expect(passengerReservationInfo.find('PassengerDocumentStatus')).to.have.props({
        isCheckedIn: false,
        hasCompletePassportInfo: false
      });
    });

    it('should render extra seat if the passenger has an extra seat', () => {
      defaultProps.passenger.hasExtraSeat = true;

      const passengerReservationInfo = createComponent(defaultProps);

      expect(passengerReservationInfo).to.contain.text('Extra Seat');
    });

    it('should not render extra seat if the passenger does not have an extra seat', () => {
      defaultProps.passenger.hasExtraSeat = false;

      const passengerReservationInfo = createComponent(defaultProps);

      expect(passengerReservationInfo).to.not.contain.text('Extra Seat');
    });

    it('should call onPassengerNameClick when click passenger name', () => {
      const passengerReservationInfo = createComponent(defaultProps);

      click(passengerReservationInfo.find('.passenger-reservation-info--passenger-name'));

      expect(defaultProps.onPassengerNameClick).to.be.called;
    });

    it('should render pencil icon in sltblue', () => {
      const passengerReservationInfo = createComponent(defaultProps);

      expect(passengerReservationInfo.find('.icon_pencil')).to.have.className('sltblue');
    });
  });

  const createComponent = (props) => mount(<PassengerReservationInfo {...props} />);
});
