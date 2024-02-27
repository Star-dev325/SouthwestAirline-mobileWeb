// @flow

import React, { Component } from 'react';
import _ from 'lodash';
import cx from 'classnames';
import i18n from '@swa-ui/locale';

import Icon from 'src/shared/components/icon';

type Props = {
  onFocus: (string) => void,
  onBlur: (string) => void,
  onChange: (string) => void,
  onCancel: (string) => void,
  showCancel?: boolean
};

type State = {
  active: boolean,
  searchKeyWord: string
};

class SearchBar extends Component<Props, State> {
  static defaultProps = {
    onFocus: _.noop,
    onBlur: _.noop,
    onChange: _.noop,
    onCancel: _.noop,
    showCancel: true
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      active: false,
      searchKeyWord: ''
    };
  }

  _onFocus = () => {
    const { searchKeyWord } = this.state;

    this.setState({ active: true }, () => {
      this.props.onFocus(searchKeyWord);
    });
  };

  _onChange = (event?: SyntheticInputEvent<*>) => {
    const searchKeyWord = event ? event.target.value : '';

    this.setState({ searchKeyWord }, () => {
      this.props.onChange(searchKeyWord);
    });
  };

  _onCancel = () => {
    this._onChange();
    this.setState(
      {
        active: false
      },
      () => {
        this.props.onCancel('');
      }
    );
  };

  _onBlur = () => {
    const { searchKeyWord } = this.state;

    _.isEmpty(searchKeyWord) &&
      this.setState({
        active: false
      });
    this.props.onBlur(searchKeyWord);
  };

  _onSubmit = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    this._onBlur(); // Hide soft keyboard when user click search key on soft keyboard
  };

  _clearField = () => {
    this._onChange();
    this._onFocus();

    if (!this.props.showCancel) {
      this._onCancel();
    }
  };

  render() {
    const { active, searchKeyWord } = this.state;
    const { showCancel } = this.props;

    return (
      <div className="airport-search-bar options-search-bar bggray3 clearfix bdb bdgray3 px5 py3">
        <div className="airport-search-bar--field relative">
          <form
            action=""
            onSubmit={this._onSubmit}
            className={cx('airport-search-bar--form m0 inline-block relative fullwidth', {
              active: showCancel && active
            })}
          >
            {/* Show search key on soft keyboard */}
            <input
              className="airport-search-bar--input rd4 fullwidth border-none lineheight20 large"
              type="search"
              placeholder={i18n('SHARED__PLACEHOLDER__SEARCH')}
              onFocus={this._onFocus}
              onChange={this._onChange}
              onBlur={this._onBlur}
              value={searchKeyWord}
            />
            <Icon
              type="remove"
              className={cx('airport-search-bar--remove absolute r0 p4 gray4', { hide: !searchKeyWord })}
              onClick={this._clearField}
            />
          </form>
          <Icon type="search" className="airport-search-bar--icon absolute gray4 medium" />
          {active && showCancel && (
            <span className="airport-search-bar--cancel inline-block ml4 pblue align-middle" onClick={this._onCancel}>
              cancel
            </span>
          )}
        </div>
      </div>
    );
  }
}

export default SearchBar;
