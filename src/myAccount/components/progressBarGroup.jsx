// @flow
import React from 'react';
import cx from 'classnames';
import util from 'util';

import Button from 'src/shared/components/button';
import Segment from 'src/shared/components/segment';
import { DonutProgressBar } from 'src/shared/components/donutProgressBarForChapi';
import Icon from 'src/shared/components/icon';
import i18n from '@swa-ui/locale';
import BrowserObject from 'src/shared/helpers/browserObject';
import FullScreenModal from 'src/shared/components/fullScreenModal/fullScreenModal';
import {
  hideFullScreenModal,
  showFullScreenModal
} from 'src/shared/components/fullScreenModal/helpers/fullScreenModalHelper';
import DynamicPlacement from 'src/wcm/components/dynamicPlacement';
import ContentLink from 'src/shared/components/contentLink';
import PageHeaderWithButtons from 'src/shared/components/pageHeaderWithButtons';

import type {
  AccountProgressTitleType,
  PointsProgressType,
  FlightsProgressType
} from 'src/myAccount/flow-typed/myAccount.types';
import type { DynamicPlacementResponse } from 'src/wcm/flow-typed/wcm.types';

const { location } = BrowserObject;

type Props = {
  isCompanion?: boolean,
  themeColor: string,
  shouldCallToAddOrChangeCompanion?: boolean,
  showCongratulations?: boolean,
  title: AccountProgressTitleType,
  pointsDonutProgressBar: PointsProgressType,
  flightsDonutProgressBar: FlightsProgressType,
  userAlreadyHasChaseRRVisa: boolean,
  readMoreFlyoutContent: DynamicPlacementResponse
};

const COMPANION_PASS_POINTS_READ_MORE_MODAL = 'COMPANION_PASS_POINTS_READ_MORE_MODAL';

