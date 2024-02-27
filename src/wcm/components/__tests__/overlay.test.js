import { render } from '@testing-library/react';
import React from 'react';
import Overlay from 'src/wcm/components/overlay';

describe('Overlay', () => {
  describe('when the element is of type header', () => {
    it('should render a div with className of heading', () => {
      const { container } = render(
        <Overlay
          body={[
            {
              type: 'heading',
              value: 'Hazardous Materials'
            }
          ]}
        />
      );

      const renderedHeaderComponents = container.querySelector('.heading');

      expect(renderedHeaderComponents).toBeTruthy();
    });
  });

  describe('when the element is of type text', () => {
    it('should render a div without the heading class', () => {
      const { container } = render(
        <Overlay
          body={[
            {
              type: 'text',
              value: 'Hazardous Materials'
            }
          ]}
        />
      );

      const renderedHeaderComponents = container.querySelector('.heading');

      expect(renderedHeaderComponents).toBeFalsy();
    });
  });
});
