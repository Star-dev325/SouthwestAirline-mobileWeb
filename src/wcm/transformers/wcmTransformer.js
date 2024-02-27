// @flow
import _ from 'lodash';

import WcmLinkTypes from 'src/shared/constants/wcmLinkTypes';
import { CHASE_BANNER_CONTENT_FIELDS, CHASE_BANNER_CONTENT_STYLES } from 'src/chase/constants/chaseConstants';
import { BLOCK_PLACEMENT, LEGACY_CHASE_AD } from 'src/wcm/constants/wcmConstants';

import type { WcmContentResponse, PlacementDataResponse, DynamicPlacementResponse } from 'src/wcm/flow-typed/wcm.types';

const {
  STATEMENT_CREDIT,
  PARTNER_IMAGE,
  TARGET,
  LINK_TYPE,
  BUTTON_TEXT,
  TOP_MESSAGE_TEXT_VALUE,
  PRIMARY_TEXT_VALUE,
  SECONDARY_TEXT_VALUE,
  MATH_LINE_1_TEXT_VALUE_LEFT,
  MATH_LINE_2_TEXT_VALUE_LEFT,
  MATH_LINE_3_TEXT_VALUE_LEFT,
  PLACEMENT_DATA
} = CHASE_BANNER_CONTENT_FIELDS;

const transformPlacementData = (placementData: PlacementDataResponse = {}) => ({
  viewPortThreshold: parseViewPort(placementData.viewPort),
  shouldObserveViewPort: placementData.isChasePrequal || false,
  contentBlockId: placementData.contentBlockId || '',
  isChasePrequal: placementData.isChasePrequal || false,
  isChaseCombo: placementData.isChaseCombo || false,
  isChasePlacement: placementData.isChasePlacement || false
});

export const parseViewPort = (viewPort?: string) => parseFloat(viewPort) / 100 || 0.5;

export const toDynamicPlacement = (response: WcmContentResponse, key: string): DynamicPlacementResponse => {
  const dynamicContent = _.get(response, `results.${key}.content`);

  const { displayType = '', placement = {}, placementData = {} } = dynamicContent || {};

  switch (displayType) {
    case BLOCK_PLACEMENT: {
      return {
        displayType: BLOCK_PLACEMENT,
        promoImageBackground: placement.backgroundImage,
        imageForegroundAltText: placement.backgroundImageAltText || '',
        blocks: placement.blocks || [],
        target: placement.target,
        linkType: placement.linkType || WcmLinkTypes.NONE,
        ...transformPlacementData(placementData)
      };
    }
    case LEGACY_CHASE_AD: {
      return {
        displayType: LEGACY_CHASE_AD,
        statementCredit: Number.parseInt(_.get(dynamicContent, STATEMENT_CREDIT)) || 0,
        partnerImage: _.get(dynamicContent, PARTNER_IMAGE, ''),
        target: _.get(dynamicContent, TARGET),
        linkType: _.get(dynamicContent, LINK_TYPE),
        buttonText: _.get(dynamicContent, BUTTON_TEXT),
        topMessageTextValue: _.get(dynamicContent, TOP_MESSAGE_TEXT_VALUE),
        primaryTextValue: _.get(dynamicContent, PRIMARY_TEXT_VALUE),
        secondaryTextValue: _.get(dynamicContent, SECONDARY_TEXT_VALUE),
        mathLine1TextValueLeft: _.get(dynamicContent, MATH_LINE_1_TEXT_VALUE_LEFT),
        mathLine2TextValueLeft: _.get(dynamicContent, MATH_LINE_2_TEXT_VALUE_LEFT),
        mathLine3TextValueLeft: _.get(dynamicContent, MATH_LINE_3_TEXT_VALUE_LEFT),
        styles: _.pick(dynamicContent, _.values(CHASE_BANNER_CONTENT_STYLES)),
        ...transformPlacementData(_.get(dynamicContent, PLACEMENT_DATA))
      };
    }
    default: {
      return (
        dynamicContent && {
          ...dynamicContent,
          displayType,
          ...transformPlacementData(placementData)
        }
      );
    }
  }
};

export const toContentBlockIdsFromMenuList = (menuList: Array<*>) =>
  _.chain(menuList)
    .filter({ isPromo: true })
    .map((value) => value && value.contentBlockId)
    .compact()
    .join(':')
    .value();

export const toContentBlockIds = (response: WcmContentResponse) =>
  _.chain(response)
    .get('results', {})
    .map((value) => value && value.contentBlockId)
    .compact()
    .join(':')
    .value();
