import React from 'react';
import FlightSummaryCardHeader from 'src/shared/components/flightSummaryCard/flightSummaryCardHeader';
import { shallow } from 'enzyme';

describe('flightSummaryCardHeader', () => {
  it('should render departure header', () => {
    const component = shallow(<FlightSummaryCardHeader isReturning={false} departureDate="Tue, 8 Apr 2015" />);

    expect(component.find('.flight-day')).to.have.text('Tue, 8 Apr 2015');
    expect(component.find('.flight-summary-header.flight-summary-departing')).to.be.present();
    expect(component.find('.flight-summary-title')).to.have.text('Departing');
  });

  it('should render returning header', () => {
    const component = shallow(<FlightSummaryCardHeader isReturning departureDate="Tue, 8 Apr 2015" />);

    expect(component.find('.flight-day')).to.have.text('Tue, 8 Apr 2015');
    expect(component.find('.flight-summary-header.flight-summary-returning')).to.be.present();
    expect(component.find('.flight-summary-title')).to.have.text('Returning');
  });
});
