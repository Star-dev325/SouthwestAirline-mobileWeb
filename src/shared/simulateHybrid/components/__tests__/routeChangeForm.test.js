import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import RouteChangeForm from 'src/shared/simulateHybrid/components/routeChangeForm';

describe('RouteChangeForm', () => {
  const defaultFormData = {
    payload: '',
    route: ''
  };

  it('should render with the correct fields', () => {
    const { container } = render(<RouteChangeForm formData={defaultFormData} />);

    expect(container).toMatchSnapshot();
  });

  it('should call its change handler when the route changes', async () => {
    const newRoute = 'newRoute';
    const onChangeMock = jest.fn();
    const { getByLabelText } = render(<RouteChangeForm formData={defaultFormData} onChange={onChangeMock} />);

    await fireEvent.change(getByLabelText('Route'), { target: { value: newRoute } });

    expect(onChangeMock).toHaveBeenCalledWith({
      payload: defaultFormData.payload,
      route: newRoute
    });
  });

  it('should not throw an exception when a route change occurs and no handler is present', async () => {
    const newRoute = 'newRoute';
    const { getByLabelText } = render(<RouteChangeForm formData={defaultFormData} />);

    await fireEvent.change(getByLabelText('Route'), { target: { value: newRoute } });
  });

  it('should call its change handler when the payload changes', async () => {
    const newPayload = 'newPayload';
    const onChangeMock = jest.fn();
    const { getByLabelText } = render(<RouteChangeForm formData={defaultFormData} onChange={onChangeMock} />);

    await fireEvent.change(getByLabelText('Payload'), { target: { value: newPayload } });

    expect(onChangeMock).toHaveBeenCalledWith({
      payload: newPayload,
      route: defaultFormData.route
    });
  });

  it('should not throw an exception when a route change occurs and no handler is present', async () => {
    const newRoute = 'newRoute';
    const { getByLabelText } = render(<RouteChangeForm formData={defaultFormData} />);

    await fireEvent.change(getByLabelText('Payload'), { target: { value: newRoute } });
  });
});