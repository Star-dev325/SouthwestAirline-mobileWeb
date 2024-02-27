import { storiesOf } from '@storybook/react';
import React from 'react';
import noop from 'lodash/noop';
import StoryRouter from 'storybook-router';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { RapidRewardsSnapshotPage } from 'src/myAccount/pages/rapidRewardsSnapshotPage';
import configureMockStore from 'redux-mock-store';

const defaultProps = {
  push: noop,
  rapidRewardsInfo: {
    fullName: 'Hank Hill',
    rapidRewardsNumber: '1234567890',
    ptsGroup: {
      label: 'A-List Preferred',
      spendablePoints: '12,345',
      showViewBenefitsLink: true
    },
    tier: {
      showCongratulations: false,
      title: {
        preString: 'Maintain your',
        status: 'A-List Preferred ',
        sufString: 'status'
      },
      pointsDonutProgressBar: {
        percentageComplete: 0,
        pointsRequired: '70,000',
        pointsEarned: '0'
      },
      flightsDonutProgressBar: {
        percentageComplete: 0,
        flightsRequired: '50',
        flightsFlown: '0'
      }
    },
    companionPass: {
      showCongratulations: true,
      title: {
        preString: 'Earn your next',
        status: 'Companion Pass',
        sufString: ''
      },
      shouldCallToAddOrChangeCompanion: false,
      pointsDonutProgressBar: {
        percentageComplete: 0,
        pointsRequired: '125,000',
        pointsEarned: '0'
      },
      flightsDonutProgressBar: {
        percentageComplete: 0,
        flightsRequired: '100',
        flightsFlown: '0'
      }
    }
  },
  isLoggedIn: true,
  getRapidRewardsInfoFn: noop,
  clearRapidRewardsInfoFn: noop,
  getMyAccountRapidRewardsPagePlacementsFn: noop,
  tierEndDate: '2021-12-31',
  companionPassExpirationDate: '2021-12-31',
  userAlreadyHasChaseRRVisa: false
};

const store = configureMockStore()({
  router: {
    location: {
      pathname: '/',
      search: 'search'
    }
  }
});

storiesOf('pages/myAccount/rapidRewardsSnapshotPage', module)
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => {
    return <RapidRewardsSnapshotPage {...defaultProps} />;
  })
  .add('withCompanionPassExpirationDate', () => {
    const propsWithCompanionPassExpirationDate = {
      ...defaultProps,
      companionPassAchieved: true,
      companionPassExpirationDate: '2021-12-31'
    };
    return <RapidRewardsSnapshotPage {...propsWithCompanionPassExpirationDate} />;
  });
