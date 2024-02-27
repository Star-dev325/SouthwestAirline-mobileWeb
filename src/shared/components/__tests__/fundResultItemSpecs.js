import React from 'react';
import { mount, shallow } from 'enzyme';
import { sandbox } from 'sinon';

import * as AnalyticsEventHelper from 'src/shared/analytics/helpers/analyticsEventHelper';
import { click } from 'test/unit/helpers/enzymeFormTestUtils';
import FundResultItem from 'src/shared/components/fundResultItem';

const sinon = sandbox.create();

describe('FundResultItem', () => {
  let removeFundFnStub;
  let onClickValidateTransferLinkFnStub;
  let onClickAssociateFundLinkFnStub;

  beforeEach(() => {
    removeFundFnStub = sinon.stub();
    onClickValidateTransferLinkFnStub = sinon.stub();
    onClickAssociateFundLinkFnStub = sinon.stub();
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should render required fields and conditional elements when they have data', () => {
    const shallowWrapper = createComponent({}, true);

    expect(shallowWrapper).toMatchSnapshot();
  });

  it('should render expirationDateString when it exists', () => {
    const shallowWrapper = createComponent({ expirationDateString: 'Expiration: None' }, true);

    expect(shallowWrapper).toMatchSnapshot();
  });

  it('should not render conditional elements when they do not have data', () => {
    const shallowWrapper = createComponent(
      {
        expirationDate: null,
        remainingAmount: null,
        errorMessage: null,
        removeFundFn: null,
        billingInfo: null
      },
      true
    );
    const shallowWrapper2 = createComponent(
      {
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
            streetTwo: null,
            location: 'Addison, TX 12345'
          }
        }
      },
      true
    );

    expect(shallowWrapper).toMatchSnapshot();
    expect(shallowWrapper2).toMatchSnapshot();
  });

  it('should not render street and location if they are not provided', () => {
    const shallowWrapper = createComponent(
      {
        billingInfo: {
          amountApplied: {
            amount: '123.45',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          billingAddress: {
            streetOne: 'Street Address Line 1',
            streetTwo: '',
            location: ''
          }
        }
      },
      true
    );

    expect(shallowWrapper).toMatchSnapshot();
  });

  it('should render correct image for leisure fund type', () => {
    const wrapper = createComponent({
      billingInfo: {
        amountApplied: {
          amount: '123.45',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        billingAddress: {
          streetOne: 'Street Address Line 1',
          streetTwo: '',
          location: ''
        }
      },
      leisureFund: true
    });

    expect(wrapper.find('.travel-fund--image_rtf-leisure')).toMatchSnapshot();
  });

  it('should render correct image for non-leisure fund type', () => {
    const wrapper = createComponent({
      billingInfo: {
        amountApplied: {
          amount: '123.45',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        billingAddress: {
          streetOne: 'Street Address Line 1',
          streetTwo: '',
          location: ''
        }
      },
      leisureFund: false
    });

    expect(wrapper.find('.travel-fund--image_rtf-not-leisure')).toMatchSnapshot();
  });

  it('should render correct image for travel fund type', () => {
    const wrapper = createComponent({
      billingInfo: {
        amountApplied: {
          amount: '123.45',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        billingAddress: {
          streetOne: 'Street Address Line 1',
          streetTwo: '',
          location: ''
        }
      }
    });

    expect(wrapper.find('.travel-fund--image_rtf')).toMatchSnapshot();
  });

  it('should call removeFundFn with the removal ID if there is one', () => {
    const wrapper = createComponent({
      billingInfo: {
        amountApplied: {
          amount: '123.45',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        billingAddress: {
          streetOne: 'Street Address Line 1',
          streetTwo: '',
          location: ''
        }
      }
    });

    click(wrapper.find('.icon_remove'));

    expect(removeFundFnStub).to.have.been.calledWith('1');
  });

  context('transferability', () => {
    it('should not display transferable text, button, or link if not available', () => {
      const shallowWrapper = createComponent({}, true);

      expect(shallowWrapper).toMatchSnapshot();
    });

    it('should display transferable text if available', () => {
      const shallowWrapper = createComponent({ transferableText: '100.00 is eligible for transfer' }, true);

      expect(shallowWrapper).toMatchSnapshot();
    });

    it('should display transfer button if available and call function when clicked', () => {
      const validateTransferLink = {
        href: '/test',
        labelText: 'Validate Transfer Link',
        method: 'POST',
        body: {
          fundSearchToken: 'token'
        }
      };

      const shallowWrapper = createComponent(
        {
          transferableText: '100.00 is eligible for transfer',
          validateTransferLink
        },
        true
      );

      expect(shallowWrapper).toMatchSnapshot();

      click(shallowWrapper.find('.fund-results-list--transfer-button'));

      expect(onClickValidateTransferLinkFnStub).to.have.been.calledWith(validateTransferLink);
    });

    it('should display associate link if available and call function when clicked', () => {
      const associateFundLink = {
        href: '/test',
        labelText: 'Associate Fund Link',
        method: 'PUT',
        body: {
          fundSearchToken: 'token'
        }
      };
      const shallowWrapper = createComponent(
        {
          transferableText: '100.00 is eligible for transfer',
          associateFundLink
        },
        true
      );

      expect(shallowWrapper).toMatchSnapshot();

      click(shallowWrapper.find('.fund-results-list--associate-link'));

      expect(onClickAssociateFundLinkFnStub).to.have.been.calledWith(associateFundLink);
    });

    it('should not display a grey box message if the greyBoxMessage object property is null', () => {
      const greyBoxMessage = null;
      const shallowWrapper = createComponent(
        {
          greyBoxMessage
        },
        true
      );

      expect(shallowWrapper).toMatchSnapshot();
    });

    it('should display the correct grey box message if user logs in with a different RR#', () => {
      const greyBoxMessage = {
        key: 'GREY_BOX_UNAVAILABLE_FUNDS_RR_MISMATCH',
        header: 'Not eligible for transfer',
        body: "The account you're logged in with does not match the account of the travel fund"
      };
      const shallowWrapper = createComponent({
        greyBoxMessage
      });

      expect(shallowWrapper).toMatchSnapshot();
    });

    it('should display the correct grey box message if user searches for an RTF NOT associated to the logged in account RR#', () => {
      const greyBoxMessage = {
        key: 'GREY_BOX_UNAVAILABLE_FUNDS_RR_MISMATCH',
        header: 'Not eligible for transfer',
        body: "The account you're logged in with does not match the account of the travel fund"
      };
      const shallowWrapper = createComponent({
        greyBoxMessage
      });

      expect(shallowWrapper).toMatchSnapshot();
    });

    it('should display the correct grey box message if a name mismatch occurs after logging in', () => {
      const greyBoxMessage = {
        key: 'GREY_BOX_UNAVAILABLE_FUNDS_NAME_MISMATCH',
        header: 'Not eligible for transfer',
        body: 'The name on your account does not match name of the travel fund'
      };
      const shallowWrapper = createComponent({
        greyBoxMessage
      });

      expect(shallowWrapper).toMatchSnapshot();
    });

    it('should display the correct grey box message if a user searches for an RTF with a different name (not the account holder name) and associateFund', () => {
      const greyBoxMessage = {
        key: 'GREY_BOX_UNAVAILABLE_FUNDS_NAME_MISMATCH',
        header: 'Not eligible for transfer',
        body: 'The name on your account does not match name of the travel fund'
      };
      const shallowWrapper = createComponent({
        greyBoxMessage
      });

      expect(shallowWrapper).toMatchSnapshot();
    });

    it('should display the correct grey box message if a user looks up a fund that is not eligible for transfer due to the fare class (WGA or WGA+)', () => {
      const greyBoxMessage = {
        key: 'GREY_BOX_UNAVAILABLE_FUNDS_TRANSFER_INELIGIBLE',
        header: 'Not eligible for transfer',
        body: 'The fare purchased did not qualify to allow the fund to be transferred'
      };
      const shallowWrapper = createComponent({
        greyBoxMessage
      });

      expect(shallowWrapper).toMatchSnapshot();
    });

    it('should display the correct grey box message if a user looks up a fund that has already been transferred once', () => {
      const greyBoxMessage = {
        key: 'GREY_BOX_UNAVAILABLE_FUNDS_TRANSFER_INELIGIBLE',
        header: 'Not eligible for transfer',
        body: 'This fund was previously transferred and only 1 transfer of a travel fund is allowed'
      };
      const shallowWrapper = createComponent({
        greyBoxMessage
      });

      expect(shallowWrapper).toMatchSnapshot();
    });

    it('should display cash + points as eligible funds after applying', () => {
      const shallowWrapper = createComponent({
        fundType: 'SPLIT_PAYMENT',
        appliedPointsAmount: {
          amount: '1,234.56',
          currencyCode: 'PTS',
          currencySymbol: 'PTS'
        },
        pointsRemaining: 'Remaining balance 92,315 pts'
      });

      expect(shallowWrapper).toMatchSnapshot();
    });

    it('should display cash + points as eligible funds after applying on confirmation with appliedpoints', () => {
      const shallowWrapper = createComponent({
        fundType: 'SPLIT_PAYMENT',
        appliedPoints: {
          amount: '1,234.56',
          currencyCode: 'PTS',
          currencySymbol: 'PTS'
        },
        pointsRemaining: 'Remaining balance 92,315 pts'
      });

      expect(shallowWrapper).toMatchSnapshot();
    });

    it('should not display remaining pts balance if there are no points remaining', () => {
      const shallowWrapper = createComponent({
        appliedPointsAmount: {
          amount: '1,234.56',
          currencyCode: 'PTS',
          currencySymbol: 'PTS'
        }
      });

      expect(shallowWrapper).toMatchSnapshot();
    });

    it('should call analytics track event when split payment fund is removed', () => {
      const raiseSatelliteEventStub = sinon.stub(AnalyticsEventHelper, 'raiseSatelliteEvent');

      const wrapper = createComponent({
        appliedAmount: {
          amount: '408.98',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        appliedPointsAmount: {
          amount: '14,214',
          currencyCode: 'PTS',
          currencySymbol: 'PTS'
        },
        displayName: 'Fred Flintstone',
        fundIdentifier: 'ABC123',
        fundType: 'SPLIT_PAYMENT',
        pointsRemaining: 'Remaining balance 92,315 pts',
        travelFundType: 'SPLIT_PAYMENT'
      });

      click(wrapper.find('.icon_remove'));

      expect(raiseSatelliteEventStub).to.have.been.calledWith('squid', {
        page_description: 'button:cash plus points remove points'
      });
    });
  });

  const createComponent = (props = {}, shouldShallow = false) => {
    const defaultProps = {
      fundType: 'TRAVEL_FUNDS',
      displayName: 'Bobby Hill',
      removalId: '1',
      removeFundFn: removeFundFnStub,
      fundIdentifier: 'OC2EHW',
      expirationDate: '2019-09-15',
      appliedAmount: {
        amount: '1,234.56',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      remainingAmount: {
        amount: '1.23',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      errorMessage: 'Fake error message',
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
      onClickValidateTransferLinkFn: onClickValidateTransferLinkFnStub,
      onClickAssociateFundLinkFn: onClickAssociateFundLinkFnStub
    };

    return shouldShallow
      ? shallow(<FundResultItem {...defaultProps} {...props} />)
      : mount(<FundResultItem {...defaultProps} {...props} />);
  };
});
