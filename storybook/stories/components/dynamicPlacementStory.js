import { storiesOf } from '@storybook/react';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { toDynamicPlacement } from 'src/wcm/transformers/wcmTransformer';
import createMockStore from 'test/unit/helpers/createMockStore';
import DynamicPlacement from 'src/wcm/components/dynamicPlacement';
import React from 'react';

import companionPass from 'mocks/templates/wcm/flexPlacements/chase/companionPass';
import recentFlights from 'mocks/templates/wcm/flexPlacements/chase/recentFlights';
import sameDayConfirmation from 'mocks/templates/wcm/flexPlacements/sameDay/sameDayConfirmation';
import showTheMath from 'mocks/templates/wcm/flexPlacements/chase/showTheMath';

const userInformation = {
  redeemablePoints: 0,
  companionPassInfo: { companionRemainingPoints: 100000 },
  recentFlightDestinationAirport: 'Austin'
};

const store = createMockStore()({
  app: {
    account: { userInfo: { customers: { UserInformation: userInformation } } }
  }
});

const showTheMathProps = toDynamicPlacement(showTheMath, 'placementKey');
const recentFlightsProps = toDynamicPlacement(recentFlights, 'placementKey');
const companionPassProps = toDynamicPlacement(companionPass, 'placementKey');
const sameDayConfirmationProps = toDynamicPlacement(sameDayConfirmation, 'ContentModule1');

storiesOf('components/dynamicPlacement', module)
  .addDecorator(StoryReduxProvider(store))
  .add('Flex Placement - Chase - Show The Math', () => <DynamicPlacement {...showTheMathProps} />)
  .add('Flex Placement - Chase - Recent Flights', () => <DynamicPlacement {...recentFlightsProps} />)
  .add('Flex Placement - Chase - Companion Pass', () => <DynamicPlacement {...companionPassProps} />)
  .add('Flex Placement - SDSB - Confirmation', () => <DynamicPlacement {...sameDayConfirmationProps} additionalTemplateData={{ contentMethodValue: 'test@mail.com' }} />)
