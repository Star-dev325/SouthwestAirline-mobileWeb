import React from 'react';
import _ from 'lodash';
import { shallow } from 'enzyme';
import sinonModule from 'sinon';

const sinon = sinonModule.sandbox.create();

import DayOfTravelPassengerGroup from 'src/viewReservation/components/dayOfTravelPassengerGroup';

describe('dayOfTravelPassengerGroup', () => {
  it('should render its children', () => {
    const component = createComponent({
      children: <div id="testDiv" />
    });

    expect(component.find('#testDiv')).to.exist;
  });

  it('should render a passengerReservationInfo per passenger', () => {
    const component = createComponent({
      passengers: [
        { name: 'First Passenger', passengerReference: '1', hasAnyEarlyBird: false },
        { name: 'Second Passenger', passengerReference: '2', hasAnyEarlyBird: false }
      ]
    });

    expect(component.find('PassengerReservationInfo')).to.have.length(2);
  });

  it('should pass the passenger to the PassengerReservationInfo', () => {
    const passenger = {
      name: 'Test Name',
      passengerReference: '2',
      hasAnyEarlyBird: true
    };
    const component = createComponent({
      passengers: [passenger]
    });

    expect(component.find('PassengerReservationInfo')).to.have.prop('passenger').that.deep.equals(passenger);
  });

  it('should pass isInternational and onClick from its props', () => {
    const onPassengerNameClickStub = sinon.stub();

    const passThroughProps = {
      isInternational: true,
      onPassengerNameClick: onPassengerNameClickStub,
      showPassengerHeader: true
    };
    const component = createComponent(passThroughProps);

    expect(component.find('PassengerReservationInfo')).to.have.props(passThroughProps);
  });

  it('should provide an index for the PassengerReservationInfo', () => {
    const component = createComponent({
      passengers: [
        { name: 'First Passenger', passengerReference: '1', hasAnyEarlyBird: false },
        { name: 'Second Passenger', passengerReference: '2', hasAnyEarlyBird: false }
      ]
    });

    expect(component.find('PassengerReservationInfo').at(0)).to.have.prop('index', 0);
    expect(component.find('PassengerReservationInfo').at(1)).to.have.prop('index', 1);
  });

  it('should set showPassengerHeader on the first PassengerReservationInfo if showPassengerHeader is true', () => {
    const component = createComponent({
      passengers: [
        { name: 'First Passenger', passengerReference: '1', hasAnyEarlyBird: false },
        { name: 'Second Passenger', passengerReference: '2', hasAnyEarlyBird: false }
      ],
      showPassengerHeader: true
    });

    expect(component.find('PassengerReservationInfo').at(0)).to.have.prop('showPassengerHeader', true);
    expect(component.find('PassengerReservationInfo').at(1)).to.have.prop('showPassengerHeader', false);
  });

  it('should not set showPassengerHeader on any PassengerReservationInfo if showPassengerHeader is false', () => {
    const component = createComponent({
      passengers: [
        { name: 'First Passenger', passengerReference: '1', hasAnyEarlyBird: false },
        { name: 'Second Passenger', passengerReference: '2', hasAnyEarlyBird: false }
      ],
      showPassengerHeader: false
    });

    expect(component.find('PassengerReservationInfo').at(0)).to.have.prop('showPassengerHeader', false);
    expect(component.find('PassengerReservationInfo').at(1)).to.have.prop('showPassengerHeader', false);
  });

  it('should render lap child details when lapInfant exists', () => {
    const component = createComponent({ 
      passengers: [{ name: 'First Passenger', lapInfant: { name: 'Lap ChildTest' } }]
    });

    expect(component).toMatchSnapshot();
  });

  const createComponent = (props) => {
    const defaultProps = {
      isFirstGroup: false,
      passengers: [
        {
          name: 'Test Name',
          passengerReference: '2',
          hasAnyEarlyBird: true
        }
      ],
      children: null,
      isInternational: true,
      onPassengerNameClick: _.noop,
      showPassengerHeader: false
    };

    return shallow(<DayOfTravelPassengerGroup {..._.merge({}, defaultProps, props)} />);
  };
});
