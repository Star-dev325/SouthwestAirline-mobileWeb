// @flow
import React from 'react';
import { scrollToTop } from 'src/shared/helpers/uiHelper';

const withScrollToTop = (Component: *) => {
  class _withScrollToTop extends React.Component<*> {
    componentDidUpdate(prevProps: *) {
      if (this.props.location !== prevProps.location) {
        scrollToTop();
      }
    }

    render() {
      return <Component {...this.props} />;
    }
  }

  return _withScrollToTop;
};

export default withScrollToTop;
