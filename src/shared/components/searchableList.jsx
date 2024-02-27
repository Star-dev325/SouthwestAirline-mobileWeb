// @flow

import React, { Component } from 'react';
import _ from 'lodash';
import cx from 'classnames';
import PageHeaderWithButtons from 'src/shared/components/pageHeaderWithButtons';
import SearchBar from 'src/airports/components/searchBar';
import ListGroups from 'src/shared/components/listGroups';
import NavItemLink from 'src/shared/components/navItemLink';

import type { NavItemLinkType } from 'src/shared/flow-typed/shared.types';

export type ListItemType = {
  label: string,
  code: string,
  value?: string,
  disabled?: boolean,
  disabledMessage?: string
};

export type ListType = Array<ListItemType>;

type Props = {
  title: string,
  itemList: ListType,
  onItemSelect: (*) => void,
  onCancel: () => void,
  showSearchBar: boolean,
  codeFieldName: string,
  groupHeadersByFn?: (ListItemType) => *,
  groupsSortBy?: string,
  alternateItemAllowed?: boolean,
  alternateNavItemLinkProps?: NavItemLinkType,
  alternateNavItemTitle?: string,
  hideAlphabetSelector?: boolean,
  showSectionHeaders?: boolean
};

type State = {
  isSearching: boolean,
  searchString: string
};

export default class SearchableList extends Component<Props, State> {
  static defaultProps = {
    onItemSelect: _.noop,
    onCancel: _.noop,
    showSearchBar: false,
    showSectionHeaders: false
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

  _filterList = (list: ListType, searchString: string) =>
    _.filter(list, (item) => {
      const labelAllLowercase = item.label.toLowerCase();
      const containSearchString = _.includes(labelAllLowercase, searchString.toLowerCase());

      return containSearchString;
    });

  render() {
    const {
      itemList,
      showSearchBar,
      onItemSelect,
      codeFieldName,
      title,
      showSectionHeaders,
      hideAlphabetSelector,
      alternateItemAllowed,
      alternateNavItemLinkProps,
      alternateNavItemTitle,
      groupHeadersByFn,
      groupsSortBy
    } = this.props;
    const { searchString, isSearching } = this.state;
    const shouldHideHeader = isSearching || !!searchString;
    const filteredList = shouldHideHeader ? this._filterList(itemList, searchString) : itemList;
    const disabledFilteredList = _.filter(filteredList, 'disabled');
    const codeFieldNameToReturn = codeFieldName ? codeFieldName : 'code';

    const hideShadowMask = !isSearching || !!searchString;

    return (
      <div className={cx('searchable-list', { 'options-list--with-shadow': !hideShadowMask })}>
        <PageHeaderWithButtons
          title={title}
          rightButtons={[{ name: 'Cancel', onClick: this.props.onCancel }]}
          hidden={shouldHideHeader}
        />
        {showSearchBar && (
          <SearchBar
            onFocus={this._onSearchFocus}
            onBlur={this._onSearchBlur}
            onChange={this._onSearchChange}
            onCancel={this._onSearchCancel}
          />
        )}
        {alternateItemAllowed && (
          <NavItemLink {...alternateNavItemLinkProps}>
            <span className="searchable-list--alternate-item-title">{alternateNavItemTitle}</span>
          </NavItemLink>
        )}
        <div
          className={cx('searchable-list-code--results options-list--results', { 'overflow-hidden': !hideShadowMask })}
        >
          {!showSectionHeaders && (
            <ul className="searchable-list-code">
              {filteredList.map((item: ListItemType, index) => {
                const paramObject = _.set({}, codeFieldNameToReturn, item.code);

                return (
                  !item.disabled && (
                    <li key={index} className="searchable-list-code--item" onClick={() => onItemSelect(paramObject)}>
                      {<div className="flex10">{item.label}</div>}
                    </li>
                  )
                );
              })}
              {disabledFilteredList.map((item: ListItemType, index) => (
                <li key={index} className="searchable-list-code--item">
                  {
                    <div className="disabled">
                      {item.label} {item.disabled && item.disabledMessage}
                    </div>
                  }
                </li>
              ))}
            </ul>
          )}
          {showSearchBar && (
            <div
              className="searchable-list-code--shadow options-list--results_shadow"
              onTouchMove={(e) => e.preventDefault()}
            />
          )}
          {showSearchBar && (
            <div className={cx('searchable-list-code--empty', { hide: itemList.length === 0 || filteredList.length })}>
              No Results
            </div>
          )}
          {showSectionHeaders && (
            <ListGroups
              items={filteredList}
              showAlphabetSelector={hideAlphabetSelector ? false : !this.state.isSearching}
              onItemSelect={onItemSelect}
              groupByFn={groupHeadersByFn}
              groupsSortBy={groupsSortBy}
            />
          )}
        </div>
      </div>
    );
  }
}
