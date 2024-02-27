import { addGetTheAppLink } from 'src/homeAndNav/helpers/menuListDataHelper';
import appConfig from 'src/shared/config/appConfig';
import { featureTogglePageLink } from 'src/homeAndNav/transformers/menuDataTransformers';
import MenuList from 'src/homeAndNav/constants/menuList';

let MenuData = MenuList;

if (appConfig.userCanChangeToggles()) {
  MenuData = MenuData.concat(featureTogglePageLink);
}

export const MenuListData = addGetTheAppLink(MenuData, 8);
