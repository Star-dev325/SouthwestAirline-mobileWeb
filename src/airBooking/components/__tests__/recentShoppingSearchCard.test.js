import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import RecentShoppingSearchCard from 'src/airBooking/components/recentShoppingSearchCard';

describe('recentShoppingSearchCard', () => {
  let onRecentSearchCardClickedStub, recentShoppingSearchCard, searchRequest;
  let onDeleteCurrentSearchStub;

  beforeEach(() => {
    onRecentSearchCardClickedStub = jest.fn();
    onDeleteCurrentSearchStub = jest.fn();
    searchRequest = {
      origin: 'DAL',
      destination: 'AUS',
      departureDate: '2015-01-01',
      returnDate: '2015-02-02',
      numberOfAdults: 1,
      currencyType: 'Dollars',
      tripType: 'oneWay',
      isRoundTrip: false
    };
  });

  describe('#formatPassengerCount', () => {
    describe('when the recent search was for one adult', () => {
      it('should leave the "passenger" identifier in singular tense', () => {
        const { container } = createComponent({ ...searchRequest, numberOfAdults: 1 });

        expect(container).toMatchSnapshot();
      });
    });

    describe('when the recent search was for one adult and one lap child', () => {
      it('should leave the "passenger" and "lap child" identifier in singular tense', () => {
        const { container } = createComponent({ ...searchRequest, numberOfAdults: 1, numberOfLapInfants: 1 });

        expect(container).toMatchSnapshot();
      });
    });

    describe('when the recent search was for more than one adult', () => {
      it('should convert the "passenger" identifier to plural tense', () => {
        const { container } = createComponent({ ...searchRequest, numberOfAdults: 4 });

        expect(container).toMatchSnapshot();
      });
    });

    describe('when the recent search was for more than one adult and lap child', () => {
      it('should convert the "passenger" and "lap child" identifier to plural tense', () => {
        const { container } = createComponent({ ...searchRequest, numberOfAdults: 4, numberOfLapInfants: 2 });

        expect(container).toMatchSnapshot();
      });
    });

    describe('when the recent search was for more than one adult and one lap child', () => {
      it('should convert the "passenger" identifier to plural tense and leave "lap child" in singular tense', () => {
        const { container } = createComponent({ ...searchRequest, numberOfAdults: 4, numberOfLapInfants: 1 });

        expect(container).toMatchSnapshot();
      });
    });
  });

  describe('general render', () => {
    beforeEach(() => {
      recentShoppingSearchCard = createComponent(searchRequest);
    });

    describe('when clicking the segment part of the card', () => {
      it('trigger onRecentSearchCardClicked action', () => {
        const segment = recentShoppingSearchCard.container.querySelectorAll('.segment')[0];

        fireEvent.click(segment);

        expect(onRecentSearchCardClickedStub).toHaveBeenCalledWith(searchRequest);
      });
    });

    it('should display both the departure, return dates and trip type', () => {
      expect(recentShoppingSearchCard.container).toMatchSnapshot();
    });

    describe('when you click the delete icon', () => {
      it('should trigger a delete recent search action', () => {
        recentShoppingSearchCard = createComponent(searchRequest, true, 0);
        const deleteButton = recentShoppingSearchCard.container.querySelector('.recent-search-card--delete-icon');

        fireEvent.click(deleteButton);

        expect(onDeleteCurrentSearchStub).toHaveBeenCalledWith(0);
      });
    });
  });

  const createComponent = (searchRequest, shouldShowDeleteButton, indexOfRecentSearch) => {
    shouldShowDeleteButton = shouldShowDeleteButton || false;
    indexOfRecentSearch = indexOfRecentSearch || 0;

    const componentProps = {
      searchRequest,
      shouldShowDeleteButton,
      indexOfRecentSearch,
      onRecentSearchCardClicked: onRecentSearchCardClickedStub,
      onDeleteCurrentSearch: onDeleteCurrentSearchStub
    };

    return render(<RecentShoppingSearchCard {...componentProps} />);
  };
});
