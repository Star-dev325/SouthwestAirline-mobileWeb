// @flow
import React from 'react';
import cx from 'classnames';
import _ from 'lodash';
import i18n from '@swa-ui/locale';
import MobileBoardingPassMessage from 'src/checkIn/components/mobileBoardingPassMessage';
import YellowButton from 'src/shared/components/yellowButton';
import Icon from 'src/shared/components/icon';
import Button from 'src/shared/components/button';

import type { CheckinPassengerType } from 'src/checkIn/flow-typed/checkIn.types';
import type { ViewBoardingPass } from 'src/shared/flow-typed/shared.types';

type Props = {
  passenger: CheckinPassengerType,
  onViewBoardingPassButtonClickCb: (passengerIds: ?ViewBoardingPass) => void,
  UPGRADED_BOARDING: boolean,
  onUpgradedBoardingButtonClick?: (link: Link) => void
};

const PassengerCard = ({
  passenger,
  onViewBoardingPassButtonClickCb,
  UPGRADED_BOARDING,
  onUpgradedBoardingButtonClick = _.noop
}: Props) => {
  const shouldShowBoardingInfo: boolean = !!passenger.boardingGroup && !!passenger.boardingPosition;
  const {
    _links,
    boardingGroup,
    boardingPosition,
    greyBoxMessage,
    hasPrecheck,
    isInfant,
    name,
    passengerLabelText,
    specialAssistanceMessage
  } = passenger;
  const viewPassengerBoardingPass = _.get(_links, 'viewPassengerBoardingPass');
  const isMultiPaxAndHasViewPassengerBoardingPass = !_.isEmpty(viewPassengerBoardingPass);
  const healthDocumentLink = _.get(_links, 'healthDocument');
  const viewUpgradedBoardingLink = _.get(_links, 'viewUpgradedBoarding');
  const shouldShowUpgradedBoardingButton = !_.isEmpty(viewUpgradedBoardingLink);
  const upgradedBoardingLabelText = shouldShowUpgradedBoardingButton && _.get(viewUpgradedBoardingLink, 'labelText');

  const _viewBoardingPassDetailsButton = () => {
    let viewBoardingPassPayload;
    let labelText = i18n('SHARED__BUTTON_TEXT__VIEW_BOARDING_PASS');

    if (isMultiPaxAndHasViewPassengerBoardingPass) {
      viewBoardingPassPayload = _.merge(viewPassengerBoardingPass, {
        body: _.get(viewPassengerBoardingPass, 'body')
      });
      labelText = _.get(viewPassengerBoardingPass, 'labelText', i18n('SHARED__BUTTON_TEXT__VIEW_BOARDING_PASS'));
    } else {
      viewBoardingPassPayload = null;
    }

    return (
      <div className="view-boarding-pass-btn">
        <YellowButton title={labelText} onClick={() => onViewBoardingPassButtonClickCb(viewBoardingPassPayload)} />
      </div>
    );
  };

  return (
    <div className="passenger-card">
      <div className="passenger-card--info">
        <div className={cx('lap-child-icon', { hide: !isInfant })} />
        <div className="passenger-card--label">
          <div className="passenger-card--passenger-type-label flex7">{passengerLabelText ?? i18n('CHECK_IN__PASSENGER_LABEL')}</div>
        </div>
        <div className="passenger-card--content">
          <div className="passenger-card--name overflow-hidden nowrap ellipsis flex7">{name}</div>
        </div>
        <div className="flex">
          <div className={cx('tsa-precheck-icon', { hide: !hasPrecheck })} />
        </div>
        {specialAssistanceMessage && (
          <div className="flex passenger-card--special-assistance">
            <Icon type="exclamation-circle" className="pblue xxlarge" />
            <p className="special-assistance-message">{specialAssistanceMessage.body}</p>
          </div>
        )}
      </div>
      {shouldShowBoardingInfo && (
        <div className="passenger-card--boarding-info">
          <div className="boarding-info--item-row">
            <span className="boarding-info--item-label">{_.toUpper(i18n('SHARED__BOARDING_INFORMATION__GROUP'))}</span>
            <span className="boarding-info--item-content"> {boardingGroup} </span>
          </div>
          <div className="boarding-info--item-row">
            <span className="boarding-info--item-label">
              {_.toUpper(i18n('SHARED__BOARDING_INFORMATION__POSITION'))}
            </span>
            <span className="boarding-info--item-content"> {boardingPosition} </span>
          </div>
        </div>
      )}
      <div>
        {UPGRADED_BOARDING && shouldShowUpgradedBoardingButton && (
          <Button
            className="passenger-card--upgraded-boarding-btn"
            color="grey"
            size="large"
            fluid
            onClick={() => onUpgradedBoardingButtonClick(viewUpgradedBoardingLink)}
          >
            {upgradedBoardingLabelText}
          </Button>
        )}
        {greyBoxMessage && <MobileBoardingPassMessage greyBoxMessage={greyBoxMessage} />}
        {isMultiPaxAndHasViewPassengerBoardingPass && _viewBoardingPassDetailsButton()}
        {!_.isEmpty(healthDocumentLink) && (
          <div className="health-document-btn">
            <YellowButton title={healthDocumentLink.labelText} href={healthDocumentLink.href} target="_blank" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PassengerCard;
