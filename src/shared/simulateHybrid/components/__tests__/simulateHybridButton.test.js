jest.mock('src/shared/simulateHybrid/webViewSimulator', () => ({
  addSimulatorInterface: jest.fn(),
  removeSimulatorInterface: jest.fn()
}));
jest.mock('src/shared/components/fullScreenModal/helpers/fullScreenModalHelper', () => ({
  showFullScreenModal: jest.fn()
}));

import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { showFullScreenModal } from 'src/shared/components/fullScreenModal/helpers/fullScreenModalHelper';
import { SimulateHybridButton } from 'src/shared/simulateHybrid/components/simulateHybridButton';
import { addSimulatorInterface, removeSimulatorInterface } from 'src/shared/simulateHybrid/webViewSimulator.js';

describe('SimulateHybridButton', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be visible when hyrbid simulation is toggled on', () => {
    const { container } = render(<SimulateHybridButton toggles={{ SIMULATE_HYBRID: true }} />);

    expect(container).toMatchSnapshot();
  });

  it('should not be visible when hybrid simulation is toggled off', () => {
    const { container } = render(<SimulateHybridButton toggles={{ SIMULATE_HYBRID: false }} />);

    expect(container).toMatchSnapshot();
  });

  it('should add the simulator interface when mounted', () => {
    render(<SimulateHybridButton toggles={{ SIMULATE_HYBRID: true }} />);

    expect(addSimulatorInterface).toHaveBeenCalled();
  });

  it('should remove the simulator interface when unmounted', () => {
    render(<SimulateHybridButton toggles={{ SIMULATE_HYBRID: false }} />);

    expect(removeSimulatorInterface).toHaveBeenCalled();
  });

  it('should show the hybrid modal when clicked', () => {
    const { getByText } = render(<SimulateHybridButton />);

    fireEvent.click(getByText('Hybrid'));

    expect(showFullScreenModal).toHaveBeenCalledWith('_hybrid');
  });
});