// @flow

import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { scrollToTop } from 'src/shared/helpers/uiHelper';

import ErrorHeader from 'src/shared/components/errorHeader/errorHeader';

type Props = {
  hasError: boolean,
  errorMessage: ?string
};

export class ErrorHeaderContainer extends React.Component<Props> {
  componentDidUpdate() {
    if (this.props.hasError) {
      scrollToTop();
    }
  }

  render() {
    return <div>{this.props.hasError && <ErrorHeader errorMessage={this.props.errorMessage || ''} />}</div>;
  }
}

const mapStateToProps = (state) => ({
  errorMessage: _.get(state, 'app.errorHeader.errorMessage'),
  hasError: _.get(state, 'app.errorHeader.hasError')
});

export default connect(mapStateToProps, {})(ErrorHeaderContainer);