const ProgressBarGroup = (props: Props) => {
  const _handleCallClick = (evt: Event) => {
    evt && evt.preventDefault();
    location.href = i18n('MY_ACCOUNT__RAPID_REWARDS_PANEL_ENROLLED__TEL');
  };

  const {
    title: { preString, status, sufString },
    pointsDonutProgressBar,
    flightsDonutProgressBar,
    themeColor,
    isCompanion,
    shouldCallToAddOrChangeCompanion,
    showCongratulations,
    userAlreadyHasChaseRRVisa,
    readMoreFlyoutContent
  } = props;

  const companionPassPointsChaseMemberText = i18n(
    'MY_ACCOUNT__RAPID_REWARDS_PAGE__COMPANION_PASS_POINTS_CHASE_MEMBERS_TEXT'
  );
  const companionPassPointsAllMemberText = i18n(
    'MY_ACCOUNT__RAPID_REWARDS_PAGE__COMPANION_PASS_POINTS_ALL_MEMBERS_TEXT'
  );
  const prefix = isCompanion ? '†' : '*';
  const showChaseMemberText = userAlreadyHasChaseRRVisa && companionPassPointsChaseMemberText;

  const renderReadMoreFlyout = () => (
    <ContentLink className="read-more-link" onClick={() => showFullScreenModal(COMPANION_PASS_POINTS_READ_MORE_MODAL)}>
      {i18n('MY_ACCOUNT__RAPID_REWARDS_PAGE__COMPANION_PASS_POINTS_READ_MORE')}
      <FullScreenModal id={COMPANION_PASS_POINTS_READ_MORE_MODAL}>
        <PageHeaderWithButtons
          title={i18n('MY_ACCOUNT__RAPID_REWARDS_PAGE__COMPANION_PASS_POINTS_MORE_DETAILS_TITLE')}
          className="large"
          rightButtons={[
            {
              name: i18n('SHARED__BUTTON_TEXT__DONE'),
              className: 'cancel',
              onClick: () => {
                hideFullScreenModal(COMPANION_PASS_POINTS_READ_MORE_MODAL);
              }
            }
          ]}
        />
        <DynamicPlacement className="read-more-content" {...readMoreFlyoutContent} data-qa="readMoreFlyoutContent" />
      </FullScreenModal>
    </ContentLink>
  );

  return (
    <div className="progress-bar-group">
      <Segment>
        {showCongratulations && (
          <div className="tier-status-group--label">
            <div className="mb3">
              <Icon type="check" className="green" />
              <span className="bold not-italic">{i18n('MY_ACCOUNT__CONGRATULATIONS')}</span>
            </div>
          </div>
        )}
        <div className="progress-bar-group--label">
          <span>{preString}</span>
          <strong> {status}</strong>
          {isCompanion ? <sup>®</sup> : <span>{sufString}</span>}
        </div>
        <div className="progress-bar-group--status">
          <div className="progress-bar-group--status-col progress-bar-group--status-col-graph">
            <div className="progress-bar-group--status-graph">
              <DonutProgressBar percentage={pointsDonutProgressBar.percentageComplete} strokeColor={themeColor} />
              <Icon type="pts" className={cx(themeColor)} />
            </div>
            <div className="progress-bar-group--status-text">
              <label className="label">{pointsDonutProgressBar.pointsEarned}</label>
              <p className="desc">
                {util.format(
                  i18n('MY_ACCOUNT__TIER_STATUS_GROUP__POINTS_STATUS'),
                  pointsDonutProgressBar.pointsRequired
                )}
                {showChaseMemberText && isCompanion ? <sup>^ †</sup> : <sup>{prefix}</sup>}
              </p>
            </div>
          </div>
          <div className="progress-bar-group--status-col">{i18n('MY_ACCOUNT__TIER_STATUS_GROUP__OR')}</div>
          <div className="progress-bar-group--status-col progress-bar-group--status-col-graph">
            <div className="progress-bar-group--status-graph">
              <DonutProgressBar percentage={flightsDonutProgressBar.percentageComplete} strokeColor={themeColor} />
              <Icon type="airplane-depart" className={cx(themeColor)} />
            </div>
            <div className="progress-bar-group--status-text">
              <label className="label">{flightsDonutProgressBar.flightsFlown}</label>
              <p className="desc">
                {util.format(
                  i18n('MY_ACCOUNT__TIER_STATUS_GROUP__FLIGHTS_STATUS'),
                  flightsDonutProgressBar.flightsRequired
                )}
                <sup>{prefix}</sup>
              </p>
            </div>
          </div>
        </div>
        {isCompanion ? (
          <div className="call-to-companion">
            <p className="call-to-companion--description">
              {i18n('MY_ACCOUNT__RAPID_REWARDS_PANEL_ENROLLED__DESIGNATE_ONE_LUCKY_PERSON')}
            </p>
            {showChaseMemberText && (
              <p className="companion-pass-info-container">{companionPassPointsChaseMemberText}</p>
            )}
            {companionPassPointsAllMemberText && (
              <div className="companion-pass-info-container">
                <span className="row earn-boost">
                  {i18n('MY_ACCOUNT__RAPID_REWARDS_PAGE__COMPANION_PASS_POINTS_ALL_MEMBERS_TEXT')}
                </span>
                {renderReadMoreFlyout()}
              </div>
            )}
            <div className="progress-bar-group--expression-info">
              <sup>{prefix}</sup>
              <p>{i18n('MY_ACCOUNT__RAPID_REWARDS_PAGE__COMPANION_PASS_QUALIFYING_POINTS_FOOTNOTE')}</p>
              <br />
              <p className="ml2">{i18n('MY_ACCOUNT__RAPID_REWARDS_PANEL_ENROLLED__TIER_STATUS_RESET')}</p>
            </div>

            {shouldCallToAddOrChangeCompanion && (
              <Button color="grey" size="large" fluid onClick={_handleCallClick} name="callToAddOrChangeCompanion">
                {i18n('MY_ACCOUNT__RAPID_REWARDS_PANEL_ENROLLED__CALL_TO_ADD_CHANGE_COMPANION')}
              </Button>
            )}
          </div>
        ) : (
          <div className="progress-bar-group--expression-info">
            <p>{i18n('MY_ACCOUNT__RAPID_REWARDS_PANEL_ENROLLED__TIER_STATUS_FOOTNOTE')}</p>
            <br />
            <p className="ml2">{i18n('MY_ACCOUNT__RAPID_REWARDS_PANEL_ENROLLED__TIER_STATUS_RESET')}</p>
          </div>
        )}
      </Segment>
    </div>
  );
};

export default ProgressBarGroup;
