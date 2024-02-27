import { render } from '@testing-library/react';
import React from 'react';
import RecentTripSearchCardsList from 'src/shared/components/recentTripSearchCardsList';

describe('RecentTripSearchCardsList', () => {
  it('should render title', () => {
    const { container } = createComponent();
    
    expect(container.querySelector('.recent-trip-search-cards-list--title').textContent).toBe('SHARED__RECENT_SEARCHES__TRIP_SEARCH_TITLE');
  });

  it('should render the recent trip search cards list', () => {
    const { container } = createComponent();

    expect(container.querySelectorAll('.recent-trip-search-card--content').length).toBe(2);
    expect(container.querySelectorAll('.recent-trip-search-card--content-confirmation')[0].textContent).toBe('ABC123');
    expect(container.querySelectorAll('.recent-trip-search-card--content-passenger-name')[0].textContent).toBe('Andy Smith');
    expect(container.querySelectorAll('.recent-trip-search-card--content-confirmation')[1].textContent).toBe('DEF456');
    expect(container.querySelectorAll('.recent-trip-search-card--content-passenger-name')[1].textContent).toBe('Tom Jones');
  });

  const createComponent = () => {
    const defaultProps = {
      recentTripSearches: [
        {
          recordLocator: 'ABC123',
          firstName: 'Andy',
          lastName: 'Smith'
        },
        {
          recordLocator: 'DEF456',
          firstName: 'Tom',
          lastName: 'Jones'
        }
      ]
    };

    return render(<RecentTripSearchCardsList {...defaultProps} onCardClick={() => null} />);
  };
});
