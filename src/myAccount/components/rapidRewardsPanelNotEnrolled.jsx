// @flow
import React from 'react';
import MyAccountPanel from 'src/myAccount/components/myAccountPanel';
import Button from 'src/shared/components/button';
import Icon from 'src/shared/components/icon';
import Segment from 'src/shared/components/segment';
import i18n from '@swa-ui/locale';

type Props = {
  onEnrollClick: () => void,
  onGetDetailsClick: () => void
};

const RapidRewardsPanelNotEnrolled = (props: Props) => (
  <MyAccountPanel heading="Rapid Rewards" notEnrolled>
    <Segment className="rapid-rewards-panel-not-enrolled" inverted>
      <p className={'rapid-rewards-panel-not-enrolled--call-to-action'}>
        {i18n('MY_ACCOUNT__RAPID_REWARDS_PANEL_NOT_ENROLLED__TITLE')}
      </p>
      <p className={'rapid-rewards-panel-not-enrolled--message'}>
        {i18n('MY_ACCOUNT__RAPID_REWARDS_PANEL_NOT_ENROLLED__MESSAGE')}
      </p>
      <div className={'rapid-rewards-panel-not-enrolled--get-details-link'} onClick={props.onGetDetailsClick}>
        {i18n('MY_ACCOUNT__RAPID_REWARDS_PANEL_NOT_ENROLLED__DETAILS_LINK')}
        <Icon type="keyboard-arrow-right" />
      </div>

      <Button color="grey" fluid onClick={props.onEnrollClick}>
        {i18n('MY_ACCOUNT__RAPID_REWARDS_PANEL_NOT_ENROLLED__ENROLL')}
      </Button>
    </Segment>
  </MyAccountPanel>
);

export default RapidRewardsPanelNotEnrolled;
