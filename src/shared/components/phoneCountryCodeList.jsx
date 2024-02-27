// @flow

import React, { Component } from 'react';
import _ from 'lodash';
import countryCodes from 'src/shared/constants/countryCode';
import isoCountryCodes from 'src/shared/constants/isoCountryCode';
import SearchableList from 'src/shared/components/searchableList';

import type { ListItemType } from 'src/shared/components/searchableList';

const getISOCountryList = () => {
  const _transformToCountryInfo = (countryCode: string, countryCodeNumber: number): ListItemType => ({
    label: `${isoCountryCodes[countryCode]} - ${countryCode} (+${countryCodeNumber})`,
    code: countryCode
  });

  const USIsoCountryCode = _transformToCountryInfo('US', 1);
  const orderedPhoneCountryList = _.chain(countryCodes)
    .map((countryCodeNumber, countryCode) => _transformToCountryInfo(countryCode, countryCodeNumber))
    .sortBy('label')
    .value();

  return [USIsoCountryCode].concat(orderedPhoneCountryList);
};

const isoCountryList = getISOCountryList();

type Props = {
  onCountryCodeSelect: (*) => void,
  onCancel: () => void,
  showSearchBar: boolean
};

export default class PhoneCountryCodeList extends Component<Props> {
  static defaultProps = {
    showSearchBar: true
  };

  render() {
    const { onCountryCodeSelect, onCancel, showSearchBar } = this.props;

    return (
      <SearchableList
        title={'Select Country Code'}
        itemList={isoCountryList}
        onItemSelect={onCountryCodeSelect}
        onCancel={onCancel}
        codeFieldName={'countryCode'}
        showSearchBar={showSearchBar}
      />
    );
  }
}
