// @flow
import type { DynamicPlacementResponse } from 'src/wcm/flow-typed/wcm.types';

export type HomeContents = {
  heroes: Array<DynamicPlacementResponse>,
  banners: Array<DynamicPlacementResponse>,
}

export type UserInfo = {
  accountInfo?: {
    customerInfo: {
      name: {
        userName: string
      }
    },
    rapidRewardsDetails: {
      redeemablePoints: number,
      tierInfo: {
        tier: string
      },
      isEnrolledInRapidRewards: boolean
    },
    isTierStatusPending: boolean
  }
}

export type MenuListItemType = {
  childList?: Array<Site>,
  className?: string,
  dataQa?: string,
  hideForGuest?: boolean,
  hideForUsers?: boolean,
  iconType?: string,
  link?: string,
  linkType?: string,
  menuTitle?: string,
  routeName?: string,
  title?: string,
  titleClassName?: string,
  isWcmLink?: boolean,
  params?: Array<mixed>,
  query?: {to: string}
}

export type Site = {
  routeName: string,
  title: string,
  dataQa: string,
  query: {
    clk?: string,
    int?: string
  },
  icon: string,
  href: string,
  link: string,
  titleClassName?: string,
  hideForUsers?: boolean,
  hideForGuest?: boolean,
  className?: string
}
export type HomePagePromotion = {
  id: string,
  title: string,
  description: string,
  'promotion-image'?: string,
  alt: string,
  link_type: string,
  target: string
}

export type TravelAdvisory = {
  advisoryInfo: string,
  advisoryTitle: string,
  id: string
}
export type ChildItem = {
  icon: string,
  link: string,
  title: string,
  dataQa: string,
  toggle?: string
}
export type Trip = {
  dates: {
    first: string,
    second: string | null
  },
  destinationDescription: string,
  confirmationNumber: string,
  tripType: string,
  pages: string | null,
  isWithin24Hours: boolean,
  isWithin48Hours: boolean,
  _links: *,
  _v1_infoNeededToAddEarlyBirdLink: * | null
}

export type NavClickItem = {
  routeName: string,
  params: ?Array<mixed>,
  query: ?{to: string}
};