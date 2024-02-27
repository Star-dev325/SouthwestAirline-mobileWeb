import _ from 'lodash';
import { sandbox } from 'sinon';
import { createComponent } from 'test/unit/helpers/testUtils';
import { ApplyFundsFormWithLedger } from 'src/travelFunds/components/applyFundsFormWithLedger';
import { click, submitForm } from 'test/unit/helpers/enzymeFormTestUtils';
import TravelFundsConstants from 'src/travelFunds/constants/travelFundsConstants';
import PriceTotalBuilder from 'test/builders/model/priceTotalBuilder';
import { sitePaths } from 'src/shared/constants/siteLinks';
import transferTravelFundsText from 'src/travelFunds/i18n/transferTravelFundsText';

const { FUND_TYPES_FORMATTED, APPLY_TRAVEL_FUNDS_FORM_ID, APPLY_LUV_VOUCHER_FORM_ID, APPLY_GIFT_CARD_FORM_ID } =
  TravelFundsConstants;

const sinon = sandbox.create();

describe('ApplyFundsFormWithLedger', () => {
  let applyFundsToPurchaseFnStub,
    onClickCancelButtonFnStub,
    onSelectionChangeFnStub,
    onSubmitCardCalculateFnStub,
    onSubmitRTFCalculateFnStub,
    onSubmitVoucherCalculateFnStub,
    page,
    removeTravelFundFnStub,
    wrapper;

  beforeEach(() => {
    applyFundsToPurchaseFnStub = sinon.stub();
    onClickCancelButtonFnStub = sinon.stub();
    onSelectionChangeFnStub = sinon.stub();
    onSubmitRTFCalculateFnStub = sinon.stub();
    onSubmitVoucherCalculateFnStub = sinon.stub();
    onSubmitCardCalculateFnStub = sinon.stub();
    removeTravelFundFnStub = sinon.stub();
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('render', () => {
    beforeEach(() => {
      page = createPageComponent();
    });

    it('should load Travel Funds form by default', () => {
      expect(page.find('FundTypeSelector')).to.have.props({ selectedFund: FUND_TYPES_FORMATTED[0] });
      expect(page.find('[data-qa="travel-funds-selector"]')).to.have.className('active');
      expect(page.find('LookUpFundsForm')).to.have.props({ formId: APPLY_TRAVEL_FUNDS_FORM_ID });
    });

    it('should render the correct tab from redux', () => {
      expect(page.find('LookUpFundsForm')).to.have.props({ formId: APPLY_TRAVEL_FUNDS_FORM_ID });
      expect(page.find('[data-qa="travel-funds-selector"]')).to.have.className('active');

      page = createPageComponent({ currentlySelectedTab: 'gift-card' });
      expect(page.find('[data-qa="gift-card-selector"]')).to.have.className('active');
      expect(page.find('LookUpFundsForm')).to.have.props({ formId: APPLY_GIFT_CARD_FORM_ID });

      page = createPageComponent({ currentlySelectedTab: 'luv-voucher' });
      expect(page.find('[data-qa="luv-voucher-selector"]')).to.have.className('active');
      expect(page.find('LookUpFundsForm')).to.have.props({ formId: APPLY_LUV_VOUCHER_FORM_ID });
    });

    it('should render the special note on the luv-voucher tab', () => {
      page = createPageComponent({ currentlySelectedTab: 'luv-voucher' });
      expect(page.find('.look-up-funds-form--special-note')).to.exist;
    });

    it('should render rules and note from WCM', () => {
      expect(page.find('.apply-travel-funds--disclaimer')).to.exist;
      expect(page.find('.apply-travel-funds--disclaimer')).to.contain.text(
        transferTravelFundsText.TRAVEL_FUNDS_DISCLAIMER
      );
    });

    it('should render correct fundsTermsAndConditions link for Travel Funds Disclaimer: Learn More anchor', () => {
      expect(page.find('.learn-more-link')).to.exist;
      expect(page.find('.learn-more-link')).to.have.attr('href', sitePaths.fundsTermsAndConditions);
    });

    it('should not render the results list when there are no results saved in Redux', () => {
      expect(page.find('.apply-travel-funds--results')).to.not.exist;
    });

    it('should render the results list with the results saved in Redux', () => {
      page = createPageComponent({ applyTravelFundsPageResponse: oneFundResponse });
      expect(page.find('.fund-results-list--item')).to.have.lengthOf(1);
    });

    it('should not render the ledger and continue button on page load', () => {
      page = createPageComponent();
      expect(page.find('.apply-travel-funds--footer')).to.not.exist;
      expect(page.find('.purchase-content--summary-footer-nav')).to.not.exist;
    });

    it('should render the ledger and continue button when funds have been looked up', () => {
      page = createPageComponent({ applyTravelFundsPageResponse: twoFundResponse });
      expect(page.find('.apply-travel-funds--footer')).to.exist;
      expect(page.find('.purchase-content--summary-footer-nav')).to.exist;
    });
  });

  describe('change apply travel funds', () => {
    beforeEach(() => {
      page = createPageComponent({ showChangeTFCalculations: true, applyTravelFundsPageResponse: oneFundResponse });
    });
    it('should show refund summary if you are in a change TF flow and a travel funds balance', () => {
      expect(page.find('.change-travel-funds--totals')).to.exist;
      expect(page.find('.change-travel-funds--price-ledger-lines')).to.exist;
      expect(page.find('.change-travel-funds--price-ledger-lines')).to.contain.text('TRAVEL FUNDS APPLIED-$0.00');
    });
  });

  describe('click', () => {
    beforeEach(() => {
      page = createPageComponent();
    });

    it('should call onClickCancelButtonFnStub when cancel button is clicked', () => {
      page = createPageComponent({ isLoggedIn: false, applyTravelFundsPageResponse: oneFundResponse });
      click(page.find('.action-bar--right-buttons button'));

      expect(onClickCancelButtonFnStub).to.be.called;
    });

    it('should call applyFunds stub when continue button is clicked', () => {
      page = createPageComponent({ isLoggedIn: false, applyTravelFundsPageResponse: oneFundResponse });
      click(page.find('button.apply-continue-button'));

      expect(applyFundsToPurchaseFnStub).to.be.called;
    });

    it('should load correct form when a different fund selector is set', () => {
      click(page.find('[data-qa="travel-funds-selector"]'));
      expect(onSelectionChangeFnStub).to.have.been.calledWith('travel-funds');
      click(page.find('[data-qa="gift-card-selector"]'));
      expect(onSelectionChangeFnStub).to.have.been.calledWith('gift-card');
      click(page.find('[data-qa="luv-voucher-selector"]'));
      expect(onSelectionChangeFnStub).to.have.been.calledWith('luv-voucher');
    });

    it('should not change forms or active selector when active selector is clicked', () => {
      expect(page.find('[data-qa="travel-funds-selector"]')).to.have.className('active');
      expect(page.find('LookUpFundsForm')).to.have.props({ formId: APPLY_TRAVEL_FUNDS_FORM_ID });

      click(page.find('[data-qa="travel-funds-selector"]'));

      expect(page.find('[data-qa="travel-funds-selector"]')).to.have.className('active');
      expect(page.find('LookUpFundsForm')).to.have.props({ formId: APPLY_TRAVEL_FUNDS_FORM_ID });
    });

    it('should call the TRAVEL_FUNDS calculate endpoint when Travel Funds form is submitted', () => {
      page.find('LookUpFundsForm').prop('onChange')('confirmationNumber', 'ABC123');
      page.find('LookUpFundsForm').prop('onChange')('passengerFirstName', 'Hank');
      page.find('LookUpFundsForm').prop('onChange')('passengerLastName', 'Hill');
      submitForm(page.find('LookUpFundsForm'));

      expect(onSubmitRTFCalculateFnStub).to.have.been.called;
    });

    it('should call the LUV_VOUCHER calculate endpoint when LUV Voucher form is submitted', () => {
      page = createPageComponent({ isLoggedIn: false, currentlySelectedTab: 'luv-voucher' });
      page.find('LookUpFundsForm').prop('onChange')('voucherNumber', '1234567890123456');
      page.find('LookUpFundsForm').prop('onChange')('securityCode', '1234');
      submitForm(page.find('LookUpFundsForm'));

      expect(onSubmitVoucherCalculateFnStub).to.have.been.called;
    });

    it('should call the GIFT_CARD calculate endpoint when Gift Card form is submitted', () => {
      page = createPageComponent({ isLoggedIn: false, currentlySelectedTab: 'gift-card' });
      page.find('LookUpFundsForm').prop('onChange')('cardNumber', '1234567890123456');
      page.find('LookUpFundsForm').prop('onChange')('securityCode', '1234');
      submitForm(page.find('LookUpFundsForm'));

      expect(onSubmitCardCalculateFnStub).to.have.been.called;
    });

    it('should call removeTravelFundFnStub when the X button is clicked', () => {
      page = createPageComponent({ isLoggedIn: false, applyTravelFundsPageResponse: oneFundResponse });

      click(page.find('.icon_remove'));

      expect(removeTravelFundFnStub).to.have.been.called;
    });
  });

  const createPageComponent = (props = {}) => {
    const defaultProps = {
      priceTotal: new PriceTotalBuilder().build(),
      applyTravelFundsPageResponse: null,
      currentlySelectedTab: 'travel-funds',
      travelFundsBalanceRemaining: {
        amount: '30.70',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      applyFundsToPurchaseFn: applyFundsToPurchaseFnStub,
      onClickCancelButtonFn: onClickCancelButtonFnStub,
      onSelectionChangeFn: onSelectionChangeFnStub,
      onSubmitRTFCalculateFn: onSubmitRTFCalculateFnStub,
      onSubmitVoucherCalculateFn: onSubmitVoucherCalculateFnStub,
      onSubmitCardCalculateFn: onSubmitCardCalculateFnStub,
      removeTravelFundFn: removeTravelFundFnStub
    };

    const mergedProps = _.merge({}, defaultProps, props);
    const state = {
      app: {},
      router: {
        location: {
          search: 'search'
        }
      }
    };

    wrapper = createComponent(ApplyFundsFormWithLedger, { state, props: mergedProps });

    return wrapper.find('ApplyFundsFormWithLedger');
  };

  const oneFundResponse = {
    travelFunds: [
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
        _links: { removeTravelFund: {} }
      }
    ],
    balanceRemaining: {
      amount: '408.98',
      currencyCode: 'USD',
      currencySymbol: '$'
    },
    totalFunds: {
      amount: '0.00',
      currencyCode: 'USD',
      currencySymbol: '$'
    },
    totals: {
      moneyTotal: {
        amount: '0.00',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      pointsTotal: null
    },
    fundsAppliedToken: 'funds-token'
  };

  const twoFundResponse = {
    travelFunds: [
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
              removalTravelFundId: '1'
            },
            href: '/fake/path',
            method: 'PUT'
          }
        }
      },
      {
        expirationDate: '2021-1-10',
        travelFundType: 'TRAVEL_FUNDS',
        displayName: 'Hank Hill',
        fundIdentifier: '123ABC',
        errorMessage: null,
        appliedAmount: {
          amount: '123.45',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        remainingAmount: {
          amount: '67.89',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        _links: {
          removeTravelFund: {
            body: {
              removalTravelFundId: '2'
            },
            href: '/fake/path',
            method: 'PUT'
          }
        }
      }
    ],
    balanceRemaining: {
      amount: '0.00',
      currencyCode: 'USD',
      currencySymbol: '$'
    },
    totalFunds: {
      amount: '408.98',
      currencyCode: 'USD',
      currencySymbol: '$'
    },
    totals: {
      moneyTotal: {
        amount: '0.00',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      pointsTotal: null
    },
    fundsAppliedToken: 'funds-token'
  };
});
