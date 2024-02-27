import React from 'react';
import sinonModule from 'sinon';
import { shallow } from 'enzyme';
import ContentLink from 'src/shared/components/contentLink';

import FlightShoppingExplain from 'src/shared/components/flightShoppingExplain';

const sinon = sinonModule.sandbox.create();

describe('FlightShoppingExplain', () => {
  let component;

  afterEach(() => {
    sinon.restore();
  });

  it('should have switch button when showCurrencySwitch is true', () => {
    component = shallow(<FlightShoppingExplain currencySuit="USD" showCurrencySwitch />);

    expect(component.find('MoneyOrPointsSwitchButton')).to.exist;
    expect(component).toMatchSnapshot();
  });

  it('should not have switch button when showCurrencySwitch is false', () => {
    component = shallow(<FlightShoppingExplain currencySuit="USD" />);

    expect(component).toMatchSnapshot();
  });

  it('should have new look and feel when useAlternateTheme is true even if darkTheme is true', () => {
    component = shallow(<FlightShoppingExplain currencySuit="USD" showCurrencySwitch darkTheme useAlternateTheme />);

    const button = component.find('MoneyOrPointsSwitchButton');

    expect(button.prop('useAlternateTheme')).to.equal(true);
  });

  it('should not have switch button when showCurrencySwitch is false', () => {
    component = shallow(<FlightShoppingExplain currencySuit="USD" showCurrencySwitch={false} />);

    expect(component.find('MoneyOrPointsSwitchButton')).to.be.not.exist;
  });

  it('should show upper disclaimers when hideRestrictions is false', () => {
    component = shallow(<FlightShoppingExplain currencySuit="USD" showCurrencySwitch />);

    expect(component.find('.flight-shopping-explain--bags')).to.contain.text('First 2 Bags Fly Free');
    expect(component.find('[dataQa="baggage-restrictions"]').props()).to.deep.equal({
      children: 'Weight, size and excess limits apply.',
      dataQa: 'baggage-restrictions',
      href: '/baggage-restrictions'
    });
  });

  it('should not show upper disclaimers when hideRestrictions is true', () => {
    component = shallow(<FlightShoppingExplain currencySuit="USD" showCurrencySwitch hideRestrictions />);

    expect(component.find('.flight-shopping-explain--bags')).to.not.exist;
    expect(component.find('[data-qa="baggage-restrictions"]')).to.not.exist;
  });

  it('should show disclaimerWithLinks from CHAPI when present', () => {
    component = shallow(
      <FlightShoppingExplain currencySuit="USD" showCurrencySwitch disclaimerWithLinks={'This is a disclaimer'} />
    );

    expect(component.find('.flight-shopping-explain--taxes').find(ContentLink).props().raw).to.contain(
      'This is a disclaimer'
    );
  });

  it('should show disclaimer for dollars when currencySuit is dollars and disclaimerWithLinks is undefined', () => {
    component = shallow(
      <FlightShoppingExplain currencySuit="USD" showCurrencySwitch disclaimerWithLinks={undefined} />
    );

    expect(component.find('.flight-shopping-explain--taxes').find(ContentLink).props().raw).to.contain(
      'All fares are rounded up to the nearest dollar and include'
    );
  });

  it('should show local disclaimer for point when currencySuit is points and disclaimerWithLinks is undefined', () => {
    component = shallow(
      <FlightShoppingExplain currencySuit="PTS" showCurrencySwitch disclaimerWithLinks={undefined} />
    );

    expect(component.find('.flight-shopping-explain--taxes').find(ContentLink).props().raw).to.contain(
      'Dollar amounts shown below represent '
    );
  });

  it('should call onCurrencySwitchSelect callback when click switch button', () => {
    const onCurrencySwitchSelectStub = sinon.stub();

    component = shallow(
      <FlightShoppingExplain
        currencySuit="USD"
        showCurrencySwitch
        onCurrencySwitchSelect={onCurrencySwitchSelectStub}
      />
    );

    component.find('MoneyOrPointsSwitchButton').props().onSelect();
    expect(onCurrencySwitchSelectStub).to.be.called;
  });
});
