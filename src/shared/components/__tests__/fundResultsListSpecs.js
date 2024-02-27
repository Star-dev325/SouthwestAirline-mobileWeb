import React from 'react';
import _ from 'lodash';
import { mount } from 'enzyme';
import { sandbox } from 'sinon';

import { click } from 'test/unit/helpers/enzymeFormTestUtils';
import FundResultsList from 'src/shared/components/fundResultsList';

const sinon = sandbox.create();

describe('FundResultsList', () => {
  let removeFundFnStub, wrapper;

  beforeEach(() => {
    removeFundFnStub = sinon.stub();
    wrapper = createComponent();
  });

  context('render', () => {
    const propsWithOneRtfWithoutLinks = {
      retrievedFunds: [
        {
          expirationDate: '2020-2-20',
          travelFundType: 'TRAVEL_FUNDS',
          displayName: 'Fred Flintstone',
          leisureFund: false,
          fundIdentifier: 'ABC123',
          errorMessage: null,
          appliedAmount: {
            amount: '408.98',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          remainingAmount: {
            amount: '30.70',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          _links: null
        }
      ]
    };

    it('should render rtf leisure fund if passed in', () => {
      const leisureTravelFund = {
        retrievedFunds: [
          {
            expirationDate: '2020-2-20',
            travelFundType: 'TRAVEL_FUNDS',
            displayName: 'Fred Flintstone',
            leisureFund: true,
            fundIdentifier: 'ABC123',
            errorMessage: null,
            appliedAmount: {
              amount: '408.98',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            remainingAmount: {
              amount: '30.70',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            _links: null
          }
        ]
      };
      const component = createComponent(leisureTravelFund);

      expect(component.find('.travel-fund--image_rtf-leisure')).to.exist;
    });

    it('should render rtf non leisure fund if passed in', () => {
      const leisureTravelFund = {
        retrievedFunds: [
          {
            expirationDate: '2020-2-20',
            travelFundType: 'TRAVEL_FUNDS',
            displayName: 'Fred Flintstone',
            leisureFund: false,
            fundIdentifier: 'ABC123',
            errorMessage: null,
            appliedAmount: {
              amount: '408.98',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            remainingAmount: {
              amount: '30.70',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            _links: null
          }
        ]
      };
      const component = createComponent(leisureTravelFund);

      expect(component.find('.travel-fund--image_rtf-not-leisure')).to.exist;
    });

    it('should render rtf non-leisure fund for each one in the retrievedFunds array', () => {
      expect(wrapper.find('.travel-fund--image_rtf')).to.exist;
      expect(wrapper.find('.fund-result-title').at(5)).to.have.text('ROBERT BARATHEON');
    });

    it('should render luv voucher fund for each one in the retrievedFunds array', () => {
      expect(wrapper.find('.travel-fund--image_luv-voucher')).to.exist;
      expect(wrapper.find('.fund-result-title').at(1)).to.have.text('Southwest LUV Voucher');
    });

    it('should render gift card fund for each one in the retrievedFunds array', () => {
      expect(wrapper.find('.travel-fund--image_gift-card')).to.exist;
      expect(wrapper.find('.fund-result-title').at(2)).to.have.text('Southwest Gift Card');
    });

    it('should render credit card line when billing info is present', () => {
      expect(wrapper.find('.fund-results-list--billing-info')).to.exist;
      expect(wrapper.find('.fund-result-title').at(6)).to.have.text('VISA');
    });

    it('should render error message if one is present with the fund object', () => {
      expect(wrapper.find('.fund-results-list--error-message')).to.have.text('Fake error message');
    });

    it('should render points remaining message if one is present with the fund object', () => {
      const cashPlusPoints = {
        retrievedFunds: [
          {
            expirationDate: '2020-2-20',
            travelFundType: 'SPLIT_PAYMENT',
            displayName: 'Fred Flintstone',
            leisureFund: false,
            fundIdentifier: 'ABC123',
            errorMessage: null,
            appliedAmount: {
              amount: '408.98',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            remainingAmount: {
              amount: '30.70',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pointsRemaining: 'Remaining balance 92,315 pts',
            appliedPointsAmount: {
              amount: "14,214",
              currencyCode: 'PTS',
              currencySymbol: 'PTS'
            },
            _links: null
          }
        ]
      };
      const wrapper = createComponent(cashPlusPoints);

      expect(wrapper.find('.fund-results-list--available-amount').first().props().amount).to.equal('14,214');
      expect(wrapper.find('.additional-info-container').first().text()).to.equal('Remaining balance 92,315 pts');
    });

    context('requireRemoveFundLinkToShowRemoveButton false', () => {
      it('should render removal X button if the RTF _links is not null', () => {
        wrapper = createComponent();
        const firstRtf = wrapper.find('.fund-results-list--item').at(0);

        expect(firstRtf).to.exist;
        expect(firstRtf.find('.icon_remove')).to.exist;
      });

      it('should render removal X button if the RTF _links is null', () => {
        wrapper = createComponent(propsWithOneRtfWithoutLinks);
        const lastRtf = wrapper.find('.fund-results-list--item').at(0);

        expect(lastRtf).to.exist;
        expect(lastRtf.find('.icon_remove')).to.exist;
      });
    });

    context('requireRemoveFundLinkToShowRemoveButton true', () => {
      it('should render removal X button if the RTF _links is not null', () => {
        wrapper = createComponent({ requireRemoveFundLinkToShowRemoveButton: true });
        expect(wrapper.find('.icon_remove')).to.exist;
      });

      it('should not render removal X button if the RTF _links is null', () => {
        wrapper = createComponent(propsWithOneRtfWithoutLinks);
        const lastRtf = wrapper.find('.fund-results-list--item').at(1);

        expect(lastRtf).to.exist;
        expect(lastRtf.find('.icon_remove')).to.not.exist;
      });
    });
  });

  context('click', () => {
    beforeEach(() => {
      wrapper = createComponent({ removeFundFn: removeFundFnStub });
    });

    it('should call removeFundFn with the removal ID if there is one', () => {
      click(wrapper.find('.icon_remove').at(4));
      expect(removeFundFnStub).to.have.been.calledWith('5');
    });
  });

  context('greyBoxMessage', () => {
    const getGreyBoxMessageTestProps = (greyBoxMessage) => {
      const _links = { removeTravelFund: {} };

      return {
        listTitle: 'List Title',
        removeFundFn: _.noop,
        billingInfo: {
          cardType: 'VISA',
          lastFourDigits: '1234',
          cardHolderName: 'Hank Hill',
          amountApplied: {
            amount: '123.45',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          billingAddress: {
            streetOne: 'Street Address Line 1',
            streetTwo: 'Street Address Line 2',
            location: 'Addison, TX 12345'
          }
        },
        retrievedFunds: [
          {
            greyBoxMessage,
            travelFundType: 'TRAVEL_FUNDS',
            expirationDate: '2020-06-10',
            displayName: 'ROBERT BARATHEON',
            fundIdentifier: 'ABC123',
            refundableAmount: {
              amount: '123.45',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            nonRefundableAmount: {
              amount: '0.00',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            currentAmount: {
              amount: '439.68',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            _links
          }
        ]
      };
    };

    it('should not render if none exists', () => {
      const wrapper = createComponent(getGreyBoxMessageTestProps());

      expect(wrapper.find('.fund-results-list--grey-box-message')).to.not.exist;
    });

    it('should render a body and a header if they are provided', () => {
      const greyBoxMessage = { header: 'This is the grey box header', body: 'This is the grey box body' };
      const wrapper = createComponent(getGreyBoxMessageTestProps(greyBoxMessage));

      expect(wrapper.find('.fund-results-list--grey-box-message .header').text()).eq(greyBoxMessage.header);
      expect(wrapper.find('.fund-results-list--grey-box-message .body').text()).eq(greyBoxMessage.body);
    });

    it('header should render if only it is provided, body should default to an empty string', () => {
      const greyBoxMessage = { header: 'This is the grey box header' };
      const wrapper = createComponent(getGreyBoxMessageTestProps(greyBoxMessage));

      expect(wrapper.find('.fund-results-list--grey-box-message .header').text()).eq(greyBoxMessage.header);
      expect(wrapper.find('.fund-results-list--grey-box-message .body').text()).eq('');
    });

    it('body should render if only it is provided, header should default to an empty string', () => {
      const greyBoxMessage = { body: 'This is the grey box body' };
      const wrapper = createComponent(getGreyBoxMessageTestProps(greyBoxMessage));

      expect(wrapper.find('.fund-results-list--grey-box-message .body').text()).eq(greyBoxMessage.body);
      expect(wrapper.find('.fund-results-list--grey-box-message .header').text()).eq('');
    });
  });

  const createComponent = (props = {}) => {
    const _links = { removeTravelFund: {} };
    const defaultProps = {
      listTitle: 'List Title',
      removeFundFn: _.noop,
      billingInfo: {
        cardType: 'VISA',
        lastFourDigits: '1234',
        cardHolderName: 'Hank Hill',
        amountApplied: {
          amount: '123.45',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        billingAddress: {
          streetOne: 'Street Address Line 1',
          streetTwo: 'Street Address Line 2',
          location: 'Addison, TX 12345'
        }
      },
      retrievedFunds: [
        {
          travelFundType: 'TRAVEL_FUNDS',
          leisureFund: true,
          expirationDate: '2020-06-10',
          displayName: 'ROBERT BARATHEON',
          fundIdentifier: 'ABC123',
          refundableAmount: {
            amount: '123.45',
            currencyCode: 'USD',
            currencySymbol: '$'
          }
        },
        {
          travelFundType: 'LUV_VOUCHER',
          displayName: 'Southwest LUV Voucher',
          fundIdentifier: 'Voucher 1234',
          currentAmount: {
            amount: '200.00',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          _links
        },
        {
          travelFundType: 'GIFT_CARD',
          displayName: 'Southwest Gift Card',
          fundIdentifier: 'XXXXXXXXXXXX-1234',
          currentAmount: {
            amount: '50.00',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          _links
        },
        {
          travelFundType: 'TRAVEL_FUNDS',
          expirationDate: '2002-06-10',
          displayName: 'NED STARK',
          fundIdentifier: '321CBA',
          errorMessage: 'Fake error message',
          currentAmount: {
            amount: '0.00',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          _links
        },
        {
          expirationDate: '2020-2-20',
          travelFundType: 'TRAVEL_FUNDS',
          displayName: 'Hank Hill',
          fundIdentifier: 'ABC123',
          errorMessage: null,
          appliedAmount: {
            amount: '408.98',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          remainingAmount: {
            amount: '30.70',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          _links: {
            removeTravelFund: {
              body: {
                removalTravelFundId: '5'
              },
              href: '/fake/path',
              method: 'PUT'
            }
          }
        },
        {
          travelFundType: 'TRAVEL_FUNDS',
          leisureFund: false,
          expirationDate: '2020-06-10',
          displayName: 'ROBERT BARATHEON',
          fundIdentifier: 'ABC123',
          refundableAmount: {
            amount: '123.45',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          nonRefundableAmount: {
            amount: '0.00',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          currentAmount: {
            amount: '439.68',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          _links
        }
      ]
    };

    return mount(<FundResultsList {...defaultProps} {...props} />);
  };
});
