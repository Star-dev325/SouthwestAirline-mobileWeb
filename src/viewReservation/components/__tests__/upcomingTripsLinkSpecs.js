import UpcomingTripsLink from 'src/viewReservation/components/upcomingTripsLink';
import { mountWithMemoryRouter } from 'test/unit/helpers/testUtils';

describe('upcomingTripsLink', () => {
  it("should return upcomingTripsLink which contains text 'View your upcoming trips'", () => {
    const mockedComponent = createComponent();

    expect(mockedComponent.find('a.upcoming-trips-link')).to.contain.text('View your upcoming trips');
  });

  const createComponent = () => mountWithMemoryRouter(UpcomingTripsLink);
});
