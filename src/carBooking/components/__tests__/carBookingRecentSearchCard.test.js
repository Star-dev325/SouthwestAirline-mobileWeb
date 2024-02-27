import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import CarBookingRecentSearchCard from 'src/carBooking/components/carBookingRecentSearchCard';

describe('CarBookingRecentSearchCard', () => {
  let container;
  let onDeleteCurrentSearchStub;
  let onRecentSearchCardClickedStub;
  let searchRequest;

  beforeEach(() => {
    onDeleteCurrentSearchStub = jest.fn();
    onRecentSearchCardClickedStub = jest.fn();
    searchRequest = {
      dropOff: 'ABI',
      dropOffDate: '2016-03-15',
      dropOffTime: '11:30AM',
      pickUp: 'ABR',
      pickUpDate: '2016-03-12',
      pickUpTime: '11:30AM',
      vehicleType: 'Mid-size'
    };

    const component = createComponent();

    container = component.container;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('render', () => {
    it('should show delete icon when prop shouldShowDeleteButton is true', () => {
      const { container } = createComponent(true);

      expect(container.querySelector('.icon.icon_delete')).not.toBeNull();
    });

    it('should not show delete icon when prop shouldShowDeleteButton is false', () => {
      expect(container.querySelector('.icon_delete')).toBeNull();
    });
  });

  describe('on click', () => {
    it('should trigger select card callback with search request when clicking the segment part of the card', () => {
      const recentSearchCard = container.querySelectorAll('.car-connect')[0];

      fireEvent.click(recentSearchCard);
      expect(onRecentSearchCardClickedStub).toHaveBeenCalledWith(searchRequest);
    });

    it('should trigger delete card callback with search request when clicking the segment part of the card', () => {
      const { container } = createComponent(true);
      const recentSearchCard = container.querySelectorAll('.icon.icon_delete')[0];

      fireEvent.click(recentSearchCard);
      expect(onDeleteCurrentSearchStub).toHaveBeenCalledWith(0);
    });
  });

  const createComponent = (shouldShowDeleteButton = false) =>
    render(
      <CarBookingRecentSearchCard
        indexOfRecentSearch={0}
        onDeleteCurrentSearch={onDeleteCurrentSearchStub}
        onRecentSearchCardClicked={onRecentSearchCardClickedStub}
        searchRequest={searchRequest}
        shouldShowDeleteButton={shouldShowDeleteButton}
      />
    );
});
