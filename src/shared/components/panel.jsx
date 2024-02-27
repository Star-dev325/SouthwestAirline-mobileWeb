import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import _ from 'lodash';
import { addEndEventListener, removeEndEventListener } from 'src/shared/helpers/transitionEndEventsHelper';

class Panel extends React.Component<*> {
  static propTypes = {
    collapsible: PropTypes.bool,
    onSelect: PropTypes.func,
    header: PropTypes.node,
    id: PropTypes.string,
    footer: PropTypes.node,
    eventKey: PropTypes.any,
    children: PropTypes.node,
    defaultExpanded: PropTypes.bool,
    expanded: PropTypes.bool
  };

  constructor(props) {
    super(props);
    const defaultExpanded = !_.isUndefined(props.defaultExpanded)
      ? props.defaultExpanded
      : !_.isUndefined(props.expanded)
        ? props.expanded
        : false;

    this.state = {
      expanded: defaultExpanded,
      collapsing: false,
      mounted: false
    };
  }

  componentDidMount() {
    this.setState({ mounted: true });
  }

  UNSAFE_componentWillUpdate(nextProps, nextState) {
    const willExpanded = !_.isUndefined(nextProps.expanded) ? nextProps.expanded : nextState.expanded;

    if (willExpanded === this.isExpanded()) {
      return;
    }

    // if the expanded state is being toggled, ensure node has a dimension value
    // this is needed for the animation to work and needs to be set before
    // the collapsing class is applied (after collapsing is applied the in class
    // is removed and the node's dimension will be wrong)

    const node = this.getCollapsibleDOMNode();
    const dimension = this.dimension();
    let value = '0';

    if (!willExpanded) {
      value = this.getCollapsibleDimensionValue();
    }

    node.style[dimension] = `${value}px`;
  }

  componentDidUpdate(prevProps, prevState) {
    // check if expanded is being toggled; if so, set collapsing
    this._checkToggleCollapsing(prevProps, prevState);

    // check if collapsing was turned on; if so, start animation
    this._checkStartAnimation();
  }

  handleSelect = (e) => {
    if (this.props.onSelect) {
      this.props.onSelect(e, this.props.eventKey);
    } else {
      e.preventDefault();
    }

    this.handleToggle();
  };

  handleToggle = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  getCollapsibleDimensionValue = () => this.getPanelDOMNode().scrollHeight;

  getCollapsibleDOMNode = () => {
    if (!this.state.mounted || !this.refs || !this.refs.panel) {
      return null;
    }

    return this.getPanelDOMNode();
  };

  getPanelDOMNode = () => ReactDOM.findDOMNode(this.refs.panel);

  _checkStartAnimation = () => {
    if (!this.state.collapsing) {
      return;
    }

    const node = this.getCollapsibleDOMNode();
    const dimension = this.dimension();
    const value = this.getCollapsibleDimensionValue();

    // setting the dimension here starts the transition animation
    let result;

    if (this.isExpanded()) {
      result = `${value}px`;
    } else {
      result = '0px';
    }
    node.style[dimension] = result;
  };

  _checkToggleCollapsing = (prevProps, prevState) => {
    const wasExpanded = !_.isUndefined(prevProps.expanded) ? prevProps.expanded : prevState.expanded;
    const isExpanded = this.isExpanded();

    if (wasExpanded !== isExpanded) {
      if (wasExpanded) {
        this._handleCollapse();
      } else {
        this._handleExpand();
      }
    }
  };

  _handleExpand = () => {
    const node = this.getCollapsibleDOMNode();
    const dimension = this.dimension();

    const complete = () => {
      this._removeEndEventListener(node, complete);
      // remove dimension value - this ensures the collapsible item can grow
      // in dimension after initial display (such as an image loading)
      node.style[dimension] = '';
      this.setState({
        collapsing: false
      });
    };

    this._addEndEventListener(node, complete);

    this.setState({
      collapsing: true
    });
  };

  _handleCollapse = () => {
    const node = this.getCollapsibleDOMNode();

    const complete = () => {
      this._removeEndEventListener(node, complete);
      this.setState({
        collapsing: false
      });
    };

    this._addEndEventListener(node, complete);

    this.setState({
      collapsing: true
    });
  };

  // helps enable test stubs
  _addEndEventListener = (node, complete) => {
    addEndEventListener(node, complete);
  };

