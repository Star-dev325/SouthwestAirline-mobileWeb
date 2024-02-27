jest.mock('src/shared/bootstrap/urls', () => ({
  lapChildFAQ: '/lapChildFAQ'
}));

import React from 'react';
import LapChildDisclosure from 'src/shared/components/lapChildDisclosure';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'test/unit/helpers/configureMockStore';

describe('LapChildDisclosure', () => {
  describe('render', () => {
    it('should render adult text', () => {
      const { container } = createComponent();

      expect(container).toMatchSnapshot();
    });

    it('should render lap child text', () => {
      const { container } = createComponent({ paxNumber: 1, type: 'lapChild' });

      expect(container).toMatchSnapshot();
    });
  });

  describe('frequent traveler selected', () => {
    it('should render adult text with text-above in className', () => {
      const { container } = createComponent({ paxNumber: 1, type: 'adult', frequentTravelerId: '124XRS' });

      expect(container).toMatchSnapshot();
    });
  });

  describe('frequent traveler not selected', () => {
    it('should render adult text without text-above in className', () => {
      const { container } = createComponent({ paxNumber: 1, type: 'adult' });

      expect(container).toMatchSnapshot();
    });
  });

  const providerStore = configureMockStore()({
    app: {
      airBooking: {
        passengerCountData: {
          lapChildCount: 1,
          adultCount: 1,
          valueUpdated: false
        }
      }
    }
  });

  const createComponent = ({ paxNumber = 0, type = '', frequentTravelerId = '', ...otherProps } = {}) =>
    render(
      <Provider store={providerStore}>
        <LapChildDisclosure paxNumber={paxNumber} type={type} frequentTravelerId={frequentTravelerId} {...otherProps} />
      </Provider>
    );
});
