import i18n from '@swa-ui/locale';
import { render } from '@testing-library/react';
import React from 'react';
import MyAccountFlightCard from 'src/myAccount/components/myAccountFlightCard';

describe('MyAccountFlightCard', () => {
  it('should render flight info correctly', () => {
    const props = {
      dates: {
        first: '2016-05-23',
        second: '2016-06-03'
      },
      destinationDescription: 'Dallas (Love Field), TX',
      originDescription: 'Houston (Hobby), TX'
    };

    const { container } = render(<MyAccountFlightCard {...props} />);

    expect(container.querySelector('.my-account-flight-card--trip-date').textContent).toEqual('May 23 - Jun 3');
    expect(container.querySelectorAll('.my-account-flight-card--airport')[0].textContent).toEqual(
      `Houston (Hobby), TX ${i18n('MY_ACCOUNT__FLIGHT_CARD__TO')}`
    );
    expect(container.querySelectorAll('.my-account-flight-card--airport')[1].textContent).toEqual(
      'Dallas (Love Field), TX'
    );
  });
});
