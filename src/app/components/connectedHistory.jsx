// @flow
import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { ConnectedRouter } from 'connected-react-router';
import * as HistoryActions from 'src/shared/actions/historyActions';

import type { Node } from 'react';

type Props = {
  history: *,
  children: Node,
  saveHistoryChangeFn: (*) => void
};

export class ConnectedHistory extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    const { history, saveHistoryChangeFn } = props;

    const currentRouteState = _.merge({}, history.location, { action: null });

    saveHistoryChangeFn(currentRouteState);
  }

  render() {
    return <ConnectedRouter history={this.props.history}>{this.props.children}</ConnectedRouter>;
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  saveHistoryChangeFn: HistoryActions.saveHistoryChange
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedHistory);
