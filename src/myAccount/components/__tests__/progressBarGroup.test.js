jest.mock('@swa-ui/locale');
jest.mock('src/shared/components/fullScreenModal/fullScreenModal', () => (props) => <div>{props.children}</div>);

import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { Provider } from 'react-redux';
import { fireEvent, render } from '@testing-library/react';
import i18n from '@swa-ui/locale';
import createMockStore from 'test/unit/helpers/configureMockStore';
import ProgressBarGroup from 'src/myAccount/components/progressBarGroup';
import * as FullScreenModalHelper from 'src/shared/components/fullScreenModal/helpers/fullScreenModalHelper';

const mockStore = createMockStore();

describe('ProgressBarGroup', () => {
  let hideFullScreenModalFnMock, onClickMock, showFullScreenModalFnMock;

  beforeEach(() => {
    const noop = () => {};

    onClickMock = jest.fn(noop);
    hideFullScreenModalFnMock = jest.fn(noop);
    showFullScreenModalFnMock = jest.fn(noop);

    jest.clearAllMocks();
  });

  it('should render correct component', () => {
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });

  describe('shouldCallToAddOrChangeCompanion', () => {
    it('should show the button when shouldCallToAddOrChangeCompanion is true', () => {
      const progressBarGroupComponent = createComponent({ shouldCallToAddOrChangeCompanion: true });

      expect(progressBarGroupComponent.container.querySelector('Button')).not.toBeNull();
    });

    it('should not show the button when shouldCallToAddOrChangeCompanion is false', () => {
      const progressBarGroupComponent = createComponent({ shouldCallToAddOrChangeCompanion: false });

      expect(progressBarGroupComponent.container.querySelector('Button')).toBeNull();
    });
  });

  describe('shouldShowCongratulations', () => {
    it('should show congratulations when showCongratulations is true', () => {
      const progressBarGroupComponent = createComponent({ showCongratulations: true });

      expect(progressBarGroupComponent.container.querySelector('.tier-status-group--label')).not.toBeNull();
    });

    it('should not show congratulations when showCongratulations is false', () => {
      const progressBarGroupComponent = createComponent({ showCongratulations: false });

      expect(progressBarGroupComponent.container.querySelector('.tier-status-group--label')).toBeNull();
    });
  });

  describe('companionPassSection', () => {
    it('should show companion pass section when isCompanion is true', () => {
      const progressBarGroupComponent = createComponent({ isCompanion: true });

      expect(progressBarGroupComponent.container.querySelector('.call-to-companion')).not.toBeNull();
    });

    it('should not show companion pass section when isCompanion is false', () => {
      const progressBarGroupComponent = createComponent({ isCompanion: false });

      expect(progressBarGroupComponent.container.querySelector('.call-to-companion')).toBeNull();
    });

    describe('chase 10k boost message', () => {
      it('should show chaseMembersBoost text', () => {
        const progressBarGroupComponent = createComponent({ isCompanion: true, userAlreadyHasChaseRRVisa: true });

        expect(progressBarGroupComponent.container.querySelector('.call-to-companion--description')).not.toBeNull();
      });

      it('should show chaseMembers boost text when i18n key has value ', () => {
        const i18nOverrideText = {
          MY_ACCOUNT__RAPID_REWARDS_PAGE__COMPANION_PASS_POINTS_CHASE_MEMBERS_TEXT: 'Sample Chase 10k boost text'
        };

        i18n.mockImplementation((i18nKey) => i18nOverrideText[i18nKey]);

        const progressBarGroupComponent = createComponent({ isCompanion: true, userAlreadyHasChaseRRVisa: true });
        const wrapper = progressBarGroupComponent.container.querySelector('.companion-pass-info-container');

        expect(wrapper).not.toBeNull();
        expect(wrapper).toHaveTextContent('Sample Chase 10k boost text');
      });

      it('should not show chaseMembers boost text when value is empty ', () => {
        const i18nOverrideText = {
          MY_ACCOUNT__RAPID_REWARDS_PAGE__COMPANION_PASS_POINTS_CHASE_MEMBERS_TEXT: ''
        };

        i18n.mockImplementation((i18nKey) => i18nOverrideText[i18nKey]);

        const progressBarGroupComponent = createComponent({ isCompanion: true, userAlreadyHasChaseRRVisa: true });
        const wrapper = progressBarGroupComponent.container.querySelector('.companion-pass-info-container');

        expect(wrapper).toBeNull();
      });

      it('should not show chaseMembersBoost text', () => {
        const progressBarGroupComponent = createComponent({ isCompanion: false, userAlreadyHasChaseRRVisa: false });

        expect(progressBarGroupComponent.container.querySelector('.call-to-companion--description')).toBeNull();
      });
    });

    describe('All Member Text', () => {
      it('should show i18n text when key has value ', () => {
        const i18nOverrideText = {
          MY_ACCOUNT__RAPID_REWARDS_PAGE__COMPANION_PASS_POINTS_ALL_MEMBERS_TEXT: 'Sample all members text'
        };

        i18n.mockImplementation((i18nKey) => i18nOverrideText[i18nKey]);

        const progressBarGroupComponent = createComponent({ isCompanion: true });
        const wrapper = progressBarGroupComponent.container.querySelector('.earn-boost');

        expect(wrapper).not.toBeNull();
        expect(wrapper).toHaveTextContent('Sample all members text');
      });

      it('should not show i18n text when the value is empty string', () => {
        const i18nOverrideText = {
          MY_ACCOUNT__RAPID_REWARDS_PAGE__COMPANION_PASS_POINTS_ALL_MEMBERS_TEXT: ''
        };

        i18n.mockImplementation((i18nKey) => i18nOverrideText[i18nKey]);

        const progressBarGroupComponent = createComponent({ isCompanion: true });
        const wrapper = progressBarGroupComponent.container.querySelector('.earn-boost');

        expect(wrapper).toBeNull();
      });

      it('should show modal when clicked on read more link', () => {
        const i18nOverrideText = {
          MY_ACCOUNT__RAPID_REWARDS_PAGE__COMPANION_PASS_POINTS_ALL_MEMBERS_TEXT: 'Sample all members text'
        };

        i18n.mockImplementation((i18nKey) => i18nOverrideText[i18nKey]);

        const progressBarGroupComponent = createComponent({ isCompanion: true });

        jest.spyOn(FullScreenModalHelper, 'showFullScreenModal').mockImplementation(showFullScreenModalFnMock);

        const wrapperBtn = progressBarGroupComponent.container.querySelector('.read-more-link');

        fireEvent.click(wrapperBtn);

        expect(showFullScreenModalFnMock).toHaveBeenCalled();
      });

      it('should close modal when clicked on done button', () => {
        const i18nOverrideText = {
          MY_ACCOUNT__RAPID_REWARDS_PAGE__COMPANION_PASS_POINTS_ALL_MEMBERS_TEXT: 'Sample all members text'
        };

        i18n.mockImplementation((i18nKey) => i18nOverrideText[i18nKey]);

        const progressBarGroupComponent = createComponent({ isCompanion: true });

        jest.spyOn(FullScreenModalHelper, 'showFullScreenModal').mockImplementation(hideFullScreenModalFnMock);

        const wrapperBtn = progressBarGroupComponent.container.querySelector('.read-more-link');

        fireEvent.click(wrapperBtn);

        const moreDetailsDoneBtn = progressBarGroupComponent.container.querySelector('.cancel');

        fireEvent.click(moreDetailsDoneBtn);

        expect(hideFullScreenModalFnMock).toHaveBeenCalled();
      });
    });
  });

  const createComponent = (props = {}) => {
    const state = {
      app: {
        webView: {
          isWebView: false
        }
      },
      router: {
        location: {
          search: '?_modal=COMPANION_PASS_POINTS_READ_MORE_MODAL'
        }
      }
    };
    const defaultProps = {
      onClick: onClickMock,
      isCompanion: true,
      themeColor: 'teal',
      shouldCallToAddOrChangeCompanion: false,
      showCongratulations: false,
      title: {
        preString: '',
        status: '',
        sufString: ''
      },
      pointsDonutProgressBar: {
        percentageComplete: 0,
        pointsRequired: '',
        pointsEarned: ''
      },
      flightsDonutProgressBar: {
        percentageComplete: 0,
        flightsRequired: '0',
        flightsFlown: '0'
      },
      userAlreadyHasChaseRRVisa: false
    };
    const finalProps = {
      ...defaultProps,
      ...props
    };

    return render(
      <Provider store={mockStore(state)}>
        <ProgressBarGroup {...finalProps} />
      </Provider>
    );
  };
});
