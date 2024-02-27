import { fireEvent } from '@testing-library/react';
import { RapidRewardsSnapshotPage } from 'src/myAccount/pages/rapidRewardsSnapshotPage';
import { createComponent } from 'test/unit/helpers/testingLibraryUtils';

describe('RapidRewardsSnapshotPage', () => {
  let clearRapidRewardsInfoFnMock;
  let getMyAccountRapidRewardsPagePlacementsFnMock;
  let getRapidRewardsInfoFnMock;
  let pushMock;

  beforeEach(() => {
    clearRapidRewardsInfoFnMock = jest.fn();
    getMyAccountRapidRewardsPagePlacementsFnMock = jest.fn();
    getRapidRewardsInfoFnMock = jest.fn();
    pushMock = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('mount', () => {
    it('should retrieve rapid rewards info on mount if they are logged in', () => {
      createPageComponent();

      expect(getRapidRewardsInfoFnMock).toHaveBeenCalled();
    });

    it('should retrieve rapid rewards placements on mount', () => {
      createPageComponent();

      expect(getMyAccountRapidRewardsPagePlacementsFnMock).toHaveBeenCalled();
    });

    it('should redirect user to login page on mount if they are not logged in', () => {
      createPageComponent({ isLoggedIn: false });

      expect(pushMock).toHaveBeenCalledWith('/login', null, { to: '/my-account/my-rapid-rewards' });
    });

    it('should render rapid rewards info', () => {
      const { container } = createPageComponent();

      expect(container).toMatchSnapshot();
    });
  });

  describe('unmount', () => {
    it('should clear rapid rewards info on unmount', () => {
      const { unmount } = createPageComponent();

      unmount();

      expect(clearRapidRewardsInfoFnMock).toHaveBeenCalled();
    });
  });

  describe('click', () => {
    it('view benefits link should push user to tier benefits page', () => {
      const { container } = createPageComponent();

      fireEvent.click(container.querySelector('span[data-qa="view-benefits"]'));

      expect(pushMock).toHaveBeenCalledWith('/my-account/tier-benefits-page');
    });
  });

  const createPageComponent = (props = {}) => {
    const defaultProps = {
      clearRapidRewardsInfoFn: clearRapidRewardsInfoFnMock,
      companionPassAchieved: true,
      companionPassExpirationDate: '2021-12-31',
      getMyAccountRapidRewardsPagePlacementsFn: getMyAccountRapidRewardsPagePlacementsFnMock,
      getRapidRewardsInfoFn: getRapidRewardsInfoFnMock,
      isLoggedIn: true,
      push: pushMock,
      rapidRewardsInfo: {
        companionPass: {
          flightsDonutProgressBar: {
            flightsFlown: '100',
            flightsRequired: '100',
            percentageComplete: 100
          },
          pointsDonutProgressBar: {
            percentageComplete: 20,
            pointsEarned: '2,000',
            pointsRequired: '10,000'
          },
          shouldCallToAddOrChangeCompanion: false,
          showCongratulations: true,
          title: {
            preString: 'prestring',
            status: 'status',
            sufString: 'sufstring'
          }
        },
        fullName: 'Hank Hill',
        ptsGroup: {
          label: 'POINTS GROUP LABEL',
          showViewBenefitsLink: true,
          spendablePoints: '2,000'
        },
        rapidRewardsNumber: '1234567890',
        tier: {
          flightsDonutProgressBar: {
            flightsFlown: '50',
            flightsRequired: '50',
            percentageComplete: 50
          },
          pointsDonutProgressBar: {
            percentageComplete: 50,
            pointsEarned: '50',
            pointsRequired: '50'
          },
          showCongratulations: false,
          title: {
            preString: 'prestring',
            status: 'status',
            sufString: 'sufstring'
          }
        }
      },
      tierEndDate: '2021-12-31',
      userAlreadyHasChaseRRVisa: false
    };

    const mergedProps = { ...defaultProps, ...props };
    const state = {};

    return createComponent(RapidRewardsSnapshotPage, { state, props: mergedProps });
  };
});
