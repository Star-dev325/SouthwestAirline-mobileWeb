// @flow
import React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import _ from 'lodash';
import Segment from 'src/shared/components/segment';
import PageHeaderWithButtons from 'src/shared/components/pageHeaderWithButtons';
import i18n from '@swa-ui/locale';

import type { ButtonProps } from 'src/shared/components/pageHeaderWithButtons';

type Props = {
  listOfRecentSearches: Array<*>,
  recentSearchComponent: *,
  onRecentSearchCardClicked?: () => void,
  onDeleteCurrentSearch?: () => void,
  isWebView: ?boolean
};

type State = {
  shouldEnableEditing: boolean,
  activeButton: ButtonProps
};

class EditRecentSearches extends React.Component<Props, State> {
  static defaultProps = {
    listOfRecentSearches: []
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      shouldEnableEditing: false,
      activeButton: this._rightButtons().editButton
    };
  }

  _handleDoneClick = () => {
    this.setState({
      shouldEnableEditing: false,
      activeButton: this._rightButtons().editButton
    });
  };

  _handleEditClick = () => {
    this.setState({
      shouldEnableEditing: true,
      activeButton: this._rightButtons().doneButton
    });
  };

  _rightButtons = () => ({
    editButton: {
      name: i18n('SHARED__RECENT_SEARCHES__EDIT'),
      onClick: this._handleEditClick
    },
    doneButton: {
      name: i18n('SHARED__RECENT_SEARCHES__DONE'),
      onClick: this._handleDoneClick
    }
  });

  render() {
    const { listOfRecentSearches, recentSearchComponent, isWebView } = this.props;
    const { activeButton, shouldEnableEditing } = this.state;
    const buttons = _.isEmpty(listOfRecentSearches) ? undefined : [activeButton];

    return (
      <div className="shopping-recent-search">
        <PageHeaderWithButtons
          title={i18n('SHARED__RECENT_SEARCHES__TITLE')}
          rightButtons={buttons}
          showBackButton={!isWebView}
          className={cx({ 'action-bar-webview': isWebView })}
        />

        <div className="recent-search-list">
          {!_.isEmpty(listOfRecentSearches) ? (
            listOfRecentSearches.map((search: *, index: number) =>
              React.createElement(recentSearchComponent, {
                key: index,
                indexOfRecentSearch: index,
                searchRequest: search,
                shouldShowDeleteButton: shouldEnableEditing,
                onRecentSearchCardClicked: this.props.onRecentSearchCardClicked,
                onDeleteCurrentSearch: this.props.onDeleteCurrentSearch
              })
            )
          ) : (
            <Segment className="no-recent-searches">
              <div data-qa="recent-searches-no-results">{i18n('SHARED__RECENT_SEARCHES__NO_RECENT_SEARCHES')}</div>
            </Segment>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isWebView: state.app.webView.isWebView
});

const enhancers = _.flowRight(connect(mapStateToProps, {}));

export default enhancers(EditRecentSearches);
