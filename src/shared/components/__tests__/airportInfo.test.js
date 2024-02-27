import { render } from '@testing-library/react';
import React from 'react';
import AirportInfo from 'src/shared/components/airportInfo';

describe('airportInfo', () => {
  let domesticAirportInfo;
  let internationalAirportInfo;

  beforeEach(() => {
    domesticAirportInfo = {
      airportCode: 'DAL',
      airportName: 'Dallas (Love Field)',
      cityState: 'TX',
      country: null
    };

    internationalAirportInfo = {
      airportCode: 'CUN',
      airportName: 'Cancun',
      cityState: null,
      country: 'Mexico'
    };
  });

  it('should show airport code when given an airport info', () => {
    const { container } = render(<AirportInfo airportInfo={domesticAirportInfo} />);

    expect(container.querySelector('.airport-info--code').textContent).toEqual('DAL');
  });

  it('should show airport name and state when show detail for domestic airport info', () => {
    const { container } = render(<AirportInfo airportInfo={domesticAirportInfo} showDetail />);

    expect(container.querySelector('.airport-info--detail').textContent).toEqual('Dallas (Love Field), TX');
  });

  it('should show airport name and country when show detail for international airport info', () => {
    const { container } = render(<AirportInfo airportInfo={internationalAirportInfo} showDetail />);

    expect(container.querySelector('.airport-info--detail').textContent).toEqual('Cancun, Mexico');
  });
});
