import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import DonutProgressBar from 'src/shared/components/donutProgressBar';

describe('DonutProgressBar', () => {
  describe('render', () => {
    it('should render props', () => {
      const { container } = createComponent();

      expect(container).toMatchSnapshot();
    });

    it('should set default state without props', () => {
      const { container } = createComponent();

      expect(container.querySelector('.donut-progress-bar')).not.toBeNull();
    });
  });
});

const createComponent = () => render(<DonutProgressBar />);
