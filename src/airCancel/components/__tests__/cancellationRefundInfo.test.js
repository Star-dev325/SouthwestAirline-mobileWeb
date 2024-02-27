import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { viewCancelReservationPage } from 'mocks/templates/air-cancel/viewCancelReservationPageByPoints';
import React from 'react';
import CancellationRefundInfo from 'src/airCancel/components/cancellationRefundInfo';
import ViewReservationForCancelBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/page/cancel/viewReservationForCancelBuilder';
import { createMockedForm, createMockedFormStore } from 'test/unit/helpers/formTestUtils';

describe('cancellationRefundInfo', () => {
  const store = createMockedFormStore();
  const MockedForm = createMockedForm(store, {});
  
  describe('with dollar only', () => {
    it('should render with both refundable and nonrefunable funds', () => {
      const { viewCancelReservationPage } = new ViewReservationForCancelBuilder().build();
      const props = {
        nonRefundableFunds: viewCancelReservationPage.nonRefundableFunds,
        priceTotals: viewCancelReservationPage.tripTotals,
        refundableFunds: viewCancelReservationPage.refundableFunds
      };
      const { container } = createComponent(props);

      expect(container).toMatchSnapshot();
    });

    it('should render with only refundable funds', () => {
      const { viewCancelReservationPage } = new ViewReservationForCancelBuilder().withOnlyRefundableFunds().build();
      const props = {
        nonRefundableFunds: viewCancelReservationPage.nonRefundableFunds,
        priceTotals: viewCancelReservationPage.tripTotals,
        refundableFunds: viewCancelReservationPage.refundableFunds
      };
      const { container } = createComponent(props);

      expect(container).toMatchSnapshot();
    });

    it('should render with only nonrefundable funds', () => {
      const { viewCancelReservationPage } = new ViewReservationForCancelBuilder().withOnlyNonRefundableFunds().build();
      const props = {
        nonRefundableFunds: viewCancelReservationPage.nonRefundableFunds,
        priceTotals: viewCancelReservationPage.tripTotals,
        refundableFunds: viewCancelReservationPage.refundableFunds
      };
      const { container } = createComponent(props);

      expect(container).toMatchSnapshot();
    });
  });

  describe('with points', () => {
    it('should render with both refundable and nonrefunable funds', () => {
      const props = {
        nonRefundableFunds: viewCancelReservationPage.nonRefundableFunds,
        pointsToCreditTotal: viewCancelReservationPage.pointsToCreditTotal,
        priceTotals: viewCancelReservationPage.tripTotals,
        refundableFunds: viewCancelReservationPage.refundableFunds
      };
      const { container } = createComponent(props);

      expect(container).toMatchSnapshot();
    });

    it('should render with only refundable funds', () => {
      const props = {
        nonRefundableFunds: null,
        priceTotals: viewCancelReservationPage.tripTotals,
        refundableFunds: viewCancelReservationPage.refundableFunds
      };
      const { container } = createComponent(props);

      expect(container).toMatchSnapshot();
    });

    it('should render with only nonrefundable funds', () => {
      const props = {
        nonRefundableFunds: viewCancelReservationPage.nonRefundableFunds,
        pointsToCreditTotal: null,
        priceTotals: viewCancelReservationPage.tripTotals,
        refundableFunds: null
      };
      const { container } = createComponent(props);

      expect(container).toMatchSnapshot();
    });
  });

  const createComponent = (props) => render(
    <MockedForm initialFormData={{ refundMethod: '' }} onSubmit={() => {}}>
      <CancellationRefundInfo {...props} />
    </MockedForm>
  );
});
