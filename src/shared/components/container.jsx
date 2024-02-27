// @flow

import _ from 'lodash';
import React from 'react';
import cx from 'classnames';
import ReactDOM from 'react-dom';
import { getOffset, offsetParent } from 'src/shared/helpers/domUtils';

import type { Node } from 'react';

type Props = {
  children: Node,
  inverted?: boolean,
  autoFill?: boolean,
  className?: string,
  noBottomPadding?: boolean
};

type State = {
  top?: number,
  left?: number,
  height?: number,
  width?: number
};

class Container extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this._updateOffsetState();
  }

  _updateOffsetState() {
    if (this.props.autoFill) {
      const offsetBox = getOffset(offsetParent(ReactDOM.findDOMNode(this)));

      this.setState(offsetBox);
    }
  }

  render() {
    const { className, inverted, noBottomPadding, children } = this.props;
    const { height } = this.state;
    const restProps = _.omit(this.props, ['inverted', 'noBottomPadding']);

    return (
      <div
        {...restProps}
        style={{ height }}
        className={cx(className, 'custom-container', {
          'bgpdkblue white': inverted,
          pb0: noBottomPadding
        })}
      >
        {children}
      </div>
    );
  }
}

export default Container;
