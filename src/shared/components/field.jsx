// @flow
import React from 'react';
import _ from 'lodash';
import cx from 'classnames';

/**
 * Field. need to work with `Fields` and `Form`
 */

type Props = {
  label?: string,
  error?: boolean,
  children?: *,
  className?: string
};

const Field = (props: Props) => {
  const { label, className, children, error } = props;
  const restProps = _.omit(props, ['fieldClassName', 'fieldLabel', 'label', 'className', 'children', 'error', 'wide']);

  return (
    <div className={cx('field', className, { error: !!error })} {...restProps}>
      {label && <label>{label}</label>}
      {children}
    </div>
  );
};

export default Field;
