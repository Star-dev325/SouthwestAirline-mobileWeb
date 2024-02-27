jest.mock('src/shared/simulateHybrid/hybridMessageForms', () => ({
  ROUTE_CHANGE: {
    component: (formData, onChange) => <button onClick={() => onChange(formData)}>ROUTE_CHANGE</button>,
    defaultFormData: { value: '' },
    submitFn: jest.fn()
  }, 
  FAKE_MESSAGE: {
    component: (formData, onChange) => <button onClick={() => onChange(formData)}>FAKE_MESSAGE</button>,
    defaultFormData: { value: '' },
    submitFn: jest.fn()
  }
}));
jest.mock('src/shared/simulateHybrid/hybridMessageOptions', () => ([
  { label: 'Route Change', value: 'ROUTE_CHANGE' }, { label: 'Fake Message', value: 'FAKE_MESSAGE' }
]));

import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import SimulateHybridForm from 'src/shared/simulateHybrid/components/simulateHybridForm';
import hybridMessageForms from 'src/shared/simulateHybrid/hybridMessageForms';

describe('SimulateHybridForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render with the default route change form', () => {
    const { container } = render(<SimulateHybridForm />);

    expect(container).toMatchSnapshot();
  });

  it('should switch forms when they are updated', () => {
    const { container, getByLabelText } = render(<SimulateHybridForm />);

    fireEvent.change(getByLabelText('Message'), { target: { value: 'FAKE_MESSAGE' } });

    expect(container).toMatchSnapshot();
  });

  it('should call the submit function provided by the loaded message form', () => {
    const { defaultFormData, submitFn } = hybridMessageForms.ROUTE_CHANGE;
    const { getByText } = render(<SimulateHybridForm />);

    fireEvent.click(getByText('Send Message'));

    expect(submitFn).toHaveBeenCalledWith({
      ...defaultFormData,
      messageType: 'ROUTE_CHANGE'
    });
  });

  it('should call the submit callback provided by its parent', () => {
    const { defaultFormData } = hybridMessageForms.ROUTE_CHANGE;
    const submitMock = jest.fn();
    const { getByText } = render(<SimulateHybridForm onSubmit={submitMock} />);

    fireEvent.click(getByText('Send Message'));

    expect(submitMock).toHaveBeenCalledWith({
      ...defaultFormData,
      messageType: 'ROUTE_CHANGE'
    });
  });
});