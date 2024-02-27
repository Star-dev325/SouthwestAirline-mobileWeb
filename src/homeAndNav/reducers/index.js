import { combineReducers } from 'redux';
import DrawerReducers from 'src/homeAndNav/reducers/drawerReducers';
import HomepageReducers from 'src/homeAndNav/reducers/homepageReducers';
import MenuListReducers from 'src/homeAndNav/reducers/menuListReducers';
import OffersPageReducers from 'src/homeAndNav/reducers/offersPageReducers';

export default combineReducers({
  drawer: DrawerReducers,
  homePage: HomepageReducers,
  menuList: MenuListReducers,
  offersPage: OffersPageReducers
});
