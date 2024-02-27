// @flow
import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import cx from 'classnames';
import type { ComponentType } from 'react';
import { addClass, removeClass } from 'src/shared/helpers/domUtils';
import { viewModal } from 'src/shared/analytics/actions/analyticsActions';
import withDisableScrolling from 'src/shared/enhancers/withDisableScrolling';

import type { DialogOptionsType } from 'src/shared/flow-typed/dialog.types';

type Props = DialogOptionsType & {
  Component?: ComponentType<*>
};

export class AbstractPopup extends React.Component<Props> {
  static defaultProps = {
    onDimmerClick: _.noop
  };

  shouldComponentUpdate(nextProps: *, nextState: *) {
    return !_.isEqual(nextProps, this.props) || !_.isEqual(nextState, this.state);
  }

  UNSAFE_componentWillUpdate(newProps: {
    active?: boolean,
    name?: string,
    title?: string,
    onViewModalFn?: (*) => void
  }) {
    if (newProps.active === this.props.active) {
      return;
    }

    if (!!newProps.onViewModalFn && newProps.active === true && this.props.active === false) {
      newProps.onViewModalFn(newProps.name || newProps.title);
    }

    if (newProps.active) {
      addClass(document.body, 'has-pop-up');
    } else {
      removeClass(document.body, 'has-pop-up');
    }
  }

  componentWillUnmount() {
    removeClass(document.body, 'has-pop-up');
  }

  render() {
    const { active, bodyClassName, bottom, children, className, Component, headClassName, hasStickyFooterButton, links, name, onDimmerClick, title, titleClassName } = this.props;
    const hasChildren = children && _.some(children, (child) => !_.isEmpty(child));
    const hasTitle = !_.isEmpty(title);

    return active ? (
      <div className={cx('popups', className)} data-qa={name}>
        <div className={active ? 'backdrop visible active' : 'backdrop'} onClick={onDimmerClick} />
        <div className={cx('popup-container', { 'popup-showing active': active, 'popup-container_bottom': bottom })}>
          <div
            className={cx('popup', bodyClassName, {
              'controlled-height': hasStickyFooterButton,
              popup_bottom: bottom
            })}
          >
            <div className={cx('popup-head', headClassName, { hide: !hasTitle })}>
              <h3 className={cx('popup-title', titleClassName)}>{title}</h3>
            </div>
            <div className={cx('popup-body', { pt5: !hasTitle, hide: !hasChildren })}>{children}</div>
            <div
              className={cx('popup-buttons', {
                'block-buttons': !!links,
                'sticky-footer-buttons': hasStickyFooterButton
              })}
              data-qa="buttons-wrapper"
            >
              <div
                className={cx({
                  'popup-buttons--horizontal': !links,
                  'popup-buttons--vertical': !!links
                })}
              >
                {!!Component && <Component {...this.props} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : null;
  }
}

const mapDispatchToProps = {
  onViewModalFn: viewModal
};

const mapStateToProps = (state) => ({
  hasStickyFooterButton: state?.app?.dialog?.hasStickyFooterButton
});

const withAbstractPopup = (Popup: ComponentType<*>) => (Component: ComponentType<*>) => (props: Props) =>
  <Popup Component={Component} {...props} />;

const enhancers = _.flowRight(withAbstractPopup, connect(mapStateToProps, mapDispatchToProps), withDisableScrolling());

export default enhancers(AbstractPopup);
