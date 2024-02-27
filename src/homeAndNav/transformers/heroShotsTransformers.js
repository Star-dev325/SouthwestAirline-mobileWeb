// @flow
import { filterAndSortContent } from 'src/shared/helpers/homeContentHelper';
import type { HomeContents } from 'src/homeAndNav/flow-typed/homeAndNav.types';
import type { WcmContentResponse } from 'src/wcm/flow-typed/wcm.types';

export function transformHomeHeroesToHeroContents(homeHeroResponse: WcmContentResponse): HomeContents {
  return {
    heroes: filterAndSortContent(homeHeroResponse, 'homeHero'),
    banners: filterAndSortContent(homeHeroResponse, 'homeBanner'),
    loginBanner: homeHeroResponse.results.loginBanner
  };
}
