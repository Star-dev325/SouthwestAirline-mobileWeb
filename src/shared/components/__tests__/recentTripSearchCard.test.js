import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import RecentTripSearchCard from 'src/shared/components/recentTripSearchCard';

describe('RecentTripSearchCard', () => {
  let onClickStub;

  beforeEach(() => {
    onClickStub = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render passenger and confirmation number title correctly', () => {
    const { container } = createComponent();

    expect(container.querySelector('.recent-trip-search-card--title-passenger').textContent).toBe('SHARED__PASSENGER_RESERVATION_TITLE__PASSENGER');
    expect(container.querySelector('.recent-trip-search-card--title-confirmation').textContent).toBe('SHARED__PASSENGER_RESERVATION_TITLE__CONFIRMATION');
  });

  it('should have passenger full name in passenger name content', () => {
    const { container } = createComponent();

    expect(container.querySelector('.recent-trip-search-card--content-passenger-name').textContent).toBe('Bear Claw');
  });

  it('should have record locator in confirmation content', () => {
    const { container } = createComponent();

    expect(container.querySelector('.recent-trip-search-card--content-confirmation').textContent).toBe('MF6GH3');
  });

  it('should call onClick function with pnr parameter when click on item', () => {
    const { container } = createComponent();

    fireEvent.click(container.querySelector('.recent-trip-search-card'));

    expect(container.querySelector('.recent-trip-search-card--content-passenger-name').textContent).toBe('Bear Claw');
    expect(container.querySelector('.recent-trip-search-card--content-confirmation').textContent).toBe('MF6GH3');
  });

  const createComponent = () =>  render(<RecentTripSearchCard firstName="Bear" lastName="Claw" recordLocator="MF6GH3" onClick={onClickStub} />);
});