  // helps enable test stubs
  _removeEndEventListener = (node, complete) => {
    removeEndEventListener(node, complete);
  };

  dimension = () => (typeof this.getCollapsibleDimension === 'function' ? this.getCollapsibleDimension() : 'height');

  isExpanded = () => (!_.isUndefined(this.props.expanded) ? this.props.expanded : this.state.expanded);

  getCollapsibleClassSet = (className) => {
    const classes = {};

    if (typeof className === 'string') {
      className.split(' ').forEach((subClasses) => {
        if (subClasses) {
          classes[subClasses] = true;
        }
      });
    }

    classes.collapsing = this.state.collapsing;
    classes.collapse = !this.state.collapsing;
    classes.in = this.isExpanded() && !this.state.collapsing;

    return classes;
  };

  renderCollapsibleBody = () => (
    <div
      key="panel-header"
      className={cx(this.getCollapsibleClassSet('panel_collapsed'))}
      id={this.props.id}
      ref="panel"
      aria-expanded={this.isExpanded() ? 'true' : 'false'}
    >
      {this.renderBody()}
    </div>
  );

  renderBody = () => {
    const allChildren = this.props.children;
    const bodyElements = [];
    let panelBodyChildren = [];
    const bodyClass = 'panel--body';

    const getProps = () => ({ key: bodyElements.length });

    const addPanelChild = (child) => {
      bodyElements.push(React.cloneElement(child, getProps()));
    };

    const addPanelBody = (children) => {
      bodyElements.push(
        <div className={bodyClass} {...getProps()}>
          {children}
        </div>
      );
    };

    const maybeRenderPanelBody = () => {
      if (panelBodyChildren.length === 0) {
        return;
      }

      addPanelBody(panelBodyChildren);
      panelBodyChildren = [];
    };

    // Handle edge cases where we should not iterate through children.
    if (!Array.isArray(allChildren) || allChildren.length === 0) {
      if (this.shouldRenderFill(allChildren)) {
        addPanelChild(allChildren);
      } else {
        addPanelBody(allChildren);
      }
    } else {
      allChildren.forEach((child) => {
        if (this.shouldRenderFill(child)) {
          maybeRenderPanelBody();

          // Separately add the filled element.
          addPanelChild(child);
        } else {
          panelBodyChildren.push(child);
        }
      });

      maybeRenderPanelBody();
    }

    return bodyElements;
  };

  shouldRenderFill = (child) => React.isValidElement(child) && !_.isUndefined(child.props.fill);

  renderHeading = () => {
    let { header } = this.props;

    if (!header) {
      return null;
    }

    if (!React.isValidElement(header) || Array.isArray(header)) {
      header = this.props.collapsible ? this.renderCollapsibleTitle(header) : header;
    } else if (this.props.collapsible) {
      header = React.cloneElement(header, {
        className: `panel__title ${header.props.className}`,
        children: this.renderAnchor(header.props.children)
      });
    } else {
      header = React.cloneElement(header, {
        className: `panel__title ${header.props.className}`
      });
    }

    return <div className="panel--heading">{header}</div>;
  };

  renderAnchor = (header) => (
    <a
      href={`#${this.props.id || ''}`}
      className={cx('panel-anchor', this.isExpanded() ? null : 'collapsed')}
      aria-expanded={this.isExpanded() ? 'true' : 'false'}
      onClick={this.handleSelect}
    >
      {header}
    </a>
  );

  renderCollapsibleTitle = (header) => <div className="panel__title">{this.renderAnchor(header)}</div>;

  renderFooter = () => {
    if (!this.props.footer) return null;

    return <div className="panel__footer">{this.props.footer}</div>;
  };

  render() {
    const classes = { panel: true };
    const restProps = _.omit(this.props, [
      'defaultExpanded',
      'expanded',
      'collapsible',
      'header',
      'footer',
      'eventKey'
    ]);

    return (
      <div
        {...restProps}
        className={cx(this.props.className, classes)}
        id={this.props.collapsible ? null : this.props.id}
        onSelect={null}
      >
        {this.renderHeading()}
        {this.props.collapsible ? this.renderCollapsibleBody() : this.renderBody()}
        {this.renderFooter()}
      </div>
    );
  }
}

export default Panel;
