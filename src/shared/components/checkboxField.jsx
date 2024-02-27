// @flow
import React from 'react';
import _ from 'lodash';
import cx from 'classnames';
import Icon from 'src/shared/components/icon';

import type { Node } from 'react';

type Props = {
  checked?: boolean,
  onChange?: (?boolean) => void,
  alignTop?: boolean,
  clickableChildren?: boolean,
  noChildrenLeftMargin?: boolean,
  children?: Node,
  checkBoxClassName?: string,
  childrenClassName?: string,
  className?: string,
  hideCheckboxButtonClass?: boolean
};

class CheckboxField extends React.Component<Props> {
  static defaultProps = {
    clickableChildren: false,
    checked: false,
    alignTop: false,
    noChildrenLeftMargin: false
  };

  constructor(props: Props) {
    super(props);
  }

  _onClick = () => {
    const { onChange, checked } = this.props;

    onChange && onChange(!checked);
  };

  render() {
    const {
      clickableChildren,
      className,
      alignTop,
      checked,
      noChildrenLeftMargin,
      checkBoxClassName,
      children,
      childrenClassName,
      hideCheckboxButtonClass,
      ...other
    } = this.props;
    const restProps = _.omit(other, ['checked', 'clearError', 'error']);

    return (
      <div
        onClick={clickableChildren ? this._onClick : undefined}
        className={cx(className, 'relative flex', {
          'checkbox-button': !hideCheckboxButtonClass && className !== 'checkbox-button',
          'checkbox-button--row_checked': checked,
          'flex-cross-center': !alignTop,
          'flex-cross-start': alignTop
        })}
        {...restProps}
      >
        <div className={checkBoxClassName}>
          <span
            onClick={!clickableChildren ? this._onClick : undefined}
            className={cx('checkbox-button--mark', { 'checkbox-button_checked': checked })}
          >
            <Icon type="check" className="absolute xlarge bgtransp" />
          </span>
        </div>
        <div className={childrenClassName}>
          <div className={cx('checkbox-button--children flex-equal-width', { ml2: !noChildrenLeftMargin })}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}

export default CheckboxField;
