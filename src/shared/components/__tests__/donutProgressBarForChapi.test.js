import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import { DonutProgressBar } from 'src/shared/components/donutProgressBarForChapi';

describe('DonutProgressBar', () => {
  it('should set default state without props', () => {
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });
});

const createComponent = () => render(<DonutProgressBar />);
