import { sitePaths } from 'src/shared/constants/siteLinks';
import appConfig from 'src/shared/config/appConfig';

const extraLinks = [
  {
    title: 'Visit Southwest.com',
    link: 'https://www.southwest.com/?ref=LinkMobileWeb&clk=GNAVVISITSWA'
  },
  {
    title: 'The Southwest Community',
    link: 'https://www.southwestaircommunity.com/?clk=GNAVSWACOMMUNITY'
  },
  {
    title: 'SWABIZ',
    link: 'https://www.swabiz.com/?clk=GNAVSWABIZ'
  },
  {
    title: 'Southwest Cargo',
    link: 'http://www.swacargo.com/?clk=GNAVCARGO'
  },
  {
    title: 'Terms & Conditions',
    link: sitePaths.termsAndConditions
  },
  {
    title: 'Privacy Policy',
    link: sitePaths.privacyPolicy
  }
];

const featureTogglePageLink = [
  {
    title: 'CHANGE TOGGLES',
    routeName: '/feature-toggles',
    isWcmLink: false
  },
  {
    title: 'ENVIRONMENT SETTINGS',
    routeName: '/view-app-config',
    isWcmLink: false
  }
];

export default {
  extraLinks: extraLinks.concat(appConfig.userCanChangeToggles() ? featureTogglePageLink : [])
};
