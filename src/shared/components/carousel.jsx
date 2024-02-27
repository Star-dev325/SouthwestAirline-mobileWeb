// @flow

import type { Node } from 'react';
import React, { Component } from 'react';
import _ from 'lodash';
import cx from 'classnames';
import Swipe from 'swipe-js-iso';
import ReactDOM from 'react-dom';

import Icon from 'src/shared/components/icon';

type Props = {
  dotsInFooter?: boolean,
  dotsInFooterWithArrows?: boolean,
  children?: Array<Node>,
  shouldAdjustHeightAtFirstChild?: boolean,
  className?: string
};

type State = {
  selectedItem: number,
  heightOfVisibleChild?: number
};

class Carousel extends Component<Props, State> {
  static defaultProps = {
    shouldAdjustHeightAtFirstChild: false
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      selectedItem: 0
    };
  }

  componentDidMount() {
    this.swipe = Swipe(ReactDOM.findDOMNode(this), _.merge({}, { transitionEnd: this._transitionEnd }, this.props));
    this.forceUpdate();

    if (this.props.children && this.props.shouldAdjustHeightAtFirstChild) {
      this._adjustHeightAtFirstChild();
    }
  }

  componentWillUnmount() {
    this.swipe && this.swipe.kill && this.swipe.kill();
    delete this.swipe;
  }

  swipe: *;

  _renderLeftArrow() {
    return (
      this.props.dotsInFooterWithArrows &&
      !!this.swipe && (
        <div className={cx({ invisible: this.swipe.getPos() === 0 }, 'left-arrow-container')} onClick={this.swipe.prev}>
          <Icon type="keyboard-arrow-left icon" />
        </div>
      )
    );
  }

  _renderRightArrow() {
    const { children, dotsInFooterWithArrows } = this.props;

    return (
      dotsInFooterWithArrows &&
      !!this.swipe &&
      children && (
        <div
          className={cx({ invisible: this.swipe.getPos() === children.length - 1 }, 'right-arrow-container')}
          onClick={this.swipe.next}
        >
          <Icon type="keyboard-arrow-right icon" />
        </div>
      )
    );
  }

  _dotClassName = (selected: boolean) =>
    cx({
      dot: true,
      'dot--in-footer': this.props.dotsInFooter,
      'dot--in-footer-with-arrows': this.props.dotsInFooterWithArrows,
      selected
    });

  _adjustHeightAtFirstChild = () => {
    this._transitionEnd(0);
  };

  _transitionEnd = (index: number) => {
    const { children } = this.props;

    if (children && index >= children.length) {
      index = index % children.length;
    }

    const refNameOfVisibleChild = this._getChildRefNameForIndex(index);
    const visibleChild = this.refs[refNameOfVisibleChild];

    const heightOfVisibleChild = this._getOffsetHeightOf(ReactDOM.findDOMNode(visibleChild));

    this.setState({
      heightOfVisibleChild,
      selectedItem: index
    });
  };

  _getOffsetHeightOf = (domNode: null | Element | Text) => _.get(domNode, 'offsetHeight');

  _getChildRefNameForIndex = (index: number) => `child-${index}`;

  _renderIndicator = () => {
    const { children, dotsInFooter, dotsInFooterWithArrows } = this.props;

    if (!children || children.length <= 0 || (dotsInFooterWithArrows && children.length === 1)) {
      return null;
    }

    const classes = cx({
      'carousel-dots': true,
      'carousel-dots--in-footer': dotsInFooter,
      'carousel-dots--in-footer-with-arrows': dotsInFooterWithArrows,
      'carousel-footer-for-arrows': dotsInFooterWithArrows
    });

    return (
      <div className={dotsInFooterWithArrows ? classes : ''}>
        {this._renderLeftArrow()}
        <div className="carousel-dots-container">
          <ul className={!dotsInFooterWithArrows ? classes : ''}>
            {_.map(children, (item, index: number) =>
              React.createElement('li', {
                className: this._dotClassName(index === this.state.selectedItem),
                value: index,
                key: index
              })
            )}
          </ul>
        </div>
        {this._renderRightArrow()}
      </div>
    );
  };

  _renderChildItem = () => {
    const { children } = this.props;

    if (!children || children.length <= 0) {
      return null;
    }

    return _.map(children, (child, index: number) => (
      <div className="carousel-child" ref={`child-${index}`} key={index}>
        {child}
      </div>
    ));
  };

  render() {
    const { className } = this.props;
    const autoAdjustingHeight = {
      height: this.state.heightOfVisibleChild
    };

    return (
      <div className={cx('carousel-container', className)}>
        <div className="carousel-wrapper" style={autoAdjustingHeight}>
          {this._renderChildItem()}
        </div>
        {this._renderIndicator()}
      </div>
    );
  }
}

export default Carousel;
