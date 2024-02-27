import EarlyBirdInPathBreakdown from 'src/airBooking/components/earlyBirdInPathBreakdown';
import EarlyBirdSwitch from 'src/airBooking/components/earlyBirdSwitch';
import LoginBannerClose from 'src/homeAndNav/components/loginBannerClose';
import CrossSellCarLink from 'src/wcm/components/crossSellCarLink';
import PlacementLink from 'src/wcm/components/placementLink';
import SeePackagesCommand from 'src/wcm/components/seePackagesCommand';

export const supportedElements = {
  a: 'a',
  b: 'b',
  br: 'br',
  caption: 'caption',
  col: 'col',
  colgroup: 'colgroup',
  div: 'div',
  em: 'em',
  h1: 'h1',
  h2: 'h2',
  i: 'i',
  iframe: 'iframe',
  img: 'img',
  li: 'li',
  p: 'p',
  section: 'section',
  span: 'span',
  strong: 'strong',
  sub: 'sub',
  sup: 'sup',
  table: 'table',
  td: 'td',
  tr: 'tr',
  th: 'th',
  tbody: 'tbody',
  tfoot: 'tfoot',
  thead: 'thead',
  u: 'u',
  ul: 'ul'
};

export const notAbsolutelyPositioned = {
  a: true,
  b: true,
  br: true,
  caption: true,
  col: true,
  colgroup: true,
  em: true,
  h1: true,
  h2: true,
  i: true,
  iframe: true,
  li: true,
  p: true,
  'play-button': true,
  section: true,
  span: true,
  strong: true,
  sub: true,
  sup: true,
  tbody: true,
  td: true,
  tfoot: true,
  th: true,
  tr: true,
  thead: true,
  u: true
};

export const configuredCommands = {
  CLOSE_BUTTON: LoginBannerClose,
  CROSS_SELL_CAR_LINK: CrossSellCarLink,
  EARLY_BIRD_PRICING_BREAKDOWN: EarlyBirdInPathBreakdown,
  EARLY_BIRD_SWITCH: EarlyBirdSwitch,
  PLACEMENT_LINK: PlacementLink,
  SEE_PACKAGES: SeePackagesCommand
};

export const configuredLoadingStates = {
  SKELETON: 'skeleton'
};

export const UTM_CONTENT = {
  APP_DOMESTIC: 'D!app',
  APP_INTERNATIONAL: 'D!appINT',
  MWEB_DOMESTIC: 'D!mobile',
  MWEB_INTERNATIONAL: 'D!intpos'
};

export const UTM_TERM_APP = 'app';
