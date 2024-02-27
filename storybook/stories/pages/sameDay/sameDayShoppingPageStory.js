import { storiesOf } from '@storybook/react';
import React from 'react';
import { SameDayShoppingPage } from 'src/sameDay/pages/sameDayShoppingPage';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import SameDayShoppingPageResponseBuilder from 'test/builders/apiResponse/sameDayBuilder';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';

const EnhancedSameDayShoppingPage = _.flowRight(withBodyClass('same-day-shopping'))(SameDayShoppingPage);
const defaultProps = {
  sameDaySortFilteredCards: new SameDayShoppingPageResponseBuilder().sameDayShoppingPage.sameDayShoppingInformation.cards
};
const defaultState = new SameDayShoppingPageResponseBuilder().build();
const withDoubleConnects = new SameDayShoppingPageResponseBuilder().withDoubleConnects().build();
const withDoubleConnectsMaxFlightLength = new SameDayShoppingPageResponseBuilder()
  .withDoubleConnectsMaxFlightLength()
  .build();
const withExpandCardsNoSameDayChangeAllowed = new SameDayShoppingPageResponseBuilder()
  .withoutAllowSameDayChange()
  .build();
const withExpandCardsSameDayChangeAllowed = new SameDayShoppingPageResponseBuilder().build();
const withExpandCardsWithPointsBooking = new SameDayShoppingPageResponseBuilder().withPointsBooking().build();
const withLabelSubText = new SameDayShoppingPageResponseBuilder().withAllowSameDayChangeAndLabelSubText().build();
const withNextDayArrival = new SameDayShoppingPageResponseBuilder().withNextDayArrival().build();
const withReturnType = new SameDayShoppingPageResponseBuilder().withFlightType('Return').build();
const withStopDescription = new SameDayShoppingPageResponseBuilder().withStopDescription().build();

const retrieveSameDayFlightDetailsInformationFn = () => Promise.resolve();
const saveChangeFlowFn = (val) => {};
const store = createMockedFormStore();

storiesOf('pages/sameDay/SameDayShoppingPage', module)
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => (
    <EnhancedSameDayShoppingPage
      {...defaultProps}
      {...defaultState}
      retrieveSameDayFlightDetailsInformationFn={retrieveSameDayFlightDetailsInformationFn}
      saveChangeFlowFn={saveChangeFlowFn}
    />
  ))
  .add('with expanded cards when sameDay changes are not allowed', () => (
    <EnhancedSameDayShoppingPage
      {...defaultProps}
      {...withExpandCardsNoSameDayChangeAllowed}
      retrieveSameDayFlightDetailsInformationFn={retrieveSameDayFlightDetailsInformationFn}
      saveChangeFlowFn={saveChangeFlowFn}
    />
  ))
  .add('with expanded cards when sameDay changes are allowed', () => (
    <EnhancedSameDayShoppingPage
      {...defaultProps}
      {...withExpandCardsSameDayChangeAllowed}
      retrieveSameDayFlightDetailsInformationFn={retrieveSameDayFlightDetailsInformationFn}
      saveChangeFlowFn={saveChangeFlowFn}
    />
  ))
  .add('with double connects', () => (
    <EnhancedSameDayShoppingPage
      {...defaultProps}
      {...withDoubleConnects}
      retrieveSameDayFlightDetailsInformationFn={retrieveSameDayFlightDetailsInformationFn}
      saveChangeFlowFn={saveChangeFlowFn}
    />
  ))
  .add('with double connects and max flight length', () => (
    <EnhancedSameDayShoppingPage
      {...defaultProps}
      {...withDoubleConnectsMaxFlightLength}
      retrieveSameDayFlightDetailsInformationFn={retrieveSameDayFlightDetailsInformationFn}
      saveChangeFlowFn={saveChangeFlowFn}
    />
  ))
  .add('with return', () => (
    <EnhancedSameDayShoppingPage
      {...defaultProps}
      {...withReturnType}
      retrieveSameDayFlightDetailsInformationFn={retrieveSameDayFlightDetailsInformationFn}
      saveChangeFlowFn={saveChangeFlowFn}
    />
  ))
  .add('with next day', () => (
    <EnhancedSameDayShoppingPage
      {...defaultProps}
      {...withNextDayArrival}
      retrieveSameDayFlightDetailsInformationFn={retrieveSameDayFlightDetailsInformationFn}
      saveChangeFlowFn={saveChangeFlowFn}
    />
  ))
  .add('with stop description', () => (
    <EnhancedSameDayShoppingPage
      {...defaultProps}
      {...withStopDescription}
      retrieveSameDayFlightDetailsInformationFn={retrieveSameDayFlightDetailsInformationFn}
      saveChangeFlowFn={saveChangeFlowFn}
    />
  ))
  .add('with allow same day change and with label subText', () => (
    <EnhancedSameDayShoppingPage
      {...defaultProps}
      {...withLabelSubText}
      retrieveSameDayFlightDetailsInformationFn={retrieveSameDayFlightDetailsInformationFn}
      saveChangeFlowFn={saveChangeFlowFn}
    />
  ))
  .add('with expanded cards with PTS label', () => (
    <EnhancedSameDayShoppingPage
      {...withExpandCardsWithPointsBooking}
      retrieveSameDayFlightDetailsInformationFn={retrieveSameDayFlightDetailsInformationFn}
      sameDaySortFilteredCards={withExpandCardsWithPointsBooking.sameDayShoppingInformation.cards}
      saveChangeFlowFn={saveChangeFlowFn}
    />
  ))
  .add('with all flights filtered out', () => (
    <EnhancedSameDayShoppingPage
      {...defaultProps}
      {...defaultState}
      retrieveSameDayFlightDetailsInformationFn={retrieveSameDayFlightDetailsInformationFn}
      sameDaySortFilteredCards={[]}
      saveChangeFlowFn={saveChangeFlowFn}
    />
  ));
