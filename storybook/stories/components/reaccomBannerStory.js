import { storiesOf } from '@storybook/react';
import React from 'react';

import ReaccomBanner from 'src/viewReservation/components/reaccomBanner';

const bodyText =
  "You may change this flight free of charge. We're sincerely sorry for any inconvenience. If you checked bags, we'll make every effort to reroute your luggage with your new itinerary.";
const headerText = "We've rebooked you on a new flight";
const bodyTextWithHtml =
  'You may also <a href = "https://www.southwest.com/contact-us/contact-us.html?clk=GFOOTER-CUSTOMER-CONTACT-US">Contact Us</a> or speak with a Southwest Customer Service Agent at the airport.';

storiesOf('components/reaccomBanner', module)
  .add('default', () => {
    return <ReaccomBanner body={bodyText} header={headerText} />;
  })
  .add('text with html', () => {
    return <ReaccomBanner showBodyAsHtml body={bodyTextWithHtml} header={headerText} />;
  });
