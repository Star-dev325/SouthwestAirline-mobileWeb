import React from 'react';
import { storiesOf } from '@storybook/react';
import _ from 'lodash';
import configureMockStore from 'redux-mock-store';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import NavContainer from 'src/homeAndNav/components/navContainer';
import homeNavMenu from 'mocks/templates/content-delivery/homeNavMenu';
import { wcmMenuListDataTransformer } from 'src/homeAndNav/transformers/menuDataTransformers';
import { withFakeClock } from 'storybook/libs/withFakeClock';

const homeNavMenuNoPromo = _.omit(homeNavMenu, 'results.navPromo1');
const transformedMenus = wcmMenuListDataTransformer(homeNavMenu);
const transformedMenusNoPromo = wcmMenuListDataTransformer(homeNavMenuNoPromo);

const props = {
  userInfo: {
    isLogin: false,
    name: 'test'
  },
  menuList: transformedMenus,
  onNavClick: _.noop,
  isLogin: false,
  isLoggedIn: false,
  onLogoutClick: _.noop,
  toggleDrawerFn: _.noop,
  isDrawerOpen: false,
  updateContentBlockIdsFromMenuListFn: _.noop
};
const propsNoPromo = {
  ...props,
  menuList: transformedMenusNoPromo
};

const mockStore = configureMockStore()({
  app: {
    errorHeader: {
      hasError: false,
      errorMessage: null
    },
    account: {
      isLoggedIn: false
    },
    homeAndNav: {
      drawer: {
        isDrawerOpen: false
      },
      menuList: {
        activeMenuIndex: 1,
        listData: transformedMenus
      }
    }
  }
});
const mockStoreNoPromo = configureMockStore()({
  app: {
    errorHeader: {
      hasError: false,
      errorMessage: null
    },
    account: {
      isLoggedIn: false
    },
    homeAndNav: {
      drawer: {
        isDrawerOpen: false
      },
      menuList: {
        activeMenuIndex: 1,
        listData: transformedMenusNoPromo
      }
    }
  }
});

storiesOf('components/navContainer', module)
  .addDecorator(withFakeClock('2021-03-22'))
  .addDecorator(StoryReduxProvider(mockStore))
  .add('default', () => {
    return <NavContainer {...props} />;
  });
storiesOf('components/navContainer', module)
  .addDecorator(withFakeClock('2021-03-22'))
  .addDecorator(StoryReduxProvider(mockStoreNoPromo))
  .add('no promo', () => {
    return <NavContainer {...propsNoPromo} />;
  });
