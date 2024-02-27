// @flow
import React from 'react';
import _ from 'lodash';
import { addClass, removeClass } from 'src/shared/helpers/domUtils';

import type { ComponentType } from 'react';

type Options = {
  activeName: string
};

const defaultOptions = {
  activeName: 'active'
};

const withDisableScrolling = (options: Options = defaultOptions) => {
  const disableScrollingClassName =
    options.activeName === 'active' ? 'disable-scrolling' : 'disable-scrolling--spinner';

  return (Component: ComponentType<*>): ComponentType<*> =>
    class WithDisableScrolling extends React.Component<*> {
      UNSAFE_componentWillUpdate(nextProps: *) {
        if (_.get(this.props, options.activeName) === _.get(nextProps, options.activeName)) {
          return;
        }

        if (_.get(nextProps, options.activeName) && !nextProps.hasStickyFooterButton) {
          addClass(document.getElementById('app'), disableScrollingClassName);
        } else {
          removeClass(document.getElementById('app'), disableScrollingClassName);
        }
      }

      componentWillUnmount() {
        removeClass(document.getElementById('app'), disableScrollingClassName);
      }

      render() {
        return <Component {...this.props} />;
      }
    };
};

export default withDisableScrolling;
