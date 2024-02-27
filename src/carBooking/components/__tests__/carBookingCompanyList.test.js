import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import CarBookingCompanyList from 'src/carBooking/components/carBookingCompanyList';
import { createMockStoreWithRouterMiddleware } from 'test/unit/helpers/createMockStore';

describe('CarBookingCompanyList', () => {
  let matchedCard;
  let onCarCompanyGroupSelectFnStub;
  let onCarCompanySelectDoneFnStub;
  let onCarCompanySelectFnStub;

  beforeEach(() => {
    onCarCompanyGroupSelectFnStub = jest.fn();
    onCarCompanySelectDoneFnStub = jest.fn();
    onCarCompanySelectFnStub = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const convertCompanyName = (name) => (name === 'Shop All Rapid Rewards® Partners' ? 'Shop All Rapid Rewards Partners' : name);
  const expectCompanyIsChecked = (container, isChecked) => {
    if (isChecked) {
      expect(container.querySelector('.hide')).toBeNull();
    } else {
      expect(container.querySelector('.hide')).not.toBeNull();
    }
  };

  const clickCompanyCardsByLabel = (container, label) => {
    container.querySelectorAll('.car-company-card').forEach((card) => {
      if (convertCompanyName(card.textContent === label[0])) {
        fireEvent.click(card);
        matchedCard = card;
      }
    });
  };

  describe('display', () => {
    it('should render PageHeaderWithButtons', () => {
      const { container } = createComponent();

      expect(container.querySelector('.page-header.action-bar')).not.toBeNull();
    });

    it('should render action bar title', () => {
      const { container } = createComponent();

      expect(container.querySelector('.action-bar--main-title').textContent).toEqual('Select Car Companies');
    });

    it('should render action bar Done button', () => {
      const { container } = createComponent();

      expect(container.querySelector('.button').textContent).toEqual('Done');
    });

    it('should render Shop All as checked', () => {
      const { container } = createComponent();

      clickCompanyCardsByLabel(container, ['Shop All']);

      expectCompanyIsChecked(matchedCard, true);
    });

    it('should render Shop All Rapid Rewards Partners as checked', () => {
      const { container } = createComponent();

      clickCompanyCardsByLabel(container, ['Shop All Rapid Rewards Partners']);

      expectCompanyIsChecked(matchedCard, true);
    });

    it('should render Shop All Others as checked', () => {
      const { container } = createComponent();

      clickCompanyCardsByLabel(container, ['Shop All Others']);

      expectCompanyIsChecked(matchedCard, true);
    });
  });

  describe('onCarCompanyGroupSelectFn', () => {
    it('should call onCarCompanyGroupSelectFn when a group is selected', () => {
      const { container } = createComponent();

      clickCompanyCardsByLabel(container, ['Shop All']);

      expect(onCarCompanyGroupSelectFnStub).toHaveBeenCalledWith({
        isSelected: false,
        name: 'Shop All',
        vendorId: undefined
      }, 0);
    });

    it('should not call onCarCompanySelectFnStub when a group is selected', () => {
      const { container } = createComponent();

      clickCompanyCardsByLabel(container, ['Shop All']);

      expect(onCarCompanySelectFnStub).not.toHaveBeenCalled();
    });
  });

  describe('onCarCompanySelectFnStub', () => {
    it('should call onCarCompanySelectFnStub when an individual company is selected', () => {
      const { container } = createComponent();

      clickCompanyCardsByLabel(container, ['Budget']);

      expect(onCarCompanySelectFnStub).toHaveBeenLastCalledWith(
        {
          isSelected: false,
          name: 'Budget',
          vendorId: 'BUDGET'
        },
        1
      );
    });

    it('should not call onCarCompanyGroupSelectFn when an individual company is selected', () => {
      const { container } = createComponent();

      clickCompanyCardsByLabel(container, ['Budget']);

      expect(onCarCompanyGroupSelectFnStub).not.toHaveBeenCalled();
    });
  });

  describe('onCarCompanySelectDoneFnStub', () => {
    it('should call onCarCompanySelectDoneFnStub when Done button is pressed', () => {
      const { container } = createComponent();

      fireEvent.click(container.querySelector('.button'));

      expect(onCarCompanySelectDoneFnStub).toHaveBeenCalled();
    });
  });

  const createCarVendor = (name, isSelected, vendorId) => {
    const carVendor = {
      name,
      isSelected
    };

    vendorId ? (carVendor.vendorId = vendorId) : null;

    return carVendor;
  };

  const createComponent = (props) => {
    const OtherChildOption1 = createCarVendor('EZ', true, 'EZ');
    const OtherChildOption2 = createCarVendor('Advantage', true, 'AD');
    const OtherOptionHeader = createCarVendor('Shop All Others', true);
    const RRChildOption1 = createCarVendor('Budget', true, 'BUDGET');
    const RRChildOption2 = createCarVendor('Dollar', true, 'DOLLAR');
    const RROptionHeader = createCarVendor('Shop All Rapid Rewards Partners', true);
    const shopAllOptions = createCarVendor('Shop All', true);

    const carVendors = [
      [shopAllOptions],
      [RROptionHeader, RRChildOption1, RRChildOption2],
      [OtherOptionHeader, OtherChildOption1, OtherChildOption2]
    ];

    const defaultProps = {
      carVendors,
      onCarCompanyGroupSelectFn: onCarCompanyGroupSelectFnStub,
      onCarCompanySelectDoneFn: onCarCompanySelectDoneFnStub,
      onCarCompanySelectFn: onCarCompanySelectFnStub
    };

    return render(
      <Provider store={createMockStoreWithRouterMiddleware()()}>
        <CarBookingCompanyList {...defaultProps} {...props} />
      </Provider>
    );
  };
});
