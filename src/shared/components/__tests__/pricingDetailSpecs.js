import React from 'react';
import _ from 'lodash';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { sandbox } from 'sinon';
import PricingDetail from 'src/shared/components/pricingDetail';
import { mockErrorHeaderContainer } from 'test/unit/helpers/testUtils';
import { createMockStoreWithRouterMiddleware } from 'test/unit/helpers/createMockStore';
import PlacementContent from 'test/builders/apiResponse/v1/content-delivery/query/placements';
import PricesBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/page/flights/pricesBuilder';
import PriceTotalBuilder from 'test/builders/model/priceTotalBuilder';
import { click } from 'test/unit/helpers/enzymeFormTestUtils';
import chaseBannerConfigBuilder from 'test/builders/model/chaseBannerConfigBuilder';
import { REFERRERS } from 'src/shared/constants/webViewConstants';
import * as AnalyticsEventHelper from 'src/shared/analytics/helpers/analyticsEventHelper';

const sinon = sandbox.create();

describe('pricingDetail', () => {
  context('render', () => {
    const defaultFlightProducts = new PricesBuilder().build().flightPricingPage;
    const { bounds, totals } = defaultFlightProducts;
    let pricingSummaryWrapper;
    let handleFirmOfferOfCreditFnStub;
    let setChaseBannerShownFnStub;

    beforeEach(() => {
      mockErrorHeaderContainer(sinon);

      pricingSummaryWrapper = createComponent();
      handleFirmOfferOfCreditFnStub = sinon.stub();
      setChaseBannerShownFnStub = sinon.stub();
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should render passenger price', () => {
      pricingSummaryWrapper = createComponent();

      const passengerPriceWrapper = pricingSummaryWrapper.find('ProgressionBar');

      expect(passengerPriceWrapper).to.be.present();
    });

    it('should render Progression Bar', () => {
      const progressionBarWrapper = pricingSummaryWrapper.find('ProgressionBar');

      expect(progressionBarWrapper.props()).to.deep.equal({
        completedIconType: 'check',
        currentIconType: 'airplane',
        step: 1,
        subTitles: ['Price', 'Passengers', 'Purchase'],
        title: 'Price',
        totalStep: 4
      });
    });

    it('should render continue button', () => {
      expect(pricingSummaryWrapper.find('.continue').find('Button')).to.have.prop('children', 'Continue');
    });

    context('should handle placements', () => {
      const shouldShallow = true;

      it('and not render promoTop01 if it does not exist', () => {
        const wrapper = createComponent({}, {}, shouldShallow);

        expect(wrapper.find('[data-qa="promoTop01"]')).to.not.exist;
      });

      it('and render promoTop01 if it exists', () => {
        const promoTop01 = new PlacementContent().getContentOf('promoTop01');

        const wrapper = createComponent({ promoTop01 }, {}, shouldShallow);

        expect(wrapper.find('[data-qa="promoTop01"]')).toMatchSnapshot();
      });

      it('and not render promoMiddle01 if it does not exist', () => {
        const wrapper = createComponent({}, {}, shouldShallow);

        expect(wrapper.find('[data-qa="promoMiddle01"]')).to.not.exist;
      });

      it('and render promoMiddle01 if it exists', () => {
        const promoMiddle01 = new PlacementContent().getContentOf('promoMiddle01');

        const wrapper = createComponent({ promoMiddle01 }, {}, shouldShallow);

        expect(wrapper.find('[data-qa="promoMiddle01"]')).toMatchSnapshot();
      });
    });

    context('price detail summary', () => {
      let reservationFlightSummaryWrapper;
      let priceTotalWrapper;

      beforeEach(() => {
        reservationFlightSummaryWrapper = pricingSummaryWrapper.find('ReservationFlightSummary');
        priceTotalWrapper = pricingSummaryWrapper.find('PriceTotal');
      });

      context('reservation flight summary', () => {
        it('should render flight summary header', () => {
          const flightSummaryHeader = reservationFlightSummaryWrapper.find('ReservationFlightSummary');

          expect(flightSummaryHeader.props()).to.deep.equal({ bounds });
        });
      });

      context('price total', () => {
        it('should render price total info', () => {
          const priceTotalInfoWrapper = priceTotalWrapper.find('PriceTotal');

          expect(priceTotalInfoWrapper.props()).to.deep.equal({
            shouldHidePriceBreakdown: false,
            showEarlyBirdInFareBreakdown: false,
            earlyBirdEligibility: undefined,
            travelFundsBalanceRemaining: undefined,
            totals
          });
        });
      });
    });

    context('when corporate', () => {
      it('should not show company header section if there is no associated company', () => {
        pricingSummaryWrapper = createComponent();
        expect(pricingSummaryWrapper.find('CompanyNameBanner')).not.to.be.present();
      });

      it('should show company header section if there is an associated company', () => {
        pricingSummaryWrapper = createComponent({
          selectedCompanyName: 'Dunder Mifflin Paper Company'
        });
        expect(pricingSummaryWrapper.find('CompanyNameBanner')).to.be.present();
      });
    });

    context('when loading early bird from wcm placement', () => {
      const earlyBirdUpsellContent = {
        displayType: 'flex-placement',
        placementData: {},
        handlePlacementLinkFn: _.noop,
        viewPortThreshold: 4,
        shouldObserveViewPort: false,
        contentBlockId: '',
        isChaseCombo: false,
        isChasePlacement: false,
        placement: {
          templateKeys: ['earlyBirdTotalPrice', 'earlyBirdUnitPrice'],
          flexSettings: {
            disableAbsolutePositioning: true
          },
          childContent: [
            {
              flexSettings: {
                disableAbsolutePositioning: true
              },
              childContent: [
                {
                  childContent: [
                    {
                      childContent: [
                        {
                          textContent: 'Add EarlyBird Check-In',
                          type: 'span',
                          props: {}
                        },
                        {
                          textContent: '®',
                          type: 'sup',
                          props: {}
                        }
                      ]
                    }
                  ],
                  styles: {
                    'padding-top': '22px',
                    color: '#6479C5',
                    'padding-left': '20px',
                    display: 'inline-block',
                    width: '70%',
                    fontSize: '18px'
                  },
                  type: 'Heading',
                  props: {
                    id: 'heading_idvzta6conh'
                  }
                },
                {
                  childContent: [
                    {
                      props: {
                        command: 'EARLY_BIRD_SWITCH'
                      }
                    }
                  ],
                  styles: {
                    display: 'inline-block',
                    'margin-top': '1px',
                    float: 'right',
                    'margin-right': '10px'
                  },
                  type: 'div',
                  props: {
                    id: 'command_4xn1hmdbw3a'
                  }
                },
                {
                  childContent: [
                    {
                      textContent: '$${earlyBirdTotalPrice}',
                      styles: {
                        'font-weight': 'bold',
                        'font-size': '15'
                      },
                      type: 'span',
                      props: {}
                    },
                    {
                      textContent: ' ',
                      type: 'span',
                      props: {}
                    },
                    {
                      textContent: '(Starting from ',
                      type: 'span',
                      props: {}
                    },
                    {
                      textContent: '$${earlyBirdUnitPrice} per passenger, each way)',
                      styles: {
                        'font-size': '11'
                      },
                      type: 'span',
                      props: {}
                    }
                  ],
                  styles: {
                    'padding-top': '0px',
                    color: '#8f8f8f',
                    'padding-left': '20px',
                    fontSize: '12px'
                  },
                  props: {
                    id: 'text_block_iclmmomkfm'
                  }
                },
                {
                  styles: {
                    backgroundColor: '#cccccc',
                    top: '85px',
                    left: '0px',
                    width: '375px',
                    position: 'absolute',
                    height: '1px'
                  },
                  type: 'div',
                  props: {
                    role: 'presentation',
                    id: 'line_separator_qt1iou5mghd'
                  }
                },
                {
                  styles: {
                    'padding-left': '6px'
                  },
                  type: 'div',
                  props: {
                    id: 'command_s6nsvjp0qr8'
                  }
                },
                {
                  childContent: [
                    {
                      props: {
                        command: 'EARLY_BIRD_PRICING_BREAKDOWN'
                      }
                    }
                  ]
                },
                {
                  childContent: [
                    {
                      childContent: [
                        {
                          textContent: 'Automatic check-in',
                          type: 'span',
                          props: {}
                        }
                      ],
                      styles: {},
                      type: 'li',
                      props: {
                        id: 'text_list_item_7qikvqalvsb'
                      }
                    },
                    {
                      childContent: [
                        {
                          textContent: 'Earlier boarding position',
                          type: 'span',
                          props: {}
                        }
                      ],
                      styles: {},
                      type: 'li',
                      props: {
                        id: 'text_list_item_3md8d1xcy3t'
                      }
                    },
                    {
                      childContent: [
                        {
                          textContent: 'Earlier access to seats',
                          type: 'span',
                          props: {}
                        }
                      ],
                      styles: {},
                      type: 'li',
                      props: {
                        id: 'text_list_item_r4qmppq9is'
                      }
                    },
                    {
                      childContent: [
                        {
                          textContent: 'Earlier access to overhead bin space',
                          type: 'span',
                          props: {}
                        }
                      ],
                      styles: {},
                      type: 'li',
                      props: {
                        id: 'text_list_item_58irypp6ins'
                      }
                    }
                  ],
                  styles: {
                    'padding-top': '10px',
                    color: '#666666',
                    'padding-left': '37px',
                    listStyleType: 'disc',
                    'padding-bottom': '50px',
                    fontSize: '14px'
                  },
                  type: 'ul',
                  props: {
                    id: 'text_list_6h5pd59ab7s'
                  }
                }
              ],
              styles: {
                backgroundColor: '#ffffff',
                id: 'flex_content_xgzqy1f9jqe'
              },
              type: 'div',
              props: {}
            }
          ],
          styles: {
            backgroundColor: 'none'
          },
          props: {
            id: 'flex_9ku4tpyu9dj'
          }
        }
      };
      const earlyBirdEligibility = {
        adultProductsCount: '1',
        bounds: [],
        ineligibilityReasons: [],
        totalPrice: {
          amount: '25',
          currencyCode: 'USD',
          currencySymbol: 'USD'
        },
        unitPrice: {
          amount: '25',
          currencyCode: 'USD',
          currencySymbol: 'USD',
          description: 'description'
        },
        _meta: {
          passengers: [
            {
              name: {
                firstName: '',
                lastName: '',
                middleName: ''
              },
              passengerReference: '',
              accountNumber: '',
              gender: '',
              dateOfBirth: ''
            }
          ]
        }
      };
      const state = {
        app: {
          toggles: {
            EARLY_BIRD_AB_TESTING: true
          },
          airBooking: {
            earlyBirdEligibility
          }
        }
      };

      it('should not show EarlyBirdInFareBreakdown if EARLY_BIRD_AB_TESTING is OFF', () => {
        const pricingSummaryWrapper = createComponent(
          {
            EARLY_BIRD_AB_TESTING: false,
            earlyBirdUpsell: earlyBirdUpsellContent,
            earlyBirdEligibility,
            earlyBirdSelected: true
          },
          state
        );

        expect(pricingSummaryWrapper.find('PriceTotal')).to.have.props({
          showEarlyBirdInFareBreakdown: false
        });
      });

      it('should render early bird from placement with switch off (early bird is not selected)', () => {
        const pricingSummaryWrapper = createComponent(
          {
            EARLY_BIRD_AB_TESTING: true,
            earlyBirdUpsell: earlyBirdUpsellContent,
            earlyBirdEligibility,
            earlyBirdSelected: false
          },
          state
        );

        expect(pricingSummaryWrapper.find('EarlyBirdInPathBreakdown')).to.not.present;
      });

      it('should render early bird from placement with switch on (early bird is selected)', () => {
        const pricingSummaryWrapper = createComponent(
          {
            EARLY_BIRD_AB_TESTING: true,
            earlyBirdUpsell: earlyBirdUpsellContent,
            earlyBirdEligibility,
            earlyBirdSelected: true
          },
          state
        );

        expect(pricingSummaryWrapper.find('EarlyBirdInPathBreakdown')).to.present;
      });
    });

    context('banner messages', () => {
      it('should display the banner messages if they are provided', () => {
        const props = {
          flightPricingPage: new PricesBuilder().withMessages().build().flightPricingPage
        };
        const wrapper = createComponent(props, {}, true);

        expect(wrapper).toMatchSnapshot();
      });
    });

    context('PP Upsell', () => {
      it('should display if upsellDetails is provided and hasUpsellError is false', () => {
        const { flightPricingPage } = new PricesBuilder().withUpsellDetails().build();
        const wrapper = createComponent({ flightPricingPage }, {}, true);

        expect(wrapper).toMatchSnapshot();
      });

      it('should not display if upsellDetails is provided and hasUpsellError is true', () => {
        const { flightPricingPage } = new PricesBuilder().withUpsellDetails().build();
        const wrapper = createComponent({ flightPricingPage, hasUpsellError: true }, {}, true);

        expect(wrapper).toMatchSnapshot();
      });

      it('should call setIsUpsellModalActive with true and satellite track on Upsell button click', () => {
        const setIsUpsellModalActiveStub = sinon.stub();
        const raiseSatelliteEventStub = sinon.stub(AnalyticsEventHelper, 'raiseSatelliteEvent');

        sinon.stub(React, 'useState').returns([false, setIsUpsellModalActiveStub]);

        const { flightPricingPage } = new PricesBuilder().withUpsellDetails().build();
        const wrapper = createComponent({ flightPricingPage });

        click(wrapper.find('UpsellDetails').find('Button'));

        expect(setIsUpsellModalActiveStub).to.have.been.calledWith(true);
        expect(raiseSatelliteEventStub).to.have.been.calledWith('squid', {
          pagedescription: 'modal:Upsell Price Page'
        });
      });

      it('should call setIsUpsellModalActive with false on cancel button click', () => {
        const setIsUpsellModalActiveStub = sinon.stub();

        sinon.stub(React, 'useState').returns([true, setIsUpsellModalActiveStub]);

        const { flightPricingPage } = new PricesBuilder().withUpsellDetails().build();
        const wrapper = createComponent({ flightPricingPage });

        click(wrapper.find('[data-qa="upsell-upgrade-options"]').find('button'));

        expect(setIsUpsellModalActiveStub).to.have.been.calledWith(false);
      });

      it('should display UpsellSuccessWidget if upsellSuccessMessage is provided', () => {
        const { flightPricingPage } = new PricesBuilder().withUpsellSuccessMessage().build();
        const wrapper = createComponent({ flightPricingPage }, {}, true);

        expect(wrapper).toMatchSnapshot();
      });

      it('should return correct upsell modal option links and call satellite track', () => {
        const raiseSatelliteEventStub = sinon.stub(AnalyticsEventHelper, 'raiseSatelliteEvent');
        const { flightPricingPage } = new PricesBuilder().withUpsellBothBoundsOptions().build();
        const upsellDepartureBoundLinkObj = {
          body: {
            adultPassengers: {
              productIds: ['testDepartureProductId'],
              numberOfPassengers: '3'
            },
            promoCodeToken: null,
            chaseSessionId: null,
            itineraryPricingToken: 'departure-itinerary-token',
            upsellToken: 'testDepartureUpsellToken'
          },
          href: '/v1/mobile-air-booking/page/flights/prices',
          method: 'POST'
        };
        const upsellReturnBoundLinkObj = {
          body: {
            adultPassengers: {
              productIds: ['testReturnProductId'],
              numberOfPassengers: '3'
            },
            promoCodeToken: null,
            chaseSessionId: null,
            itineraryPricingToken: 'return-itinerary-token',
            upsellToken: 'testReturnUpsellToken'
          },
          href: '/v1/mobile-air-booking/page/flights/prices',
          method: 'POST'
        };
        const { flightPricingUpsellBothBounds } = flightPricingPage._links;
        const selectFlightProductWithUpsellFnStub = sinon.stub();
        const wrapper = createComponent(
          {
            flightPricingPage,
            selectFlightProductWithUpsellFn: selectFlightProductWithUpsellFnStub
          },
          {}
        );
        const upsellOptionLinks = wrapper.find('AbstractPopup').props().links;
        const upsellDepartureBoundSelectionText = upsellOptionLinks[0].label;
        const upsellReturnBoundSelectionText = upsellOptionLinks[1].label;
        const upsellBothBoundsSelectionText = upsellOptionLinks[2].label;

        upsellOptionLinks[0].handler();
        upsellOptionLinks[1].handler();
        upsellOptionLinks[2].handler();

        expect(selectFlightProductWithUpsellFnStub.firstCall.args[0]).to.eql(upsellDepartureBoundLinkObj);
        expect(selectFlightProductWithUpsellFnStub.secondCall.args[0]).to.eql(upsellReturnBoundLinkObj);
        expect(selectFlightProductWithUpsellFnStub.thirdCall.args[0]).to.eql(flightPricingUpsellBothBounds);
        expect(upsellDepartureBoundSelectionText).to.equal('Upgrade departing for $50');
        expect(upsellReturnBoundSelectionText).to.equal('Upgrade returning for $51');
        expect(upsellBothBoundsSelectionText).to.equal('Upgrade both for $101');
        expect(raiseSatelliteEventStub.firstCall).to.have.been.calledWith('squid', {
          pagedescription: 'button:upsell applied',
          upsell_totalcurrency: 150,
          upsell_boundsselected: 3
        });
        expect(raiseSatelliteEventStub.secondCall).to.have.been.calledWith('squid', {
          pagedescription: 'button:upsell applied',
          upsell_totalcurrency: 153,
          upsell_boundsselected: 3
        });
        expect(raiseSatelliteEventStub.thirdCall).to.have.been.calledWith('squid', {
          pagedescription: 'button:upsell applied',
          upsell_totalcurrency: 303,
          upsell_boundsselected: 6
        });
      });
    });

    context('chase ad banner', () => {
      it('should not display when chaseBannerConfig empty', () => {
        pricingSummaryWrapper = createComponent();

        expect(pricingSummaryWrapper.find('ChaseBanner')).to.not.exist;
        expect(setChaseBannerShownFnStub).to.not.have.been.called;
      });

      it('should not display when shouldShowChasePlacement is false', () => {
        const chaseBannerConfig = new chaseBannerConfigBuilder().build();

        pricingSummaryWrapper = createComponent({
          chaseBannerConfig,
          shouldShowChasePlacement: false,
          isPricePageChaseAdAboveTotal: true
        });

        expect(pricingSummaryWrapper.find('ChaseBanner')).to.not.exist;
        expect(setChaseBannerShownFnStub).to.not.have.been.called;
      });

      it('should be displayed above price total when shouldShowChasePlacement is true & isPricePageChaseAdAboveTotal is false', () => {
        const chaseBannerConfig = new chaseBannerConfigBuilder().build();

        pricingSummaryWrapper = createComponent({
          chaseBannerConfig,
          shouldShowChasePlacement: true,
          isPricePageChaseAdAboveTotal: true
        });

        expect(pricingSummaryWrapper.find('DynamicPlacement'));
        expect(setChaseBannerShownFnStub).to.not.have.been.called;
      });

      it('should show chase banner when chaseBannerConfig not empty', () => {
        const chaseBannerConfig = new chaseBannerConfigBuilder().build();

        pricingSummaryWrapper = createComponent({
          chaseBannerConfig,
          shouldShowChasePlacement: true,
          isPricePageChaseAdAboveTotal: true
        });
        const dynamicPlacementWrapper = pricingSummaryWrapper.find('DynamicPlacement');

        expect(
          _.omit(dynamicPlacementWrapper.props(), 'onClick', 'baseTemplateData', 'handlePlacementLinkFn')
        ).to.deep.equal({
          ...chaseBannerConfig,
          pageId: 'air-booking-price',
          totalFare: {
            amount: '233.98',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          returnUrl: '/pricingSummary',
          isWebView: false,
          referrer: REFERRERS.PRICE
        });
        expect(pricingSummaryWrapper.find('DynamicPlacement'));
        expect(setChaseBannerShownFnStub).to.not.have.been.called;
      });

      it('should call handleFirmOfferOfCreditFn when the observerCallback is invoked', () => {
        const shouldShallow = true;
        const chaseBannerConfig = new chaseBannerConfigBuilder().build();

        chaseBannerConfig.isChasePrequal = true;
        pricingSummaryWrapper = createComponent(
          { chaseBannerConfig, isLoggedIn: true, isPricePageChaseAdAboveTotal: true, shouldShowChasePlacement: true },
          shouldShallow
        );

        const observerCallback = pricingSummaryWrapper
          .find(`[data-qa="pricing-page-placement"]`)
          .prop('observerCallback');

        observerCallback();

        expect(handleFirmOfferOfCreditFnStub).to.have.been.called;
      });
    });

    const createComponent = (props, state = {}, shouldShallow = false) => {
      const defaultProps = {
        flightPricingPage: defaultFlightProducts,
        searchRequest: { tripType: 'roundTrip', isRoundTrip: true, numberOfAdults: 1, currencyType: 'USD' },
        priceTotal: new PriceTotalBuilder().build(),
        handleFirmOfferOfCreditFn: handleFirmOfferOfCreditFnStub,
        onContinueClick: _.noop,
        earlyBirdSelected: false,
        pathname: '/pricingSummary',
        isWebView: false,
        EARLY_BIRD_AB_TESTING: false
      };
      const finalProps = _.merge({}, defaultProps, props);

      const defaultState = {};
      const store = createMockStoreWithRouterMiddleware()(_.merge({}, defaultState, state));

      return shouldShallow
        ? shallow(<PricingDetail {...finalProps} />)
        : mount(
          <Provider store={store}>
            <PricingDetail {...finalProps} />
          </Provider>
        );
    };
  });
});
