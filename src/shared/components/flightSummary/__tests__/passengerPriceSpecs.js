import React from 'react';
import PassengerTypes from 'src/shared/constants/passengerTypes';
import { shallow } from 'enzyme';
import PassengerPrice from 'src/shared/components/flightSummary/passengerPrice';

describe('PassengerPrice', () => {
  let passengerPrice;

  it('should display values correctly', () => {
    passengerPrice = render({
      passengerType: PassengerTypes.PASSENGER,
      passengerCount: 1,
      fareLabel: 'Wanna Get Away',
      fareRulesUrl: '/fare-rules/wanna-get-away'
    });

    expect(passengerPrice.find('[data-qa="passenger-price-passengers--number-and-type"]')).to.have.text('1 Passenger');
    expect(passengerPrice.find('Connect(ContentLink)')).to.have.prop('children', 'Wanna Get Away');
  });

  it('should display Passenger value correctly', () => {
    passengerPrice = render({
      passengerType: PassengerTypes.PASSENGER,
      passengerCount: 1,
      fareLabel: 'Wanna Get Away',
      fareRulesUrl: '/fare-rules/wanna-get-away'
    });
    expect(passengerPrice.find('[data-qa="passenger-price-passengers--number-and-type"]')).to.have.text('1 Passenger');
  });

  it('should not attempt to programatically pluralize and instead just display what is sent by chapi', () => {
    passengerPrice = render({
      passengerType: PassengerTypes.ADULT,
      passengerCount: 2,
      fareLabel: 'Wanna Get Away',
      fareRulesUrl: '/fare-rules/wanna-get-away'
    });

    expect(passengerPrice.find('[data-qa="passenger-price-passengers--number-and-type"]')).to.have.text('2 Adult');
  });

  it('should not attempt to programatically pluralize and instead just display what is sent by chapi', () => {
    passengerPrice = render({
      passengerType: PassengerTypes.PASSENGER,
      passengerCount: 2,
      fareLabel: 'Wanna Get Away',
      fareRulesUrl: '/fare-rules/wanna-get-away'
    });

    expect(passengerPrice.find('[data-qa="passenger-price-passengers--number-and-type"]')).to.have.text('2 Passenger');
  });

  it('should get null when no passenger', () => {
    passengerPrice = render({
      passengerType: PassengerTypes.ADULT,
      passengerCount: 0,
      fareLabel: 'Wanna Get Away',
      fareRulesUrl: '/fare-rules/wanna-get-away'
    });

    expect(passengerPrice.html()).to.be.null;
  });

  it('should display link when in price page', () => {
    passengerPrice = render({
      passengerType: PassengerTypes.PASSENGER,
      passengerCount: 1,
      fareLabel: 'Wanna Get Away',
      fareRulesUrl: '/fare-rules/wanna-get-away'
    });

    expect(passengerPrice.find('Connect(ContentLink)')).to.have.prop('href', '/fare-rules/wanna-get-away');
  });

  it('should show passenger when single passenger type is passenger', () => {
    passengerPrice = render({
      passengerType: 'Passenger',
      passengerCount: 1,
      fareLabel: null,
      fareRulesUrl: null
    });

    expect(passengerPrice.find('[data-qa="passenger-price-passengers--number-and-type"]')).to.have.text('1 Passenger');
  });

  it('should show passenger (note the singular, we take chapi data as-is and display it)', () => {
    passengerPrice = render({
      passengerType: 'Passenger',
      passengerCount: 2,
      fareLabel: 'passenger',
      fareRulesUrl: '/fare-rules/wanna-get-away'
    });

    expect(passengerPrice.find('[data-qa="passenger-price-passengers--number-and-type"]')).to.have.text('2 Passenger');
  });

  it('should user passengerCount instead of passengers array data if it exists', () => {
    passengerPrice = render({
      passengerCountFullString: '87 Passengers'
    });

    expect(passengerPrice.find('[data-qa="passenger-price-passengers--string"]')).to.have.text('87 Passengers');
  });

  context('should not render fare type link ', () => {
    it('when passengerType is LAP_CHILD', () => {
      const passengerPrice = render({
        passengerType: PassengerTypes.LAP_CHILD,
        passengerCount: 1,
        fareLabel: 'Wanna Get Away',
        fareRulesUrl: '/fare-rules/wanna-get-away'
      });
  
      expect(passengerPrice).toMatchSnapshot();
    });
  
    it('when passengerType is LAP_CHILDREN', () => {
      const passengerPrice = render({
        passengerType: PassengerTypes.LAP_CHILDREN,
        passengerCount: 2,
        fareLabel: 'Wanna Get Away',
        fareRulesUrl: '/fare-rules/wanna-get-away'
      });
  
      expect(passengerPrice).toMatchSnapshot();
    });
  });

  const render = (props) => shallow(<PassengerPrice {...props} />);
});
