import React from 'react';
import { mount } from 'enzyme';
import PassengerReservationInfo from 'src/shared/components/passengerReservationInfo';
import ReservationGroupsBuilder from 'test/builders/model/reservationGroupsBuilder';
import { click } from 'test/unit/helpers/enzymeFormTestUtils';
import { sandbox } from 'sinon';

const sinon = sandbox.create();

describe('passengerReservationInfo', () => {
  let onClickPassengerNameStub;

  beforeEach(() => {
    onClickPassengerNameStub = sinon.stub();
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should render passenger properly with given passengerInfo', () => {
    const mixPaxReservationGroups = new ReservationGroupsBuilder().mixPaxs().build();
    const component = createComponent({ reservationGroups: mixPaxReservationGroups.reservationGroups });

    expect(component.find('[data-qa="userName"]')).to.have.lengthOf(2);
    expect(component.find('[data-qa="passenger-record-locator"]')).to.have.lengthOf(2);
    expect(component.find('Icon')).to.not.exist;
  });

  it('should show only one passenger label when we have two reservations', () => {
    const reservationGroups = new ReservationGroupsBuilder().mixPaxs().build();

    reservationGroups.reservationGroups[0].passengers = [{ secureFlightName: {} }, { secureFlightName: {} }];

    const component = createComponent({ reservationGroups: reservationGroups.reservationGroups });

    expect(component.find('[data-qa="passenger-label"]')).to.have.lengthOf(1);
  });

  it('should call onClickPassengerName when user click the passengerInfo', () => {
    const reservationGroups = new ReservationGroupsBuilder().build();
    const onClickPassengerNameStub = sinon.stub();

    const component = createComponent({
      reservationGroups: reservationGroups.reservationGroups,
      onClickPassengerName: onClickPassengerNameStub
    });

    click(component.find('[data-qa="passenger-label"]'));

    expect(onClickPassengerNameStub).to.have.been.called;
  });

  it('should render an EarlyBird icon for a passenger that has EarlyBird status', () => {
    const reservationGroups = new ReservationGroupsBuilder().mixPaxs().build();

    reservationGroups.reservationGroups[0].passengers = [
      { secureFlightName: {}, isEarlyBird: true },
      { secureFlightName: {}, isEarlyBird: false }
    ];

    const component = createComponent({ reservationGroups: reservationGroups.reservationGroups });

    const icon = component.find('Icon');

    expect(icon).to.exist;
    expect(icon.prop('type')).to.equal('early-bird');
  });

  const createComponent = (props) => {
    const defaultProps = {
      onClickPassengerName: onClickPassengerNameStub,
      shouldDisplayTsaPrecheck: false
    };
    const finalProps = { ...defaultProps, ...props };

    return mount(<PassengerReservationInfo {...finalProps} />);
  };
});
