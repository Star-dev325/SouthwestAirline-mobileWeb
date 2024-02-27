import { cleanup, render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import * as BootstrapHelper from 'src/app/helpers/bootstrapHelper';
import BootstrapConstants from 'src/shared/constants/bootstrapConstants';
import DynamicPlacement from 'src/wcm/components/dynamicPlacement';
import { BLOCK_PLACEMENT, FLEX_PLACEMENT, MOBILE_HERO } from 'src/wcm/constants/wcmConstants';
import * as templateDataSelector from 'src/wcm/selectors/templateDataSelector';
import chaseBannerConfigBuilder from 'test/builders/model/chaseBannerConfigBuilder';
import { createMockStoreWithRouterMiddleware } from 'test/unit/helpers/createMockStore';

describe('DynamicPlacement', () => {
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
    contentBlockId: '',
    displayType: MOBILE_HERO,
    imageForegroundAltText: '',
    isChaseCombo: true,
    isChasePlacement: true,
    isChasePrequal: true,
    isWebView: true,
    linkType: 'app',
    onClick,
    promoImageBackground: 'backgroundImage',
    referrer: 'referrer',
    shouldObserveViewPort: false,
    target: 'target',
    viewPortThreshold: 0.1
  };
  const blockPlacementProps = {
    contentBlockId: '',
    displayType: BLOCK_PLACEMENT,
    imageForegroundAltText: '',
    isChaseCombo: true,
    isChasePlacement: true,
    isChasePrequal: true,
    isWebView: true,
    linkType: 'app',
    onClick,
    promoImageBackground: 'backgroundImage',
    referrer: 'referrer',
    shouldObserveViewPort: false,
    target: 'target',
    viewPortThreshold: 0.1
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

  let getAugmentedTemplateDataMock;
  let handlePlacementLinkFnMock;

  beforeEach(() => {
    jest.spyOn(templateDataSelector, 'getBaseTemplateData').mockReturnValue(baseTemplateData);
    getAugmentedTemplateDataMock = jest
      .spyOn(templateDataSelector, 'getAugmentedTemplateData')
      .mockReturnValue(augmentedTemplateData);
    handlePlacementLinkFnMock = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('mobile hero display type', () => {
    it('should render ImagePlacement', () => {
      const { container } = createComponent(mobileHeroProps);

      expect(container.querySelector('.image-placement')).toBeTruthy();
      expect(getAugmentedTemplateDataMock).not.toHaveBeenCalled();
    });
  });

  describe('legacy chase ad display type', () => {
    it('should render ChaseInstantCredit', () => {
      const { container } = createComponent(chaseInstantCreditProps);

      expect(container.querySelector('#chase-container')).toBeTruthy();
      expect(getAugmentedTemplateDataMock).not.toHaveBeenCalled();
    });
  });

  describe('flex placement display type', () => {
    const styles = {
      backgroundColor: '#1a2c80',
      width: '100px'
    };
    const placementProps = {
      displayType: FLEX_PLACEMENT,
      placement: {
        childContent: [],
        flexSettings: {
          shouldScalePlacement: true
        },
        props: {
          display: 'block'
        },
        styles,
        templateKeys: ['templateKey'],
        type: 'a'
      },
      placementData: {
        linkType: 'webview'
      }
    };

    let resizeMock;
    let removeEventListenerMock;
    let setStateMock;
    let useStateMock;

    beforeEach(() => {
      resizeMock = jest.fn();
      global.addEventListener('resize', resizeMock);
      removeEventListenerMock = jest.spyOn(window, 'removeEventListener');
      setStateMock = jest.fn();
      useStateMock = jest.spyOn(React, 'useState').mockReturnValue([{ scaleFactor: 1 }, setStateMock]);
    });

    afterEach(() => {
      global.removeEventListener('resize', resizeMock);
      jest.resetAllMocks();
    });

    it('should render FlexPlacement', () => {
      const { container } = createComponent(placementProps);

      expect(container.querySelector('.flex-placement')).toBeTruthy();
      expect(getAugmentedTemplateDataMock).toHaveBeenCalled();
    });

    it('should not resize FlexPlacement when width is equal to screen width', () => {
      const { container } = createComponent(placementProps);

      container.querySelector('.dynamic-placement').getBoundingClientRect = () => ({ width: 100 });
      global.dispatchEvent(new Event('resize'));

      expect(resizeMock).toHaveBeenCalledTimes(1);
      expect(getAugmentedTemplateDataMock).toHaveBeenCalled();
      expect(removeEventListenerMock).toHaveBeenCalledTimes(3);
      expect(setStateMock).not.toHaveBeenCalled();
      expect(useStateMock).toHaveBeenCalled();
    });

    it('should resize FlexPlacement when width is not equal to screen width', () => {
      const { container } = createComponent(placementProps);

      container.querySelector('.dynamic-placement').getBoundingClientRect = () => ({ width: 400 });
      global.dispatchEvent(new Event('resize'));

      expect(resizeMock).toHaveBeenCalledTimes(1);
      expect(getAugmentedTemplateDataMock).toHaveBeenCalled();
      expect(removeEventListenerMock).toHaveBeenCalledTimes(3);
      expect(setStateMock).toHaveBeenCalledWith({ scaleFactor: 4 });
      expect(useStateMock).toHaveBeenCalled();
    });

    it('should default scale factor to 1 if placement width is not in pixels', () => {
      useStateMock.mockReturnValue([{ scaleFactor: 0 }, setStateMock]);

      const { container } = createComponent({
        ...placementProps,
        placement: {
          ...placementProps.placement,
          styles: {
            ...placementProps.placement.styles,
            width: '100%'
          }
        }
      });

      container.querySelector('.dynamic-placement').getBoundingClientRect = () => ({ width: 400 });
      global.dispatchEvent(new Event('resize'));

      expect(setStateMock).toHaveBeenCalledWith({ scaleFactor: 1 });
    });

    it('should use default scaleFactor when boundingClientRect does not exist', () => {
      const { container } = createComponent(placementProps);

      container.querySelector('.dynamic-placement').getBoundingClientRect = undefined;

      global.dispatchEvent(new Event('resize'));

      expect(resizeMock).toHaveBeenCalledTimes(1);
      expect(getAugmentedTemplateDataMock).toHaveBeenCalled();
      expect(removeEventListenerMock).toHaveBeenCalledTimes(3);
      expect(setStateMock).not.toHaveBeenCalled();
      expect(useStateMock).toHaveBeenCalled();
    });

    it('should use default scaleFactor when boundingClientRect width does not exist', () => {
      const { container } = createComponent(placementProps);

      container.querySelector('.dynamic-placement').getBoundingClientRect = () => ({});
      global.dispatchEvent(new Event('resize'));

      expect(resizeMock).toHaveBeenCalledTimes(1);
      expect(getAugmentedTemplateDataMock).toHaveBeenCalled();
      expect(removeEventListenerMock.mock.calls.filter(c => c[0] !== 'error').length).toBe(0);
      expect(setStateMock).not.toHaveBeenCalled();
      expect(useStateMock).toHaveBeenCalled();
    
      cleanup();

      expect(removeEventListenerMock.mock.calls.filter(c => c[0] !== 'error').length).toBe(1);
    });

    describe('with shouldCheckBootstrap', () => {
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
              content: { ...placementProps, 
                placementData: { ...placementProps.placementData, contentLoadingState: 'skeleton' }
              }
            }
          }
        }
      };

      let fetchBootstrapDataMock;

      beforeEach(() => {
        fetchBootstrapDataMock = jest.spyOn(BootstrapHelper, 'fetchBootstrapData');
      });

      describe('when value is true', () => {
        it('should render loading shimmer with shouldDisplay false and placement with fade-in when props placement is defined', () => {
          const bootstrapDataWithSkeleton = {
            'mobile-web': {
              results: {
                mockPlacementKey: {
                  content: { ...placementProps,
                    placementData: { ...placementProps.placementData, contentLoadingState: 'skeleton' }
                  }
                }
              }
            }
          };

          fetchBootstrapDataMock.mockReturnValue(bootstrapDataWithSkeleton);
          const { container } = createComponent({ ...defaultProps, ...placementProps }, true);

          expect(container).toMatchSnapshot();
        });

        it('should render loading shimmer with shouldDisplay true and adjustedStyles when contentLoadingState is skeleton', () => {
          fetchBootstrapDataMock.mockReturnValue(bootstrapDataWithSkeleton);
          const { container } = createComponent(defaultProps, true);

          expect(container).toMatchSnapshot();
        });

        it('should call fetchBootstrapData', () => {
          fetchBootstrapDataMock.mockReturnValue(bootstrapData);

          createComponent(defaultProps);

          expect(fetchBootstrapDataMock).toHaveBeenCalledWith(BootstrapConstants.CONTENT_PATH);
        });

        it('should resize FlexPlacement when width is not equal to screen width', () => {
          fetchBootstrapDataMock.mockReturnValue(bootstrapData);
          const { container } = createComponent(defaultProps);

          container.querySelector('.dynamic-placement').getBoundingClientRect = () => ({ width: 400 });
          global.dispatchEvent(new Event('resize'));

          expect(resizeMock).toHaveBeenCalledTimes(1);
          expect(getAugmentedTemplateDataMock).toHaveBeenCalled();
          expect(removeEventListenerMock.mock.calls.filter(c => c[0] !== 'error').length).toBe(0);
          expect(setStateMock).toHaveBeenCalledWith({ scaleFactor: 4 });
          expect(useStateMock).toHaveBeenCalled();
    
          cleanup();

          expect(removeEventListenerMock.mock.calls.filter(c => c[0] !== 'error').length).toBe(1);
        });

        it('should render loading shimmer with MobileHero display type', () => {
          const bootstrapDataWithSkeleton = {
            'mobile-web': {
              results: {
                mockPlacementKey: {
                  content: { ...mobileHeroProps, 
                    placementData: { contentLoadingState: 'skeleton' }
                  }
                }
              }
            }
          };

          fetchBootstrapDataMock.mockReturnValue(bootstrapDataWithSkeleton);
          const { container } = createComponent(defaultProps, true);

          expect(container).toMatchSnapshot();
        });

        it('should render loading shimmer with ImagePlacement display type', () => {
          const bootstrapDataWithSkeleton = {
            'mobile-web': {
              results: {
                mockPlacementKey: {
                  content: { ...blockPlacementProps, 
                    placementData: { contentLoadingState: 'skeleton' }
                  }
                }
              }
            }
          };

          fetchBootstrapDataMock.mockReturnValue(bootstrapDataWithSkeleton);
          const { container } = createComponent(defaultProps, true);

          expect(container).toMatchSnapshot();
        });

        it('should render loading shimmer with LegacyChaseAd display type', () => {
          const bootstrapDataWithSkeleton = {
            'mobile-web': {
              results: {
                mockPlacementKey: {
                  content: { ...chaseInstantCreditProps, 
                    placementData: { contentLoadingState: 'skeleton' }
                  }
                }
              }
            }
          };

          fetchBootstrapDataMock.mockReturnValue(bootstrapDataWithSkeleton);
          const { container } = createComponent(defaultProps, true);

          expect(container).toMatchSnapshot();
        });
      });

      describe('when value is false', () => {
        it('should not call fetchBootstrapData', () => {
          fetchBootstrapDataMock.mockReturnValue(bootstrapData);

          createComponent(placementProps);

          expect(fetchBootstrapDataMock).not.toHaveBeenCalled();
        });
      });
    });
  });

  describe('invalid display type', () => {
    it('should not render placement', () => {
      const props = {
        displayType: 'invalid',
        placement: {},
        placementData: {}
      };

      const { container } = createComponent(props);

      expect(container.querySelectorAll('.chase-banner').length).toBe(0);
      expect(container.querySelectorAll('.flex-placement').length).toBe(0);
      expect(getAugmentedTemplateDataMock).not.toHaveBeenCalled();
    });
  });

  describe('hidePlacement', () => {
    it('should hide placement if hidePlacement props is true', () => {
      const props = {
        hidePlacement: true,
        placement: {},
        placementData: {}
      };
      const { container } = createComponent(props);

      expect(container.querySelectorAll('.chase-banner').length).toBe(0);
      expect(container.querySelectorAll('.flex-placement').length).toBe(0);
      expect(getAugmentedTemplateDataMock).not.toHaveBeenCalled();
    });
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      handlePlacementLinkFn: handlePlacementLinkFnMock
    };

    const finalProps = { ...defaultProps, ...props };

    const store = createMockStoreWithRouterMiddleware()({ app: { webView: { isWebView: false } } });

    return render(
      <Provider store={store}>
        <DynamicPlacement {...finalProps} />
      </Provider>
    );
  };
});
