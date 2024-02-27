// @flow
import i18n from '@swa-ui/locale';
import React from 'react';
import MyAccountNavItem from 'src/myAccount/components/myAccountNavItem';
import MyAccountPanel from 'src/myAccount/components/myAccountPanel';
import { UNUSED_FUNDS_CONSTANT } from 'src/myAccount/constants/myAccountConstants';
import Segment from 'src/shared/components/segment';
import Segments from 'src/shared/components/segments';
import List from 'src/shared/components/list';
import ListItem from 'src/shared/components/listItem';
import BrowserObject from 'src/shared/helpers/browserObject';

import type { UnusedFundsContentType } from 'src/myAccount/flow-typed/myAccount.types';

const { window } = BrowserObject;

type Props = {
  onViewFundsBtnClick: () => void,
  UNUSED_FUNDS: boolean,
  unusedFundsContent: UnusedFundsContentType
};

const UnusedFundsPanel = (props: Props) => {
  const { unusedFundsContent } = props;

  const _onClickViewFunds = (target: string) => {
    const { onViewFundsBtnClick, UNUSED_FUNDS } = props;

    UNUSED_FUNDS ? onViewFundsBtnClick() : window.open(target);
  };

  const mainBody = unusedFundsContent.find((content) => content.props.id === 'main-body');
  const learnMoreLink = unusedFundsContent.find((content) => content.props.id === 'learn-more-btn');
  const viewFundsLink = unusedFundsContent.find((content) => content.props.id === 'view-funds-btn');

  const mainBodyContent = mainBody?.textContent || i18n('MY_ACCOUNT__UNUSED_FUNDS_CONSTANT__MAIN_BODY_TEXT');
  const learnMoreTarget = learnMoreLink?.props?.target || UNUSED_FUNDS_CONSTANT.LEARN_MORE_TARGET;
  const learnMoreText = learnMoreLink?.textContent || i18n('MY_ACCOUNT__UNUSED_FUNDS_CONSTANT__LEARN_MORE');
  const viewFundsTarget = viewFundsLink?.props?.target || UNUSED_FUNDS_CONSTANT.VIEW_FUNDS_TARGET;
  const viewFundsText = viewFundsLink?.textContent || i18n('MY_ACCOUNT__UNUSED_FUNDS_CONSTANT__VIEW_FUNDS');

  return (
    <MyAccountPanel heading={i18n('MY_ACCOUNT__FLIGHT_CREDITS')}>
      <Segments>
        <Segment className="py4 px5">
          <div className="pdkblue larger">{mainBodyContent}</div>
        </Segment>
        <Segment verticalFill className="segment-border-top py0">
          <List className="unused-funds-panel--links" divided horizontal>
            <ListItem>
              <MyAccountNavItem
                className="unused-funds-panel--view-funds-button py5"
                onClick={() => _onClickViewFunds(viewFundsTarget)}
              >
                {viewFundsText}
              </MyAccountNavItem>
            </ListItem>
            <ListItem>
              <MyAccountNavItem
                className="unused-funds-panel--learn-more-button py5"
                onClick={() => window.open(learnMoreTarget)}
              >
                {learnMoreText}
              </MyAccountNavItem>
            </ListItem>
          </List>
        </Segment>
      </Segments>
    </MyAccountPanel>
  );
};

export default UnusedFundsPanel;
