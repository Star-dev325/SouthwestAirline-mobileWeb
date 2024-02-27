const gutil = require('gulp-util');
const os = require('os');
const ChaseBannerContent = require('test/builders/apiResponse/v1/content-delivery/query/placements');
const placementsHomeMobileIndex = require('mocks/templates/content-delivery/placementsHomeMobileIndex');
const placementsUnusedFunds = require('mocks/templates/content-delivery/placementsUnusedFunds');
const hamburgerMenu = require('mocks/templates/content-delivery/hamburgerMenu');
const footer = require('mocks/templates/content-delivery/footer');
const flightShoppingPagePlacements = require('mocks/templates/content-delivery/flightShoppingPagePlacements');
const homeNavMenu = require('mocks/templates/content-delivery/homeNavMenu');
const confirmationPromoBanner = require('mocks/templates/content-delivery/confirmationPromoBanner');
const placementsPurchasePage = require('mocks/templates/content-delivery/placementsPurchasePage');
const placementsTravelFundsIndex = require('mocks/templates/content-delivery/placementsTravelFundsIndex');
const { getChaseMockServerPort } = require('mocks/helpers/mockServerHelper');
const checkInConfirmationPagePlacements = require('mocks/templates/content-delivery/checkInConfirmationPagePlacements');

const getMockChaseServerTarget = () =>
  (gutil.env.docker && os.platform() === 'darwin'
    ? `http://host.docker.internal:${getChaseMockServerPort()}/foundry9`
    : `http://localhost:${getChaseMockServerPort()}/foundry9`);

module.exports = {
  path: '/v1/content-delivery/query/placements',
  method: 'GET',
  cache: false,
  render: (req, res) => {
    const { query } = req;

    switch (query.pageId) {
      case 'air-booking-price': {
        const chaseBannerContent = new ChaseBannerContent().build();

        chaseBannerContent.results.fullChaseAd.content.target = getMockChaseServerTarget();
        res.json(chaseBannerContent);
        break;
      }
      case 'air-booking-purchase': {
        const chaseBannerContent = placementsPurchasePage;

        chaseBannerContent.results.bottomPromo1.content.placement.target = getMockChaseServerTarget();
        res.json(placementsPurchasePage);
        break;
      }
      case 'air-booking-confirmation': {
        res.json(confirmationPromoBanner);
        break;
      }
      case 'air-booking-select-outbound': {
        res.json(flightShoppingPagePlacements);
        break;
      }
      case 'air-booking-outbound-results': {
        res.json(flightShoppingPagePlacements);
        break;
      }
      case 'air-booking-select-depart': {
        res.json(flightShoppingPagePlacements);
        break;
      }
      case 'air-booking-select-inbound': {
        res.json(flightShoppingPagePlacements);
        break;
      }
      case 'air-booking-inbound-results': {
        res.json(flightShoppingPagePlacements);
        break;
      }
      case 'air-booking-select-return': {
        res.json(flightShoppingPagePlacements);
        break;
      }
      case 'air-booking-inbound-select-fare': {
        res.json(flightShoppingPagePlacements);
        break;
      }
      case 'air-booking-select-fare-return': {
        res.json(flightShoppingPagePlacements);
        break;
      }
      case 'air-booking-outbound-select-fare': {
        res.json(flightShoppingPagePlacements);
        break;
      }
      case 'air-booking-select-fare-depart': {
        res.json(flightShoppingPagePlacements);
        break;
      }
      case 'air-check-in-confirmation': {
        res.json(checkInConfirmationPagePlacements);
        break;
      }
      case 'home-mobile-index': {
        res.send(placementsHomeMobileIndex);
        break;
      }
      case 'loyalty-myaccount-index': {
        res.send(placementsUnusedFunds);
        break;
      }
      case 'travel-funds-index': {
        res.send(placementsTravelFundsIndex);
        break;
      }
      case 'mobile-web-hb-menu': {
        const hamburgerMenuContent = hamburgerMenu;

        hamburgerMenuContent.results.navPromo1.content.placement.target = getMockChaseServerTarget();

        res.send(hamburgerMenu);
        break;
      }
      case 'mobile-web-footer': {
        res.send(footer);
        break;
      }
      case 'global': {
        const homeNavMenuContent = homeNavMenu;

        homeNavMenuContent.results.navPromo1.content.placement.target = getMockChaseServerTarget();
        res.send(homeNavMenuContent);
        break;
      }
    }
  }
};
