import InternationalTravelInfoNavItem from 'src/airBooking/components/internationalTravelInfoNavItem';
import React from 'react';
import { render } from '@testing-library/react';

describe('InternationalTravelInfoNavItem', () => {
  it(`should render correct component when current passenger passport is not filled`, () => {
    const { container } = render(
      <InternationalTravelInfoNavItem onClick={() => {}} filledPassportForCurrentPassenger={false} />
    );

    expect(container).toMatchSnapshot();
  });

  it(`should render correct component when current passenger passport is filled`, () => {
    const { container } = render(
      <InternationalTravelInfoNavItem onClick={() => {}} filledPassportForCurrentPassenger />
    );

    expect(container).toMatchSnapshot();
  });
});
