import { storiesOf } from '@storybook/react';
import React from 'react';
import { SameDaySelectFarePage } from 'src/sameDay/pages/sameDaySelectFarePage';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import StoryRouter from 'storybook-router';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { withFakeClock } from 'storybook/libs/withFakeClock';
import sameDayBuilder from 'test/builders/apiResponse/sameDayBuilder';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';

const EnhancedFlightSelectFarePage = withBodyClass('flight-select-fare-page')(SameDaySelectFarePage);

const { sameDayShoppingInformation } = new sameDayBuilder().build();
const { sameDayShoppingInformation: nextDaySameDayShoppingInformation } = new sameDayBuilder().withNextDayArrival().build();
const { sameDayShoppingInformation: overnightSameDayShoppingInformation } = new sameDayBuilder().withOvernight().build();
const nextDayPageProps = {
  card: nextDaySameDayShoppingInformation.cards[0],
  disclaimerWithLinks: nextDaySameDayShoppingInformation.expandedDetails.disclaimerWithLinks,
  fareDetailsLink: nextDaySameDayShoppingInformation._links.fareDetailsJson,
  goBack: _.noop,
  productDefinitions: nextDaySameDayShoppingInformation.productDefinitions
};
const overnightProps = {
  card: overnightSameDayShoppingInformation.cards[0],
  disclaimerWithLinks: overnightSameDayShoppingInformation.expandedDetails.disclaimerWithLinks,
  fareDetailsLink: overnightSameDayShoppingInformation._links.fareDetailsJson,
  goBack: _.noop,
  productDefinitions: overnightSameDayShoppingInformation.productDefinitions
};
const pageProps = {
  card: sameDayShoppingInformation.cards[0],
  disclaimerWithLinks: sameDayShoppingInformation.expandedDetails.disclaimerWithLinks,
  fareDetailsLink: sameDayShoppingInformation._links.fareDetailsJson,
  goBack: _.noop,
  productDefinitions: sameDayShoppingInformation.productDefinitions
};

const store = createMockedFormStore();

storiesOf('pages/sameDay/sameDaySelectFarePage', module)
  .addDecorator(StoryRouter())
  .addDecorator(withFakeClock('2018-01-01'))
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => <EnhancedFlightSelectFarePage {...pageProps} />)
  .add('next day', () => <EnhancedFlightSelectFarePage {...nextDayPageProps} />)
  .add('overnight', () => <EnhancedFlightSelectFarePage {...overnightProps} />);