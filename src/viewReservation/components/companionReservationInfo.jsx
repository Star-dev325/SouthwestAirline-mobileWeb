// @flow

import React from 'react';
import _ from 'lodash';
import Icon from 'src/shared/components/icon';
import Button from 'src/shared/components/button';
import ConfirmationNumber from 'src/shared/components/confirmationNumber';
import i18n from '@swa-ui/locale';

export type CompanionProps = {
  name: string,
  hasEarlyBird?: boolean,
  confirmationNumber: string,
  firstName: string,
  lastName: string
};

type Props = {
  companion: CompanionProps,
  isUserLoggedIn: boolean,
  onDetailsButtonClick: ({ recordLocator: string, firstName: string, lastName: string }) => void
};

const CompanionReservationInfo = (props: Props) => {
  const { companion, isUserLoggedIn, onDetailsButtonClick } = props;

  const shouldShowCompanion = !_.isEmpty(companion) && isUserLoggedIn;

  const _onDetailsButtonClick = () => {
    onDetailsButtonClick({
      recordLocator: companion.confirmationNumber,
      firstName: companion.firstName,
      lastName: companion.lastName
    });
  };

  return (
    shouldShowCompanion && (
      <div className="trip-details-companion-info" data-qa={`companion-reservation-${companion.confirmationNumber}`}>
        <div className="flex flex-main-between">
          <div>
            <div className="gray5 medium">{i18n('VIEW_RESERVATION__COMPANION_LABEL')}</div>
            <div>
              <div className="ellipsis nowrap overflow-hidden">
                <span data-qa="userName" className="xlarge block nowrap overflow-hidden ellipsis">
                  {companion.name}
                </span>
                {companion.hasEarlyBird && (
                  <span className="align-middle yellow mx2">
                    <Icon type="early-bird" />
                  </span>
                )}
              </div>
            </div>
          </div>
          <ConfirmationNumber confirmationNumber={companion.confirmationNumber} />
        </div>
        <div className="red">{i18n('VIEW_RESERVATION__BOARDING_INFO__COMPANION_RESERVATION_MESSAGE')}</div>
        <Button onClick={_onDetailsButtonClick} className="detailed-trip-card--detail-button mt4">
          Details
        </Button>
      </div>
    )
  );
};

CompanionReservationInfo.defaultProps = {
  hasEarlyBird: false
};

export default CompanionReservationInfo;
