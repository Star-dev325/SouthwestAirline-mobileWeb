// @flow
import React from 'react';
import cx from 'classnames';
import Icon from 'src/shared/components/icon';

type Props = {
  className?: string,
  onClick: () => *,
  iconType: string,
  children: *,
  childClassName?: string,
  dataQa?: string,
  iconRight?: boolean
};

const ClickableDiv = (props: Props) => {
  const { onClick, iconType, iconRight, children, childClassName, dataQa } = props;

  return (
    <div className={cx('clickable-div input', props.className)} onClick={onClick}>
      {!!iconType && !iconRight && (
        <div className="input--label">
          <Icon type={iconType} />
        </div>
      )}
      <div data-qa={dataQa} className={childClassName}>
        {children}
      </div>
      {!!iconType && !!iconRight && (
        <div className="input--label">
          <Icon type={iconType} />
        </div>
      )}
    </div>
  );
};

export default ClickableDiv;
