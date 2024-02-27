// @flow

import React from 'react';
import _ from 'lodash';
import cx from 'classnames';
import NavItemLink from 'src/shared/components/navItemLink';
import withField from 'src/shared/form/enhancers/withField';

import type { FieldProps } from 'src/shared/form/flow-typed/form.types';

type Props = {
  onNavItemClick: () => void,
  placeholder: string,
  className?: string,
  shouldShowDisplayValue?: boolean,
  disabled?: boolean,
  icon?: string,
  iconClassName?: string
} & FieldProps;

class FormNavItemField extends React.Component<Props> {
  static defaultProps = {
    shouldShowDisplayValue: true,
    disabled: false,
    className: ''
  };

  render() {
    const {
      placeholder,
      value,
      shouldShowDisplayValue,
      disabled,
      className,
      name,
      error,
      onNavItemClick,
      icon,
      iconClassName
    } = this.props;

    return (
      <NavItemLink
        onClick={disabled ? _.noop : onNavItemClick}
        name={name}
        className={cx('nav-item-field', className, { error: !_.isEmpty(error) })}
        disabled={disabled}
        icon={icon}
        iconClassName={iconClassName}
      >
        <div className="fullwidth">
          <span>{placeholder}</span>
          <div className="nav-item-field-value" data-qa="nav-item-field-value">
            {shouldShowDisplayValue && value}
          </div>
        </div>
      </NavItemLink>
    );
  }
}

export default withField()(FormNavItemField);

export const FormNavItemFieldWithOptions = (options: *) => withField(options)(FormNavItemField);
