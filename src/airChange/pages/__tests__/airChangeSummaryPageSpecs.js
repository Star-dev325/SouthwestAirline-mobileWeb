import _ from 'lodash';
import sinonModule from 'sinon';
import { AirChangeSummaryPage } from 'src/airChange/pages/airChangeSummaryPage';
import * as AppSelector from 'src/shared/selectors/appSelector';
import ChangePricingPageBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/page/change/changePricingPageBuilder';
import { click } from 'test/unit/helpers/enzymeFormTestUtils';
import { createComponent } from 'test/unit/helpers/testUtils';

const sinon = sinonModule.sandbox.create();

describe('#Air Change Pricing Summary page', () => {
  let airChangeSummaryPageWrapper;
  let pushStub;
  let getAccountInfoFnStub;
  let showDialogFnStub;
  let hideDialogFnStub;
  let resumeAfterLoginFnStub;

  beforeEach(() => {
    pushStub = sinon.stub();
    getAccountInfoFnStub = sinon.stub();
    showDialogFnStub = sinon.stub().returns(Promise.resolve());
    hideDialogFnStub = sinon.stub().returns(Promise.resolve());
    resumeAfterLoginFnStub = sinon.stub();
  });

  afterEach(() => {
    sinon.restore();
  });

  context('render', () => {
    context('header and bound detail', () => {
      context('one way trip', () => {
        it('should pass header to page header and one way bound', () => {
          airChangeSummaryPageWrapper = createComponentWrapper();

          expect(airChangeSummaryPageWrapper).toMatchSnapshot();
        });
      });

      context('round trip', () => {
        it('should pass round trip header to page header and pass round trip bounds', () => {
          const changePricingPageResponse = new ChangePricingPageBuilder().withRoundTrip().build();

          airChangeSummaryPageWrapper = createComponentWrapper({ changePricingPage: changePricingPageResponse });

          expect(airChangeSummaryPageWrapper).toMatchSnapshot();
        });
      });

      context('with EB pricing messages', () => {
        it('should render the priceMessages array as an array of BasicBanners', () => {
          const priceMessages = [
            {
              key: 'PRICING_EARLY_BIRD_BUNDLED_INSIDE_36_HOURS',
              header: 'EarlyBird Check-in is not available',
              body: 'We can not add this product to a flight that leaves within 36 hours of purchase',
              icon: 'WARNING',
              textColor: 'DEFAULT',
              backgroundColor: 'DEFAULT'
            }
          ];
          const changePricingPage = _.merge({}, new ChangePricingPageBuilder().build(), { priceMessages });

          airChangeSummaryPageWrapper = createComponentWrapper({ changePricingPage });

          expect(airChangeSummaryPageWrapper).toMatchSnapshot();
        });
      });
    });

    context('price details', () => {
      let changePricingPageResponse;

      it('should pass even exchange as true if original total equals new total', () => {
        const changeType = {
          evenExchange: true,
          upGrade: false,
          downGrade: false
        };

        changePricingPageResponse = new ChangePricingPageBuilder().build();
        airChangeSummaryPageWrapper = createComponentWrapper({
          changeType
        });
        expect(airChangeSummaryPageWrapper.find('AirChangePriceTotal')).to.have.prop('change').deep.equals(changeType);
        expect(airChangeSummaryPageWrapper.find('AirChangePriceTotal'))
          .to.have.prop('fareSummary')
          .deep.equals(changePricingPageResponse.fareSummary);
        expect(airChangeSummaryPageWrapper.find('AirChangePriceTotal'))
          .to.have.prop('totals')
          .deep.equals(changePricingPageResponse.totals);
      });

      it('should pass upgrade as true if original total is less than new total', () => {
        changePricingPageResponse = new ChangePricingPageBuilder().withUpgrade().build();
        const changeType = {
          evenExchange: false,
          upGrade: true,
          downGrade: false
        };

        airChangeSummaryPageWrapper = createComponentWrapper({
          changePricingPage: changePricingPageResponse,
          changeType
        });
        expect(airChangeSummaryPageWrapper.find('AirChangePriceTotal')).to.have.prop('change').deep.equals(changeType);
        expect(airChangeSummaryPageWrapper.find('AirChangePriceTotal'))
          .to.have.prop('fareSummary')
          .deep.equals(changePricingPageResponse.fareSummary);
        expect(airChangeSummaryPageWrapper.find('AirChangePriceTotal'))
          .to.have.prop('totals')
          .deep.equals(changePricingPageResponse.totals);
      });

      it('should pass downgrade as true if original total is greater than new total', () => {
        changePricingPageResponse = new ChangePricingPageBuilder().withRefundableDowngrade().build();
        const changeType = {
          evenExchange: false,
          upGrade: false,
          downGrade: true
        };

        airChangeSummaryPageWrapper = createComponentWrapper({
          changePricingPage: changePricingPageResponse,
          changeType
        });
        expect(airChangeSummaryPageWrapper.find('AirChangePriceTotal')).to.have.prop('change').deep.equals(changeType);
        expect(airChangeSummaryPageWrapper.find('AirChangePriceTotal'))
          .to.have.prop('fareSummary')
          .deep.equals(changePricingPageResponse.fareSummary);
        expect(airChangeSummaryPageWrapper.find('AirChangePriceTotal'))
          .to.have.prop('totals')
          .deep.equals(changePricingPageResponse.totals);
      });
    });

    it('should render PriceSummaryNotice component', () => {
      airChangeSummaryPageWrapper = createComponentWrapper();

      expect(airChangeSummaryPageWrapper.find('PriceSummaryNotice')).to.be.present();
    });
  });

  context('click continue button', () => {
    it('should transition to Review page when click continue button', async () => {
      sinon.stub(AppSelector, 'getCurrentAppFlow').returns('air/change');
      airChangeSummaryPageWrapper = createComponentWrapper();

      click(airChangeSummaryPageWrapper.find('Button'));

      expect(pushStub).to.have.been.calledWith('/air/change/reconcile.html');
    });

    context('SWABIZ ghost card message', () => {
      let changePricingPageResponse;

      beforeEach(() => {
        changePricingPageResponse = new ChangePricingPageBuilder().withSwaBizGhostCardMessage().build();
        _.set(changePricingPageResponse, 'paymentRequired', true);
      });

      it('should show SWA BIZ corp card message when upgrading a SWA BIZ PNR and clicking the dialog continue button', async () => {
        airChangeSummaryPageWrapper = createComponentWrapper({ changePricingPage: changePricingPageResponse });
        click(airChangeSummaryPageWrapper.find('Button'));

        expect(showDialogFnStub.firstCall.args[0]).to.include({
          name: 'air-change-ghost-card-message-before-continuing',
          title: 'none',
          message: 'Stored corporate credit cards (Ghost Cards) only apply to transactions made on SWABIZ.COM.'
        });
        expect(showDialogFnStub.firstCall.args[0].buttons.length).to.equal(1);
        expect(showDialogFnStub.firstCall.args[0].buttons[0].label).to.equal('OK');
      });

      it('should not show SWA BIZ corp card message when downgrading a SWA BIZ PNR and clicking the dialog continue button', async () => {
        _.set(changePricingPageResponse, 'paymentRequired', false);
        airChangeSummaryPageWrapper = createComponentWrapper({ changePricingPage: changePricingPageResponse });

        click(airChangeSummaryPageWrapper.find('Button'));

        expect(pushStub).to.be.be.called;
      });

      it('should hide dialog for SWA BIZ corp card message when clicking the dialog OK button', async () => {
        airChangeSummaryPageWrapper = createComponentWrapper({ changePricingPage: changePricingPageResponse });
        click(airChangeSummaryPageWrapper.find('Button'));

        const cancelButton = _.find(showDialogFnStub.firstCall.args[0].buttons, { label: 'OK' });

        await cancelButton.onClick();

        expect(hideDialogFnStub).to.be.called;
        expect(pushStub).to.be.called;
      });
    });

    context('change by points', () => {
      context('without login', () => {
        it('should transition to login page', async () => {
          airChangeSummaryPageWrapper = createComponentWrapper({
            changePricingPage: new ChangePricingPageBuilder().withUpgradePoints().build()
          });

          click(airChangeSummaryPageWrapper.find('Button'));

          expect(pushStub).to.have.been.calledWith('/login');
        });
      });

      context('with login', () => {
        it('should pop up dialog without enough points for upgrade change', async () => {
          airChangeSummaryPageWrapper = createComponentWrapper({
            changePricingPage: new ChangePricingPageBuilder().withUpgradePoints().build(),
            isLoggedIn: true
          });

          click(airChangeSummaryPageWrapper.find('Button'));

          expect(showDialogFnStub.firstCall.args[0]).to.include({
            name: 'flight-purchase-not-enough-points-modify',
            title: 'You need more points to purchase this flight.',
            message: 'Buy more on southwest.com or select a different flight. How would you like to find a flight?',
            className: 'not-enough-points-dialog'
          });
        });

        it('should get updated account info when not enough points dialog is closed', async () => {
          airChangeSummaryPageWrapper = createComponentWrapper({
            changePricingPage: new ChangePricingPageBuilder().withUpgradePoints().build(),
            isLoggedIn: true
          });

          click(airChangeSummaryPageWrapper.find('Button'));

          const closeFn = showDialogFnStub.args[0][0].buttons[0].onClick;

          await closeFn();

          expect(hideDialogFnStub).to.have.been.called;
          expect(getAccountInfoFnStub).to.have.been.called;
        });

        it('should push to results page and get updated account info when points button is clicked on not enough points dialog', async () => {
          sinon.stub(AppSelector, 'getCurrentAppFlow').returns('air/change');
          airChangeSummaryPageWrapper = createComponentWrapper({
            changePricingPage: new ChangePricingPageBuilder().withUpgradePoints().build(),
            isLoggedIn: true
          });

          click(airChangeSummaryPageWrapper.find('Button'));

          const closeFn = showDialogFnStub.args[0][0].buttons[1].onClick;

          await closeFn();

          expect(hideDialogFnStub).to.have.been.called;
          expect(pushStub).to.have.been.calledWith('/air/change/outbound/results');
          expect(getAccountInfoFnStub).to.have.been.called;
        });

        it('should transition to Review page with enough points for upgrade change', async () => {
          sinon.stub(AppSelector, 'getCurrentAppFlow').returns('air/change');
          airChangeSummaryPageWrapper = createComponentWrapper({
            changePricingPage: new ChangePricingPageBuilder().withUpgradePoints().build(),
            isLoggedIn: true,
            accountRedeemablePoints: 40000
          });

          click(airChangeSummaryPageWrapper.find('Button'));

          expect(pushStub).to.have.been.calledWith('/air/change/reconcile.html');
        });

        it('should transition to Review page without enough points for even change', async () => {
          sinon.stub(AppSelector, 'getCurrentAppFlow').returns('air/change');
          airChangeSummaryPageWrapper = createComponentWrapper({
            changePricingPage: new ChangePricingPageBuilder().withPointsEvenExchangeTaxEvenExchange().build(),
            isLoggedIn: true,
            accountRedeemablePoints: 0,
            changeType: {
              evenExchange: true,
              upGrade: false,
              downGrade: false
            }
          });

          click(airChangeSummaryPageWrapper.find('Button'));

          expect(pushStub).to.have.been.calledWith('/air/change/reconcile.html');
        });

        it('should transition to Review page without enough points for downgrade change', async () => {
          sinon.stub(AppSelector, 'getCurrentAppFlow').returns('air/change');
          airChangeSummaryPageWrapper = createComponentWrapper({
            changePricingPage: new ChangePricingPageBuilder().withPointsDowngradeTaxEvenExchange().build(),
            isLoggedIn: true,
            accountRedeemablePoints: 0,
            changeType: {
              evenExchange: false,
              upGrade: false,
              downGrade: true
            }
          });

          click(airChangeSummaryPageWrapper.find('Button'));

          expect(pushStub).to.have.been.calledWith('/air/change/reconcile.html');
        });
      });

      context('resume after login', () => {
        it('should transition to Review page with enough points', () => {
          sinon.stub(AppSelector, 'getCurrentAppFlow').returns('air/change');
          airChangeSummaryPageWrapper = createComponentWrapper({
            changePricingPage: new ChangePricingPageBuilder().withUpgradePoints().build(),
            isLoggedIn: true,
            accountRedeemablePoints: 100000,
            resumeAfterLogin: true,
            shouldResumeAfterLogin: true
          });

          expect(resumeAfterLoginFnStub).to.have.been.calledWith(false);
          expect(pushStub).to.have.been.calledWith('/air/change/reconcile.html');
        });

        it('should show pop up without enough points', () => {
          airChangeSummaryPageWrapper = createComponentWrapper({
            changePricingPage: new ChangePricingPageBuilder().withUpgradePoints().build(),
            isLoggedIn: true,
            accountRedeemablePoints: 0,
            resumeAfterLogin: true,
            shouldResumeAfterLogin: true
          });

          expect(resumeAfterLoginFnStub).to.have.been.calledWith(false);
          expect(showDialogFnStub).to.have.been.called;
        });
      });
    });
  });

  const createComponentWrapper = (props) => {
    const defaultProps = {
      changePricingPage: _.merge({}, new ChangePricingPageBuilder().build(), _.get(props, 'changePricingPage', {})),
      push: pushStub,
      accountRedeemablePoints: 0,
      isLoggedIn: false,
      resumeAfterLogin: false,
      shouldResumeAfterLogin: false,
      getAccountInfoFn: getAccountInfoFnStub,
      showDialogFn: showDialogFnStub,
      hideDialogFn: hideDialogFnStub,
      resumeAfterLoginFn: resumeAfterLoginFnStub,
      changeType: {
        evenExchange: false,
        upGrade: true,
        downGrade: false
      }
    };

    return createComponent(AirChangeSummaryPage, {
      props: { ...defaultProps, ...props }
    });
  };
});
