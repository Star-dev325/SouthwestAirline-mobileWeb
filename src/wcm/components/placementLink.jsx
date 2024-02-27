// @flow
import _ from 'lodash';
import React from 'react';
import WcmLinkTypes from 'src/shared/constants/wcmLinkTypes';
import type { LinkType } from 'src/shared/flow-typed/wcmLink.types';

type Props = {
  onClick?: () => void,
  handlePlacementLinkFn: (*) => void,
  children: *,
  isChaseCombo: boolean,
  isChasePlacement: boolean,
  referrer?: string,
  target?: string,
  href?: string,
  linkType?: LinkType,
  placementData?: {
    linkType?: LinkType
  },
  contentBlockId: string,
  shouldRaiseSatelliteEvent?: boolean,
  actionToDispatch?: (*) => *,
  actionParams?: Array<*>,
  className?: string,
  pageId?: string
};

const PlacementLink = ({
  onClick = _.noop,
  handlePlacementLinkFn,
  children,
  isChaseCombo,
  isChasePlacement,
  referrer,
  target,
  href,
  linkType,
  placementData = {},
  contentBlockId,
  shouldRaiseSatelliteEvent = false,
  actionToDispatch,
  actionParams,
  className,
  pageId
}: Props) => {
  const _getTarget = () => target || href || '';
  const _getLinkType = () => linkType || placementData.linkType || WcmLinkTypes.NONE;
  const _onClick = (event) => {
    event.preventDefault();

    onClick();
    handlePlacementLinkFn({
      target: _getTarget(),
      linkType: _getLinkType(),
      isChaseCombo,
      isChasePlacement,
      referrer,
      contentBlockId,
      shouldRaiseSatelliteEvent,
      actionToDispatch,
      actionParams,
      pageId
    });
  };

  return (
    <div data-qa="placement-link" onClick={_onClick} className={className}>
      {children}
    </div>
  );
};

export default PlacementLink;
