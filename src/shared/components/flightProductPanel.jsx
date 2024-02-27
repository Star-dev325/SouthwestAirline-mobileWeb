import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import { addEndEventListener, removeEndEventListener } from 'src/shared/helpers/transitionEndEventsHelper';

class FlightProductPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      withAnimation: !props.expanded
    };
  }

  componentDidMount() {
    this.setState(() => ({
      withAnimation: true
    }));
  }

  componentDidUpdate() {
    const node = ReactDOM.findDOMNode(this.refs.panel);
    const value = this.props.expanded ? node.scrollHeight : 0;

    node.style['height'] = `${value}px`;

    if (this.props.expanded) {
      this._handleExpand(node);
    } else {
      node.style['overflow'] = 'hidden';
    }
  }

  _handleExpand(node) {
    const complete = () => {
      this._removeEndEventListener(node, complete);

      if (this.props.expanded) {
        node.style['overflow'] = null;
      }
    };

    this._addEndEventListener(node, complete);
    node.style['overflow'] = 'hidden';
  }

  _addEndEventListener(node, complete) {
    addEndEventListener(node, complete);
  }

  _removeEndEventListener(node, complete) {
    removeEndEventListener(node, complete);
  }

  renderCollapsibleBody() {
    const { expanded, children } = this.props;
    const { withAnimation } = this.state;

    return (
      <div
        className={cx('flight-product-panel_collapsing', { 'collapsing-animation': withAnimation })}
        ref="panel"
        aria-expanded={expanded}
      >
        <div>{children}</div>
      </div>
    );
  }

  renderHeading() {
    const { header, expanded, onSelect } = this.props;

    return (
      header && (
        <div className={header.props.className} data-qa="flight-product-panel-header" onClick={onSelect}>
          <div aria-expanded={expanded} className={'panel-anchor'}>
            {header.props.children}
          </div>
        </div>
      )
    );
  }

  render() {
    const { className } = this.props;

    return (
      <div className={`flight-product-panel ${className}`}>
        {this.renderHeading()}
        {this.renderCollapsibleBody()}
      </div>
    );
  }
}

FlightProductPanel.propTypes = {
  className: PropTypes.string,
  expanded: PropTypes.bool,
  onSelect: PropTypes.func,
  header: PropTypes.node,
  children: PropTypes.node
};

export default FlightProductPanel;
