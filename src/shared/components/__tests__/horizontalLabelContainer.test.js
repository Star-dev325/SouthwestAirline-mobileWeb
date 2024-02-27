import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import HorizontalLabelContainer from 'src/shared/components/horizontalLabelContainer';

describe('HorizontalLabelContainer', () => {
  describe('with custom props', () => {
    it('should apply them to the label', () => {
      const { container } = render(
        <HorizontalLabelContainer labelClassName="some-class-name" label="something">
          hello
        </HorizontalLabelContainer>
      );

      expect(container.querySelector('.some-class-name')).toBeInTheDocument();
    });
  });
});
