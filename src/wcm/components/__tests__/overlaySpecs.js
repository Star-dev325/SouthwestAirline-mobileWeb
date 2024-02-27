import React from 'react';
import { mount } from 'enzyme';

describe('Overlay', () => {
  let Overlay;

  beforeEach(() => {
    Overlay = require('src/wcm/components/overlay').default;
  });

  context('when the element is of type header', () => {
    it('should render a div with className of heading', () => {
      const overlay = mount(
        <Overlay
          body={[
            {
              type: 'heading',
              value: 'Hazardous Materials'
            }
          ]}
        />
      );

      const renderedHeaderComponents = overlay.find('.heading');

      expect(renderedHeaderComponents).to.be.present();
    });
  });

  context('when the element is of type text', () => {
    it('should render a div without the heading class', () => {
      const overlay = mount(
        <Overlay
          body={[
            {
              type: 'text',
              value: 'Hazardous Materials'
            }
          ]}
        />
      );

      const renderedHeaderComponents = overlay.find('.heading');

      expect(renderedHeaderComponents).to.not.exist;
    });
  });
});
