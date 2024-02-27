import { storiesOf } from '@storybook/react';
import React from 'react';
import { noop, cloneDeep, set } from 'lodash';
import StoryRouter from 'storybook-router';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { MyAccountLandingPage } from 'src/myAccount/pages/myAccountLandingPage';
import UpcomingTripsBuilder from 'test/builders/apiResponse/v1/mobile-misc/page/upcoming-trips/upcomingTripsBuilder';
import configureMockStore from 'redux-mock-store';
import { myAccountQuickLinks } from 'mocks/flexPlacement/myAccountQuickLinks.js';

const defaultProps = {
  push: noop,
  upcomingTrips: [],
  isTierStatusPending: false,
  customerInfo: {
    name: {
      firstName: 'Hank',
      lastName: 'Hill'
    },
    gender: 'M',
    birthDate: '1960-06-19',
    accountNumber: '123456789'
  },
  rapidRewardsDetails: {
    redeemablePoints: 12345,
    chaseVisaRrEnrolled: true,
    tierInfo: {
      tier: 'A_LIST_PREFERRED',
      tierAchievedDate: '2014-11-09',
      tierQualifyingPoints: 0,
      tierQualifyingFlights: 0,
      nextTierTargeted: 'N/A',
      nextTierQualifyingPointsRequired: 0,
      nextTierQualifyingFlightsRequired: 0,
      tierEndDate: '2021-12-31'
    },
    companionPassInfo: {
      companionPassAchieved: false,
      companionQualifyingPoints: 30000,
      companionQualifyingFlights: 70,
      companionDeclared: false,
      companionQualifyingPointsRequired: '125000',
      companionQualifyingFlightsRequired: '100'
    },
    isEnrolledInRapidRewards: true
  },
  exclusivePromotions: {
    numberOfEligiblePromotions: 0,
    eligiblePromotions: [],
    numberOfRegisteredPromotions: 0,
    registeredPromotions: []
  },
  isLoggedIn: true,
  IsExclusivePromotionsHidden: true,
  accountPagePlacements: {
    unusedFundsContentModule: [
      {
        textContent:
          'Funds displayed in your account include funds from canceled tickets which included your Rapid Rewards number and canceled in accordance with the No Show Policy on or after December 3, 2019.',
        type: 'div',
        props: { id: 'main-body' }
      },
      { textContent: 'View Funds', type: 'Link', props: { target: 'https://www.viewfunds.com', id: 'view-funds-btn' } },
      { textContent: 'Learn More', type: 'Link', props: { target: 'https://www.learnmore.com', id: 'learn-more-btn' } }
    ],
    promoCodeContentModule: [
      { textContent: 'This is a WCM controlled PFO placeholder for any necessary language determined by the business.', type: 'div', props: { id: 'main-body' } },
      { textContent: 'We are working to make this feature more mobile friendly in the future.', type: 'div', props: { id: 'sub-text' } },
      {
        textContent: 'View Promo Codes',
        type: 'Link',
        props: { target: 'https://www.viewpromocodes.com', id: 'learn-more-btn' }
      }
    ]
  },
  setTripTypeForDetailsPageFn: noop,
  clearFlightReservationFn: noop,
  retrieveCarReservationFn: noop,
  getAccountInfoForLandingPageFn: noop,
  retrieveUnusedFundsFn: noop,
  UNUSED_FUNDS: true
};

const propsWithSingleUpcomingTrip = {
  ...defaultProps,
  upcomingTrips: new UpcomingTripsBuilder().withOneWayFlight().build().upcomingTripsPage
};

const propsWithMultipleUpcomingTrips = {
  ...defaultProps,
  upcomingTrips: new UpcomingTripsBuilder().withOneWayFlight().withRoundTripFlight().build().upcomingTripsPage
};

const propsWithMyAccountQuickLinks = {
  ...defaultProps,
  accountPagePlacements: {
    ...defaultProps.accountPagePlacements,
    banner01: myAccountQuickLinks
  }
};

const propsWithPromoCodeSection = {
  ...defaultProps,
  onClickFn: noop,
  PROMO_CODE_IN_MY_ACCOUNT: true
}

const store = configureMockStore()({
  router: {
    location: {
      pathname: '/',
      search: 'search'
    }
  }
});

storiesOf('pages/myAccount/myAccountLandingPage', module)
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => {
    return <MyAccountLandingPage {...defaultProps} />;
  })
  .add('withPromoCodeSection', () => {
    return <MyAccountLandingPage {...propsWithPromoCodeSection} />;
  })
  .add('withSingleUpcomingTrip', () => {
    return <MyAccountLandingPage {...propsWithSingleUpcomingTrip} />;
  })
  .add('withMultipleUpcomingTrips', () => {
    return <MyAccountLandingPage {...propsWithMultipleUpcomingTrips} />;
  })
  .add('withMyAccountQuickLinks', () => {
    return <MyAccountLandingPage {...propsWithMyAccountQuickLinks} />;
  })
  .add('withCompanionPassExpirationDate', () => {
    const propsWithCompanionPassExpirationDate = _.cloneDeep(defaultProps);
    _.set(propsWithCompanionPassExpirationDate, 'rapidRewardsDetails.companionPassInfo.companionPassAchieved', true);
    _.set(
      propsWithCompanionPassExpirationDate,
      'rapidRewardsDetails.companionPassInfo.companionPassExpirationDate',
      '2021-12-31'
    );

    return <MyAccountLandingPage {...propsWithCompanionPassExpirationDate} />;
  });
