import _ from 'lodash';

const colorMap = {
  'primary-blue': 'pblue',
  'primary-dark-blue': 'pdkblue',
  'primary-lightened-blue': 'sltblue',
  'secondary-blue': 'sblue',
  'secondary-dark-blue': 'sdkblue',
  'secondary-light-blue': 'sltblue',
  'primary-yellow': 'yellow',
  'primary-dark-yellow': 'pdkyellow',
  'primary-light-yellow': 'pltyellow',
  'secondary-yellow': 'syellow',
  'neutral-black': 'black',
  'neutral-white': 'white',
  'neutral-gray1': 'gray1',
  'neutral-gray2': 'gray2',
  'neutral-gray3': 'gray3',
  'neutral-gray4': 'gray4',
  'secondary-gray': 'gray5',
  'primary-red': 'red',
  'secondary-green': 'green2',
  'secondary-orange': 'orange',
  'secondary-teal': 'teal'
};

const backgroundColorMap = {
  'neutral-gray1': 'bggray1',
  'neutral-gray2': 'bggray2',
  'neutral-gray3': 'bggray3',
  'neutral-gray4': 'bggray4',
  'neutral-white': 'bgwhite',
  'primary-blue': 'bgpblue',
  'primary-dark-blue': 'bgpdkblue',
  'primary-dark-yellow': 'bgpdkyellow',
  'primary-light-yellow': 'bgpltyellow',
  'primary-lightened-blue': 'bgsltblue',
  'primary-red': 'bgred',
  'primary-yellow': 'bgyellow',
  'secondary-blue': 'bgsblue',
  'secondary-dark-blue': 'bgsdkblue',
  'secondary-gray': 'bggray5',
  'secondary-green': 'bggreen2',
  'secondary-light-blue': 'bgsltblue',
  'secondary-orange': 'bgorange',
  'secondary-teal': 'bgteal',
  'secondary-yellow': 'bgsyellow'
};

const backgroundHexColorMap = {
  'neutral-gray1': '#f5f5f5',
  'neutral-gray2': '#e6e7e8',
  'neutral-gray3': '#cccccc',
  'neutral-gray4': '#8f8f8f',
  'neutral-white': '#ffffff',
  'primary-blue': '#304cb2',
  'primary-dark-blue': '#111b40',
  'primary-dark-yellow': '#c08700',
  'primary-light-yellow': '#ffecc0',
  'primary-lightened-blue': '#a4baf2',
  'primary-red': '#d5152e',
  'primary-yellow': '#ffbf27',
  'secondary-blue': '#294299',
  'secondary-dark-blue': '#1a2c80',
  'secondary-gray': '#636363',
  'secondary-green': '#008020',
  'secondary-light-blue': '#a4baf2',
  'secondary-orange': '#ff792e',
  'secondary-teal': '#0076a5',
  'secondary-yellow': '#ffca4f'
};

export const iconMap = {
  'green-circle-check': 'success',
  check: 'check',
  circle: 'bullet',
  earlybird: 'early-bird',
  plus: 'plus',
  warning: 'error'
};

export const iconTypeMap = {
  ERROR: 'error',
  INFO: 'information',
  SUCCESS: 'success',
  WARNING: 'travel-alert'
};

export const convertNamedIcon = (icon) => iconMap[_.toLower(icon)];

export const convertBrandColor = (color, colorDefault) => colorMap[_.toLower(color)] || colorDefault;

export const convertBackgroundBrandColor = (color, colorDefault) =>
  backgroundColorMap[color.toLowerCase()] || colorDefault;

export const convertBackgroundBrandColorToHexCode = (color, colorDefault) =>
  backgroundHexColorMap[color.toLowerCase()] || colorDefault;
