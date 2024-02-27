import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import UpgradedBoardingPaxInfo from 'src/upgradedBoarding/components/upgradedBoardingPaxInfo';
import UpgradedBoardingPurchaseFormBuilder from 'test/builders/model/upgradedBoardingPurchaseFormBuilder';
import { createMockedForm, createMockedFormStore } from 'test/unit/helpers/formTestUtils';

describe('Upgraded Boarding Pax Info', () => {
  let onSubmitStub;

  beforeEach(() => {
    onSubmitStub = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('it should render', () => {
    it('UpgradedBoardingPaxInfo', () => {
      const { container } = createComponent({});

      expect(container).toMatchSnapshot();
    });

    it('UpgradedBoardingBound with more than one passenger', () => {
      const { upgradedBoardingPurchasePage } = new UpgradedBoardingPurchaseFormBuilder().build();

      const { container } = createComponent({
        passengers: upgradedBoardingPurchasePage.upgradedBoardingSegment[0].passengers
      });

      expect(container).toMatchSnapshot();
    });

    it('UpgradedBoardingBound with UPGRADED_BOARDING_BY_SEGMENT true', () => {
      const { container } = createComponent({ UPGRADED_BOARDING_BY_SEGMENT: true }, true);

      expect(container).toMatchSnapshot();
    });
  });

  const createComponent = (props) => {
    const defaultProps = {
      passengers: [
        {
          name: 'Bobby Blaine (C1))',
          accountNumber: '0123456789',
          _meta: {
            productId: 'abcdefghi'
          }
        }
      ],
      UPGRADED_BOARDING_BY_SEGMENT: false
    };
    const combinedProps = {
      ...defaultProps,
      ...props
    };

    const store = createMockedFormStore();
    const MockedForm = createMockedForm(store, { clickableChildren: true });

    return render(
      <MockedForm formData={{ formCheckBox: true }} onSubmit={onSubmitStub}>
        <UpgradedBoardingPaxInfo {...combinedProps} />
      </MockedForm>
    );
  };
});
