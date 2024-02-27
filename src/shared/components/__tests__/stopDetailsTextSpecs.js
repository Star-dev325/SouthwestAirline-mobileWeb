import { mount } from 'enzyme';
import React from 'react';
import StopDetailsText from 'src/shared/components/stopDetailsText';

describe('StopDetailsText', () => {
  it('should return the correct connection details based on number of stops', () => {
    expect(createComponent({ numberOfStops: 0 })).to.have.text('Nonstop');

    expect(createComponent({ numberOfStops: 1 })).to.have.text('1 Stop, No plane change');

    const twoLineComponent = createComponent({ numberOfStops: 1 }, { displayAsTwoLine: true });

    expect(twoLineComponent).to.contain.text('1 Stop:');
    expect(twoLineComponent).to.contain.html('<br>');
    expect(twoLineComponent).to.contain.text('No plane change');

    expect(createComponent({ numberOfStops: 1, connectionAirportCode: 'MDW' })).to.have.text(
      '1 Stop, Change planes MDW'
    );

    expect(createComponent({ numberOfStops: 2, connectionAirportCode: 'MDW' })).to.have.text(
      '2 Stops, Change planes MDW'
    );
  });

  it('should return condensed information if short prop is true', () => {
    expect(createComponent({ numberOfStops: 0 }, { short: true })).to.have.text('Nonstop');

    expect(createComponent({ numberOfStops: 1 }, { short: true })).to.have.text('1 Stop');

    const twoLineComponent = createComponent({ numberOfStops: 1 }, { displayAsTwoLine: true, short: true });

    expect(twoLineComponent).to.contain.text('1 Stop:');
    expect(twoLineComponent).to.contain.html('<br>');
    expect(twoLineComponent).to.not.contain.text('No plane change');

    expect(createComponent({ numberOfStops: 1, connectionAirportCode: 'MDW' }, { short: true })).to.have.text(
      '1 Stop, MDW'
    );

    expect(createComponent({ numberOfStops: 2, connectionAirportCode: 'MDW' }, { short: true })).to.have.text(
      '2 Stops, MDW'
    );
  });

  it('should return according to whether it has icon boolean', () => {
    expect(
      createComponent({ numberOfStops: 1, connectionAirportCode: 'MDW' }, { withIcon: true, short: true })
    ).to.have.text('1 Stop, MDW');

    expect(createComponent({ numberOfStops: 1, connectionAirportCode: 'MDW' }, { withIcon: true })).to.have.text(
      '1 Stop: Change planes MDW'
    );
  });

  it('should show overnight icon and label when overnight flag is true', () => {
    const component = createComponent(
      { numberOfStops: 1, connectionAirportCode: 'MDW', isOvernight: true },
      { withIcon: true, short: true }
    );

    expect(component.find('[data-qa="stops-detail--overnight-indicator"]')).to.exist;
  });

  it('should not show overnight icon and label when overnight flag is false', () => {
    const component = createComponent(
      { numberOfStops: 1, connectionAirportCode: 'MDW', isOvernight: false },
      { withIcon: true, short: true }
    );

    expect(component.find('[data-qa="stops-detail--overnight-indicator"]')).to.not.exist;
  });
});

const createComponent = (flightData, options = {}) =>
  mount(
    <StopDetailsText
      flightData={flightData}
      short={options.short || false}
      displayAsTwoLine={options.displayAsTwoLine || false}
      withIcon={options.withIcon || false}
    />
  );
