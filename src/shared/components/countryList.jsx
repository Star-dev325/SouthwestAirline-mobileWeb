// @flow
import React from 'react';
import cx from 'classnames';
import _ from 'lodash';
import PageHeaderWithButtons from 'src/shared/components/pageHeaderWithButtons';
import SearchBar from 'src/airports/components/searchBar';
import { getCountryOptions } from 'src/shared/helpers/optionsHelper';
import Icon from 'src/shared/components/icon';

type Props = {
  title: string,
  selectedIsoCountryCode?: string | (() => string),
  onCancel?: () => void,
  onSelectedCountry: ?(?string) => void
};

type State = {
  isSearching: boolean,
  searchString: string
};

class CountryList extends React.Component<Props, State> {
  static defaultProps = {
    onSelectedCountry: _.noop
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      isSearching: false,
      searchString: ''
    };
  }

  _onSearchFocus = () => {
    this.setState({
      isSearching: true
    });
  };

  _onSearchBlur = () => {
    const { searchString } = this.state;

    this.setState({
      isSearching: !!searchString
    });
  };

  _onSearchCancel = () => {
    this.setState({
      isSearching: false,
      searchString: ''
    });
  };

  _onSearchChange = (text: string) => {
    this.setState({
      searchString: text
    });
  };

  _onSelectedCountry = (idx: number) => {
    const selectedCountry = getCountryOptions()[idx];
    const { onSelectedCountry } = this.props;

    onSelectedCountry && onSelectedCountry(selectedCountry.value);
  };

  _filterCountryList = (searchString: string) => {
    const countries = getCountryOptions();
    const { props } = this;
    const selectedCountryCode =
      typeof props.selectedIsoCountryCode === 'function'
        ? props.selectedIsoCountryCode()
        : props.selectedIsoCountryCode;

    return _.chain(countries)
      .map((country, index) => {
        const containSearchString = _.includes(country.label.toLowerCase(), searchString.toLowerCase());
        const hasSelected = _.isEqual(selectedCountryCode, country.value);

        return containSearchString ? (
          <div className="country-list-item-container" key={index} onClick={this._onSelectedCountry.bind(null, index)}>
            <li>{country.label}</li>
            {hasSelected && <Icon type="check" className="sblue regular larger" />}
          </div>
        ) : null;
      })
      .compact()
      .value();
  };

  render() {
    const { onCancel, title } = this.props;
    const { isSearching, searchString } = this.state;
    const buttons = [{ name: 'Cancel', className: 'cancel', onClick: onCancel }];
    const shouldHideHeader = isSearching || !!searchString;
    const filteredCountries = this._filterCountryList(searchString);
    const hideShadow = !isSearching || !!searchString;

    return (
      <div className={cx('country-list', { 'options-list--with-shadow': !hideShadow })}>
        <PageHeaderWithButtons showBackButton={false} title={title} rightButtons={buttons} hidden={shouldHideHeader} />
        <SearchBar
          onFocus={this._onSearchFocus}
          onBlur={this._onSearchBlur}
          onChange={this._onSearchChange}
          onCancel={this._onSearchCancel}
        />
        <div className="country-list--results options-list--results">
          {<ul className="country-list-group">{filteredCountries}</ul>}
          <div
            className="country-list--results_shadow options-list--results_shadow"
            onTouchMove={(e) => e.preventDefault()}
          />
          <div className={cx('country-list--results_empty', { hide: filteredCountries.length })}>No Results</div>
        </div>
      </div>
    );
  }
}

export default CountryList;
