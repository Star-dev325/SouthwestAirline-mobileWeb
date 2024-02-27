jest.mock('src/shared/components/fullScreenModal/fullScreenModal', () => (props) => <div>{props.children}</div>);
jest.mock('src/shared/components/fullScreenModal/helpers/fullScreenModalHelper');

import i18n from '@swa-ui/locale';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { CAR_BOOKING_COMPANY_MODAL_ID } from 'src/carBooking/constants/carBookingConstants';
import * as FSMHelpers from 'src/shared/components/fullScreenModal/helpers/fullScreenModalHelper';
import CarBookingCompanySelectorField from 'src/shared/form/fields/carBookingCompanySelectorField';
import * as CarVendorsBuilder from 'test/builders/model/carVendorsBuilder';
import { createMockedForm, createMockedFormStore } from 'test/unit/helpers/formTestUtils';

describe('CarBookingCompanySelectorField', () => {
  let onChangeMock;
  let retrieveCarVendorsFnMock;
  let showFullScreenModalMock;
  let wrapper;

  beforeEach(() => {
    onChangeMock = jest.fn();
    retrieveCarVendorsFnMock = jest.fn();
    showFullScreenModalMock = jest.spyOn(FSMHelpers, 'showFullScreenModal');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('display', () => {
    it('should display the label text when the default car companies are given', () => {
      const { container } = createSelectorComponent();

      expect(container.querySelector('[data-qa="car-companies"]').querySelector('label').textContent).toBe(
        'CAR_BOOKING__CAR_VENDOR_FORM__TITLE'
      );
    });

    it('should display the shop all placeholder text when the default car companies are given', () => {
      const { container } = createSelectorComponent();

      expect(container.querySelector('[data-qa="car-booking-company"]').textContent).toBe(
        i18n('CAR_BOOKING__CAR_VENDOR__SHOP_ALL_HINT')
      );
    });
  });

  it('should open car company modal when selector field is clicked', () => {
    const { container } = createSelectorComponent();

    fireEvent.click(container.querySelector('[data-qa="car-companies"]'));
    expect(showFullScreenModalMock).toBeCalledWith(CAR_BOOKING_COMPANY_MODAL_ID);
  });

  it('should call fetch  if car vendors is empty', () => {
    const { container } = createSelectorComponent({ carVendors: [] });

    fireEvent.click(container.querySelector('[data-qa="car-companies"]'));

    expect(retrieveCarVendorsFnMock).toBeCalled();
  });

  describe('onChange', () => {
    let doneButton;

    const findAllUnCheckCompanyCards = (page) => page.querySelectorAll('.hide');

    it('should call onChange callback with Shop all when Done button is pressed with no changes', () => {
      const { container } = createSelectorComponent();

      fireEvent.click(container.querySelector('[data-qa="car-companies"]'));

      doneButton = container.querySelector('.action-bar-buttons--item').querySelector('button');

      fireEvent.click(doneButton);

      expect(onChangeMock).toBeCalledWith('CAR_BOOKING__CAR_VENDOR__SHOP_ALL_HINT');
      expect(findAllUnCheckCompanyCards(container).length).toBe(0);
    });

    describe('selecting companies interactions', () => {
      it('should call onChange with Shop All Rapid Rewards Partners group when only Shop All Rapid Rewards group is checked', () => {
        const { container, getByText } = createSelectorComponent();

        fireEvent.click(container.querySelector('[data-qa="car-companies"]'));

        doneButton = container.querySelector('.action-bar-buttons--item').querySelector('button');

        fireEvent.click(getByText('CAR_BOOKING__CAR_VENDOR__SHOP_ALL_OTHERS_OPTION'));
        fireEvent.click(doneButton);

        expect(onChangeMock).toBeCalledWith([
          { vendorId: 'ALAMO', vendorName: 'Alamo' },
          { vendorId: 'AVIS', vendorName: 'Avis' },
          { vendorId: 'BUDGET', vendorName: 'Budget' },
          { vendorId: 'DOLLAR', vendorName: 'Dollar' },
          { vendorId: 'HERTZ', vendorName: 'Hertz' },
          { vendorId: 'ZL', vendorName: 'National' },
          { vendorId: 'ZA', vendorName: 'Payless' },
          { vendorId: 'THRIFTY', vendorName: 'Thrifty' }
        ]);
        expect(findAllUnCheckCompanyCards(container).length).toBe(6);
      });

      it('should call onChange with Shop All Other group when only Shop All Others is checked', () => {
        const { container, getByText } = createSelectorComponent();

        fireEvent.click(container.querySelector('[data-qa="car-companies"]'));

        doneButton = container.querySelector('.action-bar-buttons--item').querySelector('button');

        fireEvent.click(getByText('CAR_BOOKING__CAR_VENDOR__RAPID_REWARDS_PARTNERS'));
        fireEvent.click(doneButton);

        expect(onChangeMock).toBeCalledWith([
          { vendorId: 'AD', vendorName: 'Advantage' },
          { vendorId: 'EZ', vendorName: 'EZ' },
          { vendorId: 'ET', vendorName: 'Enterprise' },
          { vendorId: 'FX', vendorName: 'Fox' }
        ]);
        expect(findAllUnCheckCompanyCards(container).length).toBe(10);
      });

      it('should call onChange with single company Budget when Shop All click then Budget is clicked', () => {
        const { container, getByText } = createSelectorComponent();

        fireEvent.click(container.querySelector('[data-qa="car-companies"]'));

        doneButton = container.querySelector('.action-bar-buttons--item').querySelector('button');

        fireEvent.click(getByText('CAR_BOOKING__CAR_VENDOR__SHOP_ALL_OPTION'));
        fireEvent.click(getByText('Budget'));
        fireEvent.click(doneButton);

        expect(onChangeMock).toBeCalledWith([{ vendorId: 'BUDGET', vendorName: 'Budget' }]);
        expect(findAllUnCheckCompanyCards(container).length).toBe(14);
      });
    });
  });

  const createSelectorComponent = (props) => {
    const defaultProps = {
      carVendors: CarVendorsBuilder.build(),
      name: 'vendorSelectField',
      onChange: onChangeMock,
      retrieveCarVendorsFn: retrieveCarVendorsFnMock,
      value: i18n('CAR_BOOKING__CAR_VENDOR__SHOP_ALL_HINT')
    };

    const mergedProps = { ...defaultProps, ...props };

    const state = {
      app: {},
      router: {
        location: {
          search: `_modal=${CAR_BOOKING_COMPANY_MODAL_ID}`
        }
      }
    };
    const MockedForm = createMockedForm(createMockedFormStore(state));

    wrapper = render(
      <MockedForm onSubmit={jest.fn()}>
        <CarBookingCompanySelectorField {...mergedProps} />
      </MockedForm>
    );

    return wrapper;
  };
});
