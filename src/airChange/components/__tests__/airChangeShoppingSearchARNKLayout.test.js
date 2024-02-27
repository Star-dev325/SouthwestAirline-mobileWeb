import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import AirChangeShoppingSearchARNKLayout from 'src/airChange/components/airChangeShoppingSearchARNKLayout';

describe('AirChangeShoppingSearchARNKLayout', () => {
  describe('render', () => {
    it('should render page properly', () => {
      const { container } = createComponent({});

      expect(container).toMatchSnapshot();
    });
  });

  const createComponent = (props = {}) => {
    const defaultProps = {};
    const finalProps = { ...defaultProps, ...props };

    return render(<AirChangeShoppingSearchARNKLayout {...finalProps} />);
  };
});
