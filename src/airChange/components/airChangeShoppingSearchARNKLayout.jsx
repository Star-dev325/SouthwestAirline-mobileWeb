// @flow
import i18n from '@swa-ui/locale';
import React from 'react';
import Button from 'src/shared/components/button';

export const AirChangeShoppingSearchARNKLayout = () => (
  <>
    <div className="air-change-shopping-search-arnk-layout--button">
      <Button color="yellow" fluid role="submit" size="larger" type="submit">
        {i18n('AIR_CHANGE__SHOPPING_SEARCH_PAGE__FIND_FLIGHTS_BUTTON')}
      </Button>   
    </div> 
  </>
);

export default AirChangeShoppingSearchARNKLayout;
