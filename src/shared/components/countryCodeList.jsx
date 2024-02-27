// @flow

import React, { Component } from 'react';
import _ from 'lodash';
import countryCodes from 'src/shared/constants/countryCode';
import isoCountryCodes from 'src/shared/constants/isoCountryCode';
import SearchableList from 'src/shared/components/searchableList';

import type { ListItemType } from 'src/shared/components/searchableList';
import i18n from '@swa-ui/locale';

const getISOCountryList = () => {
  const _transformToCountryInfo = (countryCode: string): ListItemType => ({
    label: `${isoCountryCodes[countryCode]} - ${countryCode}`,
    code: countryCode
  });

  const DEFAULT_COUNTRY_CODE = 'US';
  const USIsoCountryCode = _transformToCountryInfo(DEFAULT_COUNTRY_CODE);
  const orderedCountryList = _.chain(countryCodes)
    .map((countryName, countryCode) => _transformToCountryInfo(countryCode))
    .sortBy('label')
    .value();

  return [USIsoCountryCode].concat(orderedCountryList);
};

type Props = {
  onCountryCodeSelect: (*) => void,
  onCancel: () => void,
  showSearchBar: boolean
};

export default class CountryCodeList extends Component<Props> {
  static defaultProps = {
    showSearchBar: true
  };

  render() {
    const { onCountryCodeSelect, onCancel, showSearchBar } = this.props;

    return (
      <SearchableList
        title={i18n('SELECT_COUNTRY')}
        itemList={getISOCountryList()}
        onItemSelect={onCountryCodeSelect}
        onCancel={onCancel}
        codeFieldName={'countryCode'}
        showSearchBar={showSearchBar}
      />
    );
  }
}
