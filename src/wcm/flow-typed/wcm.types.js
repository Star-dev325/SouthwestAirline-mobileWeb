// @flow
import type { ExclusivePromotionSection } from 'src/myAccount/flow-typed/myAccount.types';
import type { CurrencyType } from 'src/shared/flow-typed/shared.types';
import type { LinkType } from 'src/shared/flow-typed/wcmLink.types';

export type CallToActionType = {
  ctaText: string,
  ctaType: string,
  linkType: string,
  onClick?: ({ link_type: string, target: string }) => void,
  target: string
}

export type SectionBodyPropsType = SectionBodyType & {
  onCallToActionClick: ({ link_type: string, target: string }) => void
}

export type onLinkClickType = ({ link_type: string, target: string }) => void

export type SectionType = SectionBodyType & SectionMenuType;

export type SectionBodyType = {
  altText: string,
  callToAction?: CallToActionType,
  heading?: string,
  image: string,
  imagePlacement?: 'below' | 'inline' | '',
  sectionText?: string,
  sectionTitle?: string,
  type: string
}

export type SectionMenuType = {
  altText: string,
  image: string,
  linkType?: string,
  target?: string,
  type: string
}

export type BookingTeaserType = {
  alt_text: string,
  image: string,
  product_attributes: Array<string>,
  product_description: string,
  product_heading: string,
  product_tagline: string,
  style: string
}

export type LoyaltyPromotionsType = Array<{
  id: string,
  entry_code: string,
  promotion_name: string,
  promotion_subtitle: string,
  sections: Array<ExclusivePromotionSection>
}>

export type BLOCK_PLACEMENT_DISPLAY_TYPE = 'block-placement';
export type FLEX_PLACEMENT_DISPLAY_TYPE = 'flex-placement';
export type LEGACY_CHASE_AD_DISPLAY_TYPE = 'legacy-chase-ad';
export type MOBILE_HERO_DISPLAY_TYPE = 'mobile_hero';

export type PlacementDataResponse = {
  contentBlockId?: string,
  isChaseCombo?: boolean,
  isChasePlacement?: boolean,
  isChasePrequal?: boolean,
  viewPort?: string
};

type PlacementData = {
  content?: *,
  contentBlockId: string,
  hidePlacement?: boolean,
  isChasePrequal: boolean,
  isChaseCombo: boolean,
  isChasePlacement: boolean,
  baseTemplateData?: TemplateDataType,
  additionalTemplateData?: TemplateDataType,
  placement?: *,
  placementData?: {
    [key: string]: *
  },
  placementName?: string,
  placementKey?: string,
  shouldCheckBootstrapData?: boolean,
  shouldObserveViewPort: boolean,
  viewPortThreshold: number
};

export type TemplateDataType = {
  [key: string]: string | number
};

export type ImagePlacementResponse = PlacementData & {
  displayType: BLOCK_PLACEMENT_DISPLAY_TYPE | MOBILE_HERO_DISPLAY_TYPE,
  imageForegroundAltText: string,
  linkType: LinkType,
  promoImageBackground: string,
  promoImageForeground?: string,
  target: string
};

export type FlexPlacementResponse = PlacementData & {
  displayType: FLEX_PLACEMENT_DISPLAY_TYPE,
  placement: *
};

export type ChaseInstantCreditResponse = PlacementData & {
  buttonText: string,
  displayType: LEGACY_CHASE_AD_DISPLAY_TYPE,
  linkType: LinkType,
  mathLine1TextValueLeft: string,
  mathLine2TextValueLeft: string,
  mathLine3TextValueLeft: string,
  partnerImage: string,
  primaryTextValue: string,
  secondaryTextValue: string,
  statementCredit: number,
  styles: *,
  target: string,
  topMessageTextValue?: string
};

export type ImagePlacementProps = ImagePlacementResponse & {
  className?: string,
  handlePlacementLinkFn: () => void,
  isWebView?: boolean,
  onClick?: () => void,
  pageId?: string,
  referrer?: string,
  shouldRaiseSatelliteEvent?: boolean,
};

export type FlexPlacementProps = FlexPlacementResponse & {
  className?: string,
  handlePlacementLinkFn: () => void,
  shouldRaiseSatelliteEvent?: boolean
};

export type ChaseInstantCreditProps = ChaseInstantCreditResponse & {
  className?: string,
  handlePlacementLinkFn: () => void,
  isLoggedIn: boolean,
  isWebView?: boolean,
  onClick?: () => void,
  pageId?: string,
  referrer?: string,
  shouldRaiseSatelliteEvent?: boolean,
  totalFare: CurrencyType
};

export type DynamicPlacementResponse = ImagePlacementResponse | FlexPlacementResponse | ChaseInstantCreditResponse;

export type WcmContentResponse = {
  results: {
    [key: string]: {
      content: DynamicPlacementResponse
    }
  }
};

export type WcmBodyContent = {
  type: string,
  value: string
}

export type DefaultYoungTravelerParentConsentType = {
  body: Array<WcmBodyContent>,
  title: string
}
