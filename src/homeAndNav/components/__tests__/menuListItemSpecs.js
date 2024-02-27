import MenuListItem from 'src/homeAndNav/components/menuListItem';
import { sandbox } from 'sinon';
import { integrationMount } from 'test/unit/helpers/testUtils';

const sinon = sandbox.create();

describe('MenuListItem', () => {
  let menuListItem, onHeaderClickStub, onLinkClickStub;

  const bookAFlight = {
    title: 'Book a Flight',
    routeName: 'flightStatus'
  };

  const menuItem = {
    iconType: 'flight',
    menuTitle: 'Flight',
    dataQa: 'flight',
    childList: [
      bookAFlight,
      {
        title: 'Check in',
        routeName: 'checkIn',
        dataQa: 'flight-check-in',
        icon: 'flightIcon'
      },
      {
        title: 'Look Up Reservations',
        routeName: 'viewReservation'
      }
    ]
  };

  const headItem = {
    iconType: 'home',
    menuTitle: 'Home',
    childList: []
  };

  beforeEach(() => {
    onHeaderClickStub = sinon.stub();
    onLinkClickStub = sinon.stub();
  });
  afterEach(() => {
    sinon.restore();
  });

  function renderMenuListItem(props, state = { app: { toggles: {} } }) {
    const defaultProps = {
      open: false,
      onHeaderClick: onHeaderClickStub,
      onLinkClick: onLinkClickStub,
      dataQa: '',
      icon: menuItem.iconType,
      className: 'menu-list-item',
      menuTitle: menuItem.menuTitle,
      childList: menuItem.childList,
      isLoggedIn: false
    };
    const finalProps = { ...defaultProps, ...props };

    return integrationMount()(state, MenuListItem, finalProps);
  }

  context('#render', () => {
    beforeEach(() => {
      menuListItem = renderMenuListItem();
    });

    it('should render heading', () => {
      expect(menuListItem.find('.menu-list-item--heading')).to.be.present();
    });

    it('should render body', () => {
      expect(menuListItem.find('.menu-list-item--body')).to.be.present();
    });

    it('should render data-qa attribute for menu-list-item', () => {
      expect(menuListItem.find('.menu-list-item--body-item li[data-qa="flight-check-in"]')).to.be.present();
    });

    it('should render icon in body item when there is an icon', () => {
      const menuListBodies = menuListItem.find('.menu-list-item--body-item');

      expect(menuListBodies.at(1).find('.icon')).to.be.present();
      expect(menuListBodies.at(2).find('.icon')).to.not.be.present();
    });
  });

  context('#onLinkClick', () => {
    let menuListBody;

    beforeEach(() => {
      const menuListItem = renderMenuListItem();

      menuListBody = menuListItem.find('.menu-list-item--body');
    });

    it('should transition to correct link', () => {
      menuListBody.find('.menu-list-item--body-item').at(0).simulate('click');

      expect(onLinkClickStub).to.have.been.calledWith(bookAFlight);
    });
  });

  context('#onBodyClick', () => {
    it('the props function should be called', () => {
      const menuListItem = renderMenuListItem({
        icon: headItem.iconType,
        menuTitle: headItem.menuTitle
      });

      menuListItem.find('.menu-list-item--body-item').first().simulate('click');

      expect(onLinkClickStub).to.have.been.called;
    });
  });

  context('#onHeaderClick', () => {
    it('the props function should be called', () => {
      const menuListItem = renderMenuListItem({
        icon: headItem.iconType,
        menuTitle: headItem.menuTitle,
        childList: headItem.childList
      });

      menuListItem.find('.menu-list-item--heading-icon').at(0).simulate('click');

      expect(onLinkClickStub).to.have.been.called;
    });
  });

  context('#renderBody', () => {
    it('should render heading title with titleClassName when specified', () => {
      const titleClassName = 'title-class';
      const props = { titleClassName };

      menuListItem = renderMenuListItem(props);
      expect(menuListItem.find('.menu-list-item--heading')).to.be.present();
      expect(menuListItem.find('.menu-list-item--heading').find(`.${titleClassName}`)).to.be.present();
    });

    it('should render body with child menu and specified className', () => {
      const childClassName = 'child-class-name';
      const childItem = {
        title: 'Child Menu',
        className: childClassName
      };

      menuListItem = renderMenuListItem({ childList: [childItem] });

      expect(menuListItem.find('.menu-list-item--body')).to.be.present();
      expect(menuListItem.find('.menu-list-item--body').find(`.${childClassName}`)).to.be.present();
    });

    it('should render body with child menu when hideForUsers is false', () => {
      const routeName = 'childRoute';
      const childItem = {
        title: 'Child Menu',
        routeName,
        hideForUsers: false
      };

      menuListItem = renderMenuListItem({ childList: [childItem] });

      expect(menuListItem.find('.menu-list-item--body')).to.be.present();
      expect(menuListItem.find('.menu-list-item--body').find('li')).to.have.prop('data-link', routeName);
    });

    it('should render body without child menu when hideForUsers is true', () => {
      const routeName = 'childRoute';
      const childItem = {
        title: 'Child Menu',
        routeName,
        hideForUsers: true
      };

      menuListItem = renderMenuListItem({ childList: [childItem] });

      expect(menuListItem.find('.menu-list-item--body')).to.be.present();
      expect(menuListItem.find('.menu-list-item--body').find('li')).to.not.be.present();
    });

    it('should render body with child menu when hideForUsers is false, hideForGuest is false and isLoggedIn is false', () => {
      const routeName = 'childRoute';
      const childItem = {
        title: 'Child Menu',
        routeName,
        hideForUsers: false,
        hideForGuest: false
      };

      menuListItem = renderMenuListItem({
        isLoggedIn: false,
        childList: [childItem]
      });

      expect(menuListItem.find('.menu-list-item--body')).to.be.present();
      expect(menuListItem.find('.menu-list-item--body').find('li')).to.have.prop('data-link', routeName);
    });

    it('should render body with child menu when hideForUsers is false, hideForGuest is false and isLoggedIn is true', () => {
      const routeName = 'childRoute';
      const childItem = {
        title: 'Child Menu',
        routeName,
        hideForUsers: false,
        hideForGuest: false
      };

      menuListItem = renderMenuListItem({
        isLoggedIn: true,
        childList: [childItem]
      });

      expect(menuListItem.find('.menu-list-item--body')).to.be.present();
      expect(menuListItem.find('.menu-list-item--body').find('li')).to.have.prop('data-link', routeName);
    });

    it('should render body without child menu when hideForUsers is false, hideForGuest is true and isLoggedIn is false', () => {
      const routeName = 'childRoute';
      const childItem = {
        title: 'Child Menu',
        routeName,
        hideForUsers: false,
        hideForGuest: true
      };

      menuListItem = renderMenuListItem({
        isLoggedIn: false,
        childList: [childItem]
      });

      expect(menuListItem.find('.menu-list-item--body')).to.be.present();
      expect(menuListItem.find('.menu-list-item--body').find('li')).to.not.be.present();
    });

    it('should render body with child menu when hideForUsers is false, hideForGuest is true and isLoggedIn is true', () => {
      const routeName = 'childRoute';
      const childItem = {
        title: 'Child Menu',
        routeName,
        hideForUsers: false,
        hideForGuest: true
      };

      menuListItem = renderMenuListItem({
        isLoggedIn: true,
        childList: [childItem]
      });

      expect(menuListItem.find('.menu-list-item--body')).to.be.present();
      expect(menuListItem.find('.menu-list-item--body').find('li')).to.have.prop('data-link', routeName);
    });
  });
});
