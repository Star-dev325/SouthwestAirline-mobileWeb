import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

import { getOffset, offsetParent } from 'src/shared/helpers/domUtils';

class DonutProgressBar extends React.Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    percentage: PropTypes.number,
    autoFill: PropTypes.bool,
    animateFill: PropTypes.bool,
    offsetAngle: PropTypes.number,
    strokeWidth: PropTypes.number
  };

  constructor(props) {
    super(props);

    this.state = {
      width: _.isNumber(props.width) && props.width > 0 ? props.width : 100,
      height: _.isNumber(props.height) && props.height > 0 ? props.height : 100,
      percentage: _.isNumber(props.percentage) && props.percentage > 0 ? props.percentage : 0,
      offsetAngle: _.inRange(props.offsetAngle, 0, 180) ? props.offsetAngle : 0,
      strokeWidth: _.isNumber(props.strokeWidth) && props.strokeWidth > 0 ? props.strokeWidth : 10
    };
  }

  componentDidMount() {
    if (this.props.autoFill) {
      const offsetBox = getOffset(offsetParent(ReactDOM.findDOMNode(this)));
      const size = _.min([offsetBox.width, offsetBox.height]);

      this.setState({
        width: size,
        height: size
      });
    }

    if (this.props.animateFill) {
      this._animationFill();
    }
  }

  _animationFill = (time) => {
    time = time || 2000;

    const path = ReactDOM.findDOMNode(this.refs.fill);

    if ('getTotalLength' in path) {
      const length = path.getTotalLength();

      path.style.transition = path.style.WebkitTransition = 'none';

      path.style.strokeDasharray = [length, length].join(' ');
      path.style.strokeDashoffset = -length;

      path.getBoundingClientRect();

      path.style.transition = path.style.WebkitTransition = `stroke-dashoffset ${time}ms ease-in-out`;

      path.style.strokeDashoffset = '0';
    }
  };

  _cutPathByPercentage = (percentage) => {
    percentage = percentage > 100 ? 100 : percentage;

    const { state } = this;
    const size = _.min([state.height, state.width]);

    return this._describeArc(
      size / 2,
      size / 2,
      (size - state.strokeWidth) / 2,
      -(180 - state.offsetAngle),
      180 - state.offsetAngle - (1 - percentage / 100) * (360 - state.offsetAngle * 2)
    );
  };

  _describeArc = (x, y, radius, startAngle, endAngle) => {
    const start = this._polarToCartesian(x, y, radius, endAngle);
    const end = this._polarToCartesian(x, y, radius, startAngle);

    const arcSweep = endAngle - startAngle <= 180 ? '0' : '1';

    return ['M', start.x, start.y, 'A', radius, radius, 0, arcSweep, 0, end.x, end.y].join(' ');
  };

  _polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

    return {
      x: centerX + Math.round(radius * Math.cos(angleInRadians) * 10) / 10,
      y: centerY + Math.round(radius * Math.sin(angleInRadians) * 10) / 10
    };
  };

  render() {
    const { state } = this;
    const size = _.min([state.height, state.width]);

    // don't change the structure, just the svg elem can't get offsetParent if FF

    return (
      <div
        className="donut-progress-bar"
        style={{
          width: `${size}px`,
          height: `${size}px`
        }}
      >
        <svg width={size} height={size}>
          <path
            className="donut-progress-bar--container"
            fill="transparent"
            stroke="#d8d8d8"
            strokeWidth={state.strokeWidth}
            d={this._cutPathByPercentage(100)}
          />
          <path
            ref="fill"
            className="donut-progress-bar--fill"
            fill="transparent"
            stroke="#446688"
            strokeWidth={state.strokeWidth}
            d={this._cutPathByPercentage(state.percentage)}
          />
        </svg>
      </div>
    );
  }
}

export default DonutProgressBar;
