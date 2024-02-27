// @flow
import Button from 'src/shared/components/button';
import cx from 'classnames';
import React from 'react';

type Props = {
  className?: string,
  sliderClassName?: string,
  checked?: boolean,
  onChange?: (*) => void,
  onTransitionEnd?: (*) => void,
  disabled?: boolean
};

const ToggleSwitch = (props: Props) => {
  const { className, sliderClassName, checked, onChange, onTransitionEnd, disabled } = props;

  const _handleButtonClick = () => {
    if (onChange) {
      onChange(!checked);
    }
  };

  const _handleTransitionEnd = (event: SyntheticTransitionEvent<*>) => {
    if (onTransitionEnd && event.propertyName === 'transform') {
      onTransitionEnd();
    }
  };

  const buttonClass = cx(className, {
    'toggle-switch': true,
    'toggle-switch_checked': checked,
    'toggle-switch_disabled': disabled
  });

  const sliderClass = cx(sliderClassName, {
    'toggle-switch--slider': true,
    'toggle-switch--slider_checked': checked,
    'toggle-switch--slider_disabled': disabled
  });

  return (
    <Button className={buttonClass} onClick={_handleButtonClick} disabled={disabled}>
      <div className={sliderClass} onTransitionEnd={_handleTransitionEnd} />
    </Button>
  );
};

export default ToggleSwitch;
