import React from 'react';
import { shallow } from 'enzyme';
import FormattedTime from 'src/shared/components/formattedTime';

describe('FormattedTime', () => {
  const createComponent = (props) => shallow(<FormattedTime {...props} />);

  context('rendering time', () => {
    it('shows only the hour and minutes for AM', () => {
      const timeComponent = createComponent({ time: '08:05' });

      expect(timeComponent).to.have.text('8:05AM');
    });

    it('shows only the hour and minutes for PM', () => {
      const timeComponent = createComponent({ time: '14:32' });

      expect(timeComponent).to.have.text('2:32PM');
    });
  });
});
