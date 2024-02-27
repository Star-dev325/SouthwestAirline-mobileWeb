// @flow
import i18n from '@swa-ui/locale';
import _ from 'lodash';
import React from 'react';
import { REACCOM_VIEW_RESERVATION_MESSAGE } from 'src/airChange/constants/airChangeConstants';
import withFeatureToggles from 'src/shared/enhancers/withFeatureToggles';
import AlertBanner from 'src/viewReservation/components/alertBanner';
import ReaccomBanner from 'src/viewReservation/components/reaccomBanner';
import type { MessageType } from 'src/shared/flow-typed/shared.types';

const {
  REACCOM_CONTACT_US_TO_CHANGE_FLIGHT_FREE,
  REACCOM_VIEW_RESERVATION,
  REACCOM_VIEW_RESERVATION_FLIX,
  REACCOM_VIEW_RESERVATION_GDS
} = REACCOM_VIEW_RESERVATION_MESSAGE;

type Props = {
  isDynamicWaiver: boolean,
  messages: Array<MessageType>,
  hasAnyCancelledFlights: boolean,
  onClick: () => void,
  isChangeLinkEmpty?: boolean,
  isCancelLinkEmpty?: boolean,
  important: boolean,
  toggles?: *
};

export const BoardingInfoBanner = ({
  isDynamicWaiver,
  hasAnyCancelledFlights,
  isCancelLinkEmpty,
  isChangeLinkEmpty,
  onClick,
  important,
  messages
}: Props) => {
  const reaccomMessage =
    messages &&
    messages.find((message) => {
      const { key } = message;

      return [
        REACCOM_CONTACT_US_TO_CHANGE_FLIGHT_FREE,
        REACCOM_VIEW_RESERVATION,
        REACCOM_VIEW_RESERVATION_FLIX,
        REACCOM_VIEW_RESERVATION_GDS
      ].includes(key);
    });
  const reaccomBannerProps = {
    body: _.get(reaccomMessage, 'body'),
    header: _.get(reaccomMessage, 'header'),
    showBodyAsHtml: reaccomMessage && reaccomMessage.key === REACCOM_CONTACT_US_TO_CHANGE_FLIGHT_FREE
  };
  const alertBannerProps = {
    message: hasAnyCancelledFlights
      ? i18n('VIEW_RESERVATION__RESERVATION_DETAILS__FLIGHT_CANCELLED')
      : i18n('VIEW_RESERVATION__RESERVATION_DETAILS__YOU_CAN_CHANGE_YOUR_FLIGHT'),
    onClick,
    hideRightArrow: hasAnyCancelledFlights,
    important
  };
  const noChangeOrCancelLinks = isChangeLinkEmpty || isCancelLinkEmpty;
  const dynamicOrCancelled = isDynamicWaiver || hasAnyCancelledFlights;

  if (reaccomMessage) {
    if (noChangeOrCancelLinks && isDynamicWaiver) {
      return (
        <div>
          <ReaccomBanner {...reaccomBannerProps} />
          <AlertBanner
            important={false}
            message={i18n('VIEW_RESERVATION__RESERVATION_DETAILS__GENERIC_TRAVEL_ADVISORY')}
            hideRightArrow
            hideAlertIcon
          />
        </div>
      );
    } else {
      return <ReaccomBanner {...reaccomBannerProps} />;
    }
  } else if (noChangeOrCancelLinks && isDynamicWaiver) {
    return (
      <AlertBanner
        important={false}
        message={i18n('VIEW_RESERVATION__RESERVATION_DETAILS__GENERIC_TRAVEL_ADVISORY')}
        hideRightArrow
        hideAlertIcon
      />
    );
  } else if (dynamicOrCancelled && !isChangeLinkEmpty) {
    return <AlertBanner {...alertBannerProps} />;
  } else {
    return null;
  }
};

BoardingInfoBanner.defaultProps = {
  isCancelLinkEmpty: false
};

export default withFeatureToggles(BoardingInfoBanner);
