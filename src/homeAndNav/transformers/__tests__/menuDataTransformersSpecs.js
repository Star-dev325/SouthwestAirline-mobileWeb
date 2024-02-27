import { sandbox } from 'sinon';
import _ from 'lodash';
import proxyquire from 'proxyquire';
import homeNavMenu from 'mocks/templates/content-delivery/homeNavMenu';
import * as wcmTransformer from 'src/wcm/transformers/wcmTransformer';
import { MenuListData } from 'src/homeAndNav/constants/menuListData';

const sinon = sandbox.create();

describe('menuDataTransformers', () => {
  const promo1 = {
    backgroundImage: '/content/mkt/images/promotions/hamburger-chase3x.png',
    backgroundImageAltText: 'Chase earn points ad',
    blocks: [],
    contentBlockId: '44444',
    isPromo: true,
    linkType: 'webview',
    shouldObserveViewPort: false,
    target: 'https://sdcdclchmscm001:4700?REF=MWEB',
    viewPortThreshold: 1
  };
  let MenuDataTransformers;
  let userCanChangeTogglesStub;
  let getTheAppLinkStub;
  let toDynamicPlacementStub;

  beforeEach(() => {
    userCanChangeTogglesStub = sinon.stub();
    getTheAppLinkStub = sinon.stub();
    toDynamicPlacementStub = sinon.stub(wcmTransformer, 'toDynamicPlacement').returns(promo1);

    MenuDataTransformers = proxyquire('src/homeAndNav/transformers/menuDataTransformers', {
      'src/shared/config/appConfig': {
        default: { userCanChangeToggles: userCanChangeTogglesStub }
      },
      'src/homeAndNav/helpers/menuListDataHelper': {
        getTheAppLink: getTheAppLinkStub
      },
      'src/wcm/transformers/wcmTransformer': {
        toDynamicPlacement: toDynamicPlacementStub
      }
    });
    setUserCanChangeTogglesTo(false);
    getTheAppLinkStub.returns();
  });

  afterEach(() => {
    sinon.restore();
    setUserCanChangeTogglesTo(false);
  });

  const setUserCanChangeTogglesTo = (value) => {
    userCanChangeTogglesStub.returns(value);
  };

  context('wcmMenuListDataTransformer', () => {
    it('should return main menu when transforming menu data from wcm', () => {
      const transformedMenus = MenuDataTransformers.wcmMenuListDataTransformer(homeNavMenu);

      expect(transformedMenus.length).to.equal(16);
      expect(transformedMenus[0].menuTitle).to.equal('Home');
      expect(transformedMenus[0].iconType).to.equal('home');
      expect(transformedMenus[1].menuTitle).to.equal('Flight');
      expect(transformedMenus[1].iconType).to.equal('flight');
      expect(transformedMenus[2].menuTitle).to.equal('Car');
      expect(transformedMenus[2].iconType).to.equal('car');
      expect(transformedMenus[3].menuTitle).to.equal('Hotel');
      expect(transformedMenus[3].iconType).to.equal('hotel');
      expect(transformedMenus[4].menuTitle).to.equal('Vacations');
      expect(transformedMenus[4].iconType).to.equal('vacation');
      expect(transformedMenus[5].menuTitle).to.equal('Flying Southwest');
      expect(transformedMenus[5].iconType).to.equal(undefined);
      expect(transformedMenus[6].menuTitle).to.equal('Contact Us');
      expect(transformedMenus[6].iconType).to.equal(undefined);
      expect(transformedMenus[7]).to.deep.equal(promo1);
      expect(transformedMenus[8].menuTitle).to.equal('Visit southwest.com');
      expect(transformedMenus[9].menuTitle).to.equal('The Southwest Community');
      expect(transformedMenus[10].menuTitle).to.equal('SWABIZ');
      expect(transformedMenus[11].menuTitle).to.equal('Southwest Cargo');
      expect(transformedMenus[12].menuTitle).to.equal('Terms & Conditions');
      expect(transformedMenus[13].menuTitle).to.equal('Privacy Policy');
      expect(transformedMenus[14].menuTitle).to.equal('Do Not Sell My Info');
      expect(transformedMenus[15].menuTitle).to.equal('Logout');
    });

    it('should return hard-coded menu list when wcm response is empty', () => {
      expect(MenuDataTransformers.wcmMenuListDataTransformer(undefined)).to.deep.equal([...MenuListData]);
    });

    it('should handle home nav menu data with no promo', () => {
      toDynamicPlacementStub.returns(undefined);

      const homeNavMenuNoPromo = _.omit(homeNavMenu, 'results.navPromo1');
      const transformedMenus = MenuDataTransformers.wcmMenuListDataTransformer(homeNavMenuNoPromo);

      expect(transformedMenus.length).to.equal(15);
      expect(transformedMenus[0].menuTitle).to.equal('Home');
      expect(transformedMenus[0].iconType).to.equal('home');
      expect(transformedMenus[1].menuTitle).to.equal('Flight');
      expect(transformedMenus[1].iconType).to.equal('flight');
      expect(transformedMenus[2].menuTitle).to.equal('Car');
      expect(transformedMenus[2].iconType).to.equal('car');
      expect(transformedMenus[3].menuTitle).to.equal('Hotel');
      expect(transformedMenus[3].iconType).to.equal('hotel');
      expect(transformedMenus[4].menuTitle).to.equal('Vacations');
      expect(transformedMenus[4].iconType).to.equal('vacation');
      expect(transformedMenus[5].menuTitle).to.equal('Flying Southwest');
      expect(transformedMenus[5].iconType).to.equal(undefined);
      expect(transformedMenus[6].menuTitle).to.equal('Contact Us');
      expect(transformedMenus[6].iconType).to.equal(undefined);
      expect(transformedMenus[7].menuTitle).to.equal('Visit southwest.com');
      expect(transformedMenus[8].menuTitle).to.equal('The Southwest Community');
      expect(transformedMenus[9].menuTitle).to.equal('SWABIZ');
      expect(transformedMenus[10].menuTitle).to.equal('Southwest Cargo');
      expect(transformedMenus[11].menuTitle).to.equal('Terms & Conditions');
      expect(transformedMenus[12].menuTitle).to.equal('Privacy Policy');
      expect(transformedMenus[13].menuTitle).to.equal('Do Not Sell My Info');
      expect(transformedMenus[14].menuTitle).to.equal('Logout');
    });

    it('should populate query with clickCode', () => {
      const transformedMenus = MenuDataTransformers.wcmMenuListDataTransformer(homeNavMenu);

      expect(transformedMenus[1].menuTitle).to.equal('Flight');
      expect(transformedMenus[1].childList[0].query).to.deep.equal({
        clk: 'GNAVBKFLT'
      });
    });

    it('should return icons for Contact Us child menus', () => {
      const transformedMenus = MenuDataTransformers.wcmMenuListDataTransformer(homeNavMenu);

      expect(transformedMenus[6].menuTitle).to.equal('Contact Us');
      expect(transformedMenus[6].childList[0].icon).to.equal('call-us');
      expect(transformedMenus[6].childList[1].icon).to.equal('email-us');
      expect(transformedMenus[6].childList[2].icon).to.equal('twitter-2');
      expect(transformedMenus[6].childList[3].icon).to.equal('facebook-2');
    });

    context('linkType', () => {
      let wcmResponse;

      beforeEach(() => {
        const wcmMenus = {
          children: [
            {
              title: 'Parent Menu',
              children: [
                {
                  title: 'Browser LinkType',
                  linkType: 'browser',
                  target: 'browserTarget'
                },
                {
                  title: 'WebView LinkType',
                  linkType: 'webview',
                  target: 'webViewTarget'
                },
                {
                  title: 'App LinkType',
                  linkType: 'app',
                  target: 'appTarget'
                },
                {
                  title: 'WebView No LinkType',
                  target: 'webViewTarget'
                }
              ]
            }
          ]
        };

        wcmResponse = _.set({}, 'results.navTop.content.placement.navDrawer.navDrawerContent', [wcmMenus]);
      });

      it('should transform for appropriate linkTypes', () => {
        const transformedMenus = MenuDataTransformers.wcmMenuListDataTransformer(wcmResponse);

        expect(transformedMenus[0].menuTitle).to.equal('Parent Menu');
        expect(transformedMenus[0].childList[0].link).to.equal('browserTarget');
        expect(transformedMenus[0].childList[0].linkType).to.equal('browser');
        expect(transformedMenus[0].childList[1].link).to.equal('webViewTarget');
        expect(transformedMenus[0].childList[1].linkType).to.equal('webview');
        expect(transformedMenus[0].childList[2].routeName).to.equal('appTarget');
        expect(transformedMenus[0].childList[2].linkType).to.equal('app');
        expect(transformedMenus[0].childList[3].link).to.be.undefined;
        expect(transformedMenus[0].childList[3].linkType).to.be.undefined;
      });
    });

    context('hideForGuest', () => {
      it('should transform hideForGuest on parent menu when true', () => {
        const transformedMenus = MenuDataTransformers.wcmMenuListDataTransformer(homeNavMenu);

        expect(transformedMenus[15].menuTitle).to.equal('Logout');
        expect(transformedMenus[15].hideForGuest).to.equal(true);
      });

      it('should transform hideForGuest on parent menu when undefined', () => {
        const transformedMenus = MenuDataTransformers.wcmMenuListDataTransformer(homeNavMenu);

        expect(transformedMenus[14].menuTitle).to.equal('Do Not Sell My Info');
        expect(transformedMenus[14].hideForGuest).to.equal(false);
      });

      context('child menus', () => {
        let wcmResponse;

        beforeEach(() => {
          wcmResponse = _.set({}, 'results.navTop.content.placement.navDrawer.navDrawerContent', [WcmMenus]);
        });

        it('should transform hideForGuest on child menu when true', () => {
          const transformedMenus = MenuDataTransformers.wcmMenuListDataTransformer(wcmResponse);

          expect(transformedMenus[0].childList[0].hideForGuest).to.equal(true);
        });

        it('should transform hideForGuest on child menu when undefined', () => {
          const transformedMenus = MenuDataTransformers.wcmMenuListDataTransformer(wcmResponse);

          expect(transformedMenus[0].childList[1].hideForGuest).to.equal(false);
        });
      });
    });

    context('hideForUsers', () => {
      it('should transform hideForUsers on parent menu when true', () => {
        const transformedMenus = MenuDataTransformers.wcmMenuListDataTransformer(homeNavMenu);

        expect(transformedMenus[0].menuTitle).to.equal('Home');
        expect(transformedMenus[0].hideForUsers).to.equal(false);
      });

      it('should transform hideForUsers on parent menu when undefined', () => {
        const transformedMenus = MenuDataTransformers.wcmMenuListDataTransformer(homeNavMenu);

        expect(transformedMenus[14].menuTitle).to.equal('Do Not Sell My Info');
        expect(transformedMenus[14].hideForUsers).to.equal(false);
      });

      context('child menus', () => {
        it('should transform hideForUsers on child menu when false', () => {
          const transformedMenus = MenuDataTransformers.wcmMenuListDataTransformer(homeNavMenu);

          expect(transformedMenus[1].childList[0].hideForUsers).to.equal(false);
        });

        it('should transform hideForUsers on child menu when undefined', () => {
          const transformedMenus = MenuDataTransformers.wcmMenuListDataTransformer(homeNavMenu);

          expect(transformedMenus[1].childList[1].hideForUsers).to.equal(false);
        });
      });
    });

    context('children styles', () => {
      let wcmResponse;

      beforeEach(() => {
        wcmResponse = _.set({}, 'results.navTop.content.placement.navDrawer.navDrawerContent', [WcmMenus]);
      });

      it('should transform bold style', () => {
        const transformedMenus = MenuDataTransformers.wcmMenuListDataTransformer(wcmResponse);

        expect(transformedMenus[0].childList[0].className).to.equal('menu-list-item--body-item-title-nav-bold');
      });

      it('should transform semi bold style', () => {
        const transformedMenus = MenuDataTransformers.wcmMenuListDataTransformer(wcmResponse);

        expect(transformedMenus[0].childList[1].className).to.equal('menu-list-item--body-item-title-nav-semi-bold');
      });
    });

    context('Get Mobile App menu', () => {
      let wcmResponse;

      beforeEach(() => {
        wcmResponse = _.set({}, 'results.navTop.content.placement.navDrawer.navDrawerContent', [ContactUsWcmMenu]);
      });

      it('should add Get Mobile App menu when on Android or iOS (getTheAppLinkStub returns the menu)', () => {
        getTheAppLinkStub.returns({ menuTitle: 'Get the mobile app' });

        const menus = MenuDataTransformers.wcmMenuListDataTransformer(wcmResponse);

        expect(menus.length).to.equal(3);
        expect(menus[0].menuTitle).to.equal('Contact Us');
        expect(menus[1].menuTitle).to.equal('Get the mobile app');
      });

      it('should not add Get Mobile App menu when on other OS (getTheAppLinkStub does not return the menu)', () => {
        getTheAppLinkStub.returns(undefined);

        const menus = MenuDataTransformers.wcmMenuListDataTransformer(wcmResponse);

        expect(menus.length).to.equal(2);
        expect(menus[0].menuTitle).to.equal('Contact Us');
        expect(menus[1].menuTitle).to.not.equal('Get the mobile app');
      });
    });

    context('test env menus', () => {
      let wcmResponse;

      beforeEach(() => {
        wcmResponse = _.set({}, 'results.navTop.content.placement.navDrawer.navDrawerContent', [WcmMenus]);
      });

      it('should return Change Toggles and Environment Settings menus when lower env ', () => {
        setUserCanChangeTogglesTo(true);

        const result = MenuDataTransformers.wcmMenuListDataTransformer(wcmResponse);

        expect(result.length).to.equal(5);
        expect(result.slice(-3)).to.deep.equal([...MenuDataTransformers.featureTogglePageLink]);
      });

      it('should not return Change Toggles and Environment Settings menus when Prod env ', () => {
        setUserCanChangeTogglesTo(false);

        const result = MenuDataTransformers.wcmMenuListDataTransformer(wcmResponse);

        expect(result.length).to.equal(2);
        expect(result.slice(-2)).to.not.deep.equal([...MenuDataTransformers.featureTogglePageLink]);
      });
    });
  });
});

const ContactUsWcmMenu = {
  children: [
    {
      children: [
        {
          icon: 'PHONE',
          linkType: 'app',
          title: 'Call',
          target: '/contact-us'
        },
        {
          icon: 'EMAIL',
          linkType: 'browser',
          title: 'Email Us',
          target: 'https://qa3-swacssinternal.cs66.force.com/connect/s/'
        }
      ],
      style: 'semi-bold',
      linkType: null,
      title: 'Contact Us',
      canExpand: false,
      isAutoExpanded: true,
      target: null
    }
  ]
};

const WcmMenus = {
  children: [
    {
      children: [
        {
          clickCode: 'GNAVBKFLT',
          linkType: 'app',
          title: 'Book a Flight',
          target: '/air/booking/shopping?cleanFlow=true',
          hideForUsers: true,
          hideForGuest: true,
          style: 'bold'
        },
        {
          clickCode: 'GNAVFLTSTATUS',
          linkType: 'app',
          title: 'Flight Status',
          target: '/flight-status?cleanFlow=true',
          style: 'semi-bold'
        }
      ],
      icon: 'PLANE',
      style: 'bold',
      linkType: null,
      title: 'Flight',
      canExpand: true,
      isAutoExpanded: true,
      target: null
    }
  ]
};
