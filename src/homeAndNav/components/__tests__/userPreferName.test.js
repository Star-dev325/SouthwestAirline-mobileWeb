import { render } from '@testing-library/react';
import React from 'react';
import UserPreferName from 'src/homeAndNav/components/userPreferName';

describe('#userPreferedName', () => {
  let props;

  function renderUserPreferName(props) {
    const finalProps = { isLoggedIn: false, name: '', ...props };

    return render(<UserPreferName {...finalProps} />);
  }

  describe('after login', () => {
    describe('when name is not set', () => {
      it('should not display welcome message', () => {
        const { container } = renderUserPreferName();

        expect(container.querySelector('span')).toBeNull();
      });
      describe('when name is set', () => {
        it('should display welcome message', () => {
          props = {
            isLoggedIn: true,
            name: 'test'
          };

          const { container } = renderUserPreferName(props);

          expect(container.querySelector('span')).not.toBeNull();
        });
      });
    });
  });
});
