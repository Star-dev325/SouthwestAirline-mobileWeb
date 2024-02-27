import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import _ from 'lodash';
import React from 'react';
import RefundSummaryForCancel from 'src/airCancel/components/refundSummaryForCancel';

describe('refundSummaryForCancel', () => {
  describe('render', () => {
    describe('in summary page', () => {
      const props = {
        refundableFunds: {
          item: 'Refund Label',
          itemTotalLabel: 'Refund Total Label',
          amount: '100.00',
          currencyCode: 'USD',
          currencySymbol: '$',
          itemSubText: 'Hold for future use'
        },
        nonRefundableFunds: {
          item: 'Credit Label',
          itemTotalLabel: 'Credit Total Label',
          amount: '20.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        pointsToCreditTotal: null,
        refundMethod: 'HOLD_FOR_FUTURE_USE',
        showRefundableSelection: true
      };

      describe('dollar', () => {
        it('should render both refundable and nonrefundable', () => {
          const { container } = createComponent(props);

          expect(container).toMatchSnapshot();
        });

        it('should render with only refundable funds', () => {
          const { container } = createComponent(_.omit(props, 'nonRefundableFunds'));

          expect(container).toMatchSnapshot();
        });

        it('should render with only nonrefundable funds', () => {
          const { container } = createComponent(_.omit(props, 'refundableFunds'));
          
          expect(container).toMatchSnapshot();
        });
      });

      describe('points', () => {
        const props = {
          refundableFunds: {
            item: 'Refund Label',
            itemTotalLabel: 'Refund Total Label',
            amount: '10.00',
            currencyCode: 'USD',
            currencySymbol: '$',
            itemSubText: null
          },
          nonRefundableFunds: {
            item: 'Credit Label',
            itemTotalLabel: 'Credit Total Label',
            amount: '20.00',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          pointsToCreditTotal: {
            item: 'Points Credit',
            itemTotalLabel: 'Points Credit Label',
            amount: '16,310',
            currencyCode: 'PTS',
            currencySymbol: null
          },
          pointsToCreditAccount: '78263876',
          refundMethod: 'HOLD_FUTURE_USE',
          showRefundableSelection: true
        };

        it('should render points credit total, refundable and nonrefundable when cancel with points and mix refund', () => {
          const { container } = createComponent(props);

          expect(container).toMatchSnapshot();
        });
      });
    });

    describe('in quote page', () => {
      const props = {
        refundableFunds: {
          item: 'Refund Label',
          itemTotalLabel: 'Refund Total Label',
          amount: '100.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        nonRefundableFunds: {
          item: 'Credit Label',
          itemTotalLabel: null,
          amount: '20.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        pointsToCreditTotal: null,
        refundMethod: 'HOLD_FUTURE_USE',
        isCancelBoundFlow: true,
        showRefundableSelection: true
      };

      describe('dollar', () => {
        it('should render both refundable and nonrefundable', () => {
          const { container } = createComponent(props);

          expect(container).toMatchSnapshot();
        });

        it('should render with only refundable funds', () => {
          const { container } = createComponent(_.omit(props, 'nonRefundableFunds'));

          expect(container).toMatchSnapshot();
        });

        it('should render with only nonrefundable funds', () => {
          const { container } = createComponent(_.omit(props, 'refundableFunds'));

          expect(container).toMatchSnapshot();
        });

        it('should render refund to credit card on refundable items if showRefundableSelection is false', () => {
          const { container } = createComponent(_.set(props, 'showRefundableSelection', false));

          expect(container).toMatchSnapshot();
        });
      });

      describe('points', () => {
        const props = {
          refundableFunds: {
            item: 'Refund Label',
            itemTotalLabel: 'Refund Total Label',
            amount: '10.00',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          nonRefundableFunds: {
            item: 'Credit Label',
            itemTotalLabel: 'Credit Total Label',
            amount: '20.00',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          pointsToCreditTotal: {
            item: 'Points Credit',
            itemTotalLabel: 'Points Credit Label',
            amount: '16,310',
            currencyCode: 'PTS',
            currencySymbol: null
          },
          pointsToCreditAccount: '78263876',
          refundMethod: 'HOLD_FUTURE_USE',
          isCancelBoundFlow: true,
          showRefundableSelection: true
        };

        it('should render points credit total, refundable and nonrefundable when cancel with points and mix refund', () => {
          const { container } = createComponent(props);

          expect(container).toMatchSnapshot();
        });

        it('should render refund to credit card on refundable items if showRefundableSelection is false', () => {
          const { container } = createComponent(_.set(props, 'showRefundableSelection', false));

          expect(container).toMatchSnapshot();
        });
      });
    });

    describe('in confirmation page', () => {
      describe('dollar', () => {
        it('should render correct notes and information', () => {
          const props = {
            refundableFunds: {
              item: 'Refund Label',
              amount: '100.00',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            nonRefundableFunds: {
              item: 'Credit Label',
              amount: '20.00',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            refundMethod: 'BACK_TO_ORIGINAL_PAYMENT',
            nonRefundableExpirationDate: '2019-07-05',
            isConfirmationPage: true,
            showRefundableSelection: true
          };
          const { container } = createComponent(props);

          expect(container).toMatchSnapshot();
        });
      });

      describe('points', () => {
        it('should render correct notes and information', () => {
          const props = {
            refundableFunds: {
              item: 'Refund Label',
              amount: '100.00',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            nonRefundableFunds: {
              item: 'Credit Label',
              amount: '20.00',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pointsToCreditTotal: {
              item: 'Total Credit',
              amount: '15,149',
              currencyCode: 'PTS',
              currencySymbol: null
            },
            pointsToCreditAccount: '601425543',
            refundMethod: 'BACK_TO_ORIGINAL_PAYMENT',
            nonRefundableExpirationDate: '2019-07-05',
            isConfirmationPage: true,
            showRefundableSelection: true
          };
          const { container } = createComponent(props);

          expect(container).toMatchSnapshot();
        });
      });

      describe('GDS Cancel - no refund', () => {
        it('should render correct notes and information', () => {
          const props = {
            refundableFunds: null,
            nonRefundableFunds: null,
            pointsToCreditTotal: null,
            pointsToCreditAccount: null,
            refundMethod: 'BACK_TO_ORIGINAL_PAYMENT',
            nonRefundableExpirationDate: '2019-07-05',
            isConfirmationPage: true,
            showRefundableSelection: true
          };
          const { container } = createComponent(props);

          expect(container).toMatchSnapshot();
        });
      });
    });

    describe('in bound confirmation page', () => {
      describe('dollar', () => {
        it('should render correct notes and information', () => {
          const props = {
            refundableFunds: {
              item: 'Refund Label',
              amount: '100.00',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            nonRefundableFunds: {
              item: 'Credit Label',
              amount: '20.00',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            refundMethod: 'BACK_TO_ORIGINAL_PAYMENT',
            nonRefundableExpirationDate: '2019-07-05',
            isConfirmationPage: true,
            isCancelBoundFlow: true,
            showRefundableSelection: true
          };
          const { container } = createComponent(props);

          expect(container).toMatchSnapshot();
        });

        it('should render guestPasses when guessPasses is present and isConfirmationPage is true and isCancelBoundFlow is true ', () => {
          const props = {
            refundableFunds: {
              item: 'Refund Label',
              amount: '100.00',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            nonRefundableFunds: null,
            guestPasses: {
              isConfirmationGuestPassesPage: true,
              item: 'Nonrevenue Guest Pass(es)',
              itemSubText: 'Refunded to Employee`s account'
            },
            refundMethod: 'BACK_TO_ORIGINAL_PAYMENT',
            nonRefundableExpirationDate: '2019-07-05',
            isConfirmationPage: true,
            isCancelBoundFlow: true,
            showRefundableSelection: true,
            pointsToCreditTotal: null
          };
          const { container } = createComponent(props);
          
          expect(container).toMatchSnapshot();
        });

        it('should render guestPasses when guessPasses is present when refundableFunds , nonRefundableFunds, pointsToCreditTotal is null', () => {
          const props = {
            refundableFunds: null,
            nonRefundableFunds: null,
            guestPasses: {
              isConfirmationGuestPassesPage: true,
              item: 'Nonrevenue Guest Pass(es)',
              itemSubText: 'Refunded to Employee`s account'
            },
            refundMethod: 'BACK_TO_ORIGINAL_PAYMENT',
            nonRefundableExpirationDate: '2019-07-05',
            isConfirmationPage: true,
            isCancelBoundFlow: true,
            showRefundableSelection: true,
            pointsToCreditTotal: null
          };
          const { container } = createComponent(props);
          
          expect(container).toMatchSnapshot();
        });

        it('should not render guestPasses section when guessPasses is null and refundableFunds is present', () => {
          const props = {
            refundableFunds: {
              item: 'Refund Label',
              amount: '100.00',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            nonRefundableFunds: null,
            guestPasses: null,
            refundMethod: 'BACK_TO_ORIGINAL_PAYMENT',
            nonRefundableExpirationDate: '2019-07-05',
            isConfirmationPage: true,
            isCancelBoundFlow: true,
            showRefundableSelection: true,
            pointsToCreditTotal: null
          };
          const { container } = createComponent(props);
          
          expect(container).toMatchSnapshot();
        });

        it('should not render guestPasses section when guessPasses is present and isCancelBoundFlow is false and isConfirmationPage is true', () => {
          const props = {
            refundableFunds: {
              item: 'Refund Label',
              amount: '100.00',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            nonRefundableFunds: {
              item: 'Credit Label',
              amount: '20.00',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            guestPasses: {
              isConfirmationGuestPassesPage: true,
              item: 'Nonrevenue Guest Pass(es)',
              itemSubText: 'Refunded to Employee`s account'
            },
            refundMethod: 'BACK_TO_ORIGINAL_PAYMENT',
            nonRefundableExpirationDate: '2019-07-05',
            isConfirmationPage: true,
            isCancelBoundFlow: false,
            showRefundableSelection: true,
            pointsToCreditTotal: null
          };
          const { container } = createComponent(props);
          
          expect(container).toMatchSnapshot();
        });

        it('should not render guestPasses section when guessPasses is present and isConfirmationPage is false and isCancelBoundFlow is true', () => {
          const props = {
            refundableFunds: {
              item: 'Refund Label',
              amount: '100.00',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            nonRefundableFunds: null,
            guestPasses: {
              isConfirmationGuestPassesPage: true,
              item: 'Nonrevenue Guest Pass(es)',
              itemSubText: 'Refunded to Employee`s account'
            },
            refundMethod: 'BACK_TO_ORIGINAL_PAYMENT',
            nonRefundableExpirationDate: '2019-07-05',
            isConfirmationPage: false,
            isCancelBoundFlow: true,
            showRefundableSelection: true,
            pointsToCreditTotal: null
          };
          const { container } = createComponent(props);
          
          expect(container).toMatchSnapshot();
        });

        it('should not render guestPasses section when guestPasses is present and isCancelBoundFlow is false and isConfirmationPage is false', () => {
          const props = {
            refundableFunds: {
              item: 'Refund Label',
              amount: '100.00',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            nonRefundableFunds: {
              item: 'Credit Label',
              amount: '20.00',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            refundMethod: 'BACK_TO_ORIGINAL_PAYMENT',
            nonRefundableExpirationDate: '2019-07-05',
            isConfirmationPage: false,
            isCancelBoundFlow: false,
            showRefundableSelection: true,
            guestPasses: {
              isConfirmationGuestPassesPage: true,
              item: 'Nonrevenue Guest Pass(es)',
              itemSubText: 'Refunded to Employee`s account'
            },
            pointsToCreditTotal: {
              item: 'Total Credit',
              amount: '15,149',
              currencyCode: 'PTS',
              currencySymbol: null
            }
          };
          const { container } = createComponent(props);
          
          expect(container).toMatchSnapshot();
        });

        it('should not render guestPasses section when guestPasses is null and isCancelBoundFlow is true and isConfirmationPage is true', () => {
          const props = {
            refundableFunds: {
              item: 'Refund Label',
              amount: '100.00',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            nonRefundableFunds: {
              item: 'Credit Label',
              amount: '20.00',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            refundMethod: 'BACK_TO_ORIGINAL_PAYMENT',
            nonRefundableExpirationDate: '2019-07-05',
            isConfirmationPage: true,
            isCancelBoundFlow: true,
            showRefundableSelection: true,
            guestPasses: null,
            pointsToCreditTotal: {
              item: 'Total Credit',
              amount: '15,149',
              currencyCode: 'PTS',
              currencySymbol: null
            }
          };
          const { container } = createComponent(props);
          
          expect(container).toMatchSnapshot();
        });

        it('should not render guestPasses section when guestPasses is null and isConfirmationPage is false and isConfirmationPage is true', () => {
          const props = {
            refundableFunds: {
              item: 'Refund Label',
              amount: '100.00',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            nonRefundableFunds: {
              item: 'Credit Label',
              amount: '20.00',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            refundMethod: 'BACK_TO_ORIGINAL_PAYMENT',
            nonRefundableExpirationDate: '2019-07-05',
            isConfirmationPage: false,
            isCancelBoundFlow: true,
            showRefundableSelection: true,
            guestPasses: null,
            pointsToCreditTotal: {
              item: 'Total Credit',
              amount: '15,149',
              currencyCode: 'PTS',
              currencySymbol: null
            }
          };
          const { container } = createComponent(props);
          
          expect(container).toMatchSnapshot();
        });
  
        it('should not render guestPasses section when guestPasses is null and isCancelBoundFlow is false and isConfirmationPage is false', () => {
          const props = {
            refundableFunds: {
              item: 'Refund Label',
              amount: '100.00',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            nonRefundableFunds: {
              item: 'Credit Label',
              amount: '20.00',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            refundMethod: 'BACK_TO_ORIGINAL_PAYMENT',
            nonRefundableExpirationDate: '2019-07-05',
            isConfirmationPage: false,
            isCancelBoundFlow: false,
            showRefundableSelection: true,
            guestPasses: null,
            pointsToCreditTotal: {
              item: 'Total Credit',
              amount: '15,149',
              currencyCode: 'PTS',
              currencySymbol: null
            }
          };
          const { container } = createComponent(props);
          
          expect(container).toMatchSnapshot();
        }); 

        it('should render background of taxes-and-fees panel to be green even if last item in the list has a $0 value', () => {
          const props = {
            refundableFunds: {
              item: 'Refund Label',
              amount: '100.00',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            nonRefundableFunds: {
              item: 'Credit Label',
              amount: '0.00',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            refundMethod: 'BACK_TO_ORIGINAL_PAYMENT',
            nonRefundableExpirationDate: '2019-07-05',
            isConfirmationPage: true,
            isCancelBoundFlow: true,
            showRefundableSelection: true
          };
          const { container } = createComponent(props);
          
          expect(container).toMatchSnapshot();
        });

        it('should render background of taxes-and-fees panel to be green if last item in the list has a > $0 value', () => {
          const props = {
            refundableFunds: {
              item: 'Refund Label',
              amount: '0.00',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            nonRefundableFunds: {
              item: 'Credit Label',
              amount: '20.00',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            refundMethod: 'BACK_TO_ORIGINAL_PAYMENT',
            nonRefundableExpirationDate: '2019-07-05',
            isConfirmationPage: true,
            isCancelBoundFlow: true,
            showRefundableSelection: true
          };
          const { container } = createComponent(props);
          
          expect(container).toMatchSnapshot();
        });
      });

      describe('points', () => {
        it('should render correct notes and information', () => {
          const props = {
            refundableFunds: {
              item: 'Refund Label',
              amount: '100.00',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            nonRefundableFunds: {
              item: 'Credit Label',
              amount: '20.00',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pointsToCreditTotal: {
              item: 'Total Credit',
              amount: '15,149',
              currencyCode: 'PTS',
              currencySymbol: null
            },
            pointsToCreditAccount: '601425543',
            refundMethod: 'BACK_TO_ORIGINAL_PAYMENT',
            nonRefundableExpirationDate: '2019-07-05',
            isConfirmationPage: true,
            isCancelBoundFlow: true,
            showRefundableSelection: true
          };
          const { container } = createComponent(props);
          
          expect(container).toMatchSnapshot();
        });
      });

      describe('GDS Cancel - no refund', () => {
        it('should render correct notes and information', () => {
          const props = {
            refundableFunds: null,
            nonRefundableFunds: null,
            pointsToCreditTotal: null,
            pointsToCreditAccount: null,
            refundMethod: 'BACK_TO_ORIGINAL_PAYMENT',
            nonRefundableExpirationDate: '2019-07-05',
            isConfirmationPage: true,
            isCancelBoundFlow: true,
            showRefundableSelection: true
          };
          const { container } = createComponent(props);
          
          expect(container).toMatchSnapshot();
        });
      });
    });
  });

  const createComponent = (props) => render(<RefundSummaryForCancel {...props} />);
});
