// @flow
import React, { Component } from 'react';
import type { Element } from 'react';
import Icon from 'src/shared/components/icon';
import cx from 'classnames';

type Props = {
  open: boolean,
  icon: boolean,
  heading: Element<*>,
  body: Element<*>,
  onHeaderClick: () => void,
  className?: string
};

type State = {
  open: boolean,
  height: number | string,
  expandHeight: number | string,
  unexpandHeight: number
};

class Accordion extends Component<Props, State> {
  state = {
    open: this.props.open,
    height: 'auto',
    expandHeight: 'auto',
    unexpandHeight: 0
  };

  componentDidMount() {
    const { open } = this.state,
      // $FlowFixMe children type does not have a property `length`
      expandHeight = this.props.body.props.children.length * 38;

    if (open) {
      this.setState({
        expandHeight,
        height: expandHeight
      });
    } else {
      this.setState({
        expandHeight,
        height: this.state.unexpandHeight
      });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps: Props) {
    // $FlowFixMe children type does not have a property `length`
    const newHeight = nextProps.body.props.children.length * 38;

    this.setState({
      open: nextProps.open,
      expandHeight: newHeight,
      height: nextProps.open ? newHeight : this.state.unexpandHeight
    });
  }

  _renderHeading = (props: Props) => (
    <div onClick={this.handleHeaderClick} className="accordion--heading">
      {props.heading}

      {props.icon ? <Icon type={this.state.open ? 'openeddrawer' : 'closeddrawer'} /> : null}
    </div>
  );

  _renderBody = (props: Props) => {
    const { open, height } = this.state;
    const styleHeight = open ? 'auto' : height;

    return (
      <div style={{ height: styleHeight }} className="accordion--body" ref="accordionBody">
        {props.body}
      </div>
    );
  };

  handleHeaderClick = () => {
    const { unexpandHeight, expandHeight } = this.state,
      isOpen = !this.state.open,
      { onHeaderClick } = this.props;

    this.setState(
      {
        open: isOpen,
        height: isOpen ? expandHeight : unexpandHeight
      },
      onHeaderClick
    );
  };

  render() {
    const { props } = this;

    return (
      <div ref="container" className={cx('accordion', props.className)}>
        {this._renderHeading(props)}
        {this._renderBody(props)}
      </div>
    );
  }
}

export default Accordion;
