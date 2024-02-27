import { render } from '@testing-library/react';
import dayjs from 'dayjs';
import React from 'react';
import AcceptRapidRewardsRulesMessage from 'src/enroll/components/acceptRapidRewardsRulesMessage';

describe('AcceptRapidRewardsRulesMessage', () => {
  describe('enroll Message', () => {
    it('should show enroll acknowledgement link', () => {
      const { container } = createComponent();

      expect(container).toMatchSnapshot();
    });
  });

  describe('minor message', () => {
    it('should show minor message if user is below minor age threshold', () => {
      const dateOfBirth = dayjs().subtract(10, 'years').format('YYYY-MM-DD');
      const { container } = createComponent({ dateOfBirth });

      expect(container).toMatchSnapshot();
    });

    it('should not show minor message if user is is older than minor age threshold', () => {
      const dateOfBirth = dayjs().subtract(20, 'years').format('YYYY-MM-DD');
      const { container } = createComponent({ dateOfBirth });

      expect(container).toMatchSnapshot();
    });

    it('should not show it if user is at minor age threshold', () => {
      const dateOfBirth = dayjs().subtract(13, 'years').format('YYYY-MM-DD');
      const { container } = createComponent({ dateOfBirth });

      expect(container).toMatchSnapshot();
    });

    it('should not show if passed in a younger threshold and user is above that threshold', () => {
      const dateOfBirth = dayjs().subtract(7, 'years').format('YYYY-MM-DD');
      const { container } = createComponent({ dateOfBirth, minorAgeThreshold: 5 });

      expect(container).toMatchSnapshot();
    });
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      dateOfBirth: '2000-03-23',
      minorAgeThreshold: 13
    };

    return render(<AcceptRapidRewardsRulesMessage {...defaultProps} {...props} />);
  };
});
