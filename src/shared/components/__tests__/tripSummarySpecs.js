import React from 'react';
import { shallow } from 'enzyme';
import sinonModule from 'sinon';
import TripSummary from 'src/shared/components/tripSummary';
import BriefBoundBuilder from 'test/builders/model/briefBoundBuilder';
import { click } from 'test/unit/helpers/enzymeFormTestUtils';

const sinon = sinonModule.sandbox.create();

describe('Trip Summary', () => {
  let component;
  let onTripAndPriceClickStub;
  let outbound;
  let inbound;

  beforeEach(() => {
    onTripAndPriceClickStub = sinon.stub();
    outbound = new BriefBoundBuilder().build();
    inbound = new BriefBoundBuilder()
      .withDepartureAirportCode('OAK')
      .withArrivalAirportCode('LAS')
      .withDepartureDate('2017-11-28')
      .withDepartureDayOfWeek('Tuesday')
      .build();

    const props = {
      bounds: [outbound, inbound],
      passengerCountDescription: '2 Passenger Total',
      currency: {
        amount: '234.30',
        currencyCode: 'USD',
        currencySymbol: '$'
      }
    };

    component = shallow(<TripSummary {...props} onTripAndPriceClick={onTripAndPriceClickStub} />);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should display the bound info in BriefBound component', () => {
    expect(component.find('BriefBound').first()).to.have.props({ ...outbound });
    expect(component.find('BriefBound').at(1)).to.have.props({ ...inbound });
  });

  it('should display the passenger count message and price info in TitleAndPrice component', () => {
    expect(component.find('TitleAndPrice')).to.have.prop('message').to.be.equal('2 Passenger Total');
    expect(component.find('TitleAndPrice')).to.have.prop('currency').to.deep.equal({
      amount: '234.30',
      currencyCode: 'USD',
      currencySymbol: '$'
    });
  });

  it('should trigger onTripAndPriceClick callback when user click the trip and price link', () => {
    click(component.find('NavItemLink'));

    expect(onTripAndPriceClickStub).to.have.been.called;
  });
});
