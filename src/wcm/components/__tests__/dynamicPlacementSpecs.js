import { mount, shallow } from 'enzyme';
import _ from 'lodash';
import React from 'react';
import { Provider } from 'react-redux';
import { sandbox } from 'sinon';
import * as BootstrapHelper from 'src/app/helpers/bootstrapHelper';
import BootstrapConstants from 'src/shared/constants/bootstrapConstants';
import DynamicPlacement, { DynamicPlacement as ExportedDynamicPlacement } from 'src/wcm/components/dynamicPlacement';
import {
  configuredCommands,
  notAbsolutelyPositioned,
  supportedElements
} from 'src/wcm/constants/flexPlacementConstants';
import { BLOCK_PLACEMENT, MOBILE_HERO, FLEX_PLACEMENT, LEGACY_CHASE_AD } from 'src/wcm/constants/wcmConstants';
import * as templateDataSelector from 'src/wcm/selectors/templateDataSelector';
import chaseBannerConfigBuilder from 'test/builders/model/chaseBannerConfigBuilder';
import { createMockStoreWithRouterMiddleware } from 'test/unit/helpers/createMockStore';

const sinon = sandbox.create();

context('DynamicPlacement', () => {
  const onClick = () => {};
  const baseTemplateData = {
    companionRemainingPoints: '0',
    redeemablePoints: '0',
    destinationAirport: ''
  };
  const additionalTemplateData = {
    earlyBirdTotalPrice: 25,
    earlyBirdUnitPrice: 12
  };
  const augmentedTemplateData = {
    ...baseTemplateData,
    ...additionalTemplateData,
    templateKey: 'value'
  };
  const mobileHeroProps = {
    displayType: MOBILE_HERO,
    promoImageBackground: 'backgroundImage',
    imageForegroundAltText: '',
    target: 'target',
    linkType: 'app',
    viewPortThreshold: 0.1,
    shouldObserveViewPort: false,
    isChasePrequal: true,
    isChaseCombo: true,
    isChasePlacement: true,
    contentBlockId: '',
    isWebView: true,
    referrer: 'referrer',
    onClick
  };
  const blockPlacementProps = {
    displayType: BLOCK_PLACEMENT,
    promoImageBackground: 'backgroundImage',
    imageForegroundAltText: '',
    target: 'target',
    linkType: 'app',
    viewPortThreshold: 0.1,
    shouldObserveViewPort: false,
    isChasePrequal: true,
    isChaseCombo: true,
    isChasePlacement: true,
    contentBlockId: '',
    isWebView: true,
    referrer: 'referrer',
    onClick
  };
  const chaseBannerConfig = new chaseBannerConfigBuilder().build();
  const chaseInstantCreditProps = {
    ...chaseBannerConfig,
    totalFare: {
      amount: '1,311.11',
      currencyCode: 'USD',
      currencySymbol: '$'
    },
    returnUrl: 'returnUrl',
    isLoggedIn: true,
    onClick
  };

  afterEach(() => {
    sinon.restore();
  });

  let getAugmentedTemplateDataStub;
  let handlePlacementLinkFnStub;

  beforeEach(() => {
    sinon.stub(templateDataSelector, 'getBaseTemplateData').returns(baseTemplateData);
    getAugmentedTemplateDataStub = sinon
      .stub(templateDataSelector, 'getAugmentedTemplateData')
      .returns(augmentedTemplateData);
    handlePlacementLinkFnStub = sinon.stub();
  });

  context('mobile hero display type', () => {
    it('should render ImagePlacement', () => {
      const wrapper = createComponent(mobileHeroProps);

      expect(_.omit(wrapper.find('ImagePlacement').props(), 'handlePlacementLinkFn')).to.deep.equal({
        displayType: MOBILE_HERO,
        promoImageBackground: 'backgroundImage',
        imageForegroundAltText: '',
        target: 'target',
        linkType: 'app',
        isChasePrequal: true,
        isChaseCombo: true,
        isChasePlacement: true,
        isWebView: true,
        referrer: 'referrer',
        onClick,
        viewPortThreshold: 0.1,
        shouldObserveViewPort: false,
        contentBlockId: '',
        baseTemplateData
      });
      expect(getAugmentedTemplateDataStub).to.not.have.been.called;
    });
  });

  context('block placement display type', () => {
    it('should render ImagePlacement', () => {
      const wrapper = createComponent(blockPlacementProps);

      expect(_.omit(wrapper.find('ImagePlacement').props(), 'handlePlacementLinkFn')).to.deep.equal({
        displayType: BLOCK_PLACEMENT,
        promoImageBackground: 'backgroundImage',
        imageForegroundAltText: '',
        target: 'target',
        linkType: 'app',
        isChasePrequal: true,
        isChaseCombo: true,
        isChasePlacement: true,
        isWebView: true,
        referrer: 'referrer',
        onClick,
        viewPortThreshold: 0.1,
        shouldObserveViewPort: false,
        contentBlockId: '',
        baseTemplateData
      });
      expect(getAugmentedTemplateDataStub).to.not.have.been.called;
    });
  });

  context('legacy chase ad display type', () => {
    it('should render ChaseInstantCredit', () => {
      const wrapper = createComponent(chaseInstantCreditProps);

      expect(_.omit(wrapper.find('ChaseInstantCredit').props(), 'onClick', 'handlePlacementLinkFn')).to.deep.equal({
        totalFare: {
          amount: '1,311.11',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        returnUrl: 'returnUrl',
        isLoggedIn: true,
        isWebView: false,
        buttonText: 'Learn more',
        topMessageTextValue: "You're pre-qualified!",
        mathLine1TextValueLeft: 'You pay today',
        mathLine2TextValueLeft: 'Credit on your statement',
        mathLine3TextValueLeft: 'Total after statement credit',
        partnerImage: '/partnerImage.png',
        primaryTextValue: 'Get $200 statement credit',
        secondaryTextValue: 'after first purchase & earn 10,000 bonus points',
        statementCredit: 200,
        styles: {
          adType: 'math',
          backgroundColor: 'bgpblue',
          buttonType: 'button--grey',
          topMessageTextColor: 'white',
          topMessageTextStyle: 'bold',
          topMessageBackgroundColor: 'bggreen',
          mathLine1ColorLeft: 'white',
          mathLine1ColorRight: 'white',
          mathLine1StyleLeft: '',
          mathLine1StyleRight: '',
          mathLine2ColorLeft: 'yellow',
          mathLine2ColorRight: 'yellow',
          mathLine2StyleLeft: '',
          mathLine2StyleRight: '',
          mathLine3ColorLeft: 'white',
          mathLine3ColorRight: 'white',
          mathLine3StyleLeft: 'bold',
          mathLine3StyleRight: 'bold',
          primaryTextColor: 'yellow',
          primaryTextStyle: 'bold, italic',
          secondaryTextColor: 'yellow',
          secondaryTextStyle: 'italic'
        },
        displayType: LEGACY_CHASE_AD,
        viewPortThreshold: 0.5,
        shouldObserveViewPort: false,
        isChasePrequal: false,
        isChaseCombo: false,
        isChasePlacement: false,
        contentBlockId: '',
        target: 'https://xldadm01:4700/?app=mWeb',
        linkType: 'webview',
        baseTemplateData
      });
      expect(getAugmentedTemplateDataStub).to.not.have.been.called;
    });
  });

  context('flex placement display type', () => {
    const styles = {
      backgroundColor: '#1a2c80',
      width: '100px'
    };
    const placementProps = {
      displayType: FLEX_PLACEMENT,
      placement: {
        templateKeys: ['templateKey'],
        type: 'a',
        styles,
        props: {
          display: 'block'
        },
        flexSettings: {
          shouldScalePlacement: true
        },
        childContent: []
      },
      placementData: {
        linkType: 'webview'
      }
    };

    let setStateStub;
    let useStateStub;
    let addEventListenerStub;
    let removeEventListenerStub;

    beforeEach(() => {
      setStateStub = sinon.stub();
      useStateStub = sinon.stub(React, 'useState').returns([{ scaleFactor: 1 }, setStateStub]);
      addEventListenerStub = sinon.stub(window, 'addEventListener').withArgs('resize');
      removeEventListenerStub = sinon.stub(window, 'removeEventListener').withArgs('resize');
    });

    it('should render FlexPlacement', () => {
      const wrapper = createComponent(placementProps);

      expect(_.omit(wrapper.find('FlexPlacementComponent').props(), 'handlePlacementLinkFn')).to.deep.equal({
        displayType: FLEX_PLACEMENT,
        isWebView: false,
        placement: {
          templateKeys: ['templateKey'],
          type: 'a',
          styles: {
            backgroundColor: '#1a2c80',
            width: '100px'
          },
          props: {
            display: 'block'
          },
          flexSettings: {
            shouldScalePlacement: true
          },
          childContent: []
        },
        placementData: {
          linkType: 'webview'
        },
        baseTemplateData,
        additionalProps: {
          templateData: {
            earlyBirdTotalPrice: 25,
            earlyBirdUnitPrice: 12,
            companionRemainingPoints: '0',
            redeemablePoints: '0',
            destinationAirport: '',
            templateKey: 'value'
          },
          scaleFactor: 1
        },
        supportedElements,
        notAbsolutelyPositioned,
        configuredCommands,
        className: 'visible'
      });
      expect(getAugmentedTemplateDataStub).to.have.been.called;
    });

    it('should not resize FlexPlacement when width is equal to screen width', () => {
      const wrapper = createComponent(placementProps);
      const windowResizeFn = addEventListenerStub.getCall(0).args[1];

      wrapper.find('.dynamic-placement').getDOMNode().getBoundingClientRect = () => ({ width: 100 });
      windowResizeFn();

      expect(getAugmentedTemplateDataStub).to.have.been.called;
      expect(useStateStub).to.have.been.called;
      expect(addEventListenerStub).to.have.been.calledOnce;
      expect(setStateStub).to.not.have.been.calledOnce;
      expect(removeEventListenerStub).to.not.have.been.called;

      wrapper.unmount();

      expect(removeEventListenerStub).to.have.been.calledOnce;
    });

    it('should resize FlexPlacement when width is not equal to screen width', () => {
      const wrapper = createComponent(placementProps);
      const windowResizeFn = addEventListenerStub.getCall(0).args[1];

      wrapper.find('.dynamic-placement').getDOMNode().getBoundingClientRect = () => ({ width: 400 });
      windowResizeFn();

      expect(getAugmentedTemplateDataStub).to.have.been.called;
      expect(useStateStub).to.have.been.called;
      expect(addEventListenerStub).to.have.been.calledOnce;
      expect(setStateStub).to.have.been.calledWith({ scaleFactor: 4 });
      expect(removeEventListenerStub).to.not.have.been.called;

      wrapper.unmount();

      expect(removeEventListenerStub).to.have.been.calledOnce;
    });

    it('should default scale factor to 1 if placement width is not in pixels', () => {
      useStateStub.returns([{ scaleFactor: 0 }, setStateStub]);

      const wrapper = createComponent({
        ...placementProps,
        placement: {
          ...placementProps.placement,
          styles: {
            ...placementProps.placement.styles,
            width: '100%'
          }
        }
      });
      const windowResizeFn = addEventListenerStub.getCall(0).args[1];

      wrapper.find('.dynamic-placement').getDOMNode().getBoundingClientRect = () => ({ width: 400 });
      windowResizeFn();

      expect(setStateStub).to.have.been.calledWith({ scaleFactor: 1 });
    });

    it('should use default scaleFactor when boundingClientRect does not exist', () => {
      const wrapper = createComponent(placementProps);
      const windowResizeFn = addEventListenerStub.getCall(0).args[1];

      wrapper.find('.dynamic-placement').getDOMNode().getBoundingClientRect = undefined;
      windowResizeFn();

      expect(getAugmentedTemplateDataStub).to.have.been.called;
      expect(useStateStub).to.have.been.called;
      expect(addEventListenerStub).to.have.been.calledOnce;
      expect(setStateStub).to.not.have.been.called;
      expect(removeEventListenerStub).to.not.have.been.called;

      wrapper.unmount();

      expect(removeEventListenerStub).to.have.been.calledOnce;
    });

    it('should use default scaleFactor when boundingClientRect width does not exist', () => {
      const wrapper = createComponent(placementProps);
      const windowResizeFn = addEventListenerStub.getCall(0).args[1];

      wrapper.find('.dynamic-placement').getDOMNode().getBoundingClientRect = () => ({});
      windowResizeFn();

      expect(getAugmentedTemplateDataStub).to.have.been.called;
      expect(useStateStub).to.have.been.called;
      expect(addEventListenerStub).to.have.been.calledOnce;
      expect(setStateStub).to.not.have.been.called;
      expect(removeEventListenerStub).to.not.have.been.called;

      wrapper.unmount();

      expect(removeEventListenerStub).to.have.been.calledOnce;
    });

    context('with shouldCheckBootstrap', () => {
      const bootstrapData = {
        'mobile-web': {
          results: {
            mockPlacementKey: {
              content: placementProps
            }
          }
        }
      };
      const defaultProps = {
        placementKey: 'mockPlacementKey',
        shouldCheckBootstrapData: true
      };
      const bootstrapDataWithSkeleton = {
        'mobile-web': {
          results: {
            mockPlacementKey: {
              content: _.merge({}, placementProps, {
                placementData: { ...placementProps.placementData, contentLoadingState: 'skeleton' }
              })
            }
          }
        }
      };
      let fetchBootstrapDataStub;

      beforeEach(() => {
        fetchBootstrapDataStub = sinon.stub(BootstrapHelper, 'fetchBootstrapData');
      });

      context('when value is true', () => {
        it('should render loading shimmer with shouldDisplay false and placement with fade-in when props placement is defined', () => {
          const bootstrapDataWithSkeleton = {
            'mobile-web': {
              results: {
                mockPlacementKey: {
                  content: _.merge({}, placementProps, {
                    placementData: { ...placementProps.placementData, contentLoadingState: 'skeleton' }
                  })
                }
              }
            }
          };

          fetchBootstrapDataStub.returns(bootstrapDataWithSkeleton);
          const wrapper = createComponent({ ...defaultProps, ...placementProps }, true);

          expect(wrapper).toMatchSnapshot();
        });

        it('should render loading shimmer with shouldDisplay true and adjustedStyles when contentLoadingState is skeleton', () => {
          fetchBootstrapDataStub.returns(bootstrapDataWithSkeleton);
          const wrapper = createComponent(defaultProps, true);

          expect(wrapper).toMatchSnapshot();
        });

        it('should call fetchBootstrapData', () => {
          fetchBootstrapDataStub.returns(bootstrapData);

          createComponent(defaultProps);
          expect(fetchBootstrapDataStub).to.have.been.calledWith(BootstrapConstants.CONTENT_PATH);
        });

        it('should resize FlexPlacement when width is not equal to screen width', () => {
          fetchBootstrapDataStub.returns(bootstrapData);
          const wrapper = createComponent(defaultProps);
          const windowResizeFn = addEventListenerStub.getCall(0).args[1];

          wrapper.find('.dynamic-placement').getDOMNode().getBoundingClientRect = () => ({ width: 400 });
          windowResizeFn();

          expect(getAugmentedTemplateDataStub).to.have.been.called;
          expect(useStateStub).to.have.been.called;
          expect(addEventListenerStub).to.have.been.calledOnce;
          expect(setStateStub).to.have.been.calledWith({ scaleFactor: 4 });
          expect(removeEventListenerStub).to.not.have.been.called;

          wrapper.unmount();

          expect(removeEventListenerStub).to.have.been.calledOnce;
        });

        it('should render loading shimmer with MobileHero display type', () => {
          const bootstrapDataWithSkeleton = {
            'mobile-web': {
              results: {
                mockPlacementKey: {
                  content: _.merge({}, mobileHeroProps, {
                    placementData: { contentLoadingState: 'skeleton' }
                  })
                }
              }
            }
          };

          fetchBootstrapDataStub.returns(bootstrapDataWithSkeleton);
          const wrapper = createComponent(defaultProps, true);

          expect(wrapper).toMatchSnapshot();
        });

        it('should render loading shimmer with ImagePlacement display type', () => {
          const bootstrapDataWithSkeleton = {
            'mobile-web': {
              results: {
                mockPlacementKey: {
                  content: _.merge({}, blockPlacementProps, {
                    placementData: { contentLoadingState: 'skeleton' }
                  })
                }
              }
            }
          };

          fetchBootstrapDataStub.returns(bootstrapDataWithSkeleton);
          const wrapper = createComponent(defaultProps, true);

          expect(wrapper).toMatchSnapshot();
        });

        it('should render loading shimmer with LegacyChaseAd display type', () => {
          const bootstrapDataWithSkeleton = {
            'mobile-web': {
              results: {
                mockPlacementKey: {
                  content: _.merge({}, chaseInstantCreditProps, {
                    placementData: { contentLoadingState: 'skeleton' }
                  })
                }
              }
            }
          };

          fetchBootstrapDataStub.returns(bootstrapDataWithSkeleton);
          const wrapper = createComponent(defaultProps, true);

          expect(wrapper).toMatchSnapshot();
        });
      });

      context('when value is false', () => {
        it('should not call fetchBootstrapData', () => {
          fetchBootstrapDataStub.returns(bootstrapData);

          createComponent(placementProps);
          expect(fetchBootstrapDataStub).to.not.have.been.called;
        });
      });
    });
  });

  context('invalid display type', () => {
    it('should not render placement', () => {
      const props = {
        displayType: 'invalid',
        placement: {},
        placementData: {}
      };

      const wrapper = createComponent(props);

      expect(wrapper.find('FlexPlacement')).to.be.length(0);
      expect(wrapper.find('PromoBanner')).to.be.length(0);
      expect(getAugmentedTemplateDataStub).to.not.have.been.called;
    });
  });

  context('hidePlacement', () => {
    it('should hide placement if hidePlacement props is true', () => {
      const props = {
        hidePlacement: true,
        placement: {},
        placementData: {}
      };
      const wrapper = createComponent(props);

      expect(wrapper.find('FlexPlacement')).to.be.length(0);
      expect(wrapper.find('PromoBanner')).to.be.length(0);
      expect(getAugmentedTemplateDataStub).to.not.have.been.called;
    });
  });

  const createComponent = (props = {}, shouldShallow = false) => {
    const defaultProps = {
      handlePlacementLinkFn: handlePlacementLinkFnStub
    };

    const finalProps = _.merge({}, defaultProps, props);

    const store = createMockStoreWithRouterMiddleware()({ app: { webView: { isWebView: false } } });

    return shouldShallow
      ? shallow(<ExportedDynamicPlacement {...finalProps} />)
      : mount(
        <Provider store={store}>
          <DynamicPlacement {...finalProps} />
        </Provider>
      );
  };
});
