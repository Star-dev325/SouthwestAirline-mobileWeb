import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import Alert from 'src/airports/components/alert';

describe('Alert', () => {
  it('should render the icon src value correctly', () => {
    const { container } = createComponent();

    expect(container.querySelector('.icon')).toHaveAttribute('src', '/content/mkt/images/airport_info/alert.jpg');
  });

  it('should render the title correctly', () => {
    const { container } = createComponent();

    expect(container.querySelector('.title').textContent).toContain('Airport Alert');
  });

  it('should render the description correctly', () => {
    const { container } = createComponent();

    expect(container.querySelector('.description').textContent).toContain(
      'Due to airport construction on the baggage claim roadway, please park in the hourly garage or the surface lot/cell phone waiting area when picking up Passengers.The first hour in the garage is free.'
    );
  });

  const createComponent = () => {
    const props = {
      description:
        'Due to airport construction on the baggage claim roadway, please park in the hourly garage or the surface lot/cell phone waiting area when picking up Passengers.The first hour in the garage is free.',
      icon: {
        src: '/content/mkt/images/airport_info/alert.jpg'
      },
      title: 'Airport Alert'
    };

    return render(<Alert {...props} />);
  };
});
