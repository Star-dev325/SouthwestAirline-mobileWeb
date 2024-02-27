// @flow
import cx from 'classnames';
import React, { useEffect } from 'react';
import Button from 'src/shared/components/button';
import { showFullScreenModal } from 'src/shared/components/fullScreenModal/helpers/fullScreenModalHelper';
import withFeatureToggles from 'src/shared/enhancers/withFeatureToggles';
import { addSimulatorInterface, removeSimulatorInterface } from 'src/shared/simulateHybrid/webViewSimulator.js';

type Props = {
  toggles: {
    SIMULATE_HYBRID: boolean
  }
};

export const SimulateHybridButton = ({ toggles: { SIMULATE_HYBRID } = {} }: Props) => {
  useEffect(() => {
    if (SIMULATE_HYBRID) {
      addSimulatorInterface();
    } else {
      removeSimulatorInterface();
    }
  }, [SIMULATE_HYBRID]);

  const _handleClick = () => {
    showFullScreenModal('_hybrid');
  };

  const getClassName = () => cx({
    'simulate-hybrid-button': true,
    'simulate-hybrid-button_visible': SIMULATE_HYBRID
  });

  const getButtonProps = () => ({
    className: getClassName(),
    color: 'yellow',
    fluid: true,
    onClick: _handleClick,
    role: 'submit',
    size: 'larger',
    type: 'submit'
  });

  return (
    <Button {...getButtonProps()}>Hybrid</Button>
  );
};

export default withFeatureToggles(SimulateHybridButton);
