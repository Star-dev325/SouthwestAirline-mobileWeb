// @flow
import React from 'react';
import { DOLLAR, POINTS } from 'src/shared/constants/currencyTypes';
import MoneyOrPointsSwitchButton from 'src/shared/components/moneyOrPointsSwitchButton';
import { sitePaths } from 'src/shared/constants/siteLinks';
import ContentLink from 'src/shared/components/contentLink';
import i18n from '@swa-ui/locale';

import type { CurrencySuit } from 'src/shared/flow-typed/shared.types';
import type { CurrencySwitchControlOption } from 'src/shared/components/moneyOrPointsSwitchButton';

type Props = {
  currencySuit: CurrencySuit,
  disclaimerWithLinks: ?string,
  hideRestrictions?: boolean,
  onCurrencySwitchSelect: (selectedCurrencyType: CurrencySwitchControlOption) => void,
  showCurrencySwitch: boolean,
  useAlternateTheme?: boolean
};

const FlightShoppingExplain = ({
  currencySuit,
  disclaimerWithLinks,
  hideRestrictions,
  onCurrencySwitchSelect,
  showCurrencySwitch,
  useAlternateTheme
}: Props) => (
  <div className="flight-shopping-explain">
    <div className="flight-shopping-explain--text">
      {!hideRestrictions && (
        <div className="flight-shopping-explain--bags">
          {i18n('SHARED__FLIGHT_PRODUCT__EXPLAIN_BAGS')}
          <sup>&reg;</sup>
        </div>
      )}
      {!hideRestrictions && (
        <ContentLink href={sitePaths.baggageRestrictions} dataQa="baggage-restrictions">
          {i18n('SHARED__FLIGHT_PRODUCT__BAGGAGE_LINK')}
        </ContentLink>
      )}
      <div className="flight-shopping-explain--taxes">
        {disclaimerWithLinks && <ContentLink raw={disclaimerWithLinks} />}
        {!disclaimerWithLinks && currencySuit === POINTS && (
          <ContentLink raw={i18n('SHARED__FLIGHT_PRODUCT__EXPLAIN_TAXES_POINTS')} />
        )}
        {!disclaimerWithLinks && currencySuit === DOLLAR && (
          <ContentLink raw={i18n('SHARED__FLIGHT_PRODUCT__EXPLAIN_TAXES_DOLLARS')} />
        )}
      </div>
    </div>
    {showCurrencySwitch && (
      <div className="flight-shopping-explain--switch-button">
        <MoneyOrPointsSwitchButton
          onSelect={onCurrencySwitchSelect}
          defaultValue={currencySuit}
          darkTheme
          useAlternateTheme={useAlternateTheme}
        />
      </div>
    )}
  </div>
);

FlightShoppingExplain.defaultProps = {
  onCurrencySwitchSelect: () => {}
};

export default FlightShoppingExplain;
